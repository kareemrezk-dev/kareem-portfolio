'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './WorkGrid.module.css'

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

/* ─── scroll-reveal hook ────────────────────────────────── */
function useReveal(scrollRoot) {
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
      {
        threshold: 0.05,
        rootMargin: '50px',
        // Use the scrollable content div as root when inside the slider
        root: scrollRoot?.current ?? null,
      }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [scrollRoot])
  return ref
}

/* ─── sub-components ─────────────────────────────────────── */
function RevealCard({ children, delay = 0, scrollRoot }) {
  const ref = useReveal(scrollRoot)
  return (
    <div ref={ref} className={styles.revealCard} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}


function FeaturedCard({ project, scrollRoot, compact = false }) {
  return (
    <RevealCard delay={0} scrollRoot={scrollRoot}>
      <Link href={`/work/${project.slug}`} className={styles.featuredCard} style={{ gridTemplateColumns: compact ? '5fr 4fr' : undefined }}>
        <div className={styles.featuredImageContainer}>
          {project.cover_image ? (
            <Image src={project.cover_image} alt={project.title} fill className={styles.featuredImage} />
          ) : (
            <div className={styles.featuredImage} style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
          )}
        </div>
        <div className={styles.featuredContent}>
          <div className={styles.featuredBadge}>
            <span className={styles.featuredDot} />
            Featured Project
          </div>
          <h3 className={styles.featuredTitle}>{project.title}</h3>
          <p className={styles.featuredDesc}>{project.description || 'No description provided.'}</p>
          <div className={styles.tagsWrap}>
            {(project.skills || []).map((skill, idx) => (
              <span key={idx} className={styles.skillTag}>{skill}</span>
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

function ProjectCard({ project, index, scrollRoot }) {
  const mainTag = (project.tags && project.tags.length > 0) ? project.tags[0] : 'Project'
  return (
    <RevealCard delay={(index % 3) * 150} scrollRoot={scrollRoot}>
      <Link href={`/work/${project.slug}`} className={styles.card}>
        <div className={styles.imageContainer}>
          {project.cover_image ? (
            <Image src={project.cover_image} alt={project.title} fill className={styles.image} />
          ) : (
            <div className={styles.image} style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
          )}
        </div>
        <div className={styles.cardContent}>
          <span className={`${styles.category} ${getCategoryClass(mainTag)}`}>{mainTag}</span>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description || 'No description provided.'}</p>
          <div className={styles.tagsWrap}>
            {(project.skills || []).map((skill, idx) => (
              <span key={idx} className={styles.skillTag}>{skill}</span>
            ))}
          </div>
          <div className={styles.readMore}>
            Read Insight <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </RevealCard>
  )
}

/* ─── main export ────────────────────────────────────────── */
const CATEGORIES = ['All', 'Branding', 'Web Design', 'Digital Marketing']

/**
 * WorkGrid — reusable in both Home Slider and /work page.
 * compact=true → hides search, uses compact featured layout, 3-col grid
 */
export default function WorkGrid({ projects = [], scrollRoot, compact = false }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = projects
    .filter((p) => {
      const matchCat =
        activeFilter === 'All' ||
        (p.tags || []).some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      const matchSearch =
        search === '' || p.title.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => a.order_index - b.order_index)

  const counts = CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = projects.filter((p) =>
      (p.tags || []).some((t) => t.toLowerCase().includes(cat.toLowerCase()))
    ).length
    return acc
  }, {})

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* Stats Bar — hidden in compact/slider mode */}
      {!compact && (
        <div className={styles.statsBar}>
          <span className={styles.statItem}><strong>{projects.length}</strong> Projects</span>
          {Object.entries(counts).map(([cat, count]) => (
            <span key={cat} className={styles.statItem}><strong>{count}</strong> {cat}</span>
          ))}
        </div>
      )}

      {/* Filter Strip */}
      <div className={`${styles.filterStrip} ${compact ? styles.filterStripCompact : ''}`}>
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
        {/* Search hidden in compact (slider) mode */}
        {!compact && (
          <div className={styles.searchWrap}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>No projects match your search.</div>
      ) : compact ? (
        /* Compact (slider): flat 3-column grid, no featured layout */
        <div className={styles.regularGrid3}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id || i} project={project} index={i} scrollRoot={scrollRoot} />
          ))}
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {featured && (
            <div className={compact ? styles.featuredCompactWrap : ''}>
              <FeaturedCard project={featured} scrollRoot={scrollRoot} compact={compact} />
            </div>
          )}
          {rest.length > 0 && (
            <div className={styles.masonryGrid}>
              {rest.map((project, i) => (
                <ProjectCard key={project.id || i} project={project} index={i} scrollRoot={scrollRoot} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
