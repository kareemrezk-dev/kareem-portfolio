'use client'

import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import styles from '../app/work/[slug]/project.module.css'

export default function ProjectNav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={styles.nav}>
      <Link href="/?slide=1" className={styles.backBtn}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Work
      </Link>
      
      <button className={styles.themeBtn} onClick={toggleTheme}>
        <div className={styles.track}>
          <div className={`${styles.thumb} ${theme === 'light' ? styles.thumbOn : ''}`} />
        </div>
        <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
      </button>
    </nav>
  )
}
