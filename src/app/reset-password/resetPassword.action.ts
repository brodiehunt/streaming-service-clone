'use server'

import { EmailTemplate } from '@/components/auth/ResetEmailTemplate'
import { Resend } from 'resend'
import { generateSessionToken } from '@/lib/session'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendResetPassword = async (
  email: string,
): Promise<{
  success: boolean
  message: string
}> => {
  try {
    const token = generateSessionToken()
    const hashedToken = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    )

    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        passwordResetToken: hashedToken,
        tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    })

    const resetLink =
      process.env.NODE_ENV === 'production'
        ? `http://localhost:3000/reset-password-confirm?token=${token}`
        : `http://localhost:3000/reset-password-confirm?token=${token}`

    const { error } = await resend.emails.send({
      from: 'Brodie Hunt <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset your password',
      react: EmailTemplate({ givenName: 'Placeholder Name', url: resetLink }),
    })

    if (error) {
      console.log('There was an error', error)
      return { success: false, message: 'Failed to send reset password email.' }
    }

    return {
      success: true,
      message: 'Reset password email sent, check your emails',
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          success: true,
          message: 'Reset password email sent, check your emails',
        }
      }
    }
    return { success: false, message: 'Failed to send reset password email.' }
  }
}
