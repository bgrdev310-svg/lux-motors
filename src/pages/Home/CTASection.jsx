import './CTASection.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useHomepageStore } from '../../hooks/useHomepageStore';

export default function CTASection() {
  const sectionRef = useScrollReveal();
  const { config } = useHomepageStore();

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
              <span className="cta-badge__text">{config.ctaBadge}</span>
            </div>

            {/* Futuristic Luxury Title */}
            <h2 className="cta-title">
              {config.ctaTitleLine1} <br />
              <span className="cta-title__highlight">{config.ctaTitleLine2}</span>
            </h2>

            {/* Description Subtext */}
            <p className="cta-description">
              {config.ctaDescription}
            </p>

            {/* Glowing Call to Action Button */}
            <div className="cta-action">
              <a href={config.ctaBtnLink} className="cta-btn">
                <span className="cta-btn__text">{config.ctaBtnText}</span>
                <span className="cta-btn__glow"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
