import './HowItWorks.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Search, CalendarCheck, Truck, Car } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Choose Your Car',
    description: 'Browse our collection of 500+ luxury vehicles and find your perfect match.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Book Instantly',
    description: 'Reserve online or via WhatsApp. Flexible daily, weekly, and monthly plans.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'Free Delivery',
    description: 'We deliver to your hotel, home, or airport — anywhere across Dubai.',
  },
  {
    icon: Car,
    step: '04',
    title: 'Drive & Enjoy',
    description: 'Hit the road in style. 24/7 support throughout your entire rental period.',
  },
];

export default function HowItWorks() {
  const sectionRef = useScrollReveal();

  return (
    <section className="how-it-works section" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="how-it-works__header reveal">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            Four Simple <span className="accent">Steps</span>
          </h2>
          <p className="how-it-works__subtitle">
            From browsing to driving — we've made luxury car rental effortless.
          </p>
        </div>

        <div className="how-it-works__steps">
          {steps.map((s, index) => (
            <div key={s.step} className={`how-it-works__step reveal reveal-delay-${index + 1}`}>
              <div className="how-it-works__step-number">{s.step}</div>
              <div className="how-it-works__step-icon">
                <s.icon size={28} />
              </div>
              <h3 className="how-it-works__step-title">{s.title}</h3>
              <p className="how-it-works__step-desc">{s.description}</p>
              {index < steps.length - 1 && <div className="how-it-works__connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
