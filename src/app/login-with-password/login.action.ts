'use server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { signinSchema } from '@/lib/zodSchemas'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/lib/session'

type Signup = z.infer<typeof signinSchema>

export const signin = async (
  values: Signup,
): Promise<void | { success: boolean; message: string }> => {
  console.log('Signin server action', values)
  let isSignedIn = false

  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email.toLowerCase() },
    })

    if (!user) {
      return { success: false, message: 'Invalid credentials' }
    }

    const isPasswordMatch = await bcrypt.compare(
      values.password,
      user.hashedPassword,
    )

    if (!isPasswordMatch) {
      return { success: false, message: 'Invalid credentials' }
    }

    const token = generateSessionToken()

    const session = await createSession(token, user.id)

    setSessionTokenCookie(token, session.expiresAt)

    isSignedIn = true
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return { success: false, message: 'Could not sign in' }
  }

  if (isSignedIn) {
    redirect('/')
  }
}
