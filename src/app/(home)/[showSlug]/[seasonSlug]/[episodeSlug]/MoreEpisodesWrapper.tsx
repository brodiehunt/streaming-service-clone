import ToggleDataGrid from '@/components/ui/grids/ToggleDataGrid'
import { getEpisodesByShowAndSeasonNumber } from '@/utils/episode'

const MoreEpisodesWrapper: React.FC<{
  showSlug: string
  seasonNumber: number
}> = async ({ showSlug, seasonNumber }) => {
  const episodesPromise = getEpisodesByShowAndSeasonNumber({
    showSlug,
    seasonNumber,
  })
  const [episodesResult] = await Promise.allSettled([episodesPromise])

  const episodesData =
    episodesResult.status === 'fulfilled' ? episodesResult.value : null

  return (
    <>
      <ToggleDataGrid
        episodes={episodesData && episodesData.seasons[0].episodes}
      />
    </>
  )
}

export default MoreEpisodesWrapper
