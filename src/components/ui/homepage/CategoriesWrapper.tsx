import { getCurrentSession } from '@/lib/session'
import CategoryButtons from './CategoryButtons'
import { getCategoriesTitleAndSlug } from '@/utils/category'
import CategorySection from './CategorySection'
import { Suspense } from 'react'
const CategoriesWrapper = async () => {
  const { user } = await getCurrentSession()
  const categories = await getCategoriesTitleAndSlug({
    userId: user?.id ?? null,
  })

  if (!categories) return null

  return (
    <div className="pb-4">
      <section className="py-2 relative scroll-smooth">
        <CategoryButtons categories={categories} />
      </section>
      <>
        {categories.map(category => {
          return (
            <Suspense
              key={category.id}
              fallback={<div>Loading {category.title}...</div>}
            >
              <CategorySection category={category} />
            </Suspense>
          )
        })}
      </>
    </div>
  )
}

export default CategoriesWrapper
