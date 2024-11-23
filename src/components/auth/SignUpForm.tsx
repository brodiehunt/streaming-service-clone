'use client'
import styled from 'styled-components'
import FormInput from '@/components/auth/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/lib/zodSchemas'
import { z } from 'zod'
import FormButton from './FormButton'
import Link from 'next/link'
const FormWrapper = styled.div`
  padding: 1.5rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  z-index: 2;
  background-color: #fff;
  border-radius: 4px;

  form {
    margin-bottom: 10px;
  }

  .password-specification {
    margin-bottom: 20px;
  }

  .home-link-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: rgb(101, 101, 101);
    background-color: white;
    border: 2px solid rgb(218, 218, 218);
    border-radius: 4px;
    height: 48px;
    padding: 0 24px;
    transition-property: color, background-color, border-color;
    transition-duration: 200ms;
    cursor: pointer;

    &:hover {
      background-color: rgb(246, 246, 246);
      color: #000;
      border-color: rgb(164, 164, 164);
    }
  }
  .under-form-navigation {
    text-align: center;
    padding: 24px 0px;

    a {
      color: #00beff;
      font-weight: 700;
      &:hover,
      &:focus {
        color: rgb(0, 148, 201);
      }
    }
  }

  @media (min-width: 768px) {
    .two-col {
      display: flex;
      gap: 24px;
    }
  }
`

type SignupForm = z.infer<typeof signupSchema>
export default function SignUpForm() {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) })
  return (
    <FormWrapper>
      <form>
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
