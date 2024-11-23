'use client'

import { FormWrapper } from './StyledComponents'
import FormInput from './Input'
import FormButton from './FormButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/zodSchemas'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useState } from 'react'
import { sendResetPassword } from '@/app/reset-password/resetPassword.action'
import ServerErrorNotification from './ServerErrorNotification'

type EmailForm = z.infer<typeof emailSchema>

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) })
  const [serverError, setServerError] = useState('')

  const handleResetSubmission = async (values: EmailForm) => {
    console.log('Yes I am running')
    setServerError('')

    try {
      const { success, message } = await sendResetPassword(values.email)

      if (!success) {
        return setServerError(message)
      }
    } catch {
      return setServerError('Could not send email. Try again later')
    }
  }

  return (
    <FormWrapper>
      {serverError && (
        <ServerErrorNotification setServerError={setServerError}>
          {serverError}
        </ServerErrorNotification>
      )}
      <form onSubmit={handleSubmit(handleResetSubmission)}>
        <FormInput
          register={register}
          type="email"
          name="email"
          label="Email"
          error={errors.email?.message}
        />
        <FormButton disabled={false}>Continue</FormButton>
      </form>
      <Link href="/" className="home-link-button">
        Log in without a password
      </Link>
      <p className="under-form-navigation">
        <Link href="/login">Back to log in</Link>
      </p>
    </FormWrapper>
  )
}
