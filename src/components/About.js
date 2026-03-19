'use client'
import styles from './About.module.css'
import WordReveal from './WordReveal'


const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Responsive Design', 'Social Media Marketing']
const tools  = ['Figma', 'Illustrator', 'Photoshop', 'GitHub', 'Git', 'VS Code']

export default function About({ isActive }) {
  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.grid}>
          <div>
            <div className={styles.label}>
              <WordReveal text="About" isActive={isActive} delayStart={0.2} />
            </div>
            <h2 className={styles.heading}>
              <WordReveal text="Design that speaks " isActive={isActive} delayStart={0.3} />
              <em><WordReveal text="clearly" isActive={isActive} delayStart={0.6} /></em>
            </h2>
          </div>
          <div>
            <p className={styles.p}>
              I&apos;m <strong>Kareem Rezk</strong>, a <strong>Front-End Developer</strong>, <strong>UI/UX Designer</strong>, and <strong>Social Media Specialist</strong> based in Egypt. I specialize in building modern, responsive websites and creating clean, user-focused digital experiences.
            </p>
            <p className={styles.p}>
              My work combines development, design, and creative thinking to turn ideas into functional and visually engaging products.
            </p>
            <div className={styles.skillsWrap}>
              <div className={styles.group}>
                <div className={styles.groupLabel}>
                  <WordReveal text="Skills" isActive={isActive} delayStart={0.4} />
                </div>
                <div className={styles.tags}>
                  {skills.map(s => <span key={s} className={styles.tag}>{s}</span>)}
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.group}>
                <div className={styles.groupLabel}>
                  <WordReveal text="Tools" isActive={isActive} delayStart={0.5} />
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
