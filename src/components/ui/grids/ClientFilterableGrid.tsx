'use client'

import { useState } from 'react'
import EpisodeCard from '../cards/EpisodeCard'
import { FaAngleDown } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'

const FilterableCardGrid: React.FC<{
  episodes: {
    id: number
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
    episodeNumber: number
    thumbnailUrl: string
    duration: number
    videoUrl: string | null
    seasonId: number
  }[]
  seasonNumber: number
  showSlug: string
}> = ({ episodes, showSlug, seasonNumber }) => {
  const [isAsc, setIsAsc] = useState(true)
  const [episodesArr, setEpisodesArr] = useState(episodes)

  const handleToggleOrder = (order: string) => {
    if (order === 'asc') {
      setEpisodesArr(currEpisodes => {
        const arrCopy = [...currEpisodes]
        // If it were by date (they are all created at the same time though)
        // return arrCopy.sort(
        //   (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt),
        // )
        return arrCopy.sort((a, b) => a.episodeNumber - b.episodeNumber)
      })
    } else {
      setEpisodesArr(currEpisodes => {
        const arrCopy = [...currEpisodes]
        // return arrCopy.sort(
        //   (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
        // )
        return arrCopy.sort((a, b) => b.episodeNumber - a.episodeNumber)
      })
    }
  }

  console.log(`isAsc: ${isAsc}, episodes: ${episodesArr}`)

  return (
    <>
      <div className="pt-4 px-layout-x-large flex justify-between align-bottom relative z-10">
        <h2 className="text-xl">Episodes</h2>

        <FilterDropdown
          handleToggleOrder={handleToggleOrder}
          setIsAsc={setIsAsc}
          isAsc={isAsc}
        />
      </div>
      <section className="grid gap-3 px-layout-x-large sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 md:py-8">
        {episodesArr.map(episode => {
          return (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              season={seasonNumber}
              showSlug={showSlug}
            />
          )
        })}
      </section>
    </>
  )
}

const FilterDropdown: React.FC<{
  setIsAsc: React.Dispatch<React.SetStateAction<boolean>>
  isAsc: boolean
  handleToggleOrder: (order: string) => void
}> = ({ setIsAsc, isAsc, handleToggleOrder }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(open => !open)}
        className={`
      font-semibold text-sm flex gap-2 items-center transition-colors transition-duration-200 text-almostWhite hover:text-primaryLight py-0`}
      >
        {isAsc ? 'Oldest' : 'Latest'}
        <FaAngleDown
          className={`transition-duration-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute top-[100%] right-0 rounded bg-dark-grey overflow-hidden transition-duration-400 transition-opacity ${isOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
      >
        <DropdownItem
          setIsAsc={setIsAsc}
          setIsOpen={setIsOpen}
          value="asc"
          handleToggleOrder={handleToggleOrder}
        >
          <TiTick className={isAsc ? 'opacity-100' : 'opacity-0'} /> Oldest
        </DropdownItem>
        <DropdownItem
          setIsAsc={setIsAsc}
          setIsOpen={setIsOpen}
          value="desc"
          handleToggleOrder={handleToggleOrder}
        >
          <TiTick className={isAsc ? 'opacity-0' : 'opacity-100'} /> Latest
        </DropdownItem>
      </div>
    </div>
  )
}

const DropdownItem: React.FC<{
  children: React.ReactNode
  setIsAsc: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  handleToggleOrder: (order: string) => void
}> = ({ children, setIsAsc, setIsOpen, value, handleToggleOrder }) => {
  return (
    <button
      className="text-almostWhite font-semibold flex justify-start gap-2 items-center transition-colors transition-duration-200  hover:text-almostBlack py-0 h-12 px-6 w-full hover:bg-primaryLight min-w-[150px]"
      onClick={() => {
        setIsAsc(() => {
          if (value === 'asc') return true
          return false
        })
        handleToggleOrder(value)
        setIsOpen(state => !state)
      }}
    >
      {children}
    </button>
  )
}

export default FilterableCardGrid
