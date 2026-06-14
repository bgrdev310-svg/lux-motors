import { useState } from 'react';
import './AboutPage.css';
import Testimonials from '../Home/Testimonials';
import {
  Compass,
  Star,
  ShieldCheck,
  Heart,
  Sparkles,
  Award,
  AlertTriangle,
  Check,
  HelpCircle,
  FileText,
  Clock,
  Smartphone,
  ChevronRight,
  ArrowRight,
  UserCheck
} from 'lucide-react';

const POLICY_TABS = [
  { id: 'age', label: 'Minimum Age', icon: Clock },
  { id: 'docs', label: 'Required Documents', icon: FileText },
  { id: 'emergency', label: 'Emergency Protocol', icon: AlertTriangle },
  { id: 'payments', label: 'Payments & Fees', icon: ShieldCheck }
];

export default function AboutPage() {
  const [activePolicyTab, setActivePolicyTab] = useState('age');

  return (
    <div className="about-page">
      {/* Liquid Glass Background Orbs */}
      <div className="about-page__bg">
        <div className="about-page__orb about-page__orb--1" />
        <div className="about-page__orb about-page__orb--2" />
        <div className="about-page__orb about-page__orb--3" />
        <div className="about-page__grid" />
      </div>

      <div className="about-page__container container">
        {/* Page Header */}
        <header className="about-page__header">
          <div className="about-page__tag">
            <Sparkles size={14} className="about-page__tag-icon" />
            <span>OUR LEGACY & VALUES</span>
          </div>
          <h1 className="about-page__title">
            The Legend of <span className="about-page__title-gradient">Lux Motors</span>
          </h1>
          <p className="about-page__subtitle">
            Redefining the luxury car rental experience across the United Arab Emirates since inception. 
            We combine high-performance engineering with white-glove customer care.
          </p>
        </header>

        {/* Milestone Stats Counter Row (Figma Dashboard style) */}
        <section className="about-page__stats glass-panel">
          <div className="about-page__stat-item">
            <span className="about-page__stat-num">50+</span>
            <span className="about-page__stat-label">Exotic Supercars</span>
          </div>
          <div className="about-page__stat-divider" />
          <div className="about-page__stat-item">
            <span className="about-page__stat-num">2.5K+</span>
            <span className="about-page__stat-label">VIP Clients Served</span>
          </div>
          <div className="about-page__stat-divider" />
          <div className="about-page__stat-item">
            <span className="about-page__stat-num">100%</span>
            <span className="about-page__stat-label">Secure Transacts</span>
          </div>
          <div className="about-page__stat-divider" />
          <div className="about-page__stat-item">
            <span className="about-page__stat-num">24/7</span>
            <span className="about-page__stat-label">VIP Roadside Care</span>
          </div>
        </section>

        {/* Vision & Mission Split Cards */}
        <section className="about-page__split">
          {/* Vision card (Gold Accent Glow) */}
          <div className="about-page__split-card glass-panel about-page__split-card--vision">
            <div className="about-page__split-glow" />
            <div className="about-page__split-header">
              <div className="about-page__split-icon-box">
                <Compass size={24} className="about-page__split-icon" />
              </div>
              <span className="about-page__split-tag">THE FUTURE</span>
            </div>
            <h2 className="about-page__split-title">Our Vision</h2>
            <h3 className="about-page__split-accent">Making Every Ride an Experience</h3>
            <p className="about-page__split-text">
              Lux Motors aims to be recognized as the top luxury car rental service throughout the UAE. 
              Our focus is on continuously improving our services and offering the support our customers need. 
              We strive to be the go-to platform for a wide range of luxury car rentals. At Lux Motors, 
              we make it possible for people to rent their preferred luxury cars from anywhere in the UAE, 
              ensuring a premium experience with every rental.
            </p>
          </div>

          {/* Mission card (Royal Blue Accent Glow) */}
          <div className="about-page__split-card glass-panel about-page__split-card--mission">
            <div className="about-page__split-glow" />
            <div className="about-page__split-header">
              <div className="about-page__split-icon-box">
                <Award size={24} className="about-page__split-icon" />
              </div>
              <span className="about-page__split-tag">THE PROMISE</span>
            </div>
            <h2 className="about-page__split-title">Our Mission</h2>
            <h3 className="about-page__split-accent">The Best Exotic Car Rentals, Made Easy</h3>
            <p className="about-page__split-text">
              At Lux Motors, our mission is to provide our customers with the chance to experience the thrill of luxury. 
              We ensure that each trip in our luxurious rental cars is an unforgettable and glamorous experience. 
              Our car rental process is straightforward and free from hassle, making it easy for customers to access 
              our high-end vehicles. With Lux Motors, you can expect a smooth and enjoyable journey from start to finish, 
              in a car that’s more than just a ride—it’s a statement of style and luxury.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-page__values-section">
          <div className="about-page__values-header">
            <span className="section-label">Core values</span>
            <h2 className="section-title">
              Our <span className="accent">Philosophy</span>
            </h2>
            <p className="about-page__values-desc">
              We operate under a simple set of guidelines that define our client interaction and fleet management.
            </p>
          </div>

          <div className="about-page__values-grid">
            {/* Value 1: Honest Service */}
            <div className="value-card glass-panel">
              <div className="value-card__icon-box value-card__icon-box--honest">
                <UserCheck size={22} />
              </div>
              <h3 className="value-card__title">Honest Service</h3>
              <p className="value-card__text">
                We believe in keeping things real—fair pricing, no hidden commissions, and absolute transparency in agreements.
              </p>
            </div>

            {/* Value 2: Safe Rides */}
            <div className="value-card glass-panel">
              <div className="value-card__icon-box value-card__icon-box--safe">
                <ShieldCheck size={22} />
              </div>
              <h3 className="value-card__title">Safe Rides</h3>
              <p className="value-card__text">
                Every vehicle in our fleet undergoes strict 40-point diagnostic inspections and is delivered fully sterilized and tuned.
              </p>
            </div>

            {/* Value 3: Happy Customers */}
            <div className="value-card glass-panel">
              <div className="value-card__icon-box value-card__icon-box--happy">
                <Heart size={22} />
              </div>
              <h3 className="value-card__title">Happy Customers</h3>
              <p className="value-card__text">
                We make sure every customer has a smooth experience, from our instant WhatsApp booking to premium doorstep drops.
              </p>
            </div>
          </div>

          <div className="about-page__values-banner glass-widget">
            <h4 className="about-page__banner-title">Honest Service, Safe Rides, Happy Customers</h4>
            <p className="about-page__banner-text">
              We believe in keeping things real—fair pricing, top-quality rides, and making sure every customer has a smooth experience.
            </p>
          </div>
        </section>

        {/* Policies Dashboard (Creative Interactive Panel) */}
        <section className="about-page__policies-section">
          <div className="about-page__policies-header">
            <span className="section-label">Car Rental Guidelines</span>
            <h2 className="section-title">
              Our <span className="accent">Rental Policies</span>
            </h2>
            <p className="about-page__policies-desc">
              We have structured our car rental policies to be highly favorable for our customers as well as for the company. 
              When it comes to flexibility and transparency in our services, we give our 100%.
            </p>
          </div>

          <div className="about-page__policies-dashboard glass-panel">
            {/* Dashboard Tabs Sidebar */}
            <nav className="about-page__policies-tabs">
              {POLICY_TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activePolicyTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`policy-tab-btn ${isActive ? 'policy-tab-btn--active' : ''}`}
                    onClick={() => setActivePolicyTab(tab.id)}
                  >
                    <TabIcon size={16} className="policy-tab-btn__icon" />
                    <span>{tab.label}</span>
                    <ChevronRight size={14} className="policy-tab-btn__arrow" />
                  </button>
                );
              })}
            </nav>

            {/* Dashboard Panel Viewport */}
            <div className="about-page__policies-content">
              
              {/* Tab 1: Minimum Age */}
              {activePolicyTab === 'age' && (
                <div className="policy-pane animate-fade-in">
                  <span className="policy-pane__label">AGE REQUIREMENT</span>
                  <h3 className="policy-pane__title">19+ Minimum Age Limit</h3>
                  <p className="policy-pane__text">
                    We support early access to automotive luxury. Our structured policies allow individuals from age 19 to drive our premium models.
                  </p>
                  
                  <div className="policy-pane__widget glass">
                    <div className="age-dial">
                      <div className="age-dial__circle">
                        <span className="age-dial__num">19</span>
                        <span className="age-dial__label">Years Old</span>
                      </div>
                      <div className="age-dial__text">
                        <strong>Early Eligibility Passed</strong>
                        <p>Specialized insurance coverage option is automatically attached for drivers aged 19 to 24.</p>
                      </div>
                    </div>
                  </div>

                  <div className="policy-pane__note">
                    <Check size={14} className="policy-pane__check" />
                    <span>Applies to standard luxury models and compact SUVs. High-performance supercars may require age 25.</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Required Documents */}
              {activePolicyTab === 'docs' && (
                <div className="policy-pane animate-fade-in">
                  <span className="policy-pane__label">REQUIRED DOCUMENTS</span>
                  <h3 className="policy-pane__title">Residents vs. Tourists</h3>
                  <p className="policy-pane__text">
                    For verification and legal compliance under Dubai RTA guidelines, we require copies of specific identification documents.
                  </p>

                  <div className="policy-pane__grid">
                    <div className="doc-card glass">
                      <h4 className="doc-card__title">UAE Residents</h4>
                      <ul className="doc-card__list">
                        <li><Check size={14} /> Valid UAE Driving License</li>
                        <li><Check size={14} /> Emirates ID Copy</li>
                        <li><Check size={14} /> Passport copy</li>
                      </ul>
                    </div>

                    <div className="doc-card doc-card--gold glass">
                      <h4 className="doc-card__title">International Tourists</h4>
                      <ul className="doc-card__list">
                        <li><Check size={14} /> Valid Passport Copy</li>
                        <li><Check size={14} /> UAE Tourist Visa Stamp</li>
                        <li><Check size={14} /> Home Country License</li>
                        <li><Check size={14} /> International Driving Permit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Emergency Protocol */}
              {activePolicyTab === 'emergency' && (
                <div className="policy-pane animate-fade-in">
                  <span className="policy-pane__label">EMERGENCY ASSISTANCE</span>
                  <h3 className="policy-pane__title">If You Encounter Any Issues</h3>
                  <p className="policy-pane__text">
                    Your safety is our absolute priority. In the rare event of a mechanical malfunction or minor scratch, we have a fast vehicle replacement protocol.
                  </p>

                  <div className="policy-pane__widget policy-pane__widget--alert glass">
                    <div className="emergency-banner">
                      <div className="emergency-banner__icon-box">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <strong>Immediate Replacement System</strong>
                        <p>Turn off the engine immediately. Do not attempt to drive. Call customer care, and our dispatchers will meet you with a replacement vehicle.</p>
                      </div>
                    </div>
                  </div>

                  <a href="tel:+971509924247" className="policy-pane__phone-btn">
                    <Smartphone size={16} />
                    <span>Emergency Concierge: +971 50 992 4247</span>
                  </a>
                </div>
              )}

              {/* Tab 4: Payments & Fees */}
              {activePolicyTab === 'payments' && (
                <div className="policy-pane animate-fade-in">
                  <span className="policy-pane__label">FINANCIAL GUIDELINES</span>
                  <h3 className="policy-pane__title">Rental Payments & Security Deposits</h3>
                  <p className="policy-pane__text">
                    All payment terms are transparently detailed on contracts. Customers are required to settle full rental charges alongside security deposit authorizations.
                  </p>

                  <div className="policy-pane__fee-table glass">
                    <div className="fee-row">
                      <span>Rental payment</span>
                      <strong>Charged at handover (Credit Card, Cash, Crypto)</strong>
                    </div>
                    <div className="fee-row">
                      <span>Security deposit hold</span>
                      <strong>Pre-authorized on credit card (Released in 21-30 days)</strong>
                    </div>
                    <div className="fee-row">
                      <span>Additional services</span>
                      <strong>GPS, Baby Seats, Secondary Driver (Nominal surcharge)</strong>
                    </div>
                  </div>

                  <div className="policy-pane__note">
                    <Check size={14} className="policy-pane__check" />
                    <span>No hidden administrative fees. Salik tolls are billed at 5 AED per gate crossing.</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </div>

      {/* Reused Testimonials section from home page */}
      <div className="about-page__testimonials">
        <Testimonials />
      </div>
    </div>
  );
}
