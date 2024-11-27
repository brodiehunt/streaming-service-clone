import CategoryCardsWrapper from '@/components/layout/CategoriesCardsWrapper'
import { getShowsByCategory } from '@/utils/show'
import ObserverComponent from './IntersectionObserver'
const CategorySection: React.FC<{
  category: { id: number; slug: string; title: string }
}> = async ({ category }) => {
  const shows = await getShowsByCategory({ categoryId: category.id, limit: 12 })

  // Return Error component - eventually
  if (!shows) return
  return (
    <section
      id={category.slug}
      className="scroll-smooth relative z-30 min-h-[200px]"
    >
      <ObserverComponent slug={category.slug} />
      <h2 className="text-white text-xl py-3 font-medium xl:text-2xl xl:py-4">
        {category.title}
      </h2>
      <CategoryCardsWrapper shows={shows} />
    </section>
  )
}

export default CategorySection
