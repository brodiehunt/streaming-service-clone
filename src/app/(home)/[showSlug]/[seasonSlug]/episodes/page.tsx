import { getEpisodesByShowAndSeasonNumber } from '@/utils/episode'
import BlurHeroBackground from '@/components/ui/heros/BlurHeroBackground'
import FilterableCardGrid from '@/components/ui/grids/ClientFilterableGrid'

export default async function AllEpisodesPage({
  params: { showSlug, seasonSlug },
}: {
  params: { showSlug: string; seasonSlug: string }
}) {
  const [, seasonNumString] = seasonSlug.split('-')
  const seasonNumber = Number(seasonNumString)
  const showAndEpisodes = await getEpisodesByShowAndSeasonNumber({
    showSlug,
    seasonNumber,
  })

  if (!showAndEpisodes) return null

  return (
    <div>
      <BlurHeroBackground thumbnail={showAndEpisodes?.thumbnail} />
      <section className="pt-[120px] xl:pt-[200px] relative z-10 px-layout-x-large ">
        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-white">
          {showAndEpisodes.title} Season {seasonNumber}
        </h1>

        <FilterableCardGrid
          episodes={showAndEpisodes.seasons[0].episodes}
          showSlug={showSlug}
          seasonNumber={seasonNumber}
        />
      </section>
    </div>
  )
}
