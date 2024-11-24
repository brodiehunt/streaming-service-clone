'use client'

import { FormWrapper } from './StyledComponents'
import FormInput from './Input'
import FormButton from './FormButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/zodSchemas'
import { useForm, SubmitHandler } from 'react-hook-form'
import { checkUserExists } from '@/app/(auth)/login/checkUserExists.action'
import ServerErrorNotification from './ServerErrorNotification'
import { useState } from 'react'
type EmailForm = z.infer<typeof emailSchema>

export default function CheckUserExistsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) })
  const [serverError, setServerError] = useState('')

  const handleCheckAccountSubmission: SubmitHandler<EmailForm> = async data => {
    setServerError('')
    try {
      const response = await checkUserExists(data)

      if (typeof response === 'undefined') return

      if (!response.success) {
        setServerError(response.message)
      }
    } catch {
      setServerError('An error occured. Try again later')
    }
  }

  return (
    <FormWrapper>
      {serverError && (
        <ServerErrorNotification setServerError={setServerError}>
          {serverError}
        </ServerErrorNotification>
      )}

      <form onSubmit={handleSubmit(handleCheckAccountSubmission)}>
        <FormInput
          register={register}
          type="email"
          name="email"
          label="Email"
          error={errors.email?.message}
        />
        <FormButton disabled={false}>Continue</FormButton>
      </form>
    </FormWrapper>
  )
}
