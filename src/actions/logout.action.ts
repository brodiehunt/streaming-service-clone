'use server'

import { cookies } from 'next/headers'
import { invalidateSession, deleteSessionTokenCookie } from '@/lib/session'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'

export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = cookies()

    const token = cookieStore.get('session')?.value ?? null

    if (token !== null) {
      const sessionId = encodeHexLowerCase(
        sha256(new TextEncoder().encode(token)),
      )

      await invalidateSession(sessionId)

      deleteSessionTokenCookie()
    }

    return { success: true, message: 'User logged out' }
  } catch {
    return { success: false, message: 'There was an error logging out' }
  }
}
