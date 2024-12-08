import GridCardWrapper from '../grids/GridCardWrapper'
import SkeletonLoading from './SkeletonFiller'
import CardWithTextSkeleton from './CardWithTextSkeleton'
export default function CategorySectionSkeleton() {
  const arr = Array(12).fill(0)

  return (
    <section className="relative min-h-[200px] z-0">
      <h2 className="py-3 xl:py-4">
        <SkeletonLoading className="w-[200px] h-7 md:h-8" />
      </h2>
      <GridCardWrapper>
        {arr.map((_, index) => {
          return <CardWithTextSkeleton key={index} isFlex={false} />
        })}
      </GridCardWrapper>
    </section>
  )
}
