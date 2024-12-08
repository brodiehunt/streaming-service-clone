'use client'
import { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const HorizontalCardSliderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const scrollElementRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [, forceRender] = useState({})
  useEffect(() => {
    forceRender({})
  }, [])

  const handleScroll = () => {
    setScrollPosition(scrollElementRef.current?.scrollLeft || 0)
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        onScroll={handleScroll}
        ref={scrollElementRef}
        className="flex pl-[9vw] pr-8 flex-nowrap gap-3 overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {children}
      </div>

      {scrollPosition > 0 && (
        <ScrollButton isLeft={true} scrollElementRef={scrollElementRef} />
      )}
      {scrollElementRef.current &&
        scrollPosition <
          scrollElementRef.current.scrollWidth -
            scrollElementRef.current.clientWidth && (
          <ScrollButton isLeft={false} scrollElementRef={scrollElementRef} />
        )}
    </div>
  )
}

const ScrollButton: React.FC<{
  isLeft: boolean
  scrollElementRef: React.RefObject<HTMLDivElement>
}> = ({ isLeft, scrollElementRef }) => {
  const handleScroll = () => {
    if (!scrollElementRef.current) return
    const scrollAmount = 300
    scrollElementRef.current.scrollLeft += isLeft ? -scrollAmount : scrollAmount
  }
  return (
    <button
      className={`hidden md:block absolute top-0 z-20 h-full  w-12 hover:bg-black/40 rounded ${isLeft ? 'left-0' : 'right-0'}`}
      onClick={handleScroll}
    >
      {isLeft ? (
        <FaChevronLeft className="w-full h-auto font-light" />
      ) : (
        <FaChevronRight className="w-full h-auto" />
      )}
    </button>
  )
}
export default HorizontalCardSliderWrapper
