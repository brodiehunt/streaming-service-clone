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
    <article className="min-w-[200px] md:min-w-[300px]">
      <Link href={`/${show.slug}`} title={show.title}>
        <Image
          className="w-full rounded-lg"
          src={show.thumbnail}
          alt={`${show.title} thumbnail`}
          width={480}
          height={270}
        />
        <h3 className="text-xl pt-1 font-bold">{show.title}</h3>
        <p className="text-almost-white/80 text-sm">
          {show.totalEpisodes} episodes
        </p>
      </Link>
    </article>
  )
}

export default ShowWithSeasonCard
