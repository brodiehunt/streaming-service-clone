'use client'
import { FormWrapper } from '@/components/auth/StyledComponents'
import FormInput from '@/components/auth/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/lib/zodSchemas'
import { z } from 'zod'
import FormButton from './FormButton'
import Link from 'next/link'
import { useState } from 'react'
import ServerErrorNotification from './ServerErrorNotification'
import { signup } from '@/app/signup/signup.action'

type SignupForm = z.infer<typeof signupSchema>
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) })
  const [serverError, setServerError] = useState('')

  const handleRegisterFormSubmission: SubmitHandler<
    SignupForm
  > = async data => {
    setServerError('')

    try {
      const response = await signup(data)

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
      <form onSubmit={handleSubmit(handleRegisterFormSubmission)}>
        <div className="two-col">
          <FormInput
            register={register}
            type="text"
            name="givenName"
            label="Given Name"
            error={errors.givenName?.message}
          />
          <FormInput
            register={register}
            type="text"
            name="familyName"
            label="Family Name"
            error={errors.familyName?.message}
          />
        </div>

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
      <Link href="/" className="home-link-button">
        Cancel
      </Link>
      <p className="under-form-navigation">
        Already have an account? <Link href="/login-with-password">Log In</Link>
      </p>
    </FormWrapper>
  )
}
