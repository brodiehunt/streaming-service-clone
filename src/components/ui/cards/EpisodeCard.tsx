import { Episode } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

const EpisodeCard: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <article>
      <Link
        href={`episode-${episode.episodeNumber}`}
        title={`Watch Episode ${episode.episodeNumber}`}
      >
        <Image
          className="w-full rounded-lg"
          src={episode.thumbnailUrl}
          alt={`${episode.title} thumbnail`}
          width={480}
          height={270}
        />
        <h3 className="text-almost-white/80 text-sm pt-1">
          Ep {episode.episodeNumber} {episode.title}
        </h3>
      </Link>
    </article>
  )
}

export default EpisodeCard
