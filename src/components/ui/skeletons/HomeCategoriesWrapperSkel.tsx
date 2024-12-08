import CategorySectionSkeleton from './CategorySectionSkeleton'
import SkeletonLoading from './SkeletonFiller'

export default function HomeCategoriesWrapperSkel() {
  const arr = Array(10).fill(0)

  return (
    <div className="pb-4">
      <section className="py-2 sticky z-10 top-[80px] xl:top-[112px] topscroll-smooth ">
        <div className="relative">
          <nav className="flex flex-nowrap gap-3 overflow-x-scroll scroll-smooth no-scrollbar">
            {arr.map((_, index) => {
              return (
                <div
                  key={index}
                  className="block flex-shrink-0 w-24 h-10 sm:w-32 sm:h-12"
                >
                  <SkeletonLoading className="w-full h-full rounded-full overflow-hidden" />
                </div>
              )
            })}
          </nav>
        </div>
      </section>
      <CategorySectionSkeleton />
      <CategorySectionSkeleton />
    </div>
  )
}
