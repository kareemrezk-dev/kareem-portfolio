'use client'
import { useState, useEffect } from 'react'
import styles from './CairoTime.module.css'

export default function CairoTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const cairoTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Africa/Cairo',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      setTime(cairoTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.badgeWrapper}>
        <span className={styles.icon}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
            <path d="M12 2v20" />
            <path d="M3.5 16h17" />
            <path d="M3.5 8h17" />
          </svg>
        </span>
        <span className={styles.label}>Cairo Time</span>
      </div>
      <div className={styles.badge}>
        <span className={styles.time}>{time || '...'}</span>
        <span className={styles.zone}>CAI</span>
      </div>
    </div>
  )
}
