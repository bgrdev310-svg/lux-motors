import './Testimonials.css';
import { testimonials } from '../../data/testimonials';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const sectionRef = useScrollReveal();

  return (
    <section className="testimonials section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials__header reveal">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            Voices From <span className="accent">Real Drivers</span>
          </h2>
        </div>

        <div className="testimonials__grid reveal reveal-delay-2">
          {testimonials.map((t) => (
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
