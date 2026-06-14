import './CarCard.css';
import { ArrowUpRight } from 'lucide-react';

export default function CarCard({ car, index = 0 }) {
  return (
    <a href={`/fleet/${car.slug}`} className={`car-card reveal reveal-delay-${index + 1}`}>
      <div className="car-card__image-wrapper">
        <img src={car.image} alt={car.name} className="car-card__image" loading="lazy" decoding="async" />
        <div className="car-card__overlay">
          <span className="car-card__category">{car.category}</span>
        </div>
      </div>
      <div className="car-card__content">
        <div className="car-card__header">
          <div>
            <h3 className="car-card__name">{car.name}</h3>
            <span className="car-card__brand">{car.brand}</span>
          </div>
          <div className="car-card__link" aria-label={`View ${car.name}`}>
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="car-card__specs">
          <div className="car-card__spec">
            <span className="car-card__spec-value">{car.specs.power}</span>
            <span className="car-card__spec-label">Power</span>
          </div>
          <div className="car-card__spec">
            <span className="car-card__spec-value">{car.specs.acceleration}</span>
            <span className="car-card__spec-label">0-100</span>
          </div>
          <div className="car-card__spec">
            <span className="car-card__spec-value">{car.specs.engine}</span>
            <span className="car-card__spec-label">Engine</span>
          </div>
        </div>
        <div className="car-card__footer">
          <div className="car-card__price">
            <span className="car-card__price-amount">{car.currency} {car.price.toLocaleString()}</span>
            <span className="car-card__price-period">/ {car.period}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
