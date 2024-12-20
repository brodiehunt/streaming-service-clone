import prisma from '@/lib/prisma'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import { cookies } from 'next/headers'

import type { User, Session } from '@prisma/client'
import { cache } from 'react'

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  return encodeBase32LowerCaseNoPadding(bytes)
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }

  await prisma.session.create({ data: session })
  return session
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })

  // Check to see if session exists in database
  if (!result) {
    return { session: null, user: null }
  }

  const { user, ...session } = result

  // Check to see if session is expired
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } })
    return { session: null, user: null }
  }

  // If the session expires in the next 15 days, refresh session expiry
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: session.expiresAt },
    })
  }

  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } })
}

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
  const cookieStore = cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  })
}

export function deleteSessionTokenCookie(): void {
  const cookieStore = cookies()

  cookieStore.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })
}

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = cookies()
    const token = cookieStore.get('session')?.value ?? null
    if (token === null) {
      return { session: null, user: null }
    }

    const result = await validateSessionToken(token)
    return result
  },
)

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null }
