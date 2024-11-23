'use server'

import { EmailTemplate } from '@/components/auth/ResetEmailTemplate'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendResetPassword = async (
  email: string,
): Promise<{
  success: boolean
  message: string
}> => {
  try {
    const url = 'http://localhost:3000'
    const { error } = await resend.emails.send({
      from: 'Brodie Hunt <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset your password',
      react: EmailTemplate({ givenName: 'Placeholder Name', url }),
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
    console.log(error)
    return { success: false, message: 'Failed to send reset password email.' }
  }
}
