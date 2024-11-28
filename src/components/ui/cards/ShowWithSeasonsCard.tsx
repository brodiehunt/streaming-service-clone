import Link from 'next/link'
import Image from 'next/image'

const ShowWithSeasonCard: React.FC<{
  show: {
    title: string
    slug: string
    thumbnail: string
    totalEpisodes: number
  }
}> = ({ show }) => {
  return (
    <article className="">
      <Link href={`/${show.slug}`} title={show.title}>
        <Image
          className="w-full rounded-lg"
          src={show.thumbnail}
          alt={`${show.title} thumbnail`}
          width={480}
          height={270}
        />
        <h2 className="text-xl pt-1 font-bold">{show.title}</h2>
        <p className="text-almost-white/80 text-sm">
          {show.totalEpisodes} episodes
        </p>
      </Link>
    </article>
  )
}

export default ShowWithSeasonCard
