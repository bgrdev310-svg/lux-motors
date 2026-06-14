import { useState, useEffect, useMemo } from 'react';
import './GalleryPage.css';

// Import local assets
import studioUrus from '../../assets/images/studio-urus.webp';
import studioFerrari from '../../assets/images/studio-ferrari.webp';
import studioLambo from '../../assets/images/studio-lamborghini.webp';
import studioPorsche from '../../assets/images/studio-porsche.webp';
import studioRolls from '../../assets/images/studio-rollsroyce.webp';
import locPalm from '../../assets/images/loc-palm-jumeirah.webp';
import locAbuDhabi from '../../assets/images/loc-abu-dhabi.webp';
import locSharjah from '../../assets/images/loc-sharjah.webp';
import locUmmAlQuwain from '../../assets/images/loc-umm-al-quwain.webp';

import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  MapPin,
  Eye,
  Calendar,
  Image as ImageIcon,
  Compass,
  Award
} from 'lucide-react';

const GALLERY_ITEMS = [
  // Showroom category
  {
    id: 1,
    title: 'Lamborghini Urus S Display',
    category: 'showroom',
    image: studioUrus,
    description: 'Nero Noctis Urus S taking center stage in our temperature-controlled Sheikh Zayed Road gallery.',
    location: 'SZR Showroom, Dubai',
    date: 'June 2026'
  },
  {
    id: 2,
    title: 'Ferrari F8 Detailing',
    category: 'showroom',
    image: studioFerrari,
    description: 'Rosso Corsa F8 Tributo undergoing fine optical polishing under clinical LED lighting bays.',
    location: 'Detailing Studio, Dubai',
    date: 'May 2026'
  },
  {
    id: 3,
    title: 'VIP Lounge & Reception',
    category: 'showroom',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200',
    description: 'Frosted liquid-glass coffee lounge where VIP clients customize contract terms and select custom drops.',
    location: 'SZR HQ Lounge, Dubai',
    date: 'June 2026'
  },

  // Fleet category
  {
    id: 4,
    title: 'Lamborghini Aventador SVJ',
    category: 'fleet',
    image: studioLambo,
    description: 'Aventador SVJ with aggressive styling, ready to command the roads of Dubai.',
    location: 'HQ Studio, Dubai',
    date: 'June 2026'
  },
  {
    id: 5,
    title: 'Porsche 911 Turbo S',
    category: 'fleet',
    image: studioPorsche,
    description: 'GT Silver 911 Turbo S capturing raw performance stance in our private media room.',
    location: 'HQ Studio, Dubai',
    date: 'April 2026'
  },
  {
    id: 6,
    title: 'Rolls-Royce Ghost Black Badge',
    category: 'fleet',
    image: studioRolls,
    description: 'The epitome of high-class luxury, the Black Badge edition Ghost sitting in our inspection bay.',
    location: 'Elite Gallery, Dubai',
    date: 'May 2026'
  },

  // Deliveries category
  {
    id: 7,
    title: 'VIP Handover Ceremony',
    category: 'deliveries',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200',
    description: 'Official handover of a bespoke supercar key fob to an international client at our Dubai Marina office.',
    location: 'Dubai Marina Office, UAE',
    date: 'June 2026'
  },
  {
    id: 8,
    title: 'Supercar Reveal Event',
    category: 'deliveries',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200',
    description: 'Unveiling a wrapped custom-ordered vehicle delivered directly to a client hotel suite entrance.',
    location: 'Atlantis The Royal, Dubai',
    date: 'June 2026'
  },

  // UAE Road Trips category
  {
    id: 9,
    title: 'Palm Jumeirah Sunset Drive',
    category: 'roadtrips',
    image: locPalm,
    description: 'A scenic coastal cruise along the crescent of Palm Jumeirah in a luxury convertible.',
    location: 'Palm Jumeirah, Dubai',
    date: 'May 2026'
  },
  {
    id: 10,
    title: 'Abu Dhabi Highway Cruise',
    category: 'roadtrips',
    image: locAbuDhabi,
    description: 'Experiencing the open straight-aways linking Dubai to Abu Dhabi near Yas Island.',
    location: 'E11 Highway, UAE',
    date: 'April 2026'
  },
  {
    id: 11,
    title: 'Sharjah Heritage Drive',
    category: 'roadtrips',
    image: locSharjah,
    description: 'Capturing heritage architectural backdrops during a luxury weekend road trip.',
    location: 'Al Noor Island, Sharjah',
    date: 'May 2026'
  },
  {
    id: 12,
    title: 'Desert Mountain Road Trip',
    category: 'roadtrips',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',
    description: 'Sun-drenched winding desert mountain roads showing the extreme handling of our high-end vehicles.',
    location: 'Jebel Jais, Ras Al Khaimah',
    date: 'June 2026'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'fleet', label: 'Our Fleet' },
  { id: 'showroom', label: 'Showroom & Studio' },
  { id: 'deliveries', label: 'VIP Deliveries' },
  { id: 'roadtrips', label: 'UAE Road Trips' }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null); // Null means closed

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Handle lightbox navigation
  const openLightbox = (id) => {
    const idx = GALLERY_ITEMS.findIndex(item => item.id === id);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = (e) => {
    e?.stopPropagation();
    setLightboxIndex(prev => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  // Bind Keyboard Listeners for Accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxIndex]);

  const activeLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <div className="gallery-page">
      {/* Liquid Glass Background Orbs */}
      <div className="gallery-page__bg">
        <div className="gallery-page__orb gallery-page__orb--1" />
        <div className="gallery-page__orb gallery-page__orb--2" />
        <div className="gallery-page__orb gallery-page__orb--3" />
        <div className="gallery-page__grid" />
      </div>

      <div className="gallery-page__container container">
        {/* Page Header */}
        <header className="gallery-page__header">
          <div className="gallery-page__tag">
            <Sparkles size={14} className="gallery-page__tag-icon" />
            <span>THE VISUAL ARCHIVE</span>
          </div>
          <h1 className="gallery-page__title">
            Our Luxury <span className="gallery-page__title-gradient">Gallery</span>
          </h1>
          <p className="gallery-page__subtitle">
            Immerse yourself in our premium showroom, check our high-performance fleet, 
            and experience the thrill of VIP delivery handovers across the UAE.
          </p>

          {/* Glass Category Selector */}
          <nav className="gallery-page__categories glass-panel">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`gallery-page__cat-btn ${activeCategory === cat.id ? 'gallery-page__cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {activeCategory === cat.id && <Sparkles size={12} className="gallery-page__btn-sparkle" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>
        </header>

        {/* Masonry-style Gallery Grid */}
        <section className="gallery-page__grid-container">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-card glass-panel"
              onClick={() => openLightbox(item.id)}
            >
              <div className="gallery-card__image-container">
                <img src={item.image} alt={item.title} className="gallery-card__image" loading="lazy" />
                <div className="gallery-card__overlay" />
                
                {/* Visual Glass Tag */}
                <span className="gallery-card__category-badge">
                  {CATEGORIES.find(c => c.id === item.category)?.label || item.category}
                </span>

                {/* Hover Details */}
                <div className="gallery-card__details">
                  <span className="gallery-card__loc">
                    <MapPin size={12} style={{ marginRight: '4px' }} />
                    {item.location}
                  </span>
                  <h3 className="gallery-card__name">{item.title}</h3>
                  <div className="gallery-card__zoom-btn">
                    <Eye size={16} />
                    <span>Expand</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Showroom Virtual Experience Deck */}
        <section className="gallery-page__experience">
          <div className="gallery-page__exp-header">
            <span className="section-label">Showroom Experience</span>
            <h2 className="section-title">
              Visit Our <span className="accent">HQ Showroom</span>
            </h2>
            <p className="gallery-page__exp-desc">
              Get behind the wheel. Experience standard VIP amenities designed specifically for our luxury car rental clients.
            </p>
          </div>

          <div className="gallery-page__exp-grid">
            <div className="exp-card glass-panel">
              <div className="exp-card__glow" />
              <div className="exp-card__header">
                <div className="exp-card__icon-box">
                  <Compass size={20} />
                </div>
                <h3 className="exp-card__title">Executive Lounge</h3>
              </div>
              <p className="exp-card__text">
                Enjoy espresso and luxury refreshments in our private lounge while our consultants customize your rental contract parameters.
              </p>
            </div>

            <div className="exp-card glass-panel">
              <div className="exp-card__glow" />
              <div className="exp-card__header">
                <div className="exp-card__icon-box">
                  <Award size={20} />
                </div>
                <h3 className="exp-card__title">Diagnostic Bays</h3>
              </div>
              <p className="exp-card__text">
                Every vehicle undergoes full engine diagnostics and detailed hand-washing under clean showroom lighting before dispatch.
              </p>
            </div>

            <div className="exp-card glass-panel">
              <div className="exp-card__glow" />
              <div className="exp-card__header">
                <div className="exp-card__icon-box">
                  <ImageIcon size={20} />
                </div>
                <h3 className="exp-card__title">Supercar Displays</h3>
              </div>
              <p className="exp-card__text">
                Browse our collection of 50+ Lamborghinis, Ferraris, Rolls-Royces, and high-performance SUVs in our temperature-controlled showroom.
              </p>
            </div>
          </div>

          <div className="gallery-page__cta">
            <a href="/contact?tour=true" className="gallery-page__cta-btn">
              <span>Schedule VIP Showroom Tour</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </section>
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {activeLightboxItem && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox__backdrop" />
          
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close Lightbox">
            <X size={24} />
          </button>

          <button className="lightbox__nav lightbox__nav--prev" onClick={prevSlide} aria-label="Previous Slide">
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title}
              className="lightbox__image"
            />
            
            {/* Info Drawer Panel */}
            <div className="lightbox__drawer glass">
              <div className="lightbox__drawer-header">
                <h2 className="lightbox__drawer-title">{activeLightboxItem.title}</h2>
                <span className="lightbox__drawer-tag">
                  {CATEGORIES.find(c => c.id === activeLightboxItem.category)?.label}
                </span>
              </div>
              <p className="lightbox__drawer-desc">{activeLightboxItem.description}</p>
              
              <div className="lightbox__drawer-meta">
                <span className="lightbox__meta-item">
                  <MapPin size={12} style={{ marginRight: '4px' }} />
                  {activeLightboxItem.location}
                </span>
                <span className="lightbox__meta-item">
                  <Calendar size={12} style={{ marginRight: '4px' }} />
                  {activeLightboxItem.date}
                </span>
              </div>
            </div>
          </div>

          <button className="lightbox__nav lightbox__nav--next" onClick={nextSlide} aria-label="Next Slide">
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}
