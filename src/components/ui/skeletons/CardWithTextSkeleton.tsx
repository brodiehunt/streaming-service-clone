import SkeletonLoading from './SkeletonFiller'

export default function CardWithTextSkeleton({ isFlex }: { isFlex: boolean }) {
  return (
    <article
      className={
        isFlex ? 'min-w-[200px] md:min-w-[250px] 2xl:min-w-[300px]' : ''
      }
    >
      <div className="w-full rounded-lg overflow-hidden aspect-[16/9]">
        <SkeletonLoading className="w-full h-full" />
      </div>
      <h3 className="pt-1 h-7 w-20">
        <SkeletonLoading className="w-full h-full" />
      </h3>
    </article>
  )
}
