import { getCurrentSession } from '@/lib/session'
import Header from '@/components/layout/header'

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
    <>
      <Header user={user ? { givenName: user.givenName, id: user.id } : user} />
      <div>{children}</div>
    </>
  )
}
