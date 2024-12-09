import HomeHeroSkeleton from '@/components/ui/skeletons/HomeHeroSkel'
import HomeCategoriesWrapperSkel from '@/components/ui/skeletons/HomeCategoriesWrapperSkel'

export default function Loading() {
  return (
    <>
      <HomeHeroSkeleton />
      <section className="px-layout-x-large relative md:mt-[-100px]">
        <HomeCategoriesWrapperSkel />
      </section>
    </>
  )
}
