'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const circleRef = useRef(null)
  
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Track mouse position
  const mouse = useRef({ x: -100, y: -100 })
  // Track trailing circle position
  const trailing = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Hide default cursor on interactive elements and general body
    document.body.style.cursor = 'none'

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }
    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // Animation loop for smooth trailing effect
    let animationFrame
    const render = () => {
      // Lerp function for smoothness (0.15 is the speed)
      trailing.current.x += (mouse.current.x - trailing.current.x) * 0.15
      trailing.current.y += (mouse.current.y - trailing.current.y) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${trailing.current.x}px, ${trailing.current.y}px, 0) translate(-50%, -50%)`
      }

      animationFrame = requestAnimationFrame(render)
    }
    render()

    // Add pointer events for hover states
    const handlePointerOver = (e) => {
      // Any link, button, or input triggers the hover state
      if (e.target.closest('a, button, input, textarea, [class*="proj"], [class*="btn"], [class*="arrow"], [class*="socialLink"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    document.addEventListener('mouseover', handlePointerOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', handlePointerOver)
      cancelAnimationFrame(animationFrame)
      document.body.style.cursor = 'auto'
    }
  }, [isVisible])

  // Prevent rendering on mobile (fallback to default touch behavior)
  const [isMobile, setIsMobile] = useState(true)
  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768)
  }, [])

  if (isMobile) return null

  return (
    <>
      <div
        ref={circleRef}
        className={`${styles.cursorCircle} ${isHovering ? styles.hovering : ''} ${isVisible ? styles.visible : ''}`}
      />
      <div
        ref={dotRef}
        className={`${styles.cursorDot} ${isVisible ? styles.visible : ''}`}
      />
    </>
  )
}
