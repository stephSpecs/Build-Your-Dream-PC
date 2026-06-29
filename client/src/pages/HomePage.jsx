import { useNavigate } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-eyebrow">
          <span className="mono-tag">$ ./configure-rig.sh</span>
        </div>
        <h1 className="hero-title">
          Build Your<br />
          <span className="hero-accent">Dream PC</span>
        </h1>
        <p className="hero-sub">
          Configure every component. Preview it live. Save your build.
          No compromises, no compatibility surprises.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/build')}>
            Start Building
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/my-builds')}>
            View My Builds
          </button>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>Smart Compatibility</h3>
          <p>We flag incompatible component combos before you save — no DDR5 on DDR4 boards, no underpowered PSUs.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🖥️</div>
          <h3>Live Visual Preview</h3>
          <p>Watch your case color, cooling type, and GPU brand update in real-time as you customize.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Dynamic Pricing</h3>
          <p>Total price updates instantly as you swap components. Know exactly what your build costs.</p>
        </div>
      </div>
    </div>
  )
}
