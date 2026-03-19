'use client'

import { ThemeProvider } from '../../context/ThemeContext'
import Navbar from '../Navbar'

/**
 * WorkNavbar — a thin client wrapper used in the /work Server Component page.
 * It provides ThemeProvider (needed by Navbar) and renders a static-looking
 * Navbar that links back to the home page. The slider navigation (goTo) is
 * not available here so we pass no-ops that redirect instead.
 */
export default function WorkNavbar() {
  const goTo = () => {
    window.location.href = '/'
  }

  return (
    <ThemeProvider>
      <Navbar goTo={goTo} current={1} />
    </ThemeProvider>
  )
}
