import { Show } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { TbStack2Filled } from 'react-icons/tb'

const HomeShowCard: React.FC<{ show: Show }> = ({ show }) => {
  return (
    <article className="relative group focus-within:outline-none">
      <Link href={show.slug} title={`Watch ${show.title}`}>
        <div className="relative rounded overflow-hidden">
          <div className="bg-black-bezier-to-top-right bg-no-repeat bg-cover pointer-events-none z-20 h-full w-full absolute"></div>
          <Image
            src={show.thumbnail}
            alt={`${show.title} cover image`}
            width={320}
            height={180}
            className="w-full h-auto"
          />
          <h3 className="text-white absolute bottom-2 left-2 w-[70%] z-40 text-xl font-semibold">
            {show.title}
          </h3>
        </div>
        <p className="pt-2 font-medium text-almost-white ">
          {show.totalSeasons} {show.totalSeasons > 1 ? 'Seasons' : 'Season'}
        </p>
      </Link>
      <div className="hidden sm:block absolute w-[150%] max-w-[450px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-dark-grey rounded-lg p-8 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-500 group-hover:delay-700">
        <h3 className="text-2xl w-[80%] mb-12 font-semibold">{show.title}</h3>
        <p className="flex items-center gap-2">
          <span className="text-xs font-bold rounded  text-nine">
            {show.rating}
          </span>{' '}
          {show.totalSeasons} {show.totalSeasons > 1 ? 'Seasons' : 'Season'}
        </p>
        <p className="line-clamp-3 w-[80%]">{show.description}</p>
        <Link
          className="absolute bottom-8 right-8 w-10 h-10 bg-nine rounded-full text-white flex items-center justify-center text-xl"
          href={show.slug}
        >
          <TbStack2Filled />
        </Link>
      </div>
    </article>
  )
}

export default HomeShowCard
