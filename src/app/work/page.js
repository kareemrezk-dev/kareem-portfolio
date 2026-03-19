import { createClient } from '@supabase/supabase-js'
import styles from './page.module.css'
import WorkNavbar from '../../components/WorkNavbar'
import WorkGrid from '../../components/WorkGrid'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function getProjects() {
  if (!supabaseUrl || !supabaseKey) return []

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase
    .from('projects')
    .select('id, slug, title, description, tags, cover_image, order_index')
    .order('order_index', { ascending: true })

  if (error || !data) return []
  return data
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <div className={styles.container}>
      <WorkNavbar />

      <div className={styles.header}>
        <h1 className={styles.title}>
          Branding. Design. Websites.<br />
          Find all my projects here.
        </h1>
      </div>

      <WorkGrid projects={projects} />
    </div>
  )
}
