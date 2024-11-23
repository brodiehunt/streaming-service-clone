import SignInForm from '@/components/auth/SignInForm'
import Image from 'next/image'
import { getCurrentSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function LoginWithPasswordPage() {
  const { user } = await getCurrentSession()
  if (user) return redirect('/')
  return (
    <div className="w-full min-h-[100vh] px-4 py-7 fixed top-0 left-0 z-10">
      <header className="relative z-20 mb-4">
        <h1 className="text-center text-xl font-bold mb-4 md:text-white md:text-3xl">
          Log in to your account
        </h1>
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

      <SignInForm />
    </div>
  )
}
