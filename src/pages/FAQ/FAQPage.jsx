import { useState, useMemo, useEffect } from 'react';
import './FAQPage.css';
import { 
  Search, 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  Mail, 
  Send, 
  ChevronDown, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Key, 
  Car, 
  MapPin, 
  X,
  ArrowRight
} from 'lucide-react';

const FAQ_DATABASE = [
  // Category 1: General & Booking
  {
    id: 'g1',
    category: 'general',
    question: 'How do I book a luxury car with Lux Motors?',
    answer: 'Booking is simple and premium: Browse our online fleet, select your desired vehicle, and initiate booking via our instant WhatsApp link or direct call. Our VIP reservations team will finalize dates, delivery locations, and documentation. Once verified, the vehicle is reserved for you.',
    tag: 'Easy Booking',
    icon: Key
  },
  {
    id: 'g2',
    category: 'general',
    question: 'What is included in the daily rental price?',
    answer: 'Our standard daily rate includes the luxury vehicle rental, standard comprehensive insurance coverage, a daily mileage allowance, and complimentary delivery & pickup within Dubai. Surcharges like Salik (tolls), extra mileage, or fuel are billed separately.',
    tag: 'Pricing Transparency',
    icon: CreditCard
  },
  {
    id: 'g3',
    category: 'general',
    question: 'Can I rent a car for photoshoot or corporate event purposes?',
    answer: 'Yes, we offer premium chauffeured and stationary rental services for high-end photoshoots, brand activations, luxury weddings, and VIP corporate events. Contact our specialized concierge team to arrange custom logistics and scheduling.',
    tag: 'Bespoke Events',
    icon: Sparkles
  },

  // Category 2: Requirements
  {
    id: 'r1',
    category: 'requirements',
    question: 'What documents are required for UAE residents vs. tourists?',
    answer: 'UAE Residents must provide a valid UAE Driving License and Emirates ID. International Tourists must provide a Passport, a valid Tourist Visa stamp, a home country Driving License, and an International Driving Permit (IDP) depending on national origin.',
    tag: 'Documentation',
    icon: ShieldCheck
  },
  {
    id: 'r2',
    category: 'requirements',
    question: 'What is the minimum age requirement to rent a supercar?',
    answer: 'To rent our high-performance supercars and luxury SUVs, the minimum age is 25 years old. This is a strict insurance requirement in the UAE for vehicle classes above a certain horsepower rating. All drivers must hold a license for at least 1-2 years.',
    tag: 'Age Limit: 25+',
    icon: Car
  },
  {
    id: 'r3',
    category: 'requirements',
    question: 'Do I need an International Driving Permit (IDP)?',
    answer: 'Visitors holding licenses from GCC countries, US, UK, Canada, and EU member states can drive using their national license. Visitors from other countries must obtain and present an International Driving Permit (IDP) alongside their national license.',
    tag: 'Permit Check',
    icon: ShieldCheck
  },

  // Category 3: Security & Payments
  {
    id: 'p1',
    category: 'payments',
    question: 'How does the security deposit work and when is it refunded?',
    answer: 'A security deposit (typically 3,000 - 10,000 AED depending on the supercar value) is pre-authorized on your credit card. This deposit is held to cover any traffic violations, toll fees, or minor damages. The hold is automatically released within 21-30 business days after rental completion.',
    tag: 'Security Deposit',
    icon: CreditCard
  },
  {
    id: 'p2',
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, cash (AED, USD, EUR), and secure online digital payments. Please note that the security deposit hold must be processed specifically via a valid credit card.',
    tag: 'Payments',
    icon: CreditCard
  },
  {
    id: 'p3',
    category: 'payments',
    question: 'Are there any hidden fees (Salik, fuel, VAT)?',
    answer: 'We believe in absolute transparency. A 5% VAT is legally applicable on all rentals. Each crossing of a Salik toll gate is charged at 5 AED. Vehicles are delivered with a full tank of premium fuel and should be returned with the same level to avoid refueling fees.',
    tag: 'Taxes & Fees',
    icon: MapPin
  },

  // Category 4: Delivery & Concierge
  {
    id: 'd1',
    category: 'delivery',
    question: 'Do you offer airport delivery and hotel pickup?',
    answer: 'Yes, we provide complimentary white-glove delivery and pickup anywhere in Dubai, including Dubai International Airport (DXB), luxury hotels, and private residential addresses. Deliveries to other emirates (Abu Dhabi, Sharjah, etc.) can be arranged for a delivery fee.',
    tag: 'White-Glove Service',
    icon: MapPin
  },
  {
    id: 'd2',
    category: 'delivery',
    question: 'What is the daily mileage limit?',
    answer: 'Standard luxury rentals include a generous daily allowance of 250 kilometers. Excess mileage is billed per kilometer (ranging from 10 to 30 AED depending on the model). If you plan long-distance journeys across emirates, contact us for customizable mileage packages.',
    tag: 'Mileage Allowance',
    icon: Car
  },
  {
    id: 'd3',
    category: 'delivery',
    question: 'What happens if I receive traffic fines during my rental?',
    answer: 'Dubai traffic violations are registered digitally in real time. If a fine is recorded during your rental window, the fine amount plus a standard 10% administration charge will be processed from your security deposit, and the official police citation will be sent to you.',
    tag: 'Traffic Fines',
    icon: ShieldCheck
  },

  // Category 5: Policies & Insurance
  {
    id: 'i1',
    category: 'policies',
    question: 'What type of insurance coverage is provided?',
    answer: 'All our vehicles are covered under comprehensive commercial vehicle insurance. In the event of an accident where you are not at fault (verified by a green police report), you have zero liability. If you are at fault, you are responsible for the insurance deductible excess.',
    tag: 'Comprehensive Coverage',
    icon: ShieldCheck
  },
  {
    id: 'i2',
    category: 'policies',
    question: 'What should I do in case of an accident or minor scratch?',
    answer: 'Do not panic. Turn on hazard lights, ensure you are safe, and do not move the vehicle unless instructed by police. Call Dubai Police at 999 to report the incident and obtain a Police Report. A police report is legally mandatory in Dubai for any insurance coverage to apply.',
    tag: 'Emergency Protocol',
    icon: ShieldCheck
  },
  {
    id: 'i3',
    category: 'policies',
    question: 'Can someone else drive the vehicle besides me?',
    answer: 'A secondary driver can be added to the official rental agreement for a small registration fee, provided they present the same required documents and meet all age and license parameters. Driving by unregistered drivers completely voids insurance coverage.',
    tag: 'Insurance Policy',
    icon: Key
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'general', label: 'Booking & General', icon: Key },
  { id: 'requirements', label: 'Requirements', icon: ShieldCheck },
  { id: 'payments', label: 'Security & Deposits', icon: CreditCard },
  { id: 'delivery', label: 'Delivery & Limits', icon: MapPin },
  { id: 'policies', label: 'Insurance & Policies', icon: ShieldCheck }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState('g1'); // Open first by default

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return FAQ_DATABASE.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle accordion toggling
  const toggleFaq = (id) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  // Form Submit Handler
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    // Simulate luxury api call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1500);
  };

  return (
    <div className="faq-page">
      {/* Dynamic Liquid Glass Background Elements */}
      <div className="faq-page__bg">
        <div className="faq-page__orb faq-page__orb--1" />
        <div className="faq-page__orb faq-page__orb--2" />
        <div className="faq-page__orb faq-page__orb--3" />
        <div className="faq-page__grid" />
      </div>

      <div className="faq-page__container container">
        {/* Hero Header Section */}
        <header className="faq-page__header">
          <div className="faq-page__tag">
            <Sparkles size={14} className="faq-page__tag-icon" />
            <span>VIP SUPPORT PORTAL</span>
          </div>
          <h1 className="faq-page__title">
            Frequently Asked <span className="faq-page__title-gradient">Questions</span>
          </h1>
          <p className="faq-page__subtitle">
            Find answers to essential queries regarding Dubai's premier supercar and luxury rental service. 
            Experience absolute luxury, complete transparency, and seamless customer care.
          </p>

          {/* Liquid Glass Search Bar */}
          <div className="faq-page__search-wrapper glass-panel">
            <Search className="faq-page__search-icon" size={20} />
            <input
              type="text"
              className="faq-page__search-input"
              placeholder="Search policies, deposits, requirements, speed limits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="faq-page__search-clear" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </header>

        {/* Layout Grid */}
        <div className="faq-page__layout">
          
          {/* Main content: Filters and Accordions */}
          <div className="faq-page__main">
            {/* Category Navigation Swiper */}
            <div className="faq-page__categories">
              {CATEGORIES.map(cat => {
                const CatIcon = cat.icon;
                const isActive = activeCategory === cat.id;
                // Count items in category matching search
                const count = FAQ_DATABASE.filter(faq => {
                  const matchesCategory = cat.id === 'all' || faq.category === cat.id;
                  const matchesSearch = searchQuery.trim() === '' || 
                    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesCategory && matchesSearch;
                }).length;

                return (
                  <button
                    key={cat.id}
                    className={`faq-page__category-btn ${isActive ? 'faq-page__category-btn--active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      // If open question is no longer in active category, close it or leave it
                    }}
                  >
                    <CatIcon size={16} />
                    <span>{cat.label}</span>
                    <span className="faq-page__category-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Accordions */}
            <div className="faq-page__accordions">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaqId === faq.id;
                  const indexStr = String(index + 1).padStart(2, '0');
                  const IconComponent = faq.icon;

                  return (
                    <div 
                      key={faq.id}
                      className={`faq-page__item ${isOpen ? 'faq-page__item--open' : ''}`}
                    >
                      <button 
                        className="faq-page__item-header"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="faq-page__item-title-col">
                          <span className="faq-page__item-num">{indexStr}</span>
                          <span className="faq-page__item-question">{faq.question}</span>
                        </div>
                        <div className="faq-page__item-actions">
                          <span className="faq-page__item-tag">{faq.tag}</span>
                          <div className="faq-page__item-toggle">
                            <ChevronDown size={18} className="faq-page__item-arrow" />
                          </div>
                        </div>
                      </button>

                      <div className="faq-page__item-answer-wrapper">
                        <div className="faq-page__item-answer">
                          <div className="faq-page__answer-inner">
                            <div className="faq-page__answer-icon-box">
                              <IconComponent size={24} className="faq-page__answer-icon" />
                            </div>
                            <div className="faq-page__answer-text-col">
                              <p className="faq-page__answer-paragraph">{faq.answer}</p>
                              <div className="faq-page__answer-footer">
                                <span className="faq-page__verify-tag">
                                  <CheckCircle size={12} className="faq-page__verify-icon" />
                                  Official policy verified for 2026
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="faq-page__empty glass-panel">
                  <HelpCircle size={48} className="faq-page__empty-icon" />
                  <h3>No matches found</h3>
                  <p>We couldn't find any questions matching "{searchQuery}". Try modifying your search or select another category.</p>
                  <button 
                    className="faq-page__reset-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar widget: VIP Concierge Desk */}
          <aside className="faq-page__sidebar">
            {/* Quick Contacts */}
            <div className="faq-page__sidebar-card glass-panel">
              <div className="faq-page__sidebar-glow" />
              <span className="faq-page__sidebar-label">VIP CONCIERGE</span>
              <h3 className="faq-page__sidebar-title">Bespoke Support</h3>
              <p className="faq-page__sidebar-text">
                Need customized arrangements? Speak directly with our luxury reservations officers.
              </p>

              <div className="faq-page__contact-list">
                <a href="https://wa.me/971509924247" target="_blank" rel="noopener noreferrer" className="faq-page__contact-link">
                  <div className="faq-page__contact-icon faq-page__contact-icon--wa">
                    <MessageSquare size={18} />
                  </div>
                  <div className="faq-page__contact-info">
                    <span className="faq-page__contact-name">WhatsApp Concierge</span>
                    <span className="faq-page__contact-val">Instant Response (24/7)</span>
                  </div>
                  <ArrowRight size={14} className="faq-page__contact-arrow" />
                </a>

                <a href="tel:+971509924247" className="faq-page__contact-link">
                  <div className="faq-page__contact-icon faq-page__contact-icon--phone">
                    <Phone size={18} />
                  </div>
                  <div className="faq-page__contact-info">
                    <span className="faq-page__contact-name">Direct hotline</span>
                    <span className="faq-page__contact-val">+971 50 992 4247</span>
                  </div>
                  <ArrowRight size={14} className="faq-page__contact-arrow" />
                </a>

                <a href="mailto:info@luxmotors.ae" className="faq-page__contact-link">
                  <div className="faq-page__contact-icon faq-page__contact-icon--mail">
                    <Mail size={18} />
                  </div>
                  <div className="faq-page__contact-info">
                    <span className="faq-page__contact-name">Corporate Email</span>
                    <span className="faq-page__contact-val">info@luxmotors.ae</span>
                  </div>
                  <ArrowRight size={14} className="faq-page__contact-arrow" />
                </a>
              </div>
            </div>

            {/* Custom Interactive Form Card */}
            <div className="faq-page__sidebar-card glass-panel">
              {isSubmitted ? (
                <div className="faq-page__form-success">
                  <div className="faq-page__success-circle">
                    <CheckCircle className="faq-page__success-checkmark" size={32} />
                  </div>
                  <h4 className="faq-page__success-title">Inquiry Submitted</h4>
                  <p className="faq-page__success-text">
                    Your request has been dispatched to our VIP reservation line. A concierge agent will respond within 15 minutes.
                  </p>
                  <button 
                    className="faq-page__reset-form-btn" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="faq-page__form">
                  <h3 className="faq-page__form-title">Ask a Question</h3>
                  <p className="faq-page__form-text">
                    Can't find the answer you need? Write to us directly and our specialists will resolve it.
                  </p>

                  <div className="faq-page__form-group">
                    <label htmlFor="concierge-name" className="faq-page__form-label">Full Name</label>
                    <input
                      id="concierge-name"
                      type="text"
                      className="faq-page__form-input"
                      placeholder="e.g. John Doe"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>

                  <div className="faq-page__form-group">
                    <label htmlFor="concierge-email" className="faq-page__form-label">Email Address</label>
                    <input
                      id="concierge-email"
                      type="email"
                      className="faq-page__form-input"
                      placeholder="e.g. john@example.com"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>

                  <div className="faq-page__form-group">
                    <label htmlFor="concierge-message" className="faq-page__form-label">Your Message</label>
                    <textarea
                      id="concierge-message"
                      rows={3}
                      className="faq-page__form-textarea"
                      placeholder="Type your inquiry here..."
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="faq-page__form-submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Dispatching...' : 'Dispatch Inquiry'}</span>
                    <Send size={14} className={isSubmitting ? 'faq-page__send-icon--animating' : ''} />
                  </button>
                </form>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
