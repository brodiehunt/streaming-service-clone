import { getEpisodesByShowSlugAndSeason } from '@/utils/season'
import HorizontalCardSliderWrapper from '@/components/layout/HorizontalCardSliderWrapper'
import EpisodeCard from '@/components/ui/cards/EpisodeCard'
import Link from 'next/link'
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
    <section className="relative z-30 overflow-hidden ">
      <div className="px-layout-x-large flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2 ">Episodes</h2>
        <Link
          href={`/${slug}/season-${season}/episodes`}
          title="view all episodes"
          className="text-xs hover:text-nine transition-colors duration-200"
        >
          View All Episodes
        </Link>
      </div>

      <HorizontalCardSliderWrapper>
        {episodes.map(episode => {
          return (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              season={season}
              showSlug={slug}
            />
          )
        })}
      </HorizontalCardSliderWrapper>
    </section>
  )
}

export default CurrentSeasonEpisodesSection
