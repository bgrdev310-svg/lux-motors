import { useState } from 'react';
import './WhyChooseUs.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Shield, Clock, CreditCard, Headphones, MapPin, Sparkles } from 'lucide-react';

const benefits = [
  {
    id: 0,
    icon: Sparkles,
    title: 'Premium Fleet',
    description: '500+ handpicked luxury, sports, and exotic vehicles maintained to perfection.',
    metric: '500+ ELITE VEHICLES',
    tagline: 'Track-Ready Perfection',
    facts: [
      { label: 'Average Fleet Age', val: '< 1 Year' },
      { label: 'System Checkups', val: '100% Daily' },
      { label: 'Detailing Protocol', val: 'Showroom Spec' },
      { label: 'Performance Tier', val: 'Track-Certified' },
      { label: 'Brands Available', val: '15+ Marques' }
    ]
  },
  {
    id: 1,
    icon: MapPin,
    title: 'Free Delivery',
    description: 'Complimentary delivery and pickup to any location across Dubai.',
    metric: '100% COMPLIMENTARY',
    tagline: 'Direct-To-Door Concierge',
    facts: [
      { label: 'Average Dispatch Speed', val: '< 60 Minutes' },
      { label: 'Service Boundaries', val: 'All Dubai Districts' },
      { label: 'Airport Meet & Greet', val: 'VIP Terminal Support' },
      { label: 'Yacht Club Delivery', val: 'Available' },
      { label: 'Hotel Valet Hand-Off', val: '5-Star Properties' }
    ]
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'Best Prices',
    description: 'Competitive rates with no hidden fees. Save up to 40% on monthly rentals.',
    metric: 'UP TO 40% SAVINGS',
    tagline: 'Unmatched Luxury Value',
    facts: [
      { label: 'Price Match Promise', val: 'Guaranteed' },
      { label: 'Hidden Broker Fees', val: 'Zero' },
      { label: 'Deposit Release Speed', val: 'Instant Refund' },
      { label: 'Monthly Discount', val: 'Up to 40%' },
      { label: 'Loyalty Rewards', val: 'Elite Tier System' }
    ]
  },
  {
    id: 3,
    icon: Clock,
    title: 'Flexible Rentals',
    description: 'Daily, weekly, or monthly plans. Extend or modify your booking anytime.',
    metric: '100% ADAPTABLE',
    tagline: 'On-Demand Mobility Control',
    facts: [
      { label: 'Minimum Period', val: '1 Single Day' },
      { label: 'Extension Approval', val: 'Real-Time' },
      { label: 'Cancellation Policy', val: 'Free up to 24h' },
      { label: 'Swap Vehicles', val: 'Mid-Rental Allowed' },
      { label: 'Long-Term Leasing', val: 'Up to 12 Months' }
    ]
  },
  {
    id: 4,
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance via phone, WhatsApp, or email.',
    metric: 'ELITE CONCIERCE',
    tagline: 'Always at Your Disposal',
    facts: [
      { label: 'Average Response Time', val: '< 2 Minutes' },
      { label: 'Contact Channels', val: 'WhatsApp / Phone / Mail' },
      { label: 'Concierge Language', val: 'Multi-lingual Elite' },
      { label: 'Emergency Roadside', val: 'Instant Dispatch' },
      { label: 'Client Satisfaction', val: '99.2% Rating' }
    ]
  },
  {
    id: 5,
    icon: Shield,
    title: 'Fully Insured',
    description: 'Comprehensive insurance coverage for your complete peace of mind.',
    metric: 'ALL-INCLUSIVE COVER',
    tagline: 'Zero-Risk Grand Touring',
    facts: [
      { label: 'Coverage Scope', val: 'Comprehensive Multi-risk' },
      { label: 'Deductible Options', val: 'Zero Liability Avail.' },
      { label: 'Roadside Assistance', val: '24/7 Nationwide' },
      { label: 'Claim Processing', val: 'Same-Day Resolution' },
      { label: 'Personal Liability', val: 'Fully Covered' }
    ]
  },
];

const fleetComposition = [
  { category: 'Exotic Supercars', percentage: 35 },
  { category: 'Luxury SUVs', percentage: 30 },
  { category: 'Prestige Sedans', percentage: 20 },
  { category: 'Hyper Grand Tourers', percentage: 15 },
];

export default function WhyChooseUs() {
  const sectionRef = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBenefit = benefits[activeIndex];

  return (
    <section className="why-choose section" id="why-choose-us" ref={sectionRef}>
      <div className="container">
        <div className="why-choose__header reveal">
          <span className="section-label">Why Lux Motors</span>
          <h2 className="section-title">
            The <span className="accent">Luxury</span> Standard
          </h2>
          <p className="why-choose__subtitle">
            More than a rental — an experience crafted for those who demand excellence.
          </p>
        </div>

        <div className="why-choose__split">
          {/* Left Column: Interactive Telemetry Panel */}
          <div className="why-choose__telemetry-wrapper reveal">
            <div className="why-choose__telemetry-panel glass-panel" key={activeBenefit.id}>
              {/* Animated Technical Radar Sweep in the background */}
              <div className="why-choose__radar-container">
                <svg className="why-choose__radar-svg" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(201, 168, 76, 0.05)" strokeWidth="0.75" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(201, 168, 76, 0.03)" strokeWidth="0.75" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(201, 168, 76, 0.02)" strokeWidth="0.75" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(201, 168, 76, 0.02)" strokeWidth="0.5" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(201, 168, 76, 0.02)" strokeWidth="0.5" />
                  <path d="M100 100 L170 50" stroke="rgba(201, 168, 76, 0.2)" strokeWidth="1.5" strokeLinecap="round" className="why-choose__radar-sweep" />
                </svg>
              </div>

              {/* Status Header Indicator */}
              <div className="why-choose__telemetry-status">
                <span className="why-choose__status-dot" />
                <span className="why-choose__status-text">SYSTEM STATUS: ACTIVE // LUXURY VERIFIED</span>
              </div>

              {/* Dynamic Content */}
              <div className="why-choose__telemetry-body">
                <span className="why-choose__telemetry-label">Telemetry Metrics</span>
                <h3 className="why-choose__telemetry-metric">{activeBenefit.metric}</h3>
                <h4 className="why-choose__telemetry-tagline">{activeBenefit.tagline}</h4>
                
                <div className="why-choose__telemetry-divider" />
                
                <div className="why-choose__telemetry-facts">
                  {activeBenefit.facts.map((fact, i) => (
                    <div className="why-choose__fact-row" key={i}>
                      <span className="why-choose__fact-label">{fact.label}</span>
                      <span className="why-choose__fact-val">{fact.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Tech Angle Highlights */}
              <div className="why-choose__tech-corner why-choose__tech-corner--tl" />
              <div className="why-choose__tech-corner why-choose__tech-corner--tr" />
              <div className="why-choose__tech-corner why-choose__tech-corner--bl" />
              <div className="why-choose__tech-corner why-choose__tech-corner--br" />
            </div>

            {/* Fleet Composition Breakdown Widget */}
            <div className="why-choose__fleet-breakdown glass-panel">
              <div className="why-choose__tech-corner why-choose__tech-corner--tl" />
              <div className="why-choose__tech-corner why-choose__tech-corner--tr" />
              <div className="why-choose__tech-corner why-choose__tech-corner--bl" />
              <div className="why-choose__tech-corner why-choose__tech-corner--br" />
              
              <div className="why-choose__fleet-header">
                <span className="why-choose__fleet-title">FLEET COMPOSITION DIAGNOSTIC</span>
                <span className="why-choose__fleet-sub">ACTIVE DB FEED</span>
              </div>
              
              <div className="why-choose__fleet-list">
                {fleetComposition.map((item, idx) => (
                  <div className="why-choose__fleet-item" key={idx}>
                    <div className="why-choose__fleet-row-top">
                      <span className="why-choose__fleet-category">{item.category}</span>
                      <span className="why-choose__fleet-percent-val">{item.percentage}%</span>
                    </div>
                    <div className="why-choose__progress-bar-container">
                      <div 
                        className="why-choose__progress-bar-fill" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tiles Grid */}
          <div className="why-choose__grid reveal reveal-delay-2">
            {benefits.map((b, index) => {
              const isActive = activeIndex === index;
              const Icon = b.icon;
              return (
                <div 
                  key={b.title} 
                  className={`why-choose__card ${isActive ? 'why-choose__card--active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="why-choose__card-top">
                    <div className="why-choose__card-icon">
                      <Icon size={22} />
                    </div>
                    <span className="why-choose__card-number">0{index + 1}</span>
                  </div>
                  <h3 className="why-choose__card-title">{b.title}</h3>
                  <p className="why-choose__card-desc">{b.description}</p>
                  
                  {/* Subtle hover outline indicator */}
                  <div className="why-choose__card-border-glow" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
