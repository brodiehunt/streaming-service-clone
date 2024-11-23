import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    givenName: z.string().min(2).max(50),
    familyName: z.string().min(2).max(50),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const emailSchema = z.object({
  email: z.string().email(),
})
