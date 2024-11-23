'use server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { signinSchema } from '@/lib/zodSchemas'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

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

    isSignedIn = true
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message) // Safely access the message property
    }
    return { success: false, message: 'Could not sign in' }
  }

  if (isSignedIn) {
    redirect('/')
  }
}
