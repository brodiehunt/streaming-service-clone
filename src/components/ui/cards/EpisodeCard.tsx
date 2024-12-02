import { Episode } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'

const EpisodeCard: React.FC<{
  episode: Episode
  season: number
  showSlug: string
  isFlex: boolean
}> = ({ episode, showSlug, season, isFlex }) => {
  console.log('Is it flex?:', isFlex)
  return (
    <article
      className={`${isFlex ? 'min-w-[200px] md:min-w-[250px] 2xl:min-w-[300px]' : ''} h-auto group transition-opacity duration-200`}
    >
      <Link
        href={`/${showSlug}/season-${season}/episode-${episode.episodeNumber}`}
        title={`Watch Episode ${episode.episodeNumber}`}
      >
        <div className="relative">
          <Image
            className="w-full rounded-lg"
            src={episode.thumbnailUrl}
            alt={`${episode.title} thumbnail`}
            width={480}
            height={270}
          />
          <div className="h-[30%] aspect-square bg-dark-turquoise rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-dark-turquoise-hover transition-[colors,opacity] duration-200">
            <FaPlay className="text-white w-[60%]" />
          </div>
        </div>
        <h3 className="text-almost-white/80 text-sm pt-1">
          Ep {episode.episodeNumber} {episode.title}
        </h3>
      </Link>
    </article>
  )
}

export default EpisodeCard
