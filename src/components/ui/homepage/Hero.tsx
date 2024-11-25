import prisma from '@/lib/prisma'
import Image from 'next/image'
import LinkButton from '../shared/LinkButton'
import { Show } from '@prisma/client'
import { FaPlay } from 'react-icons/fa6'
import { TbStack2Filled } from 'react-icons/tb'
import HeroSeasonDropdown from '../shared/SeasonDropdown'

type ShowResponse = {
  success: boolean
  data: ShowWithCategories | null
}

type ShowWithCategories = Show & {
  categories: {
    category: {
      title: string
    }
  }[]
}

const getGameOfThrones = async (): Promise<ShowResponse> => {
  try {
    const gameOfThronesShow = await prisma.show.findFirst({
      where: { title: 'Game of Thrones' },
      include: {
        categories: {
          include: {
            category: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })

    if (!gameOfThronesShow) return { success: false, data: null }

    return { success: true, data: gameOfThronesShow }
  } catch {
    return { success: true, data: null }
  }
}

export default async function ShowHero() {
  const { data } = await getGameOfThrones()

  if (!data) return null

  console.log(data)
  return (
    <section className="h-[100svh]">
      <HeroImageComponent thumbnail={data.thumbnail} title={data.title} />
      <HeroInfoComponent show={data} />
    </section>
  )
}

const HeroImageComponent: React.FC<{ thumbnail: string; title: string }> = ({
  thumbnail,
  title,
}) => {
  return (
    <div className="w-full h-[60%] relative md:h-[90vh]">
      <Image
        src={thumbnail || '/'}
        alt={`${title} show cover`}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black-bezier-to-top bg-bottom bg-no-repeat md:hidden"></div>
      <div className="absolute top-0 left-0 w-full h-full md:hidden"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black-bezier-merged bg-no-repeat hidden md:block"></div>
    </div>
  )
}

const HeroInfoComponent: React.FC<{ show: ShowWithCategories }> = async ({
  show,
}) => {
  return (
    <div className="absolute bottom-[2rem] left-0 w-full px-layout-x-large md:bottom-[50%] md:translate-y-[50%]">
      <div className="flex flex-col items-start md:max-w-[450px]">
        <h2 className="font-bold text-4xl mb-4 text-center md:text-left md:max-w-[400px] md:text-6xl">
          {show.title}
        </h2>
        <div className="mb-2 font-semibold flex gap-2 items-center md:text-xl md:mb-4">
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
        <p className="text-center text-sm mb-4 md:text-left md:text-base md:mb-6 line-clamp-5 overflow-hidden">
          {show.description}
        </p>
        <div className="flex justify-center flex-wrap gap-2 md:gap-3">
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
          <LinkButton
            url={show.slug}
            title={`Go to the ${show.title} page`}
            type="secondary"
          >
            <TbStack2Filled className="w-4" />
            More
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
