'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

/* ─── helpers ───────────────────────────────────────────── */
function getCategoryClass(tag) {
  const t = (tag || '').toLowerCase()
  if (t.includes('branding')) return styles.catBranding
  if (t.includes('web')) return styles.catWebDesign
  if (t.includes('marketing') || t.includes('digital')) return styles.catMarketing
  return styles.catBranding
}

function pad(n) {
  return String(n).padStart(2, '0')
}

/* ─── scroll-reveal hook (IntersectionObserver) ─────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.revealed)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── sub-components ─────────────────────────────────────── */

function RevealCard({ children, delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={styles.revealCard} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function CursorOverlay() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  const handleMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <>
      {/* This transparent overlay just tracks mouse position */}
      <div
        className={styles.cursorTracker}
        onMouseMove={handleMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      />
      <div
        className={`${styles.cursorDot} ${visible ? styles.cursorDotVisible : ''}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        View →
      </div>
    </>
  )
}

function FeaturedCard({ project }) {
  return (
    <RevealCard delay={0}>
      <Link href={`/work/${project.slug}`} className={`${styles.featuredCard} ${styles.cursorArea}`}>
        <CursorOverlay />
        <div className={styles.featuredImageContainer}>
          {project.cover_image ? (
            <img src={project.cover_image} alt={project.title} className={styles.featuredImage} />
          ) : (
            <div className={styles.featuredImage} style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
          )}
        </div>
        <div className={styles.featuredContent}>
          <div className={styles.featuredBadge}>
            <span className={styles.featuredDot} />
            Featured Project
          </div>
          <div className={styles.projectNumber}>{pad(1)}</div>
          <h3 className={styles.featuredTitle}>{project.title}</h3>
          <p className={styles.featuredDesc}>{project.description || 'No description provided for this project.'}</p>
          <div className={styles.tagsWrap}>
            {project.tags && project.tags.map((tag, idx) => (
              <span key={idx} className={styles.skillTag}>{tag}</span>
            ))}
          </div>
          <div className={styles.readMore}>
            View Case Study <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </RevealCard>
  )
}

function ProjectCard({ project, index }) {
  const mainTag = project.tags && project.tags.length > 0 ? project.tags[0] : 'Project'
  return (
    <RevealCard delay={index * 80}>
      <Link href={`/work/${project.slug}`} className={`${styles.card} ${styles.cursorArea}`}>
        <CursorOverlay />
        <div className={styles.imageContainer}>
          {project.cover_image ? (
            <img src={project.cover_image} alt={project.title} className={styles.image} />
          ) : (
            <div className={styles.image} style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
          )}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardMeta}>
            <span className={`${styles.category} ${getCategoryClass(mainTag)}`}>{mainTag}</span>
            <span className={styles.projectNum}>{pad(index + 2)}</span>
          </div>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description || 'No description provided for this project.'}</p>
          <div className={styles.readMore}>
            Read Insight <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </RevealCard>
  )
}

/* ─── main export ────────────────────────────────────────── */

export default function WorkGrid({ projects = [] }) {
  const tagSet = new Set()
  projects.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(t => tagSet.add(t.trim()))
    }
  })
  const CATEGORIES = ['All', ...Array.from(tagSet).sort()]

  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  /* derived list */
  const filtered = projects
    .filter((p) => {
      const matchCat =
        activeFilter === 'All' ||
        (p.tags || []).some((t) =>
          t.toLowerCase() === activeFilter.toLowerCase()
        )
      const matchSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => a.order_index - b.order_index)

  /* counts per category */
  const counts = CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = projects.filter((p) =>
      (p.tags || []).some((t) => t.toLowerCase() === cat.toLowerCase())
    ).length
    return acc
  }, {})

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* ── Stats Bar ──────────────────────────── */}
      <div className={styles.statsBar}>
        <span className={styles.statItem}>
          <strong>{projects.length}</strong> Projects
        </span>
        {Object.entries(counts).map(([cat, count]) => (
          <span key={cat} className={styles.statItem}>
            <strong>{count}</strong> {cat}
          </span>
        ))}
      </div>

      {/* ── Filter Strip ───────────────────────── */}
      <div className={styles.filterStrip}>
        <div className={styles.filterPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`${styles.filterPill} ${activeFilter === cat ? styles.filterPillActive : ''}`}
            >
              {cat}
              {cat !== 'All' && counts[cat] != null && (
                <span className={styles.pillCount}>{counts[cat]}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.filterRight}>
          <div className={styles.searchWrap}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>


        </div>
      </div>

      {/* ── Grid ───────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>No projects match your search.</div>
      ) : (
        <div className={styles.gridContainer}>
          {/* Featured */}
          {featured && <FeaturedCard project={featured} />}

          {/* Masonry Grid */}
          {rest.length > 0 && (
            <div className={styles.masonryGrid}>
              {rest.map((project, i) => (
                <ProjectCard key={project.id || i} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
