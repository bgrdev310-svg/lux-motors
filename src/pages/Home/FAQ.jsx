import { useState } from 'react';
import './FAQ.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';

const faqs = [
  {
    id: 1,
    question: 'What are the requirements to rent a luxury car?',
    answer: 'To rent a luxury vehicle, you must be at least 25 years old. Residents need a valid UAE driving license and Emirates ID. Tourists require a valid home country license, an International Driving Permit (IDP), and a passport with a visa stamp.',
  },
  {
    id: 2,
    question: 'Do you require a security deposit?',
    answer: 'Yes, a security deposit is required for all our luxury rentals. The amount varies depending on the vehicle class (typically 3,000 - 10,000 AED). The deposit is blocked on your credit card and fully released within 21-30 days after the rental ends, provided there are no fines or damages.',
  },
  {
    id: 3,
    question: 'Is delivery and pickup included?',
    answer: 'We offer complimentary delivery and pickup anywhere within Dubai, including hotels, residences, and Dubai International Airport (DXB). For deliveries to other emirates, an additional fee may apply.',
  },
];

export default function FAQ() {
  const sectionRef = useScrollReveal();
  const [openId, setOpenId] = useState(1); // First one open by default

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq section" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq__grid">
          {/* Left Column: Title and Concierge Info */}
          <div className="faq__info-col reveal">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Frequently <br />
              <span className="accent">Asked Questions</span>
            </h2>
            <p className="faq__description">
              Find instant answers to common inquiries regarding our premium car rental services in Dubai. Can't find what you need? Our dedicated team is at your service.
            </p>

            <div className="faq__concierge-card glass-panel">
              <div className="faq__concierge-glow"></div>
              <span className="faq__concierge-tag">VIP CONCIERGE</span>
              <h4 className="faq__concierge-title">Have Specific Requirements?</h4>
              <p className="faq__concierge-text">
                Speak directly with our luxury reservation specialists for bespoke bookings, custom deliveries, or long-term lease arrangements.
              </p>
              <a href="/contact" className="faq__concierge-link">
                <span>Start Consultation</span>
                <ArrowRight size={16} className="faq__concierge-arrow" />
              </a>
            </div>
          </div>

          {/* Right Column: Redesigned Accordions */}
          <div className="faq__accordion-col reveal reveal-delay-2">
            <div className="faq__accordion">
              {faqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                const indexStr = String(index + 1).padStart(2, '0');
                return (
                  <div 
                    key={faq.id} 
                    className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                  >
                    <button 
                      className="faq__question"
                      onClick={() => toggle(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq__question-content">
                        <span className="faq__number">{indexStr}</span>
                        <span className="faq__text">{faq.question}</span>
                      </div>
                      <div className="faq__icon-wrapper">
                        <div className="faq__icon-line faq__icon-line--h"></div>
                        <div className={`faq__icon-line faq__icon-line--v ${isOpen ? 'faq__icon-line--v-open' : ''}`}></div>
                      </div>
                    </button>
                    <div className="faq__answer-wrapper">
                      <div className="faq__answer">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="faq__footer">
              <Button variant="secondary" href="/contact" icon={true}>
                See More Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
