import Image from 'next/image'
import { getCurrentSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import ResetPasswordConfirmForm from '@/components/auth/ResetPasswordConfirmForm'

export default async function ResetPasswordConfirmPage() {
  const { user } = await getCurrentSession()
  if (user) return redirect('/')

  return (
    <div className="w-full min-h-[100vh] px-4 py-7 absolute top-0 left-0 z-10">
      <header className="relative z-20 mb-7">
        <h1 className="text-center text-xl font-bold mb-4 md:text-white md:text-3xl">
          Reset your password
        </h1>
        <p className="text-center max-w-[500px] mx-auto md:text-white">
          Please enter your new password in the fields provided.
        </p>
      </header>
      <div className="hidden md:block absolute top-0 left-0 w-full h-full backdrop-blur-md z-0">
        <Image
          src="/auth_background.webp"
          width={1600}
          height={900}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover "
        />
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50"></div>
      </div>
      <ResetPasswordConfirmForm />
    </div>
  )
}
