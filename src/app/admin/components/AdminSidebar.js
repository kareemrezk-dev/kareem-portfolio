'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAdminLang } from '../hooks/useAdminLang'
import styles from '../admin.module.css'

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname()
  const isProjects = pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/projects')
  const { t, lang } = useAdminLang()

  return (
    <aside className={styles.sidebar}>
      <Link href="/admin/dashboard" className={styles.sidebarLogo}>
        <Image src="/kr-logo.svg" alt="KR" width={28} height={28} style={{ height: '28px', width: 'auto', display: 'block' }} />
      </Link>

      <div className={styles.sidebarLabel}>{t.content}</div>
      <Link
        href="/admin/dashboard"
        className={`${styles.navItem} ${isProjects ? styles.active : ''}`}
      >
        <svg className={styles.navItemIcon} viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        {t.projects}
      </Link>

      <div className={styles.sidebarLabel}>{t.site}</div>
      <Link href="/" className={styles.navItem} target="_blank">
        <svg className={styles.navItemIcon} viewBox="0 0 24 24">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {t.viewPortfolio}
      </Link>

      <div className={styles.sidebarBottom}>
        <div className={styles.sidebarLabel}>{t.settings}</div>
        
        <button 
          className={styles.navItem} 
          onClick={() => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            document.body.classList.toggle('light', newTheme === 'light');
            localStorage.setItem('theme', newTheme);
          }}
        >
          <svg className={styles.navItemIcon} viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          {t.theme}
        </button>

        <button 
          className={styles.navItem}
          onClick={() => {
            const html = document.documentElement;
            const currentLang = html.getAttribute('lang') || 'en';
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            html.setAttribute('lang', newLang);
            html.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
            localStorage.setItem('language', newLang);
            // Dispatch event so other components know language changed
            window.dispatchEvent(new Event('languagechange'));
          }}
        >
          <svg className={styles.navItemIcon} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {t.language}
        </button>

        <button 
          className={styles.logoutBtn} 
          onClick={async () => {
             if (onLogout) {
               onLogout();
             } else {
               const { supabase } = await import('../../../lib/supabase');
               await supabase.auth.signOut();
               window.location.href = '/admin';
             }
          }}
        >
          <svg className={styles.navItemIcon} viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {t.signOut}
        </button>
      </div>
    </aside>
  )
}
