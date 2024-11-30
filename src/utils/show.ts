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

export const getShowsWithEpisodeCount = async () => {
  try {
    const shows = await prisma.show.findMany({
      take: 8,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        seasons: {
          include: {
            episodes: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    // Transform the data to include episode count
    const showsWithEpisodeCounts = shows.map(show => {
      const totalEpisodes = show.seasons.reduce((total, season) => {
        return total + season.episodes.length
      }, 0)

      return {
        id: show.id,
        title: show.title,
        slug: show.slug,
        description: show.description,
        heroImage: show.heroImage,
        thumbnail: show.thumbnail,
        rating: show.rating,
        totalSeasons: show.totalSeasons,
        totalEpisodes,
        updatedAt: show.updatedAt,
        createdAt: show.createdAt,
      }
    })

    return showsWithEpisodeCounts
  } catch {
    return null
  }
}
