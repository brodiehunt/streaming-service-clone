import HorizontalCardSliderWrapper from '@/components/ui/grids/HorizontalCardSliderWrapper'
import { getShowsWithEpisodeCount } from '@/utils/show'
import ShowWithSeasonCard from '@/components/ui/cards/ShowWithSeasonsCard'
const DiscoverSomethingNewSection: React.FC = async () => {
  const newShows = await getShowsWithEpisodeCount()

  if (!newShows) return null

  return (
    <section className="relative z-30 overflow-hidden py-4">
      <div className="px-layout-x-large flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2 ">Discover Something New</h2>
      </div>

      <HorizontalCardSliderWrapper>
        {newShows.map(show => {
          return (
            <ShowWithSeasonCard
              key={show.id}
              show={{
                title: show.title,
                slug: show.slug,
                thumbnail: show.thumbnail,
                totalEpisodes: show.totalEpisodes,
              }}
              isFlex={true}
            />
          )
        })}
      </HorizontalCardSliderWrapper>
    </section>
  )
}

export default DiscoverSomethingNewSection
