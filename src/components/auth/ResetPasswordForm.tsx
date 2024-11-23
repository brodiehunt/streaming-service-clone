'use client'

import { FormWrapper } from './StyledComponents'
import FormInput from './Input'
import FormButton from './FormButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/zodSchemas'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

type EmailForm = z.infer<typeof emailSchema>

export default function ResetPasswordForm() {
  const {
    register,
    formState: { errors },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema) })

  return (
    <FormWrapper>
      <form>
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
