import { useEffect, useState } from 'react';
import './HeroSection.css';
import Button from '../../components/Button/Button';
import { heroCar } from '../../data/cars';
import { Zap, Gauge, Cog, ChevronDown } from 'lucide-react';
import { useHomepageStore } from '../../hooks/useHomepageStore';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const { config } = useHomepageStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const bgImage = config.heroBgImage || heroCar.image;

  return (
    <section className="hero" id="hero-section">
      {/* Background Effects */}
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
        <div className="hero__grid-pattern" />
        <div 
          className="hero__bg-image" 
          style={{ backgroundImage: `url(${bgImage})` }} 
        />
        <div className="hero__bg-overlay" />
        <div className="hero__bg-vignette" />
      </div>

      <div className="hero__content container">
        {/* Left Side — Text */}
        <div className={`hero__text ${loaded ? 'hero__text--visible' : ''}`}>
          <div className="hero__label">
            <span className="hero__label-dot" />
            {config.heroLabel}
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line">{config.heroTitleLine1}</span>
            <span className="hero__title-line">{config.heroTitleLine2}</span>
            <span className="hero__title-line hero__title-accent">{config.heroTitleAccent}</span>
          </h1>

          <p className="hero__description">
            {config.heroDescription}
          </p>

          <div className="hero__ctas">
            <Button variant="primary" size="lg" icon href={config.heroPrimaryCtaLink}>
              {config.heroPrimaryCtaText}
            </Button>
            <Button variant="secondary" size="lg" href={config.heroSecondaryCtaLink}>
              {config.heroSecondaryCtaText}
            </Button>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-avatars">
              <div className="hero__trust-avatar">AK</div>
              <div className="hero__trust-avatar">SM</div>
              <div className="hero__trust-avatar">JW</div>
            </div>
            <div className="hero__trust-text">
              <span className="hero__trust-rating">★★★★★</span>
              <span>{config.heroTrustText}</span>
            </div>
          </div>
        </div>

        {/* Right Side — Car Widgets Floating */}
        <div className={`hero__car ${loaded ? 'hero__car--visible' : ''}`}>
          {/* Car Name Badge (Moved to top-right) */}
          <div className="hero__car-badge">
            <span className="hero__car-badge-name">{config.heroCarName}</span>
            <span className="hero__car-badge-tagline">{config.heroCarTagline}</span>
          </div>

          {/* Floating Specs Card */}
          <div className="hero__float-card hero__float-card--specs">
            <div className="hero__spec">
              <Zap size={16} className="hero__spec-icon" />
              <div>
                <span className="hero__spec-value">{config.heroCarSpecAcceleration}</span>
                <span className="hero__spec-label">0-100 km/h</span>
              </div>
            </div>
            <div className="hero__spec-divider" />
            <div className="hero__spec">
              <Gauge size={16} className="hero__spec-icon" />
              <div>
                <span className="hero__spec-value">{config.heroCarSpecPower}</span>
                <span className="hero__spec-label">Power</span>
              </div>
            </div>
            <div className="hero__spec-divider" />
            <div className="hero__spec">
              <Cog size={16} className="hero__spec-icon" />
              <div>
                <span className="hero__spec-value">{config.heroCarSpecEngine}</span>
                <span className="hero__spec-label">Engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll">
        <span>Scroll</span>
        <ChevronDown size={16} className="hero__scroll-icon" />
      </div>
    </section>
  );
}
