import { getCategoryWithShows } from '@/utils/category'
import ShowWithSeasonCard from '@/components/ui/cards/ShowWithSeasonsCard'
import CategoryShowsHero from '@/components/ui/heros/CategoryShowsHero'
import GridCardWrapper from '@/components/ui/grids/GridCardWrapper'
export default async function CategoryShows({
  params,
}: {
  params: { categorySlug: string }
}) {
  const categoryWithShows = await getCategoryWithShows(params.categorySlug)

  // Handle this later - either error or 404 no category component...
  if (!categoryWithShows) return null
  return (
    <div>
      <CategoryShowsHero
        category={{
          title: categoryWithShows.title,
          imgUrl: categoryWithShows.imageUrl,
          color: categoryWithShows.hexColor,
        }}
      />
      <section className="mx-auto px-layout-x-large relative z-10 mt-[-20vh] xl:mt-[-45vh] pb-b">
        <GridCardWrapper>
          {categoryWithShows.shows.map(showInfo => {
            return (
              <ShowWithSeasonCard
                key={showInfo.id}
                show={{
                  title: showInfo.title,
                  slug: showInfo.slug,
                  thumbnail: showInfo.thumbnail,
                  totalEpisodes: showInfo.totalEpisodes,
                }}
                isFlex={false}
              />
            )
          })}
        </GridCardWrapper>
      </section>
    </div>
  )
}
