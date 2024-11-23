'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { emailSchema } from '@/lib/zodSchemas'
import prisma from '@/lib/prisma'

export const checkUserExists = async (
  values: z.infer<typeof emailSchema>,
): Promise<void | { success: boolean; message: string }> => {
  console.log('I am running on the server', values)
  let isUser = false
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    })

    if (user) {
      isUser = true
    }
  } catch {
    return { success: false, message: 'Server error occured. Try again later.' }
  }

  if (isUser) {
    redirect('/login-with-password')
  } else {
    redirect('/signup')
  }
}
