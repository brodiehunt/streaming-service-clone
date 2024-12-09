import { getShowsByCategory } from '@/utils/show'
import ObserverComponent from './IntersectionObserver'
import GridCardWrapper from '../grids/GridCardWrapper'
import HomeShowCard from '../cards/HomeShowCard'

const CategorySection: React.FC<{
  category: { id: number; slug: string; title: string }
}> = async ({ category }) => {
  const shows = await getShowsByCategory({ categoryId: category.id, limit: 12 })

  if (!shows) return
  return (
    <section
      id={category.slug}
      className="scroll-smooth scroll-mt-[40vh] relative min-h-[200px] z-0"
    >
      <ObserverComponent slug={category.slug} />
      <h2 className="text-white text-xl py-3 font-medium xl:text-2xl xl:py-4">
        {category.title}
      </h2>
      <GridCardWrapper>
        {shows.map(show => {
          return <HomeShowCard key={show.id} show={show} />
        })}
      </GridCardWrapper>
    </section>
  )
}

export default CategorySection
