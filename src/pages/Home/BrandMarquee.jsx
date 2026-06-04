import { useState } from 'react';
import './BrandMarquee.css';
import { brands } from '../../data/brands';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function BrandMarquee() {
  const sectionRef = useScrollReveal();
  const [activeBrandSlug, setActiveBrandSlug] = useState('lamborghini');

  const activeBrand = brands.find((b) => b.slug === activeBrandSlug) || brands[0];

  return (
    <section className="brand-marquee section" ref={sectionRef}>
      <div className="container">
        <div className="brand-marquee__header reveal">
          <span className="section-label">Our Partners</span>
          <h2 className="section-title">
            World-Class <span className="accent">Brands</span>
          </h2>
          <p className="brand-marquee__subtitle">
            Partnering with the world's most prestigious automotive marques to deliver an unparalleled experience of luxury and heritage.
          </p>
        </div>
      </div>

      <div className="brand-marquee__track-container reveal reveal-delay-2">
        <div className="brand-marquee__track">
          <div className="brand-marquee__fade brand-marquee__fade--left" />
          <div className="brand-marquee__fade brand-marquee__fade--right" />
          <div className="brand-marquee__inner">
            {[...brands, ...brands].map((brand, index) => {
              const isActive = activeBrandSlug === brand.slug;
              return (
                <div 
                  key={`${brand.slug}-${index}`} 
                  className={`brand-marquee__item ${isActive ? 'brand-marquee__item--active' : ''}`}
                  onClick={() => setActiveBrandSlug(brand.slug)}
                  onMouseEnter={() => setActiveBrandSlug(brand.slug)}
                >
                  <img 
                    src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${brand.slug}.png`} 
                    alt={`${brand.name} logo`}
                    className="brand-logo-img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to text if the image fails to load
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <span className="brand-logo-fallback" style={{ display: 'none' }}>
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Brand Detail Panel */}
      <div className="container reveal reveal-delay-3" style={{ marginTop: 'var(--space-2xl)' }}>
        <div className="brand-detail-panel glass-panel" key={activeBrand.slug}>
          <div className="brand-detail-panel__glow" />
          <div className="brand-detail-panel__grid">
            <div className="brand-detail-panel__logo-side">
              <div className="brand-detail-panel__logo-wrapper">
                <img 
                  src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${activeBrand.slug}.png`} 
                  alt={`${activeBrand.name} logo`}
                  className="brand-detail-panel__logo-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="brand-detail-panel__content-side">
              <div className="brand-detail-panel__header-row">
                <div>
                  <div className="brand-detail-panel__meta">
                    <span className="brand-detail-panel__badge">{activeBrand.country}</span>
                    <span className="brand-detail-panel__badge">Est. {activeBrand.founded}</span>
                  </div>
                  <h3 className="brand-detail-panel__title">{activeBrand.name}</h3>
                </div>
                <div className="brand-detail-panel__specialty">
                  <span className="brand-detail-panel__spec-label">Specialty</span>
                  <span className="brand-detail-panel__spec-value">{activeBrand.specialty}</span>
                </div>
              </div>
              
              <h4 className="brand-detail-panel__tagline">{activeBrand.tagline}</h4>
              <p className="brand-detail-panel__desc">{activeBrand.description}</p>
              
              <div className="brand-detail-panel__actions">
                <a href="#fleet" className="brand-detail-panel__btn">
                  <span>Rent a {activeBrand.name}</span>
                  <span className="brand-detail-panel__btn-icon">→</span>
                </a>
                <a 
                  href={`https://www.${activeBrand.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-detail-panel__link"
                >
                  Visit Official Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

