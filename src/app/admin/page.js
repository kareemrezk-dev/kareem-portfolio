'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '../../lib/supabase'
import styles from './admin.module.css'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user?.email === 'kareem.rezk.ah@gmail.com') {
        window.location.href = '/admin/dashboard'
      } else if (session) {
        // Sign out unauthorized users
        supabase.auth.signOut().then(() => setChecking(false))
      } else {
        setChecking(false)
      }
    })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) {
        console.error('Supabase login error:', error)
        setError(error.message || 'Invalid email or password')
        setLoading(false)
      } else if (data.user?.email !== 'kareem.rezk.ah@gmail.com') {
        await supabase.auth.signOut()
        setError('Unauthorized account.')
        setLoading(false)
      } else {
        console.log('Login successful, redirecting...')
        // Wait a moment for the session to be stored, then do a hard redirect
        setTimeout(() => {
          window.location.href = '/admin/dashboard'
        }, 500)
      }
    } catch (err) {
      console.error('Login exception:', err)
      setError(err.message || 'An unexpected error occurred during login.')
      setLoading(false)
    }
  }

  if (checking) return null

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}><Image src="/kr-logo.svg" alt="KR" width={52} height={52} style={{height:"52px",width:"auto"}}/></div>
        <h1 className={styles.loginTitle}>Admin Dashboard</h1>
        <p className={styles.loginSub}>Sign in to manage your portfolio</p>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kareem.rezk.go@gmail.com"
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.loginBtn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <a href="/" className={styles.backLink}>← Back to Portfolio</a>
      </div>
    </div>
  )
}
