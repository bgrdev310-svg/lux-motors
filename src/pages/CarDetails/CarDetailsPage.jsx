import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './CarDetailsPage.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useFleetStore } from '../../hooks/useFleetStore';
import { toCarDetailsShape, toCarCardShape, DEFAULT_FLEET } from '../../data/defaultFleet';

import {
  Heart,
  Share2,
  Calendar,
  Check,
  ChevronRight,
  Shield,
  Smartphone,
  Gauge,
  Zap,
  Cog,
  User,
  Fuel,
  Info,
  CheckCircle,
  HelpCircle,
  Phone,
  MessageSquare,
  Compass,
  X,
  ChevronLeft,
  Maximize2
} from 'lucide-react';

import CarCard from '../../components/CarCard/CarCard';

export default function CarDetailsPage() {
  const { slug: routeSlug } = useParams();
  const { cars: fleetCars, getBySlug } = useFleetStore();
  const [slug, setSlug] = useState('');
  
  // States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Booking inputs
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const sidebarRef = useRef(null);

  // Extract slug on mount or URL change
  useEffect(() => {
    const carSlug = routeSlug || 'lamborghini-aventador';
    setSlug(carSlug);
    setActiveImageIndex(0);
    setIsLiked(localStorage.getItem(`liked-${carSlug}`) === 'true');
  }, [routeSlug]);

  // Find car details from fleet store
  const car = useMemo(() => {
    const found = getBySlug(slug) || getBySlug(routeSlug || '');
    return toCarDetailsShape(found) || toCarDetailsShape(DEFAULT_FLEET[0]);
  }, [slug, routeSlug, fleetCars, getBySlug]);

  // Scroll reveal reference
  const detailsRef = useScrollReveal({}, [slug]);

  // Image navigation helpers
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  // Pre-fill date based on duration tier selection
  const handleSelectDurationTier = (daysTier) => {
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + daysTier);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    setPickupDate(formatDate(today));
    setReturnDate(formatDate(targetDate));
  };

  // Calculate rental duration & invoice fees
  const billingInfo = useMemo(() => {
    if (!pickupDate || !returnDate) return null;
    
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    
    if (isNaN(start) || isNaN(end) || end < start) return null;
    
    // Difference in milliseconds, convert to days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day

    let discountPercentage = 0;
    if (diffDays >= 30) {
      discountPercentage = 0.30; // 30% Monthly Discount
    } else if (diffDays >= 7) {
      discountPercentage = 0.15; // 15% Weekly Discount
    }

    const basePrice = car.basePrice;
    const dailyRateAfterDiscount = basePrice * (1 - discountPercentage);
    const rawTotal = dailyRateAfterDiscount * diffDays;
    
    const vat = rawTotal * 0.05; // 5% VAT
    const totalPayable = rawTotal + vat;
    const securityDeposit = car.deposit;

    return {
      days: diffDays,
      dailyRate: basePrice,
      discountedDailyRate: dailyRateAfterDiscount,
      discountPercent: discountPercentage * 100,
      discountAmount: basePrice * discountPercentage * diffDays,
      subtotal: rawTotal,
      vat,
      total: totalPayable,
      deposit: securityDeposit
    };
  }, [pickupDate, returnDate, car]);

  const activeTier = useMemo(() => {
    if (!billingInfo) return 0;
    const days = billingInfo.days;
    if (days >= 30) return 3;
    if (days >= 7) return 2;
    return 1;
  }, [billingInfo]);

  // Tall sidebar: scroll with page until fully visible, then stick
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const updateStickyTop = () => {
      const height = sidebar.getBoundingClientRect().height;
      const stickyTop = Math.min(120, window.innerHeight - height - 24);
      sidebar.style.setProperty('--sidebar-sticky-top', `${stickyTop}px`);
    };

    updateStickyTop();

    const observer = new ResizeObserver(updateStickyTop);
    observer.observe(sidebar);
    window.addEventListener('resize', updateStickyTop);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateStickyTop);
    };
  }, [slug, billingInfo]);

  // Trigger brief alert notifications
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Like Toggle
  const handleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    localStorage.setItem(`liked-${car.slug}`, String(nextState));
    triggerToast(nextState ? `Saved ${car.name} to VIP Favorites!` : `Removed ${car.name} from Favorites.`);
  };

  // Share Link Copies
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('Secure VIP link copied to clipboard!');
  };

  const handleRequestReservation = () => {
    const randomId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      id: randomId,
      carSlug: car.slug,
      carName: car.name,
      pickupDate: pickupDate || new Date().toISOString().split('T')[0],
      returnDate: returnDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      days: billingInfo?.days || 1,
      totalCost: billingInfo?.total || (car.basePrice * 1.05),
      deposit: billingInfo?.deposit || car.deposit,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    const currentReqs = JSON.parse(localStorage.getItem('carRequests') || '[]');
    currentReqs.unshift(newRequest);
    localStorage.setItem('carRequests', JSON.stringify(currentReqs));
  };

  // Pre-fill WhatsApp message
  const whatsappUrl = useMemo(() => {
    const number = '971509924247';
    let msg = `Hello Lux Motors DXB! I am interested in renting the ${car.name}.`;
    
    if (billingInfo) {
      msg += `\n\n- Pickup Date: ${pickupDate}\n- Return Date: ${returnDate}\n- Duration: ${billingInfo.days} Days\n- Total Rental Fee: ${billingInfo.total.toLocaleString()} AED (Excluding refundable deposit of ${billingInfo.deposit.toLocaleString()} AED).`;
    }
    
    msg += `\n\nPlease let me know if this vehicle is available. Thank you!`;
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  }, [car, billingInfo, pickupDate, returnDate]);

  // Related Cars display list
  const relatedCars = useMemo(() => {
    return fleetCars
      .filter((c) => c.slug !== car.slug && c.visible !== false)
      .slice(0, 3)
      .map(toCarCardShape);
  }, [fleetCars, car.slug]);

  // Set today's date limit on calendar inputs
  const todayDateStr = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // Handle Lightbox keyboard events
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      else if (e.key === 'ArrowRight') handleNextImage();
      else if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, activeImageIndex, car.images]);

  return (
    <div className="car-details-page" ref={detailsRef}>
      {/* Liquid Glass Background Orbs */}
      <div className="car-details-page__bg">
        <div className="car-details-page__orb car-details-page__orb--1" />
        <div className="car-details-page__orb car-details-page__orb--2" />
        <div className="car-details-page__orb car-details-page__orb--3" />
        <div className="car-details-page__grid" />
      </div>

      {/* Floating Toast Notification */}
      <div className={`details-toast glass ${showToast ? 'details-toast--visible' : ''}`}>
        <CheckCircle size={16} className="details-toast__icon" />
        <span>{toastMessage}</span>
      </div>

      <div className="car-details-page__container container">
        {/* Breadcrumbs */}
        <nav className="car-details-page__breadcrumbs">
          <a href="/">Home</a>
          <ChevronRight size={12} />
          <a href="/fleet">Fleet</a>
          <ChevronRight size={12} />
          <span className="active">{car.name}</span>
        </nav>

        {/* Header Title Grid */}
        <header className="car-details-page__header">
          <div className="car-details-page__title-col">
            <div className="car-details-page__tags">
              <span className="car-details-page__cat-tag">{car.category}</span>
              <span className="car-details-page__avail-tag">
                <span className="pulse-dot" />
                {car.availability}
              </span>
            </div>
            <h1 className="car-details-page__title">
              {car.brand} <span className="title-name">{car.name.replace(car.brand + ' ', '')}</span>
            </h1>
          </div>

          <div className="car-details-page__actions">
            <button 
              className={`action-btn glass ${isLiked ? 'action-btn--liked' : ''}`}
              onClick={handleLike}
              aria-label="Like vehicle"
            >
              <Heart size={18} fill={isLiked ? 'var(--accent)' : 'none'} />
              <span>{isLiked ? 'VIP Saved' : 'Save'}</span>
            </button>
            <button 
              className="action-btn glass" 
              onClick={handleShare}
              aria-label="Share vehicle details"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="car-details-page__layout">
          
          {/* LEFT COLUMN: Slideshow, Specs, Description, FAQs */}
          <div className="car-details-page__main">
            {/* Gallery Slideshow */}
            <div className="car-gallery glass-panel">
              <div className="car-gallery__viewport" onClick={() => setIsLightboxOpen(true)} style={{ cursor: 'zoom-in', position: 'relative' }}>
                <img 
                  src={car.images[activeImageIndex]} 
                  alt={`${car.name} showcase`} 
                  className="car-gallery__main-img"
                  key={activeImageIndex}
                />
                <button 
                  type="button"
                  className="gallery-zoom-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  aria-label="View fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="car-gallery__thumbs">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`car-gallery__thumb-btn glass ${activeImageIndex === idx ? 'car-gallery__thumb-btn--active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Specification Grid Cards */}
            <section className="car-specs">
              <h2 className="car-details-page__section-title">Technical Specifications</h2>
              <div className="car-specs__grid">
                <div className="spec-tile glass-widget">
                  <Zap size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Maximum Power</span>
                    <strong className="spec-tile__value">{car.specs.power}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <Gauge size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Acceleration</span>
                    <strong className="spec-tile__value">{car.specs.acceleration}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <Cog size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Engine Configuration</span>
                    <strong className="spec-tile__value">{car.specs.engine}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <Shield size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Transmission Gearbox</span>
                    <strong className="spec-tile__value">{car.specs.gearbox}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <User size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Seating Capacity</span>
                    <strong className="spec-tile__value">{car.specs.seats}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <Compass size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Drive Train Type</span>
                    <strong className="spec-tile__value">{car.specs.driveType}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <Fuel size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Required Fuel Grade</span>
                    <strong className="spec-tile__value">{car.specs.fuel}</strong>
                  </div>
                </div>
                <div className="spec-tile glass-widget">
                  <Info size={18} className="spec-tile__icon" />
                  <div>
                    <span className="spec-tile__label">Max Rated Speed</span>
                    <strong className="spec-tile__value">{car.specs.topSpeed}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Description Paragraph */}
            <section className="car-description glass-panel">
              <h2 className="car-details-page__section-title">The Driver's Review</h2>
              <p>{car.description}</p>
            </section>

            {/* Rental Requirements cards */}
            <section className="car-requirements">
              <h2 className="car-details-page__section-title">Rental Eligibility Guidelines</h2>
              <div className="car-requirements__grid">
                
                {/* Age & Deposit */}
                <div className="requirement-card glass-widget">
                  <h3 className="requirement-card__title">Age & Deposit Holds</h3>
                  <ul className="requirement-card__list">
                    <li>
                      <Check size={14} className="req-check" />
                      <span><strong>Minimum Age:</strong> {car.requirements.age} Years Old.</span>
                    </li>
                    <li>
                      <Check size={14} className="req-check" />
                      <span><strong>Security Deposit Hold:</strong> {car.deposit.toLocaleString()} AED.</span>
                    </li>
                    <li className="list-note">
                      <span>Held on a credit card pre-authorization and fully released in 21-30 business days.</span>
                    </li>
                  </ul>
                </div>

                {/* Resident Documents */}
                <div className="requirement-card glass-widget">
                  <h3 className="requirement-card__title">UAE Residents</h3>
                  <ul className="requirement-card__list">
                    {car.requirements.residents.map((item, idx) => (
                      <li key={idx}>
                        <Check size={14} className="req-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tourist Documents */}
                <div className="requirement-card glass-widget">
                  <h3 className="requirement-card__title">International Tourists</h3>
                  <ul className="requirement-card__list">
                    {car.requirements.tourists.map((item, idx) => (
                      <li key={idx}>
                        <Check size={14} className="req-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </section>

            {/* Specific FAQs accordions */}
            <section className="car-faqs">
              <h2 className="car-details-page__section-title">Model-Specific Questions</h2>
              <div className="car-faqs__list">
                {car.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`car-faq-item ${isOpen ? 'car-faq-item--open' : ''}`}
                    >
                      <button 
                        className="car-faq-item__header"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      >
                        <span>{faq.q}</span>
                        <ChevronRight size={16} className="car-faq-item__arrow" />
                      </button>
                      <div className="car-faq-item__answer-wrapper">
                        <div className="car-faq-item__answer">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Reservation Billing Sidebar */}
          <aside className="car-details-page__sidebar" ref={sidebarRef}>
            <div className="reservation-box glass-panel">
              
              {/* Top Rate List */}
              <div className="reservation-box__rates">
                <span className="rate-title">VIP RENTAL SCALE</span>
                <button
                  type="button"
                  className={`rate-row ${(!billingInfo || activeTier === 1) ? 'rate-row--active' : ''}`}
                  onClick={() => handleSelectDurationTier(1)}
                >
                  <span>1 - 6 Days</span>
                  <strong>{car.basePrice.toLocaleString()} AED <small>/ day</small></strong>
                </button>
                <button
                  type="button"
                  className={`rate-row ${(activeTier === 2) ? 'rate-row--active' : ''}`}
                  onClick={() => handleSelectDurationTier(7)}
                >
                  <span>7 - 29 Days (15% off)</span>
                  <strong>{Math.floor(car.basePrice * 0.85).toLocaleString()} AED <small>/ day</small></strong>
                </button>
                <button
                  type="button"
                  className={`rate-row ${(activeTier === 3) ? 'rate-row--active' : ''}`}
                  onClick={() => handleSelectDurationTier(30)}
                >
                  <span>30+ Days (30% off)</span>
                  <strong>{Math.floor(car.basePrice * 0.70).toLocaleString()} AED <small>/ day</small></strong>
                </button>
              </div>

              {/* Form Input fields */}
              <form className="reservation-box__form" onSubmit={(e) => e.preventDefault()}>
                <div className="reservation-box__input-group">
                  <label htmlFor="pickup-date" className="input-label">
                    <Calendar size={12} style={{ marginRight: '6px' }} />
                    Select Pickup Date
                  </label>
                  <input
                    id="pickup-date"
                    type="date"
                    min={todayDateStr}
                    className="reservation-input"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div className="reservation-box__input-group">
                  <label htmlFor="return-date" className="input-label">
                    <Calendar size={12} style={{ marginRight: '6px' }} />
                    Select Return Date
                  </label>
                  <input
                    id="return-date"
                    type="date"
                    min={pickupDate || todayDateStr}
                    className="reservation-input"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>

                {/* Cost Estimator Invoice Details */}
                {billingInfo ? (
                  <div className="invoice animate-fade-in">
                    <h4 className="invoice__title">Invoice Estimate</h4>
                    <div className="invoice__body">
                      <div className="invoice__row">
                        <span>Duration:</span>
                        <span>{billingInfo.days} Days</span>
                      </div>
                      <div className="invoice__row">
                        <span>Daily Rate:</span>
                        <span>{billingInfo.discountedDailyRate.toLocaleString()} AED / day</span>
                      </div>
                      {billingInfo.discountAmount > 0 && (
                        <div className="invoice__row invoice__row--gold">
                          <span>Volume Discount ({billingInfo.discountPercent}%):</span>
                          <span>-{billingInfo.discountAmount.toLocaleString()} AED</span>
                        </div>
                      )}
                      <div className="invoice__row">
                        <span>Taxes (5% VAT):</span>
                        <span>{billingInfo.vat.toLocaleString()} AED</span>
                      </div>
                      <div className="invoice__row invoice__row--divider">
                        <span>Refundable Security Deposit:</span>
                        <span>{billingInfo.deposit.toLocaleString()} AED</span>
                      </div>
                      <div className="invoice__row invoice__row--total">
                        <span>Total Rental Cost:</span>
                        <strong>{billingInfo.total.toLocaleString()} AED</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="reservation-box__help glass">
                    <Info size={14} className="help-icon" />
                    <span>Choose pickup and return dates to inspect custom price invoices.</span>
                  </div>
                )}

                {/* Submit Booking trigger */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reservation-submit-btn"
                  onClick={handleRequestReservation}
                >
                  <span>Request VIP Reservation</span>
                  <MessageSquare size={16} />
                </a>
              </form>

              {/* Concierge support channels */}
              <div className="reservation-box__support">
                <span>Direct Hotline Support (24/7)</span>
                <div className="support-links">
                  <a href="tel:+971509924247" className="support-link">
                    <Phone size={12} />
                    <span>+971 50 992 4247</span>
                  </a>
                </div>
              </div>

            </div>
          </aside>

        </div>

        {/* You May Also Like Related Fleet */}
        <section className="car-related">
          <div className="car-related__header">
            <span className="section-label">RECOMMENDATIONS</span>
            <h2 className="section-title">
              You May <span className="accent">Also Like</span>
            </h2>
          </div>
          
          <div className="car-related__grid">
            {relatedCars.map((related, idx) => (
              <CarCard car={related} index={idx} key={related.slug} />
            ))}
          </div>
        </section>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-modal" onClick={() => setIsLightboxOpen(false)}>
          <button 
            type="button"
            className="lightbox-close" 
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <button 
            type="button"
            className="lightbox-nav lightbox-nav--prev" 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={car.images[activeImageIndex]} 
              alt={`${car.name} fullscreen`} 
              className="lightbox-img" 
            />
            <div className="lightbox-caption">
              <span>{car.name} — Photo {activeImageIndex + 1} of {car.images.length}</span>
            </div>
          </div>
          
          <button 
            type="button"
            className="lightbox-nav lightbox-nav--next" 
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="lightbox-thumbnails" onClick={(e) => e.stopPropagation()}>
            {car.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`lightbox-thumb ${activeImageIndex === idx ? 'lightbox-thumb--active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
