import { useEffect, useState } from 'react'
import { CodeEditor } from './components/CodeEditor'
import { copy, khmerNumber, type Language } from './content/copy'
import { curriculum, featured, upcoming } from './content/courses'

const logo = import.meta.env.BASE_URL + 'logo.png'
const storageKey = 'odevgate.language'

function readLanguage(): Language {
  try {
    return localStorage.getItem(storageKey) === 'en' ? 'en' : 'km'
  } catch {
    return 'km'
  }
}

function readTelegramUrl(): string | null {
  try {
    const url = new URL(import.meta.env.VITE_TELEGRAM_URL ?? '')
    if (url.protocol === 'https:' && url.hostname === 't.me' &&
        url.pathname.length > 1 && !url.username && !url.password && !url.port) {
      return url.href
    }
  } catch {
    // The enrollment link is optional during local development.
  }
  return null
}

const telegramUrl = readTelegramUrl()

function Enroll({ label, unavailable }: { label: string; unavailable: string }) {
  if (!telegramUrl) return <p className="enroll-note">{unavailable}</p>
  return (
    <a className="button primary" href={telegramUrl}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M22 3 2.7 10.4c-.9.3-.9 1 .2 1.3l4.6 1.4L18.7 6l-8.8 8.6-.4 4.8c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.4.2 1.6-.8L22 4.1c.2-.8-.2-1.3-1-1Z"/>
      </svg>
      {label}
    </a>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>(readLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[language]
  const links = [
    ['#home', t.home], ['#courses', t.courses], ['#about', t.about], ['#contact', t.contact],
  ]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy[language].title
    try {
      localStorage.setItem(storageKey, language)
    } catch {
      // Language switching still works if storage is unavailable.
    }
  }, [language])

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header" id="home">
        <div className="wrap header-inner">
          <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
            <img src={logo} width="44" height="44" alt="" /> oDevGate
          </a>
          <nav id="site-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label={t.nav}>
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language" role="group" aria-label={t.language}>
              <button lang="km" type="button" aria-pressed={language === 'km'} onClick={() => setLanguage('km')}>ខ្មែរ</button>
              <button lang="en" type="button" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
            </div>
            <button className="menu-toggle" type="button" aria-label={t.menu}
              aria-controls="site-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">{t.school}</span>
              <h1 id="hero-title">{t.headline}</h1>
              <p className="slogan" lang="en">Learn. Build. Deploy.</p>
              <a className="button primary" href="#courses">{t.browse}<span aria-hidden="true">→</span></a>
            </div>
            <CodeEditor label={t.code} />
          </div>
        </section>
        <section id="courses" className="wrap section" aria-labelledby="courses-title">
          <h2 id="courses-title" className="section-title">{t.catalog}</h2>
          <article className="featured">
            <div className="featured-info">
              <span className="course-icon icon-featured" aria-hidden="true">{'</>'}</span>
              <div>
                <span className="badge badge-open">{t.open}</span>
                <h3 lang="en">{featured.title}</h3>
                <p className="schedule">{t.schedule}</p>
              </div>
            </div>
            <div className="price">
              <span className="sr-only">{t.original} </span><del>${featured.originalPrice}</del>
              <span className="sr-only">{t.sale} </span><strong>${featured.price}</strong>
              <small>{t.whole}</small>
            </div>
            <div className="course-actions">
              <Enroll label={t.enroll} unavailable={t.unavailable} />
              <a className="button secondary" href="#course-details">{t.details}</a>
            </div>
          </article>
          <div className="upcoming">
            {upcoming.map((course) => (
              <article className="upcoming-card" key={course.title}>
                <div className="card-top">
                  <span className={`course-icon icon-${course.theme}`} aria-hidden="true">{course.icon}</span>
                  <span className="badge badge-soon">{t.soon}</span>
                </div>
                <h3 lang="en">{course.title}</h3>
                <p>{course[language]}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="course-details" className="details-section" aria-labelledby="details-title">
          <div className="wrap section">
            <span className="eyebrow">{t.beginner}</span>
            <h2 id="details-title" className="section-title" lang="en">{featured.title}</h2>
            <p className="section-intro">{t.summary}</p>
            <h3>{t.plan}</h3>
            <ol className="curriculum">
              {curriculum.map((week, index) => (
                <li key={week.title}>
                  <span className="week-label">{t.week}{language === 'km' ? khmerNumber(index + 1) : index + 1}</span>
                  <h4 lang="en">{week.title}</h4>
                  <p>{week[language]}</p>
                </li>
              ))}
            </ol>
            <Enroll label={t.enroll} unavailable={t.unavailable} />
          </div>
        </section>
        <div className="wrap section bottom-grid">
          <section id="about" aria-labelledby="about-title">
            <h2 id="about-title" className="section-title">{t.about}</h2>
            <p>{t.aboutText}</p>
          </section>
          <section id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title" className="section-title">{t.contact}</h2>
            <p>{t.contactText}</p>
            <Enroll label={t.enroll} unavailable={t.unavailable} />
          </section>
        </div>
      </main>
      <footer><div className="wrap footer-inner"><span>© oDevGate</span><span lang="en">Learn. Build. Deploy.</span></div></footer>
    </>
  )
}
