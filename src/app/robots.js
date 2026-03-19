export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Hide admin panel from search engines
    },
    sitemap: 'https://kareemrezk.com/sitemap.xml',
  }
}
