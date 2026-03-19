'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className={styles.backButton}>
        Return Home
      </Link>
    </div>
  );
}
