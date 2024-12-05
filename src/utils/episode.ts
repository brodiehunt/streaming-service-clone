import prisma from '@/lib/prisma'

export const getEpisodesByShowAndSeasonNumber = async ({
  showSlug,
  seasonNumber,
}: {
  showSlug: string
  seasonNumber: number
}) => {
  try {
    const showAndEpisodes = await prisma.show.findUnique({
      where: {
        slug: showSlug,
      },
      select: {
        thumbnail: true,
        title: true,
        seasons: {
          where: {
            seasonNumber: seasonNumber,
          },
          select: {
            episodes: {
              orderBy: {
                episodeNumber: 'asc',
              },
              select: {
                id: true,
                episodeNumber: true,
                title: true,
                description: true,
                thumbnailUrl: true,
                duration: true,
                videoUrl: true,
                createdAt: true,
                updatedAt: true,
                seasonId: true,
              },
            },
          },
        },
      },
    })
    return showAndEpisodes
  } catch {
    return null
  }
}

export const getEpisodeByNumberSeasonAndShowSlug = async ({
  showSlug,
  seasonNumber,
  episodeNumber,
}: {
  showSlug: string
  seasonNumber: number
  episodeNumber: number
}) => {
  try {
    const episode = await prisma.episode.findFirst({
      where: {
        episodeNumber,
        season: {
          seasonNumber,
          show: {
            slug: showSlug,
          },
        },
      },
      include: {
        season: {
          select: {
            show: {
              select: {
                title: true,
                categories: {
                  select: {
                    category: {
                      select: {
                        title: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    return episode
  } catch {
    return null
  }
}
