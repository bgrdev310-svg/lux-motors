import './Testimonials.css';
import { testimonials } from '../../data/testimonials';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';
import { useHomepageStore } from '../../hooks/useHomepageStore';

export default function Testimonials() {
  const sectionRef = useScrollReveal();
  const { config } = useHomepageStore();

  const testimonialsList = config.testimonialsList || testimonials;
  const label = config.testimonialsLabel || 'Testimonials';
  const title = config.testimonialsTitle || 'Voices From Real Drivers';

  const renderTestimonialsTitle = (txt) => {
    if (!txt) return '';
    const parts = txt.split(/(real drivers)/i);
    return parts.map((part, index) => 
      part.toLowerCase() === 'real drivers' 
        ? <span key={index} className="accent">{part}</span> 
        : part
    );
  };

  return (
    <section className="testimonials section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials__header reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title">
            {renderTestimonialsTitle(title)}
          </h2>
        </div>

        <div className="testimonials__grid reveal reveal-delay-2">
          {testimonialsList.map((t) => (
            <div key={t.id} className="testimonials__card glass-widget">
              <div className="testimonials__card-header">
                <Quote size={28} className="testimonials__quote-icon" />
                <div className="testimonials__rating">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--accent)" color="var(--accent)" />
                  ))}
                </div>
              </div>
              <p className="testimonials__text">"{t.text}"</p>
              
              <div className="testimonials__footer">
                <div className="testimonials__author">
                  <div className="testimonials__avatar">{t.avatar}</div>
                  <div>
                    <span className="testimonials__name">{t.name}</span>
                    <span className="testimonials__location">{t.location}</span>
                  </div>
                </div>
                <span className="testimonials__car">{t.car}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
