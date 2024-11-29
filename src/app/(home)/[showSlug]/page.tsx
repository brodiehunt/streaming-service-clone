// What do I need to do?

import { getShowWithCategoriesBySlug } from '@/utils/show'
import ShowHero from '@/components/ui/heros/ShowHero'
import CurrentSeasonEpisodesSection from './CurrentSeasonEpisodes'
import { Suspense } from 'react'
// 1. Get the content above the fold (Cateogry information)
// 2. Render the hero (above the fold)
// 3. Render the episodes for the current season - This defaults to one for now
// 4. Render some 'new' shows... Just do a related category for now...

export default async function ShowPage({
  params,
}: {
  params: { showSlug: string }
}) {
  const show = await getShowWithCategoriesBySlug({ slug: params.showSlug })

  // Handle errors and no show here later
  if (!show) return null

  return (
    <div>
      <ShowHero show={show} />
      <Suspense fallback={<p className="z-30">Loading....</p>}>
        <CurrentSeasonEpisodesSection slug={params.showSlug} season={1} />
      </Suspense>
    </div>
  )
}
