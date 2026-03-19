'use client'
import { useRef, useEffect } from 'react'
import styles from './Work.module.css'
import WordReveal from './WordReveal'
import WorkGrid from './WorkGrid'

export default function Work({ isActive, projects = [] }) {
  const contentRef = useRef(null)

  // Pass this ref to WorkGrid so IntersectionObserver uses it as the
  // scroll root — cards reveal as the user scrolls inside the slide.
  const scrollRootRef = contentRef

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isActive || !contentRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      const isScrollable = scrollHeight > clientHeight
      if (!isScrollable) return
      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
      const isAtTop = scrollTop <= 0
      if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
        e.stopPropagation()
      }
    }
    const contentEl = contentRef.current
    if (contentEl) {
      contentEl.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (contentEl) contentEl.removeEventListener('wheel', handleWheel)
    }
  }, [isActive])

  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`}>
      <div className={styles.bg} />

      {/* Vertical Marquee */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeText}>
          {Array(40).fill('MY WORK — ').join('')}
        </div>
      </div>

      <div className={styles.content} ref={contentRef}>
        <div className={styles.label}>
          <WordReveal text="Selected Work" isActive={isActive} delayStart={0.2} />
        </div>

        {/* WorkGrid — the shared component with all features */}
        <WorkGrid projects={projects} scrollRoot={scrollRootRef} compact={true} />
      </div>
    </div>
  )
}
