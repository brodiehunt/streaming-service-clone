import prisma from '@/lib/prisma'

export const getEpisodesByShowAndSeasonNumber = async ({
  showSlug,
  seasonNumber,
}: {
  showSlug: string
  seasonNumber: number
}) => {
  try {
    const episodes = await prisma.episode.findMany({
      where: {
        season: {
          seasonNumber,
          show: {
            slug: showSlug,
          },
        },
      },
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
        season: {
          select: {
            seasonNumber: true,
            show: {
              select: {
                title: true,
                slug: true,
                thumbnail: true,
              },
            },
          },
        },
      },
    })
    return episodes
  } catch {
    return null
  }
}
