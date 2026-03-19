'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../app/work/[slug]/project.module.css'

export default function ProjectGallery({ images, title, coverImage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === 'ArrowRight' && images?.length > 1) nextImage()
      if (e.key === 'ArrowLeft' && images?.length > 1) prevImage()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, images])

  if ((!images || images.length === 0) && !coverImage) {
    return <div className={styles.placeholder}>Images coming soon</div>
  }

  if (!images || images.length === 0) return null

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => setIsOpen(false)
  
  const nextImage = (e) => { 
    if(e) e.stopPropagation(); 
    setCurrentIndex((i) => (i + 1) % images.length) 
  }
  
  const prevImage = (e) => { 
    if(e) e.stopPropagation(); 
    setCurrentIndex((i) => (i - 1 + images.length) % images.length) 
  }

  return (
    <>
      <div className={styles.gallery}>
        {images.map((url, i) => (
          <div key={i} className={styles.galleryImageWrap} onClick={() => openLightbox(i)}>
            <Image
              src={url}
              alt={`${title} gallery image ${i + 1}`}
              width={1400}
              height={900}
              className={styles.galleryImg}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose}>×</button>
          
          {images.length > 1 && (
            <button className={styles.lightboxPrev} onClick={prevImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex]}
              alt={`${title} enlarged image ${currentIndex + 1}`}
              fill
              className={styles.lightboxImg}
            />
          </div>
          
          {images.length > 1 && (
            <button className={styles.lightboxNext} onClick={nextImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
