import HomeHero from '@/components/ui/homepage/Hero'
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
      <HomeHero />
    </div>
  )
}
