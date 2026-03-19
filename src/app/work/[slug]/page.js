import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import ProjectNav from '../../../components/ProjectNav';
import ProjectGallery from '../../../components/ProjectGallery';
import styles from './project.module.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getProject(slug) {
  if (!supabaseUrl || !supabaseKey) return null;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Kareem Rezk`,
    description:
      project.description || `${project.title} — a project by Kareem Rezk`,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project)
    return (
      <main className={styles.main}>
        <Link href="/?slide=1" className={styles.backBtn}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <div className={styles.contentContainer}>
          <p style={{ color: 'var(--text-muted)' }}>Project not found.</p>
        </div>
      </main>
    );

  return (
    <main className={styles.main}>
      {/* HEADER / NAV */}
      <ProjectNav />

      {/* TYPOGRAPHY HERO */}
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
      </header>

      {/* RESTRICTED COVER IMAGE */}
      {project.cover_image && (
        <div className={styles.coverWrap}>
          <Image
            src={project.cover_image}
            alt={`${project.title} Cover`}
            fill
            className={styles.coverImg}
            priority
          />
        </div>
      )}

      {/* TWO-COLUMN SPLIT LAYOUT */}
      <div className={styles.contentContainer}>
        {/* STICKY SIDEBAR FOR METADATA */}
        <aside className={styles.sidebar}>
          {project.role && (
            <div className={styles.sidebarSection}>
              <span className={styles.sidebarLabel}>Role</span>
              <span
                className={`${styles.sidebarValue} ${styles.roleText}`}
                style={{ color: project.role_color || 'var(--text-muted)' }}
              >
                {project.role}
              </span>
            </div>
          )}

          {project.year && (
            <div className={styles.sidebarSection}>
              <span className={styles.sidebarLabel}>Year</span>
              <span className={styles.sidebarValue}>{project.year}</span>
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className={styles.sidebarSection}>
              <span className={styles.sidebarLabel}>Services</span>
              <div className={styles.tags}>
                {project.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.skills && project.skills.length > 0 && (
            <div className={styles.sidebarSection}>
              <span className={styles.sidebarLabel}>Skills</span>
              <div className={styles.skillTags}>
                {project.skills.map((s) => (
                  <span key={s} className={styles.skillTag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.live_url || project.github_url) && (
            <div className={styles.sidebarSection}>
              <span className={styles.sidebarLabel}>Links</span>
              <div className={styles.linksList}>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Visit Live Site
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    View Source
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* MAIN SCROLLABLE CONTENT (DESC + GALLERY) */}
        <div className={styles.mainDetails}>
          {project.description && (
            <div className={styles.desc}>
              {project.description
                .split('\n')
                .map((para, i) =>
                  para ? <p key={i}>{para}</p> : <br key={i} />,
                )}
            </div>
          )}

          <ProjectGallery 
            images={project.gallery_images} 
            title={project.title} 
            coverImage={project.cover_image} 
          />
        </div>
      </div>
    </main>
  );
}
