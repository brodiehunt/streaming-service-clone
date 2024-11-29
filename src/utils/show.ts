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

export const getShowBySlug = async ({
  slug,
}: {
  slug: string
}): Promise<Show | null> => {
  try {
    const show = await prisma.show.findUnique({
      where: { slug },
    })

    if (!show) return null

    return show
  } catch {
    return null
  }
}

export type ShowWithCategories =
  | (Show & {
      categories: {
        category: {
          title: string
        }
      }[]
    })
  | null

export const getShowWithCategoriesBySlug = async ({
  slug,
}: {
  slug: string
}): Promise<ShowWithCategories> => {
  try {
    const show = await prisma.show.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })

    if (!show) return null

    return show
  } catch {
    return null
  }
}
