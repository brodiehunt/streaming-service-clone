import { getCurrentSession } from '@/lib/session'
import CategoryButtons from './CategoryButtons'
import { getCategoriesTitleAndSlug } from '@/utils/category'

const CategoryButtonsWrapper = async () => {
  const { user } = await getCurrentSession()
  const categories = await getCategoriesTitleAndSlug({
    userId: user?.id ?? null,
  })
  console.log(categories)
  if (!categories) return null
  return (
    <section className="py-2 relative">
      <CategoryButtons categories={categories} />
    </section>
  )
}

export default CategoryButtonsWrapper
