'use client'

import { useState } from 'react'
import Button from './Button'
import { FaAngleDown } from 'react-icons/fa'
import Link from 'next/link'

const HeroSeasonDropdown: React.FC<{
  showSlug: string
  seasons: number
  currentSeason: number
}> = ({ showSlug, seasons, currentSeason = 1 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const multipleSeasons = seasons > 1
  return (
    <div className="relative">
      <Button
        label="Open season selection menu"
        type="secondary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Season {currentSeason}
        {multipleSeasons && (
          <FaAngleDown
            className={`w-4 transition-duration-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </Button>
      {isOpen && multipleSeasons && (
        <div className="absolute top-[120%] right-0 w-[150px] max-h-[200px] overflow-scroll rounded">
          {Array(seasons)
            .fill(null)
            .map((_, index) => (
              <Link
                key={`/${showSlug}/season-${index + 1}`}
                href={`/${showSlug}/season-${index + 1}`}
                className="px-4 py-2 font-semibold text-sm w-full block text-almost-white bg-darkGreyTransparent hover:bg-nine transition-duration-200 transition-colors"
              >
                Season {index + 1}
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

export default HeroSeasonDropdown
