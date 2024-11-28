import { getEpisodesByShowSlugAndSeason } from '@/utils/season'

const CurrentSeasonEpisodesSection: React.FC<{
  slug: string
  season: number
}> = async ({ slug, season }) => {
  const episodes = await getEpisodesByShowSlugAndSeason({
    showSlug: slug,
    season,
  })

  // Error handling here for later
  if (!episodes) return null
  return (
    <section className="relative z-30 px-layout-x-large">
      <h2 className="text-xl font-bold mb-2">Episodes</h2>
      This is the current season episodes
    </section>
  )
}

export default CurrentSeasonEpisodesSection
