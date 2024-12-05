import BlurHeroBackground from '@/components/ui/heros/BlurHeroBackground'
import { getEpisodeByNumberSeasonAndShowSlug } from '@/utils/episode'
import MoreEpisodesWrapper from './MoreEpisodesWrapper'
export default async function SingleEpisodePage({
  params: { showSlug, seasonSlug, episodeSlug },
}: {
  params: { showSlug: string; seasonSlug: string; episodeSlug: string }
}) {
  const [, seasonNumString] = seasonSlug.split('-')
  const seasonNumber = Number(seasonNumString)
  const [, episodeNumString] = episodeSlug.split('-')
  const episodeNumber = Number(episodeNumString)
  const episodeData = await getEpisodeByNumberSeasonAndShowSlug({
    showSlug,
    seasonNumber,
    episodeNumber,
  })

  if (!episodeData) return null

  return (
    <div>
      <BlurHeroBackground thumbnail={episodeData.thumbnailUrl} />
      <section className="pt-[120px] xl:pt-[200px] relative z-10 ">
        <h1 className="px-layout-x-large font-bold text-2xl md:text-3xl xl:text-4xl text-white">
          {episodeData.season.show.title} Season {seasonNumber}
        </h1>
        <div className="pt-4 mb-4 px-layout-x-large border-b-[1px] border-almost-white/30">
          <p className="border-b-2 border-nine px-2 w-fit text-lg md:text-xl font-bold py-2 ">
            Watch
          </p>
        </div>

        {/* This will be the episode component... */}
        <div className="max-w-[1100px] mx-auto pt-4">
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            className="w-full aspect-video"
          ></iframe>
          <h2 className="pt-8 pb-2 font-semibold text-lg">
            Episode {episodeNumber}
          </h2>
          <p className="max-w-[700px] text-light-grey">
            {episodeData.description}
          </p>
          <div className="flex gap-2 py-2">
            <div className="">
              {episodeData.season.show.categories.map(category => (
                <span
                  key={category.category.title}
                  className="border-r-[1px] border-light-grey px-2 first-of-type:pl-0 last-of-type:border-0 text-sm text-light-grey font-bold"
                >
                  {category.category.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <MoreEpisodesWrapper showSlug={showSlug} seasonNumber={seasonNumber} />
        {/* Everything above this line data fetched on first */}
      </section>
    </div>
  )
}
