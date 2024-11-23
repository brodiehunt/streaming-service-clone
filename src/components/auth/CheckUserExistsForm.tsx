'use client'

import { FormWrapper } from './StyledComponents'
import FormInput from './Input'
import FormButton from './FormButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/zodSchemas'
import { useForm } from 'react-hook-form'

type EmailForm = z.infer<typeof emailSchema>

export default function CheckUserExistsForm() {
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
    </FormWrapper>
  )
}
