import prisma from '@/lib/prisma'

async function getUser() {
  const users = await prisma.user.findMany()
  return users
}
export default async function Home() {
  const users = await getUser()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Test branch protection rules</h1>
      <h2>{JSON.stringify(users)}</h2>
    </div>
  )
}
