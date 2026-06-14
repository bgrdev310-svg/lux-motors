import './FeaturedFleet.css';
import { featuredCars } from '../../data/cars';
import CarCard from '../../components/CarCard/CarCard';
import Button from '../../components/Button/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useHomepageStore } from '../../hooks/useHomepageStore';

export default function FeaturedFleet() {
  const sectionRef = useScrollReveal();
  const { config } = useHomepageStore();

  // Helper to highlight the last word of the title
  const renderTitle = (title) => {
    if (!title) return '';
    const words = title.split(' ');
    if (words.length <= 1) return title;
    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')} <span className="accent">{lastWord}</span>
      </>
    );
  };

  return (
    <section className="featured-fleet section" id="featured-fleet" ref={sectionRef}>
      <div className="container">
        <div className="featured-fleet__header reveal">
          <div>
            <span className="section-label">{config.fleetLabel}</span>
            <h2 className="section-title">
              {renderTitle(config.fleetTitle)}
            </h2>
            <p className="featured-fleet__subtitle">
              {config.fleetSubtitle}
            </p>
          </div>
          <Button variant="secondary" icon href="/fleet" className="featured-fleet__cta reveal reveal-delay-2">
            {config.fleetCtaText}
          </Button>
        </div>

        <div className="featured-fleet__grid">
          {featuredCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
