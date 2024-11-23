'use client'
import { FormWrapper } from '@/components/auth/StyledComponents'
import FormInput from '@/components/auth/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/lib/zodSchemas'
import { z } from 'zod'
import FormButton from './FormButton'

import { useState } from 'react'
import ServerErrorNotification from './ServerErrorNotification'

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

const ResetPasswordConfirmForm: React.FC<{ token: string | string[] }> = ({
  token,
}) => {
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({ resolver: zodResolver(resetPasswordSchema) })

  console.log(token)
  const handleResetPassword: SubmitHandler<ResetPasswordForm> = async data => {
    console.log('Working as expected...', data)
  }

  return (
    <FormWrapper>
      {serverError && (
        <ServerErrorNotification setServerError={setServerError}>
          {serverError}
        </ServerErrorNotification>
      )}
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <FormInput
          register={register}
          type="password"
          name="password"
          label="Password"
          error={errors.password?.message}
        />
        <FormInput
          register={register}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        />
        <p className="password-specification">
          Password must be 8 to 50 characters
        </p>
        <FormButton disabled={false}>Signup</FormButton>
      </form>
    </FormWrapper>
  )
}

export default ResetPasswordConfirmForm
