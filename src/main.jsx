import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7" /></svg>
)

const Spark = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h12M8 2v12" /></svg>
)

function App() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Acme home"><span className="brand-mark"><Spark /></span>Acme</a>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#contact">Get started <ArrowUpRight /></a>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="eyebrow-dot" /> The new standard for getting things done</div>
        <h1>Make space for<br /><em>what matters.</em></h1>
        <p className="hero-copy">Acme brings your team, tools, and best work into one calm, connected workspace.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#contact">Start for free <ArrowUpRight /></a>
          <a className="text-link" href="#product">See how it works <span>↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-blue-field" />
          <figure className="art-frame art-frame-large"><img src="/images/impression-portrait.jpg" alt="" /></figure>
          <figure className="art-frame art-frame-small"><img src="/images/impression-blue.jpg" alt="" /></figure>
          <div className="art-note"><span>01</span><strong>Make good<br />things happen.</strong></div>
        </div>
      </section>

      <section className="proof" id="product">
        <p>Trusted by thoughtful teams at</p>
        <div className="logos"><span>northstar</span><span className="logo-serif">Fieldwork</span><span>arc<span className="logo-dot">.</span></span><span className="logo-wide">GOOD / CO</span></div>
      </section>

      <section className="statement" id="about">
        <span className="section-number">01 / WHY ACME</span>
        <h2>Less noise.<br /><span>More momentum.</span></h2>
        <p>Great work happens when the busywork gets out of the way. Acme gives your team a clear place to focus, move fast, and do their best work.</p>
      </section>

      <footer id="contact"><span className="brand"><span className="brand-mark"><Spark /></span>Acme</span><span>© 2024 Acme, Inc.</span><a href="mailto:hello@acme.example">hello@acme.example <ArrowUpRight /></a></footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
