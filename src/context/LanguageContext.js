'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Always initialize with 'en' to guarantee matching SSR HTML during hydration
  // The layout will set dir="ltr" and lang="en" in HTML initially
  const [lang, setLang] = useState('en')

  useEffect(() => {
    // Safely retrieve lang from localStorage after mount
    const savedLang = localStorage.getItem('language') || 'en'
    setLang(savedLang)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.body.classList.toggle('rtl-layout', lang === 'ar')
    localStorage.setItem('language', lang)
  }, [lang])

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
