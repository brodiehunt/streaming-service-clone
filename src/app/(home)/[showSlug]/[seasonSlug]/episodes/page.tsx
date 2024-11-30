import { getEpisodesByShowAndSeasonNumber } from '@/utils/episode'

export default async function AllEpisodesPage({
  params: { showSlug, seasonSlug },
}: {
  params: { showSlug: string; seasonSlug: string }
}) {
  const [, seasonNumString] = seasonSlug.split('-')
  const seasonNumber = Number(seasonNumString)
  const episodes = await getEpisodesByShowAndSeasonNumber({
    showSlug,
    seasonNumber,
  })
  console.log(episodes)

  return <div></div>
}
