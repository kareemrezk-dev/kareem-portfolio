'use client'
import styles from './Hud.module.css'

const LABELS = ['Hero', 'Work', 'About', 'Contact']

export default function Hud({ current, total, goTo }) {
  return (
    <div className={styles.hud}>
      <button
        className={styles.arrow}
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`${styles.dot} ${i === current ? styles.active : ''}`} />
        ))}
      </div>
      <button
        className={styles.arrow}
        onClick={() => goTo(current + 1)}
        disabled={current === total - 1}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
      <span className={styles.label}>{LABELS[current]}</span>
    </div>
  )
}
