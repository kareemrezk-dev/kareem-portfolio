'use client'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { dictionaries } from '../lib/dictionaries'
import styles from './Navbar.module.css'

export default function Navbar({ goTo, current }) {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLanguage } = useLanguage()
  const dict = dictionaries[lang]

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
                {dict.portfolio.navHome}
              </a>
            </li>
          )}
          {[
            { label: dict.portfolio.navWork, i: 1 },
            { label: dict.portfolio.navAbout, i: 2 },
            { label: dict.portfolio.navContact, i: 3 }
          ].map(({ label, i }) => (
            <li key={i}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); goTo(i) }}
                className={current === i ? styles.active : ''}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/pricing"
              className={current === -1 ? styles.active : ''}
            >
              {dict.portfolio.navPricing || 'Pricing'}
            </a>
          </li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className={styles.themeBtn} onClick={toggleLanguage} style={{ padding: '6px 12px', background: 'var(--gold)', color: '#000', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px' }}>
            {dict.portfolio.langToggle}
          </button>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            <div className={styles.track}>
              <div className={`${styles.thumb} ${theme === 'light' ? styles.thumbOn : ''}`} />
            </div>
            <span>{theme === 'light' ? dict.portfolio.themeDark : dict.portfolio.themeLight}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
