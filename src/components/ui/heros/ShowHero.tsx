import { Show } from '@prisma/client'
import { HeroImageComponent } from '../homepage/Hero'
import LinkButton from '../shared/LinkButton'
import { FaPlay } from 'react-icons/fa'
import HeroSeasonDropdown from '../shared/SeasonDropdown'

type ShowType = Show & {
  categories: {
    category: {
      title: string
    }
  }[]
}

const ShowHero: React.FC<{ show: ShowType }> = ({ show }) => {
  if (!show) return null
  return (
    <section className="h-[80svh] md:h-[auto] md:max-h-[70vh] relative z-30">
      <HeroImageComponent thumbnail={show.thumbnail} title={show.title} />
      <ShowInfoComponent show={show} />
    </section>
  )
}

const ShowInfoComponent: React.FC<{
  show: ShowType
}> = async ({ show }) => {
  return (
    <div className="absolute bottom-[2rem] left-0 w-full px-layout-x-large md:bottom-[50%] md:translate-y-[50%]">
      <div className="flex flex-col items-start md:max-w-[450px]">
        <h2 className="font-bold text-3xl mb-2 md:max-w-[400px] md:text-4xl">
          {show.title}
        </h2>
        <div className="mb-2 font-semibold flex flex-wrap justify-start gap-2 items-center md:text-xl md:mb-4">
          {show.categories.map((category, index) => {
            return (
              <span key={`${show.id}-${category.category.title}`}>
                <span className="">{category.category.title}</span>
                {index === show.categories.length - 1 ? null : <span> | </span>}
              </span>
            )
          })}

          <span className="p-1 rounded bg-dark-grey text-xs">
            {show.rating}
          </span>
        </div>
        <p className="text-sm mb-4 md:text-base md:mb-6 line-clamp-5 overflow-hidden">
          {show.description}
        </p>
        <div className="flex justify-start flex-wrap gap-2 md:gap-3">
          <LinkButton
            url={show.slug}
            title={`Watch ${show.title} now`}
            type="primary"
          >
            <FaPlay className="w-4" />
            Watch now
          </LinkButton>
          <HeroSeasonDropdown
            showSlug={show.slug}
            seasons={show.totalSeasons}
          />
        </div>
      </div>
    </div>
  )
}

export default ShowHero
