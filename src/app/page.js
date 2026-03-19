import { createClient } from '@supabase/supabase-js'
import PortfolioSlider from '../components/PortfolioSlider'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function getProjects() {
  if (!supabaseUrl || !supabaseKey) return []
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase
    .from('projects')
    .select('id, slug, title, description, tags, cover_image, order_index, featured')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

export default async function Home({ searchParams }) {
  const projects = await getProjects()
  const resolvedParams = await searchParams;
  const s = parseInt(resolvedParams?.slide);
  const initialSlide = !isNaN(s) && s >= 0 && s < 4 ? s : 0;

  return (
    <PortfolioSlider projects={projects} initialSlide={initialSlide} />
  )
}
