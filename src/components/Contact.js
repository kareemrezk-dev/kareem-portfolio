import styles from './Contact.module.css'
import WordReveal from './WordReveal'


const socials = [
  {
    title: 'LinkedIn', href: 'https://www.linkedin.com/in/kareem-rezk-8866a83b8/',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  },
  {
    title: 'GitHub', href: 'https://github.com/kareemrezk-dev',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
  },
  {
    title: 'Behance', href: 'https://www.behance.net/kareemrezk7',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.577 1.87 1.637 1.87.501 0 .923-.19 1.17-.59l2.95.149zm-5.009-5.555c-.093-.5-.464-1.426-1.617-1.426-.966 0-1.496.578-1.678 1.426h3.295z"/><path d="M6.67 12.5c.828 0 1.33-.614 1.33-1.5s-.502-1.5-1.33-1.5H4v3h2.67zm.66 2H4v3.5h3.33c.924 0 1.67-.784 1.67-1.75S8.254 14.5 7.33 14.5z"/></svg>
  },
  {
    title: 'Email', href: 'mailto:kareem.rezk.go@gmail.com',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  },
  {
    title: 'X', href: 'https://x.com/KareemRezk72',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  },
  {
    title: 'Instagram', href: 'https://www.instagram.com/kareem.rezk.72/',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  },
  {
    title: 'Telegram', href: 'https://t.me/Kareem_Rezk72',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  }
]

export default function Contact({ isActive }) {
  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.label}>
          <WordReveal text="Contact" isActive={isActive} delayStart={0.2} />
        </div>
        
        <div className={styles.split}>
          <div className={styles.left}>
            <div className="availableBadge large" style={{marginBottom: '0', display: 'inline-flex'}}>
              <span className="pulseDot"></span>
              Available for freelance
            </div>

            <div className={styles.big}>Let&apos;s<br />work <em>together</em></div>
            
            <a href="mailto:kareem.rezk.go@gmail.com" className={styles.email}>
              kareem.rezk.go@gmail.com
            </a>
            
            <div className={styles.socials}>
              {socials.map(s => (
                <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title={s.title}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <form className={styles.form} action="https://formspree.io/f/mpqyjzpk" method="POST">
              <input type="text" name="name" className={styles.input} placeholder="Name" required />
              <input type="email" name="email" className={styles.input} placeholder="Email" required />
              <textarea name="message" className={styles.textarea} placeholder="Message" required rows="3"></textarea>
              <button type="submit" className={styles.submitBtn}>
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footer}>
          <span className={styles.ftName}>Kareem Rezk</span>
          <span className={styles.ftCopy}>&copy; 2026 &mdash; Cairo, Egypt</span>
        </div>
      </div>
    </div>
  )
}
