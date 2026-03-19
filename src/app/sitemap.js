import { createClient } from '@supabase/supabase-js'

export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')

  const projectUrls = (projects || []).map((project) => ({
    url: `https://kareemrezk.com/work/${project.slug}`,
    lastModified: project.updated_at || new Date(),
  }))

  return [
    {
      url: 'https://kareemrezk.com',
      lastModified: new Date(),
    },
    ...projectUrls,
  ]
}
