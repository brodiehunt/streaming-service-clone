'use server'
// import { z } from 'zod'
// import { signupSchema } from '@/lib/zodSchemas'
// import prisma from '@/lib/prisma'
// import bcrypt from 'bcrypt'

// export const signup = async (values: z.infer<typeof signupSchema>) => {
//   console.log('I am running on the server')
//   try {
//     // Does user exist?
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email: values.email,
//       },
//     })

//     if (existingUser) {
//       return { success: false, error: 'User already exists' }
//     }

//     const hashedPassword = await bcrypt.hash(values.password, 10)

//     const user = prisma.user.create({
//       data: {
//         email: values.email.toLowerCase(),
//         givenName: values.givenName.toLowerCase(),
//         familyName: values.familyName.toLowerCase(),
//         hashedPassword: hashedPassword,
//         gender: values.gender,
//       },
//     })

//     return { success: true, message: 'User was created' }
//   } catch (error) {
//     return { success: false, message: 'Error signing up' }
//   }
// }
