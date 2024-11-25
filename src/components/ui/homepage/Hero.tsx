import prisma from '@/lib/prisma'
import Image from 'next/image'
const getGameOfThrones = async () => {
  try {
    const gameOfThronesShow = await prisma.show.findFirst({
      where: { title: 'Game of Thrones' },
    })

    if (!gameOfThronesShow) return { success: false, data: null }

    return { success: true, data: gameOfThronesShow }
  } catch {
    return { success: true, data: null }
  }
}

export default async function HomeHero() {
  const { success, data } = await getGameOfThrones()

  if (!success) return null

  console.log(data)
  return (
    <section className="h-[100svh]">
      <div className="w-full h-[60%] relative">
        <Image
          src={data?.thumbnail || '/'}
          alt={`${data?.title} show cover`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  )
}
