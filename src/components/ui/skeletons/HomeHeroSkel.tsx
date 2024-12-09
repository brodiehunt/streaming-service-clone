import SkeletonLoading from './SkeletonFiller'
export default function HomeHeroSkeleton() {
  return (
    <div className="h-[100svh] md:h-[auto] relative">
      {/* Hero Image div */}
      <div className="w-full h-[60%] relative md:h-[90vh]"></div>
      {/* Hero info component div */}
      <div className="absolute z-50 bottom-[2rem] left-0 w-full px-layout-x-large md:bottom-[50%] md:translate-y-[50%]">
        <div className="flex flex-col items-center md:items-start md:max-w-[450px]">
          <h2 className="font-bold w-full text-4xl mb-4 text-center md:text-left md:max-w-[400px] md:text-6xl">
            <SkeletonLoading className="w-full h-10 md:h-[60px]" />
            <SkeletonLoading className="w-[60%] h-10 hidden md:block md:h-[60px] mt-2" />
          </h2>

          <div className="mb-2 font-semibold flex flex-wrap justify-center md:justify-start gap-2 items-center md:text-xl md:mb-4">
            <SkeletonLoading className="w-16 h-6 md:h-8 md:w-24" />
            <SkeletonLoading className="w-16 h-6 md:h-8 md:w-24" />
            <SkeletonLoading className="w-16 h-6 md:h-8 md:w-24" />
            <SkeletonLoading className="w-10 h-6 md:h-8 md:w-16" />
          </div>
          <div className="text-center text-sm mb-4 md:text-left md:text-base md:mb-6 line-clamp-5 overflow-hidden w-full">
            <SkeletonLoading className="w-full h-4" />
            <SkeletonLoading className="w-full h-4 mt-1" />
            <SkeletonLoading className="w-full h-4 mt-1" />
            <SkeletonLoading className="w-[40%] h-4 mt-1 mx-auto md:mx-0" />
          </div>
          <div className="flex justify-center flex-wrap gap-2 md:gap-3">
            <SkeletonLoading className="w-[140px] h-12 " />
            <SkeletonLoading className="w-[130px] h-12 " />
            <SkeletonLoading className="w-[100px] h-12 " />
          </div>
        </div>
      </div>
    </div>
  )
}
