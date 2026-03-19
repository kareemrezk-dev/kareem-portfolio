import '../styles/globals.css'
import Preloader from '../components/Preloader'
import { ThemeProvider } from '../context/ThemeContext'

export const metadata = {
  title: 'Kareem Rezk — UI/UX Designer & Front-End Developer',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2548 2548"><g transform="translate(0, 442)"><path fill="%23c8a86a" d="M988.21,758.86h-30.32v-251.62h-157.64v649.52h156.69v-249.73h28.04l206.91,242.53v-231.92l-65.18-83.75,146.72-174.95h297.41c9,1.18,15.24,4.47,18.6,6.59,5.72,3.61,9.29,7.73,12.36,11.29,4.18,4.83,7.02,9.37,8.86,12.67,1.73,4.12,4.21,11.51,4.07,20.99-.13,9.15-2.64,16.25-4.42,20.3-1.34,3.78-4,9.73-9.25,15.6-6.27,7.01-13.17,10.48-17.08,12.11h-329.43v398.27h152.59v-248.72h8.08l210.69,248.72h191.49l-221.31-248.21c10.28-.86,21.81-2.39,34.26-5.03,14.62-3.1,27.51-7.07,38.5-11.14,11.24-3.75,27.27-10.66,43.36-23.73,9.37-7.61,16.47-15.46,21.73-22.23,6.6-8.86,14.15-20.64,20.72-35.37,7.21-16.16,11.03-30.91,13.14-42.44,1.08-10.44,1.95-21.4,2.53-32.84.7-13.9.9-27.15.73-39.68-.49-12.73-1.94-27.69-5.27-44.19-3.17-15.69-7.37-29.41-11.62-40.93-4.34-10.36-11.48-24.23-23.24-38.4-15.08-18.16-31.38-29.14-42.44-35.37-14.64-6.89-33.49-14.05-56.08-18.69-12.91-2.65-24.85-4.03-35.48-4.65-11.55-.77-23.1-1.54-34.66-2.31l-362.37-.11-211.67,247.43Z"/></g></svg>',
  },
  description: 'Portfolio of Kareem Rezk, a Front-End Developer and UI/UX Designer based in Egypt. Specializing in modern, responsive websites and creative digital experiences.',
  keywords: ['UI/UX Designer', 'Front-End Developer', 'Portfolio', 'Egypt', 'Web Development', 'React', 'Next.js'],
  authors: [{ name: 'Kareem Rezk' }],
  creator: 'Kareem Rezk',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kareemrezk.com',
    title: 'Kareem Rezk — Digital Portfolio',
    description: 'Explore the digital portfolio of Kareem Rezk. UI/UX Designer & Front-End Developer.',
    siteName: 'Kareem Rezk Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kareem Rezk — UI/UX Designer & Front-End Developer',
    description: 'Portfolio of Kareem Rezk. Minimalist, premium web experiences.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                const lang = localStorage.getItem('language') || 'en';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'light') document.body.classList.add('light');
                document.documentElement.setAttribute('lang', lang);
                document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Preloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
