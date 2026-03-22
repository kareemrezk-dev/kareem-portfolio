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

  const goTo = useCallback((n) => {
    if (busy.current || n === current || n < 0 || n >= TOTAL) return;
    busy.current = true;
    setCurrent(n);
    setTimeout(() => { busy.current = false; }, 900);
  }, [current]);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const url = new URL(window.location);
    if (url.searchParams.has('slide')) {
      url.searchParams.delete('slide');
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  }, []);

  // Wheel
  useEffect(() => {
    let acc = 0, timer = null;
    let isReady = false;
    const readyTimer = setTimeout(() => { isReady = true; }, 600);
    const onWheel = (e) => {
      // NOTE: preventDefault disables vertical scrolling completely on desktop where wheel happens
      // If we remove preventDefault, the user scrolls page but slider triggers
      e.preventDefault();
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
      clearTimeout(readyTimer); clearTimeout(timer);
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

  // Touch — direction-lock: first significant movement decides scroll vs swipe
  useEffect(() => {
    let tx = 0, ty = 0;
    let direction = null; // null → undecided, 'v' → vertical scroll, 'h' → horizontal swipe

    const onStart = (e) => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
      direction = null;
    };

    const onMove = (e) => {
      if (direction) return; // already locked
      const dx = Math.abs(e.touches[0].clientX - tx);
      const dy = Math.abs(e.touches[0].clientY - ty);
      // Lock direction after 10px of movement
      if (dx > 10 || dy > 10) {
        direction = dx > dy ? 'h' : 'v';
      }
    };

    const onEnd = (e) => {
      // Only navigate slides when direction locked to horizontal
      if (direction !== 'h') return;
      const dx = tx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 60) {
        if (dx > 0) goTo(current + 1);
        else goTo(current - 1);
      }
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
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
