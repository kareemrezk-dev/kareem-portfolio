'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'
import ProjectForm from '../ProjectForm'
import AdminSidebar from '../../components/AdminSidebar'
import { useAdminLang } from '../../hooks/useAdminLang'
import styles from '../../admin.module.css'

export default function NewProject() {
  const router = useRouter()
  const { t } = useAdminLang()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user?.email !== 'kareem.rezk.ah@gmail.com') {
        window.location.href = '/admin'
      }
    })
  }, [])

  async function handleSave(payload) {
    const { error } = await supabase.from('projects').insert([payload])
    return { error }
  }

  return (
    <div className={styles.dashLayout}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>{t.newProject}</h1>
            <p className={styles.pageSubtitle}>{t.addNewProject}</p>
          </div>
        </div>
        <ProjectForm onSave={handleSave} />
      </main>
    </div>
  )
}

