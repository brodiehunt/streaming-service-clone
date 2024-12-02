import BlurHeroBackground from '@/components/ui/heros/BlurHeroBackground'

export default async function SingleEpisodePage({
  params: { showSlug, seasonSlug, episodeSlug },
}: {
  params: { showSlug: string; seasonSlug: string; episodeSlug: string }
}) {
  console.log(showSlug, seasonSlug, episodeSlug)
  return (
    <div>
      <BlurHeroBackground thumbnail="/images/shows/13-reasons-why.webp" />
      <section className="pt-[120px] xl:pt-[200px] relative z-10 ">
        <h1 className="px-layout-x-large font-bold text-2xl md:text-3xl xl:text-4xl text-white">
          Show title Season 6
        </h1>
        <div className="pt-4 mb-4 px-layout-x-large border-b-[1px] border-almost-white/30">
          <p className="border-b-2 border-nine px-2 w-fit text-lg md:text-xl font-bold py-2 ">
            Watch
          </p>
        </div>

        {/* This will be video component */}
        <div className="max-w-[900px] mx-auto">
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            className="w-full aspect-video"
          ></iframe>
        </div>

        {/* <FilterableCardGrid
          episodes={showAndEpisodes.seasons[0].episodes}
          showSlug={showSlug}
          seasonNumber={seasonNumber}
        /> */}
      </section>
    </div>
  )
}
