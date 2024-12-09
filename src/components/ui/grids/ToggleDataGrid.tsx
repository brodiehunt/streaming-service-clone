'use client'

import { Episode } from '@prisma/client'
import GridCardWrapper from './GridCardWrapper'
import EpisodeCard from '../cards/EpisodeCard'

const ToggleDataGrid: React.FC<{ episodes: Episode[] | null }> = ({
  episodes,
}) => {
  return (
    <section className="px-layout-x-large pt-4">
      <div className="max-w-[1100px] mx-auto border-t-[1px] border-b-[1px] border-light-grey/30 flex gap-2">
        <button className="py-2 md:py-3 px-2 hover:text-almost-white/80 font-semibold transition-colors duration-200">
          Episodes
        </button>
        <button className="py-2 md:py-3 px-2 transition-colors duration-200 text-white font-semibold border-b-2 border-nine mb-[-1px]">
          Discover something new
        </button>
      </div>
      <div className="max-w-[1100px] mx-auto">
        <GridCardWrapper>
          {episodes &&
            episodes.map(episode => {
              return (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  showSlug="/"
                  season={1}
                  isFlex={false}
                />
              )
            })}
        </GridCardWrapper>
      </div>
    </section>
  )
}

export default ToggleDataGrid
