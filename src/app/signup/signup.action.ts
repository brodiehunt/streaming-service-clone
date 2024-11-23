'use server'
import { z } from 'zod'
import { signupSchema } from '@/lib/zodSchemas'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export const signup = async (
  values: z.infer<typeof signupSchema>,
): Promise<void | { success: boolean; message: string }> => {
  console.log('Signup server action', values)
  let isUserCreated = false
  try {
    // Does user exist?
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    })

    if (existingUser) {
      return { success: false, message: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(values.password, 8)

    await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        givenName: values.givenName.toLowerCase(),
        familyName: values.familyName.toLowerCase(),
        hashedPassword: hashedPassword,
      },
    })

    isUserCreated = true
    // return { success: true, message: 'User was created' }
  } catch {
    return {
      success: false,
      message: 'There was an error creating your acount',
    }
  }

  if (isUserCreated) {
    redirect('/')
  } else {
    return {
      success: false,
      message: 'There was an error creating your accoutn',
    }
  }
}
