import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

export type CategoryButton = {
  id: number
  slug: string
  title: string
}

export const getCategoriesTitleAndSlug = async ({
  userId,
}: {
  userId: number | null
}): Promise<CategoryButton[] | null> => {
  // User Id will be used to get 'continue watching' and 'for you' lists??
  console.log(userId, 'The user Id - getCategoriesTitleAndSlug')
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
    })
    return categories
  } catch {
    return null
  }
}

export const getCategoriesInfo = async (): Promise<Category[] | null> => {
  try {
    const categories = await prisma.category.findMany({})
    return categories
  } catch {
    return null
  }
}

export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | null> => {
  try {
    console.log('What is the slug?', slug)
    const category = await prisma.category.findUnique({
      where: { slug },
    })
    return category
  } catch {
    return null
  }
}

export async function getCategoryWithShows(slug: string) {
  try {
    const categoryWithShows = await prisma.category.findUnique({
      where: {
        slug: slug,
      },
      include: {
        shows: {
          include: {
            show: {
              include: {
                _count: {
                  select: {
                    seasons: true,
                  },
                },
                seasons: {
                  include: {
                    _count: {
                      select: { episodes: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!categoryWithShows) {
      throw null
    }

    // Transform to a cleaner structure
    const transformedData = {
      id: categoryWithShows.id,
      title: categoryWithShows.title,
      slug: categoryWithShows.slug,
      imageUrl: categoryWithShows.imageUrl,
      hexColor: categoryWithShows.hexColor,
      shows: categoryWithShows.shows.map(({ show }) => ({
        id: show.id,
        title: show.title,
        slug: show.slug,
        description: show.description,
        heroImage: show.heroImage,
        thumbnail: show.thumbnail,
        rating: show.rating,
        totalSeasons: show._count.seasons,
        totalEpisodes: show.seasons.reduce(
          (sum, season) => sum + season._count.episodes,
          0,
        ),
      })),
    }

    return transformedData
  } catch (error) {
    console.error('Error fetching category with shows:', error)
    return null
  }
}
