import prisma from '@/lib/prisma'
import { Episode } from '@prisma/client'

export const getEpisodesByShowSlugAndSeason = async ({
  showSlug,
  season,
}: {
  showSlug: string
  season: number
}): Promise<Episode[] | null> => {
  try {
    const episodes = prisma.episode.findMany({
      where: {
        season: {
          seasonNumber: season,
          show: {
            slug: showSlug,
          },
        },
      },
      orderBy: {
        episodeNumber: 'asc',
      },
    })

    if (!episodes) return null

    return episodes
  } catch {
    return null
  }
}
