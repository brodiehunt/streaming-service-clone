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
      <section className="py-2 sticky top-[80px] xl:top-[112px] topscroll-smooth z-30">
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
// mt-[80px] xl:mt-[112px]

export default CategoriesWrapper
