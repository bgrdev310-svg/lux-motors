import './CTASection.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function CTASection() {
  const sectionRef = useScrollReveal();

  return (
    <section className="prestige-cta section" id="prestige-cta" ref={sectionRef}>
      <div className="container">
        <div className="cta-card glass-panel reveal">
          {/* Ambient Gold Glowing Backdrops */}
          <div className="cta-card__glow cta-card__glow--1"></div>
          <div className="cta-card__glow cta-card__glow--2"></div>
          
          <div className="cta-card__content">
            {/* Status Indicator Badge */}
            <div className="cta-badge">
              <span className="cta-badge__dot"></span>
              <span className="cta-badge__text">EXCLUSIVITY REDEFINED</span>
            </div>

            {/* Futuristic Luxury Title */}
            <h2 className="cta-title">
              NEVER SETTLE FOR <br />
              <span className="cta-title__highlight">THE ORDINARY.</span>
            </h2>

            {/* Description Subtext */}
            <p className="cta-description">
              Unleash ultimate performance and supreme comfort on the roads of Dubai. Our curated fleet of supercars, prestige sedans, and luxury SUVs is at your command.
            </p>

            {/* Glowing Call to Action Button */}
            <div className="cta-action">
              <a href="/fleet" className="cta-btn">
                <span className="cta-btn__text">Rent Your Masterpiece</span>
                <span className="cta-btn__glow"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
