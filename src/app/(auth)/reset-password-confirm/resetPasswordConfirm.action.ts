'use server'
import prisma from '@/lib/prisma'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export const resetPasswordConfirm = async (data: {
  password: string
  confirmPassword: string
  token: string
}): Promise<void | { success: boolean; message: string }> => {
  console.log('Hitting the server')
  // return { success: false, message: 'Yes We have hit the server' }
  const { password, token } = data
  let isSuccess = false
  try {
    const hashedToken = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    )

    const user = await prisma.user.findFirst({
      where: { passwordResetToken: hashedToken },
    })

    if (!user) {
      return { success: false, message: 'Invalid Token, try again' }
    }

    const now = new Date()

    if (user.tokenExpiresAt && user.tokenExpiresAt < now) {
      return {
        success: false,
        message:
          'Your Token has expired. Please request a new password reset email',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        passwordResetToken: null, // Clear the token
        tokenExpiresAt: null, // Clear the expiration
      },
    })

    isSuccess = true

    // Update user
    // Should I delete the token and tokenExpiresAt values? I mean make null?
  } catch {
    return {
      success: false,
      message: 'Cannot update password. Try again later',
    }
  }
  if (isSuccess) {
    redirect('/login')
  }
}
