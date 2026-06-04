import './FeaturedFleet.css';
import { featuredCars } from '../../data/cars';
import CarCard from '../../components/CarCard/CarCard';
import Button from '../../components/Button/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function FeaturedFleet() {
  const sectionRef = useScrollReveal();

  return (
    <section className="featured-fleet section" id="featured-fleet" ref={sectionRef}>
      <div className="container">
        <div className="featured-fleet__header reveal">
          <div>
            <span className="section-label">Our Fleet</span>
            <h2 className="section-title">
              Drive Your <span className="accent">Dream</span>
            </h2>
            <p className="featured-fleet__subtitle">
              From fierce supercars to elegant luxury sedans, find the perfect car for every occasion.
            </p>
          </div>
          <Button variant="secondary" icon href="/fleet" className="featured-fleet__cta reveal reveal-delay-2">
            View All Cars
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
