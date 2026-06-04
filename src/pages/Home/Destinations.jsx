import './Destinations.css';
import { destinations } from '../../data/destinations';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MapPin, ArrowUpRight } from 'lucide-react';
import Button from '../../components/Button/Button';

export default function Destinations() {
  const sectionRef = useScrollReveal();

  return (
    <section className="destinations section" id="destinations" ref={sectionRef}>
      <div className="container">
        <div className="destinations__header reveal">
          <span className="section-label">Delivery Locations</span>
          <h2 className="section-title">
            Hit The Road <span className="accent">In Style</span>
          </h2>
          <p className="destinations__subtitle">
            Free delivery and pickup across the UAE's most prestigious locations.
          </p>
        </div>

        <div className="destinations__grid">
          {destinations.map((dest, index) => (
            <a
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className={`destinations__card reveal reveal-delay-${index + 1}`}
            >
              {/* Shifting Liquid Glass Light Blobs */}
              <div className="destinations__card-liquid-blob-1" />
              <div className="destinations__card-liquid-blob-2" />

              {/* Image window with static inner shadow */}
              <div className="destinations__card-image-wrapper">
                <img 
                  src={dest.image} 
                  alt={`${dest.name} in Dubai`} 
                  className="destinations__card-image"
                  loading="lazy"
                />
                <div className="destinations__card-image-overlay" />
                <div className="destinations__card-image-badge">
                  <MapPin size={11} className="destinations__card-badge-icon" />
                  <span>{dest.emirate || 'Dubai'}</span>
                </div>
              </div>

              {/* Premium content container */}
              <div className="destinations__card-body">
                <div className="destinations__card-header-row">
                  <h3 className="destinations__card-name">{dest.name}</h3>
                  <span className="destinations__card-count">{dest.carsAvailable}+ cars</span>
                </div>
                
                <p className="destinations__card-desc">{dest.description}</p>
                
                <div className="destinations__card-footer">
                  <span className="destinations__card-cta">Explore Location</span>
                  <div className="destinations__card-arrow-circle">
                    <ArrowUpRight size={14} className="destinations__card-arrow" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="destinations__cta reveal">
          <Button variant="secondary" icon href="/destinations">
            View All Locations
          </Button>
        </div>
      </div>
    </section>
  );
}
