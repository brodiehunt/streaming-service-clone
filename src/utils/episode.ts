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
