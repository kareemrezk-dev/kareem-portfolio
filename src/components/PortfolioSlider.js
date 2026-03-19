'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './Navbar';
import Hud from './Hud';
import Hero from './Hero';
import dynamic from 'next/dynamic';
const Work = dynamic(() => import('./Work'));
const About = dynamic(() => import('./About'));
const Contact = dynamic(() => import('./Contact'));
import styles from '../app/page.module.css';

const TOTAL = 4;

export default function PortfolioSlider({ projects = [], initialSlide = 0 }) {
  const [current, setCurrent] = useState(initialSlide);
  const busy = useRef(false);

  const goTo = useCallback(
    (n) => {
      if (busy.current || n === current || n < 0 || n >= TOTAL) return;
      busy.current = true;
      setCurrent(n);
      setTimeout(() => {
        busy.current = false;
      }, 900);
    },
    [current],
  );

  useEffect(() => {
    // Force native scroll restoration off
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // If the URL has ?slide=X, clean it up so a subsequent refresh starts at Hero (0)
    const url = new URL(window.location);
    if (url.searchParams.has('slide')) {
      url.searchParams.delete('slide');
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  }, []);

  // Wheel
  useEffect(() => {
    let acc = 0,
      timer = null;
      
    // Guard to prevent trackpad inertia from previous page/refresh 
    // from instantly triggering a slide change
    let isReady = false;
    const readyTimer = setTimeout(() => {
      isReady = true;
    }, 600);

    const onWheel = (e) => {
      // Always prevent default to lock native scrolling
      e.preventDefault();
      
      // Ignore scroll events right after load
      if (!isReady) return;

      acc += e.deltaX || e.deltaY;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (acc > 40) goTo(current + 1);
        else if (acc < -40) goTo(current - 1);
        acc = 0;
      }, 80);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(readyTimer);
      clearTimeout(timer);
    };
  }, [current, goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  // Touch
  useEffect(() => {
    let tx = 0, ty = 0;
    const onStart = (e) => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      const dx = tx - e.changedTouches[0].clientX;
      const dy = ty - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) goTo(current + 1);
        else goTo(current - 1);
      }
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [current, goTo]);

  return (
    <div className={styles.wrapper}>
      <Navbar goTo={goTo} current={current} />
      <Hud current={current} total={TOTAL} goTo={goTo} />
      <div className={styles.viewport}>
        <div
          className={styles.slidesWrap}
          style={{
            transform: `translateX(-${current * 25}%)`,
            transition: 'transform 0.85s cubic-bezier(0.77,0,0.175,1)',
          }}
        >
          <Hero isActive={current === 0} onNext={() => goTo(1)} />
          <Work isActive={current === 1} projects={projects} />
          <About isActive={current === 2} />
          <Contact isActive={current === 3} />
        </div>
      </div>
    </div>
  );
}
