'use client'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import styles from './Hero.module.css'
import CairoTime from './CairoTime'

export default function Hero({ isActive, onNext }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  
  const [ripples, setRipples] = useState([])
  const [allowRipples, setAllowRipples] = useState(false)
  const previousTheme = useRef(theme)

  // Prevent transition during initial mount/hydration
  useEffect(() => {
    const t = setTimeout(() => setAllowRipples(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!allowRipples) return

    if (previousTheme.current !== theme) {
      previousTheme.current = theme
      
      const id = Date.now()
      setRipples([{ id }])
      
      const t = setTimeout(() => setRipples([]), 6000)
      return () => clearTimeout(t)
    }
  }, [theme, allowRipples])

  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''} ${isLight ? styles.slideLight : ''}`}>
      
      {/* Simple & Chic Animated Ambient Glow (Scattered) */}
      <div className={styles.ambientBg}>
        <div className={styles.breathingGlow1} />
        <div className={styles.breathingGlow2} />
        <div className={styles.grainOverlay} />
      </div>

      {/* Ripple Animation Container (Theme toggle effect) */}
      {ripples.map(r => (
        <div key={r.id} className={styles.rippleContainer}>
          <div className={styles.rippleRing} style={{ animationDelay: '0s' }} />
          <div className={styles.rippleRing} style={{ animationDelay: '0.8s' }} />
        </div>
      ))}

      <div className={`${styles.overlay} ${isLight ? styles.overlayLight : ''}`} />
      
      <div className={styles.scrollHint}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          Cairo, Egypt
          <span className="availableBadge small">
            <span className="pulseDot small"></span>
            Available for freelance
          </span>
        </div>
        <div className={styles.name}>
          Kareem<em>Rezk</em>
        </div>

        <div className={styles.bottom}>
          <div className={styles.rolesAndBadge}>
            <CairoTime />
            <div className={styles.roles}>
              <div className={styles.role}><span className={styles.dot} />UI / UX Designer</div>
              <div className={styles.role}><span className={styles.dot} />Front-End Developer</div>
              <div className={styles.role}><span className={styles.dot} />Social Media Marketing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
