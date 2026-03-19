'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { useAdminLang } from '../hooks/useAdminLang'
import styles from '../admin.module.css'

export default function ProjectForm({ initial = {}, onSave }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    slug: initial.slug || '',
    description: initial.description || '',
    role: initial.role || '',
    role_color: initial.role_color || '',
    year: initial.year || new Date().getFullYear().toString(),
    tags: (initial.tags || []).join(', '),
    live_url: initial.live_url || '',
    github_url: initial.github_url || '',
    cover_image: initial.cover_image || '',
    gallery_images: initial.gallery_images || [],
    featured: initial.featured || false,
    order_index: initial.order_index || 0,
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [newGalleryLink, setNewGalleryLink] = useState('')
  const { t } = useAdminLang()

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleTitleChange = (e) => {
    const val = e.target.value
    set('title', val)
    if (!initial.slug) set('slug', autoSlug(val))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `covers/${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage.from('projects').upload(path, file)
    if (upErr) { setError(t.uploadFailed); setUploading(false); return }
    const { data } = supabase.storage.from('projects').getPublicUrl(path)
    set('cover_image', data.publicUrl)
    setUploading(false)
  }

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setUploadingGallery(true)
    
    const newUrls = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `gallery/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
      const { error: upErr } = await supabase.storage.from('projects').upload(path, file)
      if (!upErr) {
        const { data } = supabase.storage.from('projects').getPublicUrl(path)
        newUrls.push(data.publicUrl)
      }
    }
    
    set('gallery_images', [...form.gallery_images, ...newUrls])
    setUploadingGallery(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const cleanedTags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    if (!form.title.trim()) { setError('Title is required'); setLoading(false); return; }
    if (cleanedTags.length === 0) { setError('At least one tag is required'); setLoading(false); return; }

    const payload = {
      ...form,
      tags: cleanedTags,
      order_index: parseInt(form.order_index) || 0,
      updated_at: new Date().toISOString(),
    }

    const result = await onSave(payload)
    if (result && result.error) {
      setError(result.error.message || t.errorMsg)
    } else {
      setSuccess(t.successMsg)
      // Reset form if it is a new project insertion (determined by initial slug existence)
      if (!initial.id && !initial.slug) {
        setForm({
          title: '', slug: '', description: '', role: '', role_color: '',
          year: new Date().getFullYear().toString(), tags: '', live_url: '',
          github_url: '', cover_image: '', gallery_images: [],
          featured: false, order_index: 0
        });
        setNewGalleryLink('');
      }
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formPage}>
      {success && <div className={styles.alertSuccess}>{success}</div>}
      {error && <div className={styles.alertError}>{error}</div>}

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.titleLabel}</label>
          <input className={styles.formInput} value={form.title} onChange={handleTitleChange} placeholder="E-Commerce Dashboard" required/>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.slugLabel}</label>
          <input className={styles.formInput} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="ecommerce-dashboard" required/>
          <span className={styles.formHint}>{t.urlHint}{form.slug || 'slug'}</span>
        </div>

        <div className={`${styles.formField} ${styles.full}`}>
          <label className={styles.formLabel}>{t.descLabel}</label>
          <textarea className={styles.formTextarea} value={form.description} onChange={e => set('description', e.target.value)} placeholder={t.descPlaceholder}/>
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.roleLabel}</label>
          <input className={styles.formInput} value={form.role} onChange={e => set('role', e.target.value)} placeholder={t.rolePlaceholder}/>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.roleColor}</label>
          <div className={styles.colorPickerWrap}>
            <input className={styles.colorPicker} type="color" value={form.role_color || '#c8a86a'} onChange={e => set('role_color', e.target.value)} />
            <input className={styles.formInput} style={{flex: 1}} type="text" value={form.role_color} onChange={e => set('role_color', e.target.value)} placeholder="e.g. #c8a86a or var(--admin-accent)" />
          </div>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.yearLabel}</label>
          <input className={styles.formInput} value={form.year} onChange={e => set('year', e.target.value)} placeholder="2024"/>
        </div>

        <div className={`${styles.formField} ${styles.full}`}>
          <label className={styles.formLabel}>{t.tagsLabel} <span className={styles.formHint}>{t.tagsHint}</span></label>
          <input className={styles.formInput} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Figma, React, UI/UX"/>
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.liveUrl}</label>
          <input className={styles.formInput} type="url" value={form.live_url} onChange={e => set('live_url', e.target.value)} placeholder="https://..."/>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.githubUrl}</label>
          <input className={styles.formInput} type="url" value={form.github_url} onChange={e => set('github_url', e.target.value)} placeholder="https://github.com/..."/>
        </div>

        <div className={`${styles.formField} ${styles.full}`}>
          <label className={styles.formLabel}>{t.coverImage}</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: form.cover_image ? '12px' : '8px' }}>
             <input className={styles.formInput} type="url" value={form.cover_image} onChange={e => set('cover_image', e.target.value)} placeholder={t.orPasteLink} />
          </div>
          {form.cover_image ? (
            <div className={styles.imagePreview}>
              <img src={form.cover_image} alt="Cover"/>
              <button type="button" onClick={() => set('cover_image', '')} style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.6)',border:'none',color:'var(--text)',borderRadius:4,padding:'4px 8px',cursor:'pointer',fontSize:11}}>{t.removeBtn}</button>
            </div>
          ) : (
            <label className={styles.imageUpload}>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>
              {uploading ? <span className={styles.loader}/> : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" stroke="var(--text-dim)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <div className={styles.imageUploadText}>{t.clickUpload}</div>
                </>
              )}
            </label>
          )}
        </div>

        <div className={`${styles.formField} ${styles.full}`}>
          <label className={styles.formLabel}>{t.galleryImages}</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input className={styles.formInput} type="url" value={newGalleryLink} onChange={e => setNewGalleryLink(e.target.value)} placeholder={t.orPasteLink} />
            <button type="button" className={styles.btnPrimary} style={{ padding: '0 20px', flexShrink: 0 }} onClick={() => { if(newGalleryLink) { set('gallery_images', [...form.gallery_images, newGalleryLink]); setNewGalleryLink(''); } }}>{t.addLinkBtn}</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            {form.gallery_images.map((url, i) => (
              <div key={i} className={styles.imagePreview} style={{ aspectRatio: '1', height: '120px' }}>
                <img src={url} alt={`Gallery ${i}`}/>
                <button type="button" onClick={() => set('gallery_images', form.gallery_images.filter((_, idx) => idx !== i))} style={{position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.6)',border:'none',color:'var(--text)',borderRadius:4,padding:'2px 6px',cursor:'pointer',fontSize:10}}>{t.removeBtn}</button>
              </div>
            ))}
            <label className={styles.imageUpload} style={{ height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} style={{display:'none'}}/>
              {uploadingGallery ? <span className={styles.loader}/> : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" stroke="var(--admin-text-muted)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <div className={styles.imageUploadText} style={{fontSize: '10px'}}>{t.clickUploadGallery}</div>
                </>
              )}
            </label>
          </div>
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.orderIndex}</label>
          <input className={styles.formInput} type="number" value={form.order_index} onChange={e => set('order_index', e.target.value)} placeholder="0"/>
          <span className={styles.formHint}>{t.lowerFirst}</span>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>{t.featuredLabel}</label>
          <select className={styles.formSelect} value={form.featured} onChange={e => set('featured', e.target.value === 'true')}>
            <option value="false">{t.no}</option>
            <option value="true">{t.yesFeatured}</option>
          </select>
        </div>
      </div>

      <div className={styles.formActions}>
        <button className={styles.btnSave} type="submit" disabled={loading}>
          {loading ? t.saving : t.saveProject}
        </button>
        <Link href="/admin/dashboard" className={styles.btnCancel}>{t.cancel}</Link>
      </div>
    </form>
  )
}
