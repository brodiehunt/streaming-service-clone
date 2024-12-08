'use client'
import { CategoryButton } from '@/utils/category'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { theVisibleCategory } from '@/lib/atom'
import { useAtom } from 'jotai'

const CategoryButtons: React.FC<{ categories: CategoryButton[] }> = ({
  categories,
}) => {
  const [visibleCategory] = useAtom(theVisibleCategory)
  const navContainerRef = useRef<HTMLElement | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [, forceRender] = useState({})
  // Trigger one re-render so navContainerRef.current is not null
  useEffect(() => {
    forceRender({})
  }, [])
  const handleScroll = () => {
    setScrollPosition(navContainerRef.current?.scrollLeft || 0)
  }

  return (
    <div className="relative">
      <nav
        onScroll={handleScroll}
        ref={navContainerRef}
        className={`flex flex-nowrap gap-3 overflow-x-scroll scroll-smooth no-scrollbar ${scrollPosition > 0 ? 'm:pl-10 ' : 'ssm:pl-0'}`}
      >
        {categories.map(category => {
          return (
            <CategoryLinkButton
              isActive={visibleCategory === category.slug}
              key={category.id}
              category={category}
            />
          )
        })}
      </nav>
      {scrollPosition > 0 && (
        <ScrollCategoriesButton isLeft={true} containerRef={navContainerRef} />
      )}
      {navContainerRef.current &&
        scrollPosition <
          navContainerRef.current.scrollWidth -
            navContainerRef.current.clientWidth && (
          <ScrollCategoriesButton
            isLeft={false}
            containerRef={navContainerRef}
          />
        )}
    </div>
  )
}

const CategoryLinkButton: React.FC<{
  category: CategoryButton
  isActive: boolean
}> = ({ category, isActive }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (isActive && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const isOutOfView =
        rect.left < 0 ||
        rect.right > (window.innerWidth || document.documentElement.clientWidth)

      if (isOutOfView) {
        buttonRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [isActive])
  return (
    <Link
      ref={buttonRef}
      className={`block py-2 px-5 rounded-full border-2 flex-shrink-0 text-sm sm:px-6 sm:py-[10px] sm:text-base xl:px-7 xl:py-3 hover:border-almost-white transition-colors transition-duration-200 ${isActive ? 'bg-dark-turquoise border-dark-turquoise text-almost-black hover:border-nine hover:bg-nine' : 'border-dark-grey bg-category-button-bg'}`}
      href={`#${category.slug}`}
      title={`Scroll to ${category.title} shows`}
    >
      {category.title}
    </Link>
  )
}

const ScrollCategoriesButton: React.FC<{
  isLeft: boolean
  containerRef: React.RefObject<HTMLElement>
}> = ({ isLeft, containerRef }) => {
  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollAmount = 300
    containerRef.current.scrollLeft += isLeft ? -scrollAmount : scrollAmount
  }

  return (
    <div
      className={`hidden py-4 sm:flex absolute top-[50%] translate-y-[-50%] ${isLeft ? 'left-0 pr-8 bg-gradient-to-r from-background via-background to-transparent' : 'right-0 pl-8 bg-gradient-to-l from-background via-background to-transparent'}`}
    >
      <button
        onClick={handleScroll}
        className="sm:p-[10px] xl:p-4 rounded-full border-dark-grey border-2 aspect-square transition-colors transition-duration-200  hover:border-almost-white"
      >
        {isLeft ? <FaChevronLeft className="text-base" /> : <FaChevronRight />}
      </button>
    </div>
  )
}

export default CategoryButtons
