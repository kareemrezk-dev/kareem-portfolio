'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import AdminSidebar from '../components/AdminSidebar'
import { useAdminLang } from '../hooks/useAdminLang'
import styles from '../admin.module.css'

export default function Dashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useAdminLang()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Listen for auth state changes - more reliable than getSession
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user?.email === 'kareem.rezk.ah@gmail.com') {
        setAuthenticated(true)
        fetchProjects()
      } else if (session) {
        supabase.auth.signOut().then(() => { window.location.href = '/admin' })
      } else {
        window.location.href = '/admin'
      }
    })

    // Also check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user?.email === 'kareem.rezk.ah@gmail.com') {
        setAuthenticated(true)
        // fetchProjects is called by onAuthStateChange usually, but safe to call here if needed
      } else if (session) {
        supabase.auth.signOut().then(() => { window.location.href = '/admin' })
      } else {
        // Wait a moment for auth state to settle
        setTimeout(() => {
          supabase.auth.getSession().then(({ data: { session: s } }) => {
            if (!s) {
              window.location.href = '/admin'
            }
          })
        }, 1000)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  async function deleteProject(id, title) {
    if (!confirm(`Delete "${title}"?`)) return
    await supabase.from('projects').delete().eq('id', id)
    setProjects(projects.filter(p => p.id !== id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/admin'
  }

  const featured = projects.filter(p => p.featured).length

  if (!authenticated) {
    return <div className={styles.emptyState}><span className={styles.loader}/></div>
  }

  return (
    <div className={styles.dashLayout}>
      <AdminSidebar onLogout={handleLogout} />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>{t.projects}</h1>
            <p className={styles.pageSubtitle}>{t.manageProjects}</p>
          </div>
          <Link href="/admin/projects/new" className={styles.btnPrimary}>
            <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {t.newProjectBtn}
          </Link>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{projects.length}</div>
            <div className={styles.statLabel}>{t.totalProjects}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{projects.filter(p => p.featured).length}</div>
            <div className={styles.statLabel}>{t.featured}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{projects.filter(p => !p.featured).length}</div>
            <div className={styles.statLabel}>{t.regular}</div>
          </div>
        </div>

        {loading ? (
          <div className={styles.emptyState}><span className={styles.loader}/></div>
        ) : projects.length === 0 ? (
          <div className={styles.emptyState}>
            <p>{t.noProjects}</p>
            <Link href="/admin/projects/new" className={styles.btnPrimary}>{t.addFirstProject}</Link>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <div className={styles.tableHead}>
              <div>{t.title}</div>
              <div>{t.tags}</div>
              <div>{t.year}</div>
              <div style={{ textAlign: 'right' }}>{t.actions}</div>
            </div>
            {projects.map(p => (
              <div key={p.id} className={styles.tableRow}>
                <div>
                  <div className={styles.projTitle}>{p.title} {p.featured && <span className={styles.featuredBadge}>Featured</span>}</div>
                  <div className={styles.projSlug}>/{p.slug}</div>
                </div>
                <div className={styles.tagsList}>
                  {(p.tags || []).slice(0,3).map(t => <span key={t} className={styles.tagPill}>{t}</span>)}
                </div>
                <div style={{fontSize:'12px', color:'var(--text-dim)'}}>{p.year}</div>
                <div className={styles.rowActions}>
                  <Link href={`/admin/projects/edit/${p.id}`} className={styles.btnEdit}>{t.edit}</Link>
                  <button className={styles.btnDelete} onClick={() => deleteProject(p.id, p.title)}>{t.delete}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
