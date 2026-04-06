'use client'

import { useLanguage } from '../../context/LanguageContext'
import { dictionaries } from '../../lib/dictionaries'
import styles from './pricing.module.css'
import Navbar from '../../components/Navbar'

export default function PricingPage() {
  const { lang } = useLanguage()
  const dict = dictionaries[lang]

  const copyText = (e) => {
    const el = e.currentTarget
    const text = el.innerText
    navigator.clipboard.writeText(text).then(() => {
      const origColor = el.style.color
      const origBorder = el.style.borderColor
      el.style.borderColor = 'var(--gold)'
      el.style.color = 'var(--gold)'
      setTimeout(() => {
        el.style.borderColor = origBorder
        el.style.color = origColor
      }, 800)
    })
  }

  // A simple fallback if navigation to slider uses specific route (like /?slide=X)
  const goTo = (slideIndex) => {
    window.location.href = `/?slide=${slideIndex}`
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      {/* Navbar with current = null to disable active links but keep styling */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '64px' }}>
         <Navbar goTo={goTo} current={-1} />
      </div>

      <div className={styles.container}>
        <section className={styles.valueSection} style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div className={styles.container} style={{ padding: '0 40px' }}>
            <div className={styles.valueInner}>
              <div>
                <span className={styles.valueLabel}>{dict.value.label}</span>
                <h2 className={styles.valueHeading}>
                  {dict.value.heading.split('—').map((part, i) => (
                    <span key={i}>{part}{i === 0 && <><br />&mdash; </>}</span>
                  ))}
                </h2>
                <p className={styles.valueBody} dangerouslySetInnerHTML={{ __html: dict.value.body }} />
              </div>

              <div className={styles.valuePoints}>
                <div className={styles.valuePoint}>
                  <div className={styles.vpIcon}>🎯</div>
                  <div className={styles.vpText}>
                    <h4>{dict.value.point1_title}</h4>
                    <p>{dict.value.point1_desc}</p>
                  </div>
                </div>
                <div className={styles.valuePoint}>
                  <div className={styles.vpIcon}>🌍</div>
                  <div className={styles.vpText}>
                    <h4>{dict.value.point2_title}</h4>
                    <p>{dict.value.point2_desc}</p>
                  </div>
                </div>
                <div className={styles.valuePoint}>
                  <div className={styles.vpIcon}>⚡</div>
                  <div className={styles.vpText}>
                    <h4>{dict.value.point3_title}</h4>
                    <p>{dict.value.point3_desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.divider}></div>

        <section className={styles.servicesSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionLabel}>{dict.services.label}</span>
              <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: dict.services.title }} />
            </div>
            <p className={styles.sectionSub}>{dict.services.sub}</p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <span className={styles.svcNum}>01</span>
              <div className={styles.svcIcon}>🌐</div>
              <h3 className={styles.svcTitle}>{dict.services.s1_title}</h3>
              <p className={styles.svcDesc}>{dict.services.s1_desc}</p>
              <p className={styles.svcResult}>{dict.services.s1_result}</p>
            </div>
            <div className={styles.serviceCard}>
              <span className={styles.svcNum}>02</span>
              <div className={styles.svcIcon}>📱</div>
              <h3 className={styles.svcTitle}>{dict.services.s2_title}</h3>
              <p className={styles.svcDesc}>{dict.services.s2_desc}</p>
              <p className={styles.svcResult}>{dict.services.s2_result}</p>
            </div>
            <div className={styles.serviceCard}>
              <span className={styles.svcNum}>03</span>
              <div className={styles.svcIcon}>📲</div>
              <h3 className={styles.svcTitle}>{dict.services.s3_title}</h3>
              <p className={styles.svcDesc}>{dict.services.s3_desc}</p>
              <p className={styles.svcResult}>{dict.services.s3_result}</p>
            </div>
            <div className={styles.serviceCard}>
              <span className={styles.svcNum}>04</span>
              <div className={styles.svcIcon}>🎯</div>
              <h3 className={styles.svcTitle}>{dict.services.s4_title}</h3>
              <p className={styles.svcDesc}>{dict.services.s4_desc}</p>
              <p className={styles.svcResult}>{dict.services.s4_result}</p>
            </div>
          </div>

          <div className={styles.servicesMicro}>
            {dict.services.micro}
          </div>
        </section>

        <div className={styles.divider}></div>

        <section className={styles.packagesSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionLabel}>{dict.packages.label}</span>
              <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: dict.packages.title }} />
            </div>
            <p className={styles.sectionSub}>{dict.packages.sub}</p>
          </div>

          <div className={styles.pkgGrid}>
            {/* Starter */}
            <div className={styles.pkgCard}>
              <span className={`${styles.pkgBadge} ${styles.starter}`}>{dict.packages.starter.badge}</span>
              <p className={styles.pkgPosition}>{dict.packages.starter.position}</p>
              <h3 className={styles.pkgName}>{dict.packages.starter.name}</h3>
              <p className={styles.pkgNameAr}>{dict.packages.starter.name_ar}</p>
              <p className={styles.pkgPrice}>{dict.packages.starter.price}</p>
              <p className={styles.pkgCurrency}>{dict.packages.starter.currency}</p>
              <p className={styles.pkgDesc}>{dict.packages.starter.desc}</p>
              <ul className={styles.pkgFeatures}>
                <li>{dict.packages.starter.f1}</li>
                <li>{dict.packages.starter.f2}</li>
                <li>{dict.packages.starter.f3}</li>
                <li>{dict.packages.starter.f4}</li>
              </ul>
              <div className={styles.pkgSuitable}>{dict.packages.starter.suitable}</div>
              <a href="#contact" className={`${styles.pkgCta} ${styles.outline}`}>{dict.packages.starter.cta}</a>
            </div>

            {/* Growth */}
            <div className={`${styles.pkgCard} ${styles.featured}`}>
              <span className={`${styles.pkgBadge} ${styles.popular}`}>{dict.packages.growth.badge}</span>
              <p className={styles.pkgPosition}>{dict.packages.growth.position}</p>
              <h3 className={styles.pkgName}>{dict.packages.growth.name}</h3>
              <p className={styles.pkgNameAr}>{dict.packages.growth.name_ar}</p>
              <p className={styles.pkgPrice}>{dict.packages.growth.price}</p>
              <p className={styles.pkgCurrency}>{dict.packages.growth.currency}</p>
              <p className={styles.pkgDesc}>{dict.packages.growth.desc}</p>
              <ul className={styles.pkgFeatures}>
                <li>{dict.packages.growth.f1}</li>
                <li>{dict.packages.growth.f2}</li>
                <li>{dict.packages.growth.f3}</li>
                <li>{dict.packages.growth.f4}</li>
                <li>{dict.packages.growth.f5}</li>
              </ul>
              <div className={styles.pkgSuitable}>{dict.packages.growth.suitable}</div>
              <a href="#contact" className={`${styles.pkgCta} ${styles.solid}`}>{dict.packages.growth.cta}</a>
            </div>

            {/* Premium */}
            <div className={styles.pkgCard}>
              <span className={`${styles.pkgBadge} ${styles.premium}`}>{dict.packages.premium.badge}</span>
              <p className={styles.pkgPosition}>{dict.packages.premium.position}</p>
              <h3 className={styles.pkgName}>{dict.packages.premium.name}</h3>
              <p className={styles.pkgNameAr}>{dict.packages.premium.name_ar}</p>
              <p className={styles.pkgPrice}>{dict.packages.premium.price}</p>
              <p className={styles.pkgCurrency}>{dict.packages.premium.currency}</p>
              <p className={styles.pkgDesc}>{dict.packages.premium.desc}</p>
              <ul className={styles.pkgFeatures}>
                <li>{dict.packages.premium.f1}</li>
                <li>{dict.packages.premium.f2}</li>
                <li>{dict.packages.premium.f3}</li>
                <li>{dict.packages.premium.f4}</li>
                <li>{dict.packages.premium.f5}</li>
                <li>{dict.packages.premium.f6}</li>
              </ul>
              <div className={styles.pkgSuitable}>{dict.packages.premium.suitable}</div>
              <a href="#contact" className={`${styles.pkgCta} ${styles.outline}`}>{dict.packages.premium.cta}</a>
            </div>
          </div>
          <p className={styles.pkgMicro} dangerouslySetInnerHTML={{ __html: dict.packages.micro }} />
        </section>

        <div className={styles.divider}></div>

        <section className={styles.ctaSection}>
          <span className={styles.sectionLabel}>{dict.cta.label}</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(24px,4vw,36px)', marginBottom: '8px' }}>
            {dict.cta.title}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{dict.cta.sub}</p>

          <div className={styles.ctaGrid}>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l1}</div>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l2}</div>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l3}</div>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l4}</div>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l5}</div>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l6}</div>
            <div className={styles.ctaLine} onClick={copyText}>{dict.cta.l7}</div>
          </div>
        </section>

      </div>
    </div>
  )
}
