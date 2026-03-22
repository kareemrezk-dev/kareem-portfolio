'use client'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar({ goTo, current }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`${styles.nav} ${current === 1 ? styles.solidNav : ''}`}>
      <a className={styles.logo} href="#" onClick={(e) => { e.preventDefault(); goTo(0) }}>
        <img src="/kr-logo.svg" alt="KR" className={styles.logoImg} />
      </a>
      <div className={styles.right}>
        <ul className={styles.links}>
          {current > 0 && (
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); goTo(0) }}
                className={current === 0 ? styles.active : ''}
              >
                Home
              </a>
            </li>
          )}
          {['Work','About','Contact'].map((label, i) => (
            <li key={label}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); goTo(i + 1) }}
                className={current === i + 1 ? styles.active : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className={styles.themeBtn} onClick={toggleTheme}>
          <div className={styles.track}>
            <div className={`${styles.thumb} ${theme === 'light' ? styles.thumbOn : ''}`} />
          </div>
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </nav>
  )
}
