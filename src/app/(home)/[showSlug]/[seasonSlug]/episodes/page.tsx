import { getEpisodesByShowAndSeasonNumber } from '@/utils/episode'
import BlurHeroBackground from '@/components/ui/heros/BlurHeroBackground'

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
    </div>
  )
}
