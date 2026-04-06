'use client'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { dictionaries } from '../lib/dictionaries'
import styles from './Hero.module.css'
import CairoTime from './CairoTime'

export default function Hero({ isActive, onNext }) {
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const dict = dictionaries[lang]
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
        <span className={styles.scrollText}>{dict.portfolio.scroll}</span>
        <div className={styles.scrollArrowWrapper}>
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.scrollArrow}>
            <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke="var(--gold, #C8A86A)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          {dict.portfolio.location}
          <span className="availableBadge small">
            <span className="pulseDot small"></span>
            {dict.portfolio.freelance}
          </span>
        </div>
        <div className={styles.name}>
          Kareem<em>Rezk</em>
        </div>

        <div className={styles.subheadline}>
          {dict.portfolio.heroHeadline}
        </div>

        <div className={styles.bottom}>
          <div className={styles.rolesAndBadge}>
            <CairoTime />
            <div className={styles.roles}>
              <div className={styles.role}><span className={styles.dot} />{dict.portfolio.role1}</div>
              <div className={styles.role}><span className={styles.dot} />{dict.portfolio.role2}</div>
              <div className={styles.role}><span className={styles.dot} />{dict.portfolio.role3}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
