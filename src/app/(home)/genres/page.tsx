import { getCategoriesInfo } from '@/utils/category'
import CategoryCard from '@/components/ui/cards/CategoryCard'
export default async function GenresPage() {
  const categories = await getCategoriesInfo()

  // Return error component;

  if (!categories) return null
  return (
    <section className="mt-[100px] xl:mt-[130px] px-layout-x-large relative">
      <h1 className="text-center font-bold text-2xl md:text-4xl xl:text-6xl text-white">
        Categories
      </h1>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 md:my-8">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </section>
  )
}
