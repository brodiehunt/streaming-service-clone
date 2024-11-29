import { getCategoryWithShows } from '@/utils/category'
import ShowWithSeasonCard from '@/components/ui/cards/ShowWithSeasonsCard'
import CategoryShowsHero from '@/components/ui/heros/CategoryShowsHero'

export default async function CategoryShows({
  params,
}: {
  params: { categorySlug: string }
}) {
  const categoryWithShows = await getCategoryWithShows(params.categorySlug)

  console.log('What is the category data', categoryWithShows)
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
      <section className="grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4  mx-auto px-layout-x-large relative z-10 mt-[-20vh] xl:mt-[-45vh] pb-8">
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
            />
          )
        })}
      </section>
    </div>
  )
}
