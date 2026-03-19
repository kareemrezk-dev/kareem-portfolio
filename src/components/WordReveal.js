'use client'
import styles from './WordReveal.module.css'

export default function WordReveal({ text, isActive, delayStart = 0, className = '' }) {
  // We'll split the text by spaces, but keep the spaces intact in the output.
  const words = text.split(/(\s+)/)

  return (
    <span className={`${styles.wrap} ${className}`}>
      {words.map((word, index) => {
        // If it's just whitespace, render it normally to preserve spacing
        if (!word.trim()) {
          return <span key={index}>{word}</span>
        }

        // Only count actual words for the delay index to keep stagger consistent
        const wordIndex = words.slice(0, index).filter(w => w.trim()).length
        const delay = delayStart + (wordIndex * 0.08) // 80ms delay per word

        return (
          <span key={index} className={styles.wordWrap}>
            <span
              className={`${styles.word} ${isActive ? styles.active : ''}`}
              style={{ transitionDelay: isActive ? `${delay}s` : '0s' }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          </span>
        )
      })}
    </span>
  )
}
