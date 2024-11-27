import prisma from '@/lib/prisma'
import { Show } from '@prisma/client'

export const getShowsByCategory = async ({
  categoryId,
  limit,
}: {
  categoryId: number
  limit: number
}): Promise<Show[] | null> => {
  try {
    const shows = await prisma.showsOnCategories.findMany({
      where: { categoryId },
      select: {
        show: true,
      },
      take: limit,
      orderBy: {
        show: {
          createdAt: 'desc',
        },
      },
    })

    return shows.map(({ show }) => show)
  } catch {
    return null
  }
}
