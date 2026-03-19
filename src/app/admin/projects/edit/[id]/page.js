'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../../lib/supabase'
import ProjectForm from '../../ProjectForm'
import AdminSidebar from '../../../components/AdminSidebar'
import { useAdminLang } from '../../../hooks/useAdminLang'
import styles from '../../../admin.module.css'

export default function EditProject({ params }) {
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useAdminLang()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user?.email !== 'kareem.rezk.ah@gmail.com') {
        window.location.href = '/admin'
      }
    })
    fetchProject()
  }, [])

  async function fetchProject() {
    const { data } = await supabase.from('projects').select('*').eq('id', params.id).single()
    setProject(data)
    setLoading(false)
  }

  async function handleSave(payload) {
    const { error } = await supabase.from('projects').update(payload).eq('id', params.id)
    if (!error) setTimeout(() => router.push('/admin/dashboard'), 1000)
    return { error }
  }

  return (
    <div className={styles.dashLayout}>
      <AdminSidebar />
      <main className={styles.main}>
        {loading ? (
          <div className={styles.emptyState}><span className={styles.loader}/></div>
        ) : (
          <>
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>{t.editProject}</h1>
                <p className={styles.pageSubtitle}>{project?.title}</p>
              </div>
            </div>
            <ProjectForm initial={project} onSave={handleSave} />
          </>
        )}
      </main>
    </div>
  )
}

