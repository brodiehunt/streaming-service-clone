import prisma from '@/lib/prisma'

async function getUser() {
  const users = await prisma.user.findMany()
  return users
}
export default async function Home() {
  const users = await getUser()
  console.log(users)
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1>What is changing</h1>
    </div>
  )
}
