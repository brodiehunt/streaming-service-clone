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
      <section className="pt-[120px] xl:pt-[200px] relative z-10 ">
        <h1 className="px-layout-x-large font-bold text-2xl md:text-3xl xl:text-4xl text-white">
          {showAndEpisodes.title} Season {seasonNumber}
        </h1>
        <div className="pt-4 mb-4 px-layout-x-large border-b-[1px] border-almost-white/30">
          <p className="border-b-2 border-nine px-2 w-fit text-lg md:text-xl font-bold py-2 ">
            Watch
          </p>
        </div>
        <FilterableCardGrid
          episodes={showAndEpisodes.seasons[0].episodes}
          showSlug={showSlug}
          seasonNumber={seasonNumber}
        />
      </section>
    </div>
  )
}
