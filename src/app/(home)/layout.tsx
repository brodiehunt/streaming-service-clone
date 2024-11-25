import { getCurrentSession } from '@/lib/session'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getCurrentSession()
  console.log(user)
  return (
    <div className="flex flex-col min-h-[100svh]">
      <Header user={user ? { givenName: user.givenName, id: user.id } : user} />
      <main className="mt-[80px] xl:mt-[112px]">{children}</main>
      <Footer user={user ? { givenName: user.givenName, id: user.id } : user} />
    </div>
  )
}
