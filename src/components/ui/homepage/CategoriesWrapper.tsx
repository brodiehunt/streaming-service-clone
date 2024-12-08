import { getCurrentSession } from '@/lib/session'
import CategoryButtons from './CategoryButtons'
import { getCategoriesTitleAndSlug } from '@/utils/category'
import CategorySection from './CategorySection'
import { Suspense } from 'react'
import CategorySectionSkeleton from '../skeletons/CategorySectionSkeleton'
const CategoriesWrapper = async () => {
  const { user } = await getCurrentSession()
  const categories = await getCategoriesTitleAndSlug({
    userId: user?.id ?? null,
  })

  if (!categories) return null

  return (
    <div className="pb-4">
      <section className="py-2 sticky z-10 top-[80px] xl:top-[112px] topscroll-smooth ">
        <CategoryButtons categories={categories} />
      </section>
      <>
        {categories.map(category => {
          return (
            <Suspense key={category.id} fallback={<CategorySectionSkeleton />}>
              <CategorySection category={category} />
            </Suspense>
          )
        })}
      </>
    </div>
  )
}

export default CategoriesWrapper
