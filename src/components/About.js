'use client'
import { useRef, useEffect } from 'react'
import styles from './About.module.css'
import WordReveal from './WordReveal'
import Image from 'next/image'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { dictionaries } from '../lib/dictionaries'


const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Responsive Design', 'Social Media Marketing']
const tools  = ['Figma', 'Illustrator', 'Photoshop', 'GitHub', 'Git', 'VS Code']

export default function About({ isActive }) {
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const dict = dictionaries[lang]
  const isLight = theme === 'light'
  const contentRef = useRef(null)

  // Allow vertical scrolling inside this slide — only pass wheel events
  // to the global slider handler when content is at top/bottom boundary
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isActive || !contentRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      const isScrollable = scrollHeight > clientHeight
      if (!isScrollable) return
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
      const isAtTop = scrollTop <= 0
      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        e.stopPropagation()
      }
    }
    const el = contentRef.current
    if (el) el.addEventListener('wheel', handleWheel, { passive: false })
    return () => { if (el) el.removeEventListener('wheel', handleWheel) }
  }, [isActive])

  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`} ref={contentRef}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.grid}>

          <div className={styles.imageColumn}>
            <div className={`${styles.imageFrame} ${isLight ? styles.frameLight : ''}`}>
              <div className={`${styles.imgContainer} ${isLight ? styles.hidden : ''}`}>
                <Image src="/kareem.png" alt="Kareem Rezk" fill className={styles.img} sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
              <div className={`${styles.imgContainer} ${!isLight ? styles.hidden : ''}`}>
                <Image src="/kareem-light.png" alt="Kareem Rezk" fill className={styles.img} sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            </div>
          </div>

          <div className={styles.textColumn}>
            <div className={styles.label}>
              <WordReveal text={dict.portfolio.aboutTitle} isActive={isActive} delayStart={0.2} />
            </div>
            <h2 className={styles.heading}>
              <WordReveal text={dict.portfolio.aboutLine1} isActive={isActive} delayStart={0.3} />
              <em><WordReveal text={dict.portfolio.aboutLine2} isActive={isActive} delayStart={0.6} /></em>
            </h2>
            <div className={styles.spacer}></div>
            <p className={styles.p}>
              {dict.portfolio.aboutP1_1}<strong>Kareem Rezk</strong>{dict.portfolio.aboutP1_2}<strong>{dict.portfolio.role2}</strong>{dict.portfolio.aboutP1_3}<strong>{dict.portfolio.role1}</strong>{dict.portfolio.aboutP1_4}<strong>{dict.portfolio.role3}</strong>{dict.portfolio.aboutP1_5}
            </p>
            <p className={styles.p}>
              {dict.portfolio.aboutP2}
            </p>
            <div className={styles.skillsWrap}>
              <div className={styles.group}>
                <div className={styles.groupLabel}>
                  <WordReveal text={dict.portfolio.aboutSkills} isActive={isActive} delayStart={0.4} />
                </div>
                <div className={styles.tags}>
                  {skills.map(s => <span key={s} className={styles.tag}>{s}</span>)}
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.group}>
                <div className={styles.groupLabel}>
                  <WordReveal text={dict.portfolio.aboutTools} isActive={isActive} delayStart={0.5} />
                </div>
                <div className={styles.tags}>
                  {tools.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
