import { getCategoryBySlug } from '@/utils/category'
import CategoryShowsHero from '@/components/ui/heros/CategoryShowsHero'

export default async function CategoryShows({
  params,
}: {
  params: { categorySlug: string }
}) {
  const category = await getCategoryBySlug(params.categorySlug)
  console.log('What is the category data', category)
  // Handle this later - either error or 404 no category component...
  if (!category) return null
  return (
    <div>
      <CategoryShowsHero
        category={{
          title: category.title,
          imgUrl: category.imageUrl,
          color: category.hexColor,
        }}
      />
    </div>
  )
}
