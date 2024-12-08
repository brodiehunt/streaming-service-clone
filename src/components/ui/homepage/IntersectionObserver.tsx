'use client'

import { useRef, useEffect } from 'react'
import { theVisibleCategory } from '@/lib/atom'
import { useSetAtom } from 'jotai'

const ObserverComponent: React.FC<{ slug: string }> = ({ slug }) => {
  const setVisibleCategory = useSetAtom(theVisibleCategory)
  const containerRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const intersectionOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 1.0,
    }

    const intersectionCallback: IntersectionObserverCallback = entries => {
      if (entries[0].intersectionRatio <= 0) return
      setVisibleCategory(slug)
    }
    if (observer.current) observer.current.disconnect()

    observer.current = new window.IntersectionObserver(
      intersectionCallback,
      intersectionOptions,
    )

    // Observe ref
    if (containerRef.current && observer.current) {
      observer.current.observe(containerRef.current)
    }

    return () => observer.current?.disconnect()
  }, [slug, setVisibleCategory])
  return <div ref={containerRef}></div>
}

export default ObserverComponent
