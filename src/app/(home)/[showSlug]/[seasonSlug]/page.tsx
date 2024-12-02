import ShowHero from '@/components/ui/heros/ShowHero'
import { getShowWithCategoriesBySlug } from '@/utils/show'
import CurrentSeasonEpisodesSection from '../CurrentSeasonEpisodes'
import { Suspense } from 'react'
import DiscoverSomethingNewSection from '../DiscoverSomethingNew'

export default async function SingleSeasonPage({
  params: { showSlug, seasonSlug },
}: {
  params: { showSlug: string; seasonSlug: string }
}) {
  const [, seasonNumString] = seasonSlug.split('-')
  const seasonNumber = Number(seasonNumString)
  const show = await getShowWithCategoriesBySlug({ slug: showSlug })

  if (!show) return null

  return (
    <div>
      <ShowHero show={show} currentSeason={seasonNumber} />
      <Suspense fallback={<p className="z-30">Loading....</p>}>
        <CurrentSeasonEpisodesSection slug={showSlug} season={seasonNumber} />
      </Suspense>
      <Suspense fallback={<p className="z-30">Loading....</p>}>
        <DiscoverSomethingNewSection />
      </Suspense>
    </div>
  )
}
