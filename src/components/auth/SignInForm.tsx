'use client'
import { FormWrapper } from './StyledComponents'
import FormInput from './Input'
import FormButton from './FormButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { signinSchema } from '@/lib/zodSchemas'
import { useForm } from 'react-hook-form'

type SigninForm = z.infer<typeof signinSchema>

export default function SignInForm() {
  const {
    register,
    formState: { errors },
  } = useForm<SigninForm>({ resolver: zodResolver(signinSchema) })

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
        <FormInput
          register={register}
          type="password"
          name="password"
          label="Password"
          error={errors.password?.message}
        />
        <FormButton disabled={false}>Log in</FormButton>
      </form>
      <Link href="/" className="home-link-button">
        Log in without a password
      </Link>
      <p className="under-form-navigation">
        Not a Member?{' '}
        <Link href="/login-with-password">Create your account now</Link>
      </p>
    </FormWrapper>
  )
}
