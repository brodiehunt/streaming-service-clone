'use client'
import { FormWrapper } from './StyledComponents'
import FormInput from './Input'
import FormButton from './FormButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { signinSchema } from '@/lib/zodSchemas'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import ServerErrorNotification from './ServerErrorNotification'
import { signin } from '@/app/(auth)/login-with-password/login.action'

type SigninForm = z.infer<typeof signinSchema>

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({ resolver: zodResolver(signinSchema) })
  const [serverError, setServerError] = useState('')

  const handleSigninSubmission: SubmitHandler<SigninForm> = async data => {
    setServerError('')

    try {
      const response = await signin(data)

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
      <form onSubmit={handleSubmit(handleSigninSubmission)}>
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
        <Link href="/reset-password" className="forgot-password">
          Forgot password?
        </Link>
        <FormButton disabled={false}>Log in</FormButton>
      </form>
      <Link href="/" className="home-link-button">
        Log in without a password
      </Link>
      <p className="under-form-navigation">
        Not a Member? <Link href="/signup">Create your account now</Link>
      </p>
    </FormWrapper>
  )
}
