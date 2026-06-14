import { useState, useMemo } from 'react';
import './ContactPage.css';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  Calendar,
  Check,
  CheckCircle,
  Sparkles,
  Map,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const CONTACT_CARDS = [
  {
    id: 'phone',
    icon: Phone,
    label: 'DIRECT HOTLINE',
    value: '+971 50 992 4247',
    subtext: 'Available 24/7 for VIP bookings and emergency assistance.',
    link: 'tel:+971509924247',
    actionLabel: 'Call Now',
    colorClass: 'contact-card--phone'
  },
  {
    id: 'whatsapp',
    icon: MessageSquare,
    label: 'WHATSAPP CONCIERGE',
    value: '+971 50 992 4247',
    subtext: 'Chat instantly with reservations. Response in under 3 mins.',
    link: 'https://wa.me/971509924247',
    actionLabel: 'Open WhatsApp',
    colorClass: 'contact-card--whatsapp'
  },
  {
    id: 'instagram',
    icon: InstagramIcon,
    label: 'OFFICIAL SOCIALS',
    value: '@luxmotors.ae',
    subtext: 'Follow us for behind-the-scenes, reels, and new arrivals.',
    link: 'https://instagram.com/luxmotors.ae',
    actionLabel: 'Follow Us',
    colorClass: 'contact-card--instagram'
  },
  {
    id: 'email',
    icon: Mail,
    label: 'CORPORATE ENQUIRIES',
    value: 'info@luxmotors.ae',
    subtext: 'Send RFP, corporate leasing arrangements, or media requests.',
    link: 'mailto:info@luxmotors.ae',
    actionLabel: 'Send Email',
    colorClass: 'contact-card--email'
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'DUBAI SHOWROOM',
    value: 'Sheikh Zayed Rd, Dubai',
    subtext: 'Located near Oasis Mall, Al Quoz 1. Free valet parking available.',
    link: 'https://maps.google.com/?q=Oasis+Mall+Sheikh+Zayed+Road+Dubai',
    actionLabel: 'Get Directions',
    colorClass: 'contact-card--location'
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'SHOWROOM HOURS',
    value: '09:00 AM - 09:00 PM',
    subtext: 'Physical showroom open Daily. Phone support is active 24/7.',
    link: null,
    actionLabel: 'View Schedule',
    colorClass: 'contact-card--hours'
  }
];

const INQUIRY_TYPES = [
  { id: 'exotic', label: 'Supercar & Exotic Rental' },
  { id: 'chauffeur', label: 'Chauffeur Services' },
  { id: 'event', label: 'Events & Media Production' },
  { id: 'corporate', label: 'Long-term Corporate Lease' }
];

const TIME_SLOTS = [
  { id: 'morning', label: '09:00 AM - 12:00 PM', period: 'Morning' },
  { id: 'afternoon', label: '12:00 PM - 03:00 PM', period: 'Afternoon' },
  { id: 'evening', label: '03:00 PM - 06:00 PM', period: 'Evening' },
  { id: 'night', label: '06:00 PM - 09:00 PM', period: 'Night' }
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('exotic');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');
  const [requestTour, setRequestTour] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('tour') === 'true';
    }
    return false;
  });

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Generate date options for the next 4 days
  const dateOptions = useMemo(() => {
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        value: d.toISOString().split('T')[0],
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()]
      });
    }
    return dates;
  }, []);

  // Initialize selected date to today's date code
  useState(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    
    // Simulate premium dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Generate unique reservation ID
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setBookingRef(`LUX-${randomId}-DXB`);
    }, 1500);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setRequestTour(false);
  };

  return (
    <div className="contact-page">
      {/* Liquid Glass Background Orbs */}
      <div className="contact-page__bg">
        <div className="contact-page__orb contact-page__orb--1" />
        <div className="contact-page__orb contact-page__orb--2" />
        <div className="contact-page__orb contact-page__orb--3" />
        <div className="contact-page__grid" />
      </div>

      <div className="contact-page__container container">
        {/* Page Header */}
        <header className="contact-page__header">
          <div className="contact-page__tag">
            <Sparkles size={14} className="contact-page__tag-icon" />
            <span>EXECUTIVE OFFICE PORTAL</span>
          </div>
          <h1 className="contact-page__title">
            Connect With <span className="contact-page__title-gradient">Excellence</span>
          </h1>
          <p className="contact-page__subtitle">
            Whether booking an exotic supercar, arranging a corporate fleet, or scheduling a private tour of our Sheikh Zayed Road showroom, our elite concierge team is ready to serve you.
          </p>
        </header>

        {/* 6-Card Glass Grid */}
        <section className="contact-page__cards-grid">
          {CONTACT_CARDS.map((card) => {
            const CardIcon = card.icon;
            const CardTag = card.link ? 'a' : 'div';
            const extraProps = card.link ? { 
              href: card.link, 
              target: card.link.startsWith('http') ? '_blank' : undefined,
              rel: card.link.startsWith('http') ? 'noopener noreferrer' : undefined
            } : {};

            return (
              <CardTag
                key={card.id}
                className={`contact-card glass-panel ${card.colorClass} ${card.link ? 'contact-card--clickable' : ''}`}
                {...extraProps}
              >
                <div className="contact-card__glow" />
                <div className="contact-card__header">
                  <div className="contact-card__icon-wrapper">
                    <CardIcon size={20} className="contact-card__icon" />
                  </div>
                  <span className="contact-card__label">{card.label}</span>
                </div>
                <h3 className="contact-card__value">{card.value}</h3>
                <p className="contact-card__subtext">{card.subtext}</p>
                {card.link && (
                  <div className="contact-card__action">
                    <span>{card.actionLabel}</span>
                    <ChevronRight size={14} className="contact-card__arrow" />
                  </div>
                )}
              </CardTag>
            );
          })}
        </section>

        {/* Two Column Layout (Form & Map) */}
        <div className="contact-page__layout">
          {/* Contact Inquiry and Scheduler Form */}
          <section className="contact-page__form-section glass-panel">
            {isSubmitted ? (
              <div className="contact-page__success">
                <div className="contact-page__success-icon-box">
                  <CheckCircle size={38} className="contact-page__success-icon" />
                </div>
                <h2 className="contact-page__success-title">Inquiry Dispatched</h2>
                <p className="contact-page__success-desc">
                  Your inquiry has been successfully sent to the executive reservation desk. A concierge officer will contact you within 15 minutes.
                </p>
                
                <div className="contact-page__receipt glass">
                  <div className="contact-page__receipt-row">
                    <span className="contact-page__receipt-label">Inquiry ID:</span>
                    <span className="contact-page__receipt-val font-mono">{bookingRef}</span>
                  </div>
                  <div className="contact-page__receipt-row">
                    <span className="contact-page__receipt-label">Client Name:</span>
                    <span className="contact-page__receipt-val">{name}</span>
                  </div>
                  <div className="contact-page__receipt-row">
                    <span className="contact-page__receipt-label">Inquiry Type:</span>
                    <span className="contact-page__receipt-val">
                      {INQUIRY_TYPES.find(t => t.id === inquiryType)?.label || inquiryType}
                    </span>
                  </div>
                  <div className="contact-page__receipt-row">
                    <span className="contact-page__receipt-label">Scheduled Callback:</span>
                    <span className="contact-page__receipt-val">
                      {selectedDate} ({TIME_SLOTS.find(ts => ts.id === selectedTimeSlot)?.period})
                    </span>
                  </div>
                  {requestTour && (
                    <div className="contact-page__receipt-row">
                      <span className="contact-page__receipt-label">Showroom Tour:</span>
                      <span className="contact-page__receipt-val contact-page__receipt-val--gold">Requested Valet Pass</span>
                    </div>
                  )}
                </div>

                <button onClick={resetForm} className="contact-page__reset-btn">
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-page__form">
                <h2 className="contact-page__section-title">VIP Concierge Booking Desk</h2>
                <p className="contact-page__section-subtitle">
                  Fill in your requirements below. Choose to request a callback at a specific time or schedule a showroom tour.
                </p>

                {/* Selectable Inquiry Types */}
                <div className="contact-page__form-group">
                  <label className="contact-page__input-label">Select Service Class</label>
                  <div className="contact-page__inquiry-selector">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        className={`contact-page__inquiry-btn ${inquiryType === type.id ? 'contact-page__inquiry-btn--active' : ''}`}
                        onClick={() => setInquiryType(type.id)}
                      >
                        {inquiryType === type.id && <Check size={14} className="contact-page__check-icon" />}
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Grid */}
                <div className="contact-page__form-grid">
                  <div className="contact-page__form-group">
                    <label htmlFor="client-name" className="contact-page__input-label">Full Name</label>
                    <input
                      id="client-name"
                      type="text"
                      className="contact-page__input"
                      placeholder="Jane Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="contact-page__form-group">
                    <label htmlFor="client-email" className="contact-page__input-label">Email Address</label>
                    <input
                      id="client-email"
                      type="email"
                      className="contact-page__input"
                      placeholder="jane@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="contact-page__form-group contact-page__form-group--full">
                    <label htmlFor="client-phone" className="contact-page__input-label">Phone / WhatsApp Number</label>
                    <input
                      id="client-phone"
                      type="tel"
                      className="contact-page__input"
                      placeholder="+971 50 123 4567"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Calendar & Call Scheduler */}
                <div className="contact-page__form-group">
                  <label className="contact-page__input-label">
                    <Calendar size={14} style={{ marginRight: '6px' }} />
                    Preferred Callback Date
                  </label>
                  <div className="contact-page__date-selector">
                    {dateOptions.map((opt) => {
                      const isActive = selectedDate === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`contact-page__date-btn ${isActive ? 'contact-page__date-btn--active' : ''}`}
                          onClick={() => setSelectedDate(opt.value)}
                        >
                          <span className="contact-page__date-day">{opt.dayName}</span>
                          <span className="contact-page__date-num">{opt.dayNum}</span>
                          <span className="contact-page__date-month">{opt.month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="contact-page__form-group">
                  <label className="contact-page__input-label">Preferred Time Window</label>
                  <div className="contact-page__time-selector">
                    {TIME_SLOTS.map((slot) => {
                      const isActive = selectedTimeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          className={`contact-page__time-btn ${isActive ? 'contact-page__time-btn--active' : ''}`}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                        >
                          <span className="contact-page__time-label">{slot.label}</span>
                          <span className="contact-page__time-period">{slot.period}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Showroom Visit Checkbox */}
                <div className="contact-page__form-group contact-page__form-group--checkbox">
                  <label className="contact-page__checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="contact-page__checkbox"
                      checked={requestTour}
                      onChange={(e) => setRequestTour(e.target.checked)}
                    />
                    <span className="contact-page__checkbox-custom">
                      {requestTour && <Check size={12} />}
                    </span>
                    <span className="contact-page__checkbox-label">
                      Request a physical showroom tour (we will prepare a VIP Valet parking pass)
                    </span>
                  </label>
                </div>

                {/* Message */}
                <div className="contact-page__form-group">
                  <label htmlFor="client-message" className="contact-page__input-label">Specific Request / Fleet Selection (Optional)</label>
                  <textarea
                    id="client-message"
                    rows={3}
                    className="contact-page__textarea"
                    placeholder="Describe specific vehicles or event requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="contact-page__submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Requesting VIP Dispatch...' : 'Dispatch VIP Request'}</span>
                  <Send size={16} className={isSubmitting ? 'contact-page__send-icon--spinning' : ''} />
                </button>
              </form>
            )}
          </section>

          {/* Interactive Google Map side column */}
          <section className="contact-page__map-section glass-panel">
            <div className="contact-page__map-header">
              <Map size={18} className="contact-page__map-icon" />
              <div>
                <h3 className="contact-page__map-title">HQ Showroom Location</h3>
                <p className="contact-page__map-subtitle">Sheikh Zayed Road, Dubai Marina Area</p>
              </div>
            </div>

            {/* Map Wrapper Bezel */}
            <div className="contact-page__map-bezel glass">
              <iframe
                title="Lux Motors Showroom Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14448.871142512686!2d55.216399999999994!3d25.1283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6be8a3a2e7c9%3A0xcfe4b806d2036737!2sOasis%20Mall!5e0!3m2!1sen!2sae!4v1717770000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Location Notes */}
            <div className="contact-page__map-details">
              <h4 className="contact-page__details-title">VIP Arrival Information</h4>
              <ul className="contact-page__details-list">
                <li>
                  <span className="bullet" />
                  <span><strong>Complimentary Valet:</strong> Present your booking confirmation screen to the valet desk for private reserved parking.</span>
                </li>
                <li>
                  <span className="bullet" />
                  <span><strong>Metro Access:</strong> 5-minute walk from Equity Metro Station (Exit 2).</span>
                </li>
                <li>
                  <span className="bullet" />
                  <span><strong>Airport Distance:</strong> 20-minute private airport shuttle from Dubai International (DXB).</span>
                </li>
              </ul>
              <a 
                href="https://maps.google.com/?q=Oasis+Mall+Sheikh+Zayed+Road+Dubai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-page__map-link"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
