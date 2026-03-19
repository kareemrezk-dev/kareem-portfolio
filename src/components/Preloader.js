'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import styles from './Preloader.module.css'

export default function Preloader() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  const [loading, setLoading] = useState(!isAdmin)
  const [progress, setProgress] = useState(0)

  // Skip rendering completely for admin routes (both server and client)
  if (isAdmin) {
    return null
  }

  useEffect(() => {

    // Check if we've already shown the preloader in this session
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setLoading(false)
      return
    }

    // Simulate loading progress
    let start = 0
    const duration = 2000 // 2 seconds
    const interval = 20 // update every 20ms
    const step = 100 / (duration / interval)

    const timer = setInterval(() => {
      start += step
      if (start >= 100) {
        setProgress(100)
        clearInterval(timer)
        setTimeout(() => {
          setLoading(false)
          sessionStorage.setItem('hasVisited', 'true')
        }, 500) // slight delay to show 100% before fading out
      } else {
        setProgress(Math.floor(start))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!loading) return null

  return (
    <div className={`${styles.preloader} ${progress === 100 ? styles.fadeOut : ''}`}>
      <div className={styles.logoWrap}>
        <Image src="/kr-logo.svg" alt="KR" width={80} height={80} className={styles.logo} />
      </div>
      
      <div className={styles.bottomText}>
        KAREEM REZK &mdash; PORTFOLIO
      </div>
    </div>
  )
}
