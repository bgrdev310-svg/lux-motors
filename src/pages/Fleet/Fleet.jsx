import { useState, useEffect, useRef } from 'react';
import './Fleet.css';
import CarCard from '../../components/CarCard/CarCard';
import { ArrowUpRight, Compass, Sparkles, Search, SlidersHorizontal, X, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { brands } from '../../data/brands';

// Import local car assets directly for use in the interactive studio
import lamborghiniImg from '../../assets/images/car-lamborghini.png';
import ferrariImg from '../../assets/images/car-ferrari.png';
import rollsRoyceImg from '../../assets/images/car-rollsroyce.png';
import porscheImg from '../../assets/images/car-porsche.png';
import urusImg from '../../assets/images/hero-car.png';

// Import generated full-width studio background images
import studioLamborghiniImg from '../../assets/images/studio-lamborghini.png';
import studioFerrariImg from '../../assets/images/studio-ferrari.png';
import studioRollsRoyceImg from '../../assets/images/studio-rollsroyce.png';
import studioPorscheImg from '../../assets/images/studio-porsche.png';
import studioUrusImg from '../../assets/images/studio-urus.png';

// Setup detailed data model for the premium interactive studio
const studioCars = [
  {
    id: 1,
    name: 'Lamborghini Aventador SVJ',
    tagline: 'The Pinnacle of V12 Raw Performance',
    brand: 'LAMBORGHINI',
    category: 'SuperSport',
    image: lamborghiniImg,
    studioImage: studioLamborghiniImg,
    price: 5000,
    currency: 'AED',
    period: 'day',
    themeColor: '#ffd700', // Gold/yellow glow
    themeRgb: '201, 168, 76', // For RGBA opacity
    gearbox: '7-Speed ISR Automatic',
    year: '2023',
    specs: {
      power: 770,
      powerUnit: 'HP',
      acceleration: 2.8,
      accelerationUnit: 's',
      topSpeed: 350,
      topSpeedUnit: 'km/h',
      engine: '6.5L V12'
    },
    hotspots: [
      { x: 30, y: 55, title: 'Naturally Aspirated V12', desc: '6.5-liter engine delivering 770 hp at 8,500 rpm with a spine-tingling exhaust note.' },
      { x: 65, y: 70, title: 'Carbon Ceramic Brakes', desc: '400mm front discs with 6-piston calipers, stopping from 100-0 km/h in just 30 meters.' },
      { x: 80, y: 40, title: 'ALA 2.0 Aerodynamics', desc: 'Active aero flaps on the front splitter and rear wing adjust in 500ms for optimal downforce.' }
    ],
    slug: 'lamborghini-aventador'
  },
  {
    id: 2,
    name: 'Ferrari 488 GTB',
    tagline: 'Exquisite Balance of Power and Control',
    brand: 'FERRARI',
    category: 'Sport',
    image: ferrariImg,
    studioImage: studioFerrariImg,
    price: 4000,
    currency: 'AED',
    period: 'day',
    themeColor: '#ff2800', // Ferrari Red
    themeRgb: '239, 68, 68',
    gearbox: '7-Speed F1 Dual-Clutch',
    year: '2022',
    specs: {
      power: 670,
      powerUnit: 'HP',
      acceleration: 3.0,
      accelerationUnit: 's',
      topSpeed: 330,
      topSpeedUnit: 'km/h',
      engine: '3.9L Twin-Turbo V8'
    },
    hotspots: [
      { x: 50, y: 35, title: 'Twin-Turbo V8', desc: 'Mid-rear mounted V8 delivering zero turbo lag and a rich, harmonic Ferrari sound.' },
      { x: 22, y: 62, title: 'Forged Rims', desc: 'Ultra-light forged wheels reducing unsprung mass for blistering cornering response.' },
      { x: 85, y: 55, title: 'Slip Angle Control', desc: 'Advanced active differential that calculates slip angle to maximize exit speed.' }
    ],
    slug: 'ferrari-488-gtb'
  },
  {
    id: 3,
    name: 'Rolls-Royce Ghost',
    tagline: 'The Pinnacle of Quiet Luxury and Serenity',
    brand: 'ROLLS-ROYCE',
    category: 'Luxury',
    image: rollsRoyceImg,
    studioImage: studioRollsRoyceImg,
    price: 4500,
    currency: 'AED',
    period: 'day',
    themeColor: '#8a2be2', // Deep Purple
    themeRgb: '139, 92, 246',
    gearbox: '8-Speed Automatic',
    year: '2023',
    specs: {
      power: 571,
      powerUnit: 'HP',
      acceleration: 4.8,
      accelerationUnit: 's',
      topSpeed: 250,
      topSpeedUnit: 'km/h',
      engine: '6.75L Twin-Turbo V12'
    },
    hotspots: [
      { x: 20, y: 50, title: 'Pantheon Grille', desc: 'Subtly illuminated chrome structure flanked by advanced laser headlights with 600m range.' },
      { x: 45, y: 40, title: 'Planar Suspension', desc: 'Continuously variable dampers and upper-wishbone dampening for a true "magic carpet ride".' },
      { x: 75, y: 35, title: 'Starlight Headliner', desc: '1,500 individual fiber optic stars hand-woven into the black leather ceiling.' }
    ],
    slug: 'rolls-royce-ghost'
  },
  {
    id: 4,
    name: 'Porsche 911 GT3',
    tagline: 'Born on the Track. Built for the Road.',
    brand: 'PORSCHE',
    category: 'Sport',
    image: porscheImg,
    studioImage: studioPorscheImg,
    price: 3000,
    currency: 'AED',
    period: 'day',
    themeColor: '#00f2fe', // Cool Cyan
    themeRgb: '6, 182, 212',
    gearbox: '7-Speed PDK Automatic',
    year: '2023',
    specs: {
      power: 502,
      powerUnit: 'HP',
      acceleration: 3.4,
      accelerationUnit: 's',
      topSpeed: 318,
      topSpeedUnit: 'km/h',
      engine: '4.0L Flat-6 Boxer'
    },
    hotspots: [
      { x: 80, y: 30, title: 'Swan-Neck Rear Wing', desc: 'Suspended mount design generating 150% more downforce than the previous GT3 model.' },
      { x: 28, y: 50, title: 'Dual-Vent Hood', desc: 'Lightweight carbon-fiber hood venting hot air to maintain aerodynamic stability.' },
      { x: 68, y: 72, title: 'Rear-Wheel Steering', desc: 'Electromechanical steering that turns rear wheels up to 2 degrees for high-speed stability.' }
    ],
    slug: 'porsche-911-gt3'
  },
  {
    id: 5,
    name: 'Lamborghini Urus Performante',
    tagline: 'The Ultimate Super Sports SUV',
    brand: 'LAMBORGHINI',
    category: 'SUV',
    image: urusImg,
    studioImage: studioUrusImg,
    price: 3500,
    currency: 'AED',
    period: 'day',
    themeColor: '#10b981', // Green/emerald
    themeRgb: '16, 185, 129',
    gearbox: '8-Speed Automatic',
    year: '2024',
    specs: {
      power: 666,
      powerUnit: 'HP',
      acceleration: 3.6,
      accelerationUnit: 's',
      topSpeed: 305,
      topSpeedUnit: 'km/h',
      engine: '4.0L Twin-Turbo V8'
    },
    hotspots: [
      { x: 30, y: 48, title: 'Twin-Turbo V8 Power', desc: 'Unleashing 666 horsepower and 850 Nm of torque, pushing from 0-100 km/h in a supercar-like 3.6s.' },
      { x: 70, y: 55, title: 'Carbon Aero Roof', desc: 'Performante exclusive lightweight visible carbon fiber roof lowering the center of gravity.' },
      { x: 48, y: 72, title: 'Akrapovič Exhaust', desc: 'Titanium sport exhaust system producing a deep, resonant growl in Corsa track mode.' }
    ],
    slug: 'lamborghini-urus'
  }
];

// Helper Custom Hook to perform count-up animations on number changes
function useCountUp(target, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(target);
    if (isNaN(end)) {
      setCount(target);
      return;
    }

    if (end === count) return;

    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      // Format to 1 decimal place if it has a decimal, otherwise integer
      if (end % 1 === 0) {
        setCount(Math.floor(current));
      } else {
        setCount(parseFloat(current.toFixed(1)));
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    start = count;
    requestAnimationFrame(update);
  }, [target]);

  return count;
}

// Sub-component to render animated dynamic specification statistics
function DynamicStat({ value, unit }) {
  const displayVal = useCountUp(value);
  return (
    <span className="fleet-studio__spec-num">
      {displayVal}
      {unit && <span className="fleet-studio__spec-num-unit">{unit}</span>}
    </span>
  );
}

export default function Fleet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Swipe Gesture Handling refs and handlers
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // pixels
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left -> Next car
        setActiveIndex((prev) => (prev + 1) % studioCars.length);
        setActiveHotspot(null);
      } else {
        // Swipe right -> Previous car
        setActiveIndex((prev) => (prev - 1 + studioCars.length) % studioCars.length);
        setActiveHotspot(null);
      }
    }
  };

  
  // Advanced Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minPower, setMinPower] = useState(500);
  const [selectedGearbox, setSelectedGearbox] = useState('All');
  const [selectedEngine, setSelectedEngine] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Dropdown open states
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [gearboxDropdownOpen, setGearboxDropdownOpen] = useState(false);
  const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // Dropdown refs for click-outside detection
  const brandRef = useRef(null);
  const gearboxRef = useRef(null);
  const engineRef = useRef(null);
  const yearRef = useRef(null);

  const studioRef = useRef(null);

  // Click outside dropdowns listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setBrandDropdownOpen(false);
      }
      if (gearboxRef.current && !gearboxRef.current.contains(event.target)) {
        setGearboxDropdownOpen(false);
      }
      if (engineRef.current && !engineRef.current.contains(event.target)) {
        setEngineDropdownOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const gridSectionRef = useScrollReveal({}, [
    activeCategory,
    searchTerm,
    selectedBrands,
    minPrice,
    maxPrice,
    minPower,
    selectedGearbox,
    selectedEngine,
    selectedYear
  ]);

  const activeCar = studioCars[activeIndex];

  // Parallax tilt effect on mouse movement
  const handleMouseMove = (e) => {
    if (!studioRef.current) return;
    const rect = studioRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5
    setParallax({
      x: x * 20, // max 20px translation horizontally
      y: y * 15  // max 15px translation vertically
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Close hotspots on clicking elsewhere
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveHotspot(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Reset Filters Function
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setMinPrice(2500);
    setMaxPrice(6000);
    setMinPower(500);
    setSelectedGearbox('All');
    setSelectedEngine('All');
    setSelectedYear('All');
    setActiveCategory('All');
  };

  // Filter grid list based on selected category tag and advanced criteria
  const filteredGridCars = studioCars.map(car => {
    // Standardize data schema matching what CarCard expects
    return {
      id: car.id,
      name: car.name,
      category: car.category,
      brand: car.brand,
      image: car.image,
      price: car.price,
      currency: car.currency,
      period: car.period,
      year: car.year,
      gearbox: car.gearbox,
      specs: {
        power: `${car.specs.power} HP`,
        acceleration: `${car.specs.acceleration}s`,
        engine: car.specs.engine
      },
      slug: car.slug
    };
  }).filter(car => {
    // 1. Search term check (names, brands)
    if (searchTerm && !car.name.toLowerCase().includes(searchTerm.toLowerCase()) && !car.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // 2. Category check
    if (activeCategory !== 'All' && car.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    // 3. Brand check
    if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand.toUpperCase())) {
      return false;
    }
    // 4. Price check
    if (car.price < minPrice || car.price > maxPrice) {
      return false;
    }
    // 5. Horsepower check
    const hpValue = parseInt(car.specs.power);
    if (hpValue < minPower) {
      return false;
    }
    // 6. Gearbox check
    if (selectedGearbox !== 'All') {
      if (selectedGearbox === 'Automatic' && !car.gearbox.toLowerCase().includes('automatic')) {
        return false;
      }
      if (selectedGearbox === 'F1/Dual-Clutch' && !car.gearbox.toLowerCase().includes('dual-clutch') && !car.gearbox.toLowerCase().includes('pdk') && !car.gearbox.toLowerCase().includes('isr')) {
        return false;
      }
    }
    // 7. Engine check
    if (selectedEngine !== 'All' && !car.specs.engine.toLowerCase().includes(selectedEngine.toLowerCase())) {
      return false;
    }
    // 8. Year check
    if (selectedYear !== 'All' && car.year !== selectedYear) {
      return false;
    }
    return true;
  });

  return (
    <div className="fleet-page" style={{
      '--active-theme-color': activeCar.themeColor,
      '--active-rgb': activeCar.themeRgb
    }}>
      {/* 1. Interactive Studio Showcase (Instagram Design Concept) */}
      <section 
        className="fleet-studio"
        ref={studioRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-width Background Image Cross-fade */}
        <div className="fleet-studio__bg-container">
          {studioCars.map((car, idx) => (
            <img 
              key={`bg-img-${car.id}`}
              src={car.studioImage} 
              alt="" 
              className={`fleet-studio__bg-img fleet-studio__bg-img--${car.slug} ${activeIndex === idx ? 'fleet-studio__bg-img--active' : ''}`}
              loading="lazy"
              decoding="async"
            />
          ))}
          <div className="fleet-studio__bg-overlay" />
        </div>

        {/* Dynamic Studio Lighting Glow */}
        <div 
          className="fleet-studio__ambient-glow"
          style={{
            transform: `translate(calc(-50% + ${parallax.x * 0.4}px), calc(-50% + ${parallax.y * 0.4}px)) scale(1.15)`
          }}
        />

        {/* Dynamic Watermark Brand Text */}
        <div 
          key={`brand-${activeCar.id}`}
          className="fleet-studio__watermark"
          style={{
            transform: `translate(calc(-50% - ${parallax.x * 0.6}px), calc(-50% - ${parallax.y * 0.6}px))`
          }}
        >
          {activeCar.brand}
        </div>

        <div className="fleet-studio__container">
          {/* Left Dashboard Panel (Title, Tagline, Book Button) */}
          <div className="fleet-studio__dashboard">
            <span className="fleet-studio__category">{activeCar.category}</span>
            <div className="fleet-studio__title-wrapper">
              <h1 className="fleet-studio__title" key={`title-${activeCar.id}`}>
                {activeCar.name}
              </h1>
            </div>
            <p className="fleet-studio__tagline">
              {activeCar.tagline}
            </p>

            <div className="fleet-studio__price-box">
              <span className="fleet-studio__price-label">Daily Rental Rate</span>
              <div className="fleet-studio__price-value">
                {activeCar.currency} {activeCar.price.toLocaleString()}
                <span className="fleet-studio__price-unit"> / {activeCar.period}</span>
              </div>
            </div>

            <div className="fleet-studio__actions">
              <a 
                href={`https://wa.me/971509924247?text=Hello%20Lux%20Motors!%20I%20would%20like%20to%20rent%20the%20${encodeURIComponent(activeCar.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fleet-studio__book-btn"
              >
                Book Now <Sparkles size={16} />
              </a>
              <button 
                onClick={() => {
                  const gridSec = document.getElementById('browse-all-fleet');
                  if (gridSec) gridSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className="fleet-studio__spec-btn"
              >
                View Specs
              </button>
            </div>
          </div>

          {/* Center Stage Panel (Hotspots, 3D Perspective Orbit Slider, Mobile Swipe Panel) */}
          <div className="fleet-studio__stage">
            {/* The Perspective Orbit Ellipse Slider */}
            <div className="fleet-studio__orbit">
              <div className="fleet-studio__orbit-points">
                {/* Positional Dots mapping to active index */}
                <button 
                  onClick={() => setActiveIndex(0)} 
                  className={`fleet-studio__orbit-dot ${activeIndex === 0 ? 'fleet-studio__orbit-dot--active' : ''}`}
                  style={{ left: '0%', top: '50%' }}
                  aria-label="Select Car 1"
                />
                <button 
                  onClick={() => setActiveIndex(1)} 
                  className={`fleet-studio__orbit-dot ${activeIndex === 1 ? 'fleet-studio__orbit-dot--active' : ''}`}
                  style={{ left: '15%', top: '80%' }}
                  aria-label="Select Car 2"
                />
                <button 
                  onClick={() => setActiveIndex(2)} 
                  className={`fleet-studio__orbit-dot ${activeIndex === 2 ? 'fleet-studio__orbit-dot--active' : ''}`}
                  style={{ left: '50%', top: '100%' }}
                  aria-label="Select Car 3"
                />
                <button 
                  onClick={() => setActiveIndex(3)} 
                  className={`fleet-studio__orbit-dot ${activeIndex === 3 ? 'fleet-studio__orbit-dot--active' : ''}`}
                  style={{ left: '85%', top: '80%' }}
                  aria-label="Select Car 4"
                />
                <button 
                  onClick={() => setActiveIndex(4)} 
                  className={`fleet-studio__orbit-dot ${activeIndex === 4 ? 'fleet-studio__orbit-dot--active' : ''}`}
                  style={{ left: '100%', top: '50%' }}
                  aria-label="Select Car 5"
                />
              </div>
            </div>

            {/* Showcase Stage Wrapper (Hotspots Overlay) */}
            <div 
              className={`fleet-studio__car-container fleet-studio__car-container--${activeCar.slug}`}
              style={{
                transform: `translate(${parallax.x}px, ${parallax.y}px)`
              }}
            >
              {/* Hotspot details points */}
              {activeCar.hotspots.map((hotspot, idx) => (
                <div 
                  key={`hotspot-${activeCar.id}-${idx}`}
                  className={`fleet-studio__hotspot ${activeHotspot === idx ? 'fleet-studio__hotspot--active' : ''}`}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent closing immediately
                    setActiveHotspot(activeHotspot === idx ? null : idx);
                  }}
                >
                  <div className="fleet-studio__hotspot-trigger" />
                  <div className="fleet-studio__tooltip">
                    <h4 className="fleet-studio__tooltip-title">{hotspot.title}</h4>
                    <p className="fleet-studio__tooltip-desc">{hotspot.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile-Only Pagination Dots */}
            <div className="fleet-studio__mobile-dots">
              {studioCars.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setActiveHotspot(null);
                  }}
                  className={`fleet-studio__mobile-dot ${activeIndex === idx ? 'fleet-studio__mobile-dot--active' : ''}`}
                  aria-label={`Select Car ${idx + 1}`}
                />
              ))}
            </div>

            {/* Mobile-Only See More Models Button */}
            <button 
              className="fleet-studio__see-more-btn"
              onClick={() => setShowMobileDrawer(true)}
            >
              SEE MORE MODELS
            </button>
          </div>


          {/* Right Specifications Panel (Keeping the original spec cards) */}
          <div className="fleet-studio__specs-sidebar">
            <div className="fleet-studio__spec-item">
              <div className="fleet-studio__spec-value">
                <DynamicStat key={`power-${activeCar.id}`} value={activeCar.specs.power} unit={activeCar.specs.powerUnit} />
              </div>
              <div className="fleet-studio__spec-label">Power</div>
            </div>
            <div className="fleet-studio__spec-item">
              <div className="fleet-studio__spec-value">
                <DynamicStat key={`accel-${activeCar.id}`} value={activeCar.specs.acceleration} unit={activeCar.specs.accelerationUnit} />
              </div>
              <div className="fleet-studio__spec-label">0-100 km/h</div>
            </div>
            <div className="fleet-studio__spec-item">
              <div className="fleet-studio__spec-value">
                <DynamicStat key={`speed-${activeCar.id}`} value={activeCar.specs.topSpeed} unit={activeCar.specs.topSpeedUnit} />
              </div>
              <div className="fleet-studio__spec-label">Top Speed</div>
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Selector Thumbnails at the Bottom */}
        <div className="fleet-studio__selector">
          <div className="fleet-studio__selector-grid">
            {studioCars.map((car, idx) => (
              <button
                key={`selector-thumb-${car.id}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setActiveHotspot(null); // close open tooltips
                }}
                className={`fleet-studio__thumb ${activeIndex === idx ? 'fleet-studio__thumb--active' : ''}`}
              >
                <div className="fleet-studio__thumb-info">
                  <span className="fleet-studio__thumb-brand">{car.brand}</span>
                  <span className="fleet-studio__thumb-name">{car.name.replace(car.brand + ' ', '')}</span>
                </div>
                <ArrowUpRight size={16} className="fleet-studio__thumb-arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-Only: Price & Actions (outside hero, on dark bg) */}
      <div className="fleet-studio__mobile-cta">
        <div className="fleet-studio__mobile-cta-inner">
          <div className="fleet-studio__price-box">
            <span className="fleet-studio__price-label">Daily Rental Rate</span>
            <div className="fleet-studio__price-value">
              {activeCar.currency} {activeCar.price.toLocaleString()}
              <span className="fleet-studio__price-unit"> / {activeCar.period}</span>
            </div>
          </div>
          <div className="fleet-studio__actions">
            <a 
              href={`https://wa.me/971509924247?text=Hello%20Lux%20Motors!%20I%20would%20like%20to%20rent%20the%20${encodeURIComponent(activeCar.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fleet-studio__book-btn"
            >
              Book Now <Sparkles size={16} />
            </a>
            <button 
              onClick={() => {
                const gridSec = document.getElementById('browse-all-fleet');
                if (gridSec) gridSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="fleet-studio__spec-btn"
            >
              View Specs
            </button>
          </div>
        </div>
      </div>

      {/* 2. Grid-based Fleet Filter Section (Below Hero) */}
      <section className="fleet-grid-section" id="browse-all-fleet">
        <div className="container">
          <div className="fleet-grid__header">
            <span className="section-label">Browse All</span>
            <h2 className="section-title">
              Our Exclusive <span className="accent">Collection</span>
            </h2>
            <p className="fleet-grid__subtitle">
              Search, filter, and discover your perfect premium travel companion.
            </p>

            {/* Category Select Buttons (Quick Filters) */}
            <div className="fleet-filters">
              {['All', 'Sport', 'SuperSport', 'Luxury', 'SUV'].map((category) => (
                <button
                  key={`filter-${category}`}
                  onClick={() => setActiveCategory(category)}
                  className={`fleet-filter-btn ${activeCategory === category ? 'fleet-filter-btn--active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Main Search & Advanced Toggle Row */}
            <div className="fleet-search-bar">
              <div className="fleet-search-input-wrapper">
                <Search size={18} className="fleet-search-icon" />
                <input
                  type="text"
                  className="fleet-search-input"
                  placeholder="Search by brand or model name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="fleet-search-clear" onClick={() => setSearchTerm('')}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                className={`fleet-advanced-toggle ${showAdvanced ? 'fleet-advanced-toggle--active' : ''}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <SlidersHorizontal size={16} />
                <span>Advanced Filters</span>
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <div className={`fleet-advanced-panel ${showAdvanced ? 'fleet-advanced-panel--open' : ''}`}>
              <div className="fleet-advanced-grid">
                {/* Brand Selector Custom Dropdown */}
                <div className="fleet-filter-group" ref={brandRef}>
                  <label className="fleet-filter-label">Brands</label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${brandDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                    >
                      <span className="fleet-dropdown__trigger-text">
                        {selectedBrands.length === 0 
                          ? 'Select Brand' 
                          : selectedBrands.length === 1 
                            ? selectedBrands[0].charAt(0) + selectedBrands[0].slice(1).toLowerCase()
                            : `Brands (${selectedBrands.length})`}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {brandDropdownOpen && (
                      <div className="fleet-dropdown__menu fleet-dropdown__menu--brands">
                        <div className="fleet-brand-dropdown__header">
                          <span>Luxury Marques</span>
                          {selectedBrands.length > 0 && (
                            <button 
                              type="button" 
                              className="fleet-brand-dropdown__clear-btn"
                              onClick={() => setSelectedBrands([])}
                            >
                              Clear All
                            </button>
                          )}
                        </div>
                        <div className="fleet-brand-dropdown__grid">
                          {brands.map((brand) => {
                            const brandUpper = brand.name.toUpperCase();
                            const isChecked = selectedBrands.includes(brandUpper);
                            const isAvailable = ['LAMBORGHINI', 'FERRARI', 'ROLLS-ROYCE', 'PORSCHE'].includes(brandUpper);
                            
                            return (
                              <button
                                key={brand.slug}
                                type="button"
                                className={`fleet-brand-card ${isChecked ? 'fleet-brand-card--selected' : ''} ${!isAvailable ? 'fleet-brand-card--unavailable' : ''}`}
                                onClick={() => {
                                  if (isChecked) {
                                    setSelectedBrands(selectedBrands.filter(b => b !== brandUpper));
                                  } else {
                                    setSelectedBrands([...selectedBrands, brandUpper]);
                                  }
                                }}
                              >
                                <div className="fleet-brand-card__logo-wrapper">
                                  <img
                                    src={`https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${brand.logoSlug || brand.slug}.png`}
                                    alt={`${brand.name} logo`}
                                    className="fleet-brand-card__logo"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      const fallback = e.target.nextSibling;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                  <span className="fleet-brand-card__fallback" style={{ display: 'none' }}>
                                    {brand.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <span className="fleet-brand-card__name">{brand.name}</span>
                                {isChecked && (
                                  <div className="fleet-brand-card__check">
                                    <Check size={10} strokeWidth={3} />
                                  </div>
                                )}
                                {!isAvailable && (
                                  <span className="fleet-brand-card__soon">Soon</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Filter range */}
                <div className="fleet-filter-group">
                  <label className="fleet-filter-label">Daily Price Range (AED)</label>
                  <div className="fleet-price-inputs">
                    <div>
                      <span className="fleet-price-prefix">Min</span>
                      <input
                        type="number"
                        min="2500"
                        max="6000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Math.max(2500, Number(e.target.value)))}
                      />
                    </div>
                    <div>
                      <span className="fleet-price-prefix">Max</span>
                      <input
                        type="number"
                        min="2500"
                        max="6000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Math.min(6000, Number(e.target.value)))}
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Gearbox Select */}
                <div className="fleet-filter-group" ref={gearboxRef}>
                  <label className="fleet-filter-label">Transmission (Gearbox)</label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${gearboxDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setGearboxDropdownOpen(!gearboxDropdownOpen)}
                    >
                      <span>
                        {selectedGearbox === 'All' 
                          ? 'All Transmissions' 
                          : selectedGearbox === 'Automatic' 
                            ? 'Automatic (Standard)' 
                            : 'Dual-Clutch / ISR / PDK'}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {gearboxDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        {[
                          { value: 'All', label: 'All Transmissions' },
                          { value: 'Automatic', label: 'Automatic (Standard)' },
                          { value: 'F1/Dual-Clutch', label: 'Dual-Clutch / ISR / PDK' }
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`fleet-dropdown__option ${selectedGearbox === opt.value ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedGearbox(opt.value);
                              setGearboxDropdownOpen(false);
                            }}
                          >
                            <span>{opt.label}</span>
                            {selectedGearbox === opt.value && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Engine Select */}
                <div className="fleet-filter-group" ref={engineRef}>
                  <label className="fleet-filter-label">Engine Config</label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${engineDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setEngineDropdownOpen(!engineDropdownOpen)}
                    >
                      <span>
                        {selectedEngine === 'All' 
                          ? 'All Configurations' 
                          : `${selectedEngine} Engine`}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {engineDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        {[
                          { value: 'All', label: 'All Configurations' },
                          { value: 'V12', label: 'V12 Engine' },
                          { value: 'V8', label: 'V8 Engine' },
                          { value: 'Flat-6', label: 'Flat-6 Engine' }
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`fleet-dropdown__option ${selectedEngine === opt.value ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedEngine(opt.value);
                              setEngineDropdownOpen(false);
                            }}
                          >
                            <span>{opt.label}</span>
                            {selectedEngine === opt.value && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Year Select */}
                <div className="fleet-filter-group" ref={yearRef}>
                  <label className="fleet-filter-label">Year Model</label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${yearDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                    >
                      <span>
                        {selectedYear === 'All' 
                          ? 'All Years' 
                          : selectedYear}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {yearDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        {[
                          { value: 'All', label: 'All Years' },
                          { value: '2024', label: '2024' },
                          { value: '2023', label: '2023' },
                          { value: '2022', label: '2022' }
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`fleet-dropdown__option ${selectedYear === opt.value ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedYear(opt.value);
                              setYearDropdownOpen(false);
                            }}
                          >
                            <span>{opt.label}</span>
                            {selectedYear === opt.value && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Min Horsepower Slider */}
                <div className="fleet-filter-group">
                  <label className="fleet-filter-label">Min Power: {minPower} HP</label>
                  <input
                    type="range"
                    min="500"
                    max="800"
                    step="10"
                    value={minPower}
                    onChange={(e) => setMinPower(Number(e.target.value))}
                    className="fleet-filter-slider"
                  />
                  <div className="fleet-slider-labels">
                    <span>500 HP</span>
                    <span>800 HP</span>
                  </div>
                </div>
              </div>

              {/* Reset Control */}
              <div className="fleet-filter-actions">
                <button className="fleet-reset-btn" onClick={resetFilters}>
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>

            {/* Active Filter Pills List */}
            {(searchTerm ||
              activeCategory !== 'All' ||
              selectedBrands.length > 0 ||
              minPrice > 2500 ||
              maxPrice < 6000 ||
              minPower > 500 ||
              selectedGearbox !== 'All' ||
              selectedEngine !== 'All' ||
              selectedYear !== 'All') && (
              <div className="fleet-active-filters">
                <span className="fleet-active-filters-label">Active:</span>
                <div className="fleet-active-filters-list">
                  {searchTerm && (
                    <span className="fleet-filter-tag">
                      Search: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')}><X size={12} /></button>
                    </span>
                  )}
                  {activeCategory !== 'All' && (
                    <span className="fleet-filter-tag">
                      Category: {activeCategory}
                      <button onClick={() => setActiveCategory('All')}><X size={12} /></button>
                    </span>
                  )}
                  {selectedBrands.map(brandNameUpper => {
                    const brandObj = brands.find(b => b.name.toUpperCase() === brandNameUpper);
                    const displayName = brandObj ? brandObj.name : brandNameUpper;
                    return (
                      <span key={brandNameUpper} className="fleet-filter-tag">
                        {displayName}
                        <button onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brandNameUpper))}><X size={12} /></button>
                      </span>
                    );
                  })}
                  {(minPrice > 2500 || maxPrice < 6000) && (
                    <span className="fleet-filter-tag">
                      Price: {minPrice}-{maxPrice} AED
                      <button onClick={() => { setMinPrice(2500); setMaxPrice(6000); }}><X size={12} /></button>
                    </span>
                  )}
                  {minPower > 500 && (
                    <span className="fleet-filter-tag">
                      Power: &gt;={minPower} HP
                      <button onClick={() => setMinPower(500)}><X size={12} /></button>
                    </span>
                  )}
                  {selectedGearbox !== 'All' && (
                    <span className="fleet-filter-tag">
                      Gearbox: {selectedGearbox === 'F1/Dual-Clutch' ? 'Dual-Clutch' : selectedGearbox}
                      <button onClick={() => setSelectedGearbox('All')}><X size={12} /></button>
                    </span>
                  )}
                  {selectedEngine !== 'All' && (
                    <span className="fleet-filter-tag">
                      Engine: {selectedEngine}
                      <button onClick={() => setSelectedEngine('All')}><X size={12} /></button>
                    </span>
                  )}
                  {selectedYear !== 'All' && (
                    <span className="fleet-filter-tag">
                      Year: {selectedYear}
                      <button onClick={() => setSelectedYear('All')}><X size={12} /></button>
                    </span>
                  )}
                  <button className="fleet-clear-all-tag" onClick={resetFilters}>
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Core Fleet Cards Grid layout listing filtered models */}
          <div key={`${activeCategory}-${searchTerm}-${selectedBrands.join(',')}-${minPrice}-${maxPrice}-${minPower}-${selectedGearbox}-${selectedEngine}-${selectedYear}`} className="fleet-grid__cards" ref={gridSectionRef}>
            {filteredGridCars.length > 0 ? (
              filteredGridCars.map((car, index) => (
                <CarCard key={`grid-${car.id}`} car={car} index={index} />
              ))
            ) : (
              <div className="fleet-grid__empty">
                <Compass size={40} className="fleet-grid__empty-icon" />
                <p>No luxury vehicles match your filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Mobile Bottom-Sheet Drawer for Model Selector */}
      <div className={`fleet-mobile-drawer ${showMobileDrawer ? 'fleet-mobile-drawer--open' : ''}`}>
        <div className="fleet-mobile-drawer__overlay" onClick={() => setShowMobileDrawer(false)} />
        <div className="fleet-mobile-drawer__content">
          <div className="fleet-mobile-drawer__header">
            <h3>Select Luxury Model</h3>
            <button className="fleet-mobile-drawer__close" onClick={() => setShowMobileDrawer(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="fleet-mobile-drawer__list">
            {studioCars.map((car, idx) => (
              <button
                key={`drawer-thumb-${car.id}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setActiveHotspot(null);
                  setShowMobileDrawer(false);
                }}
                className={`fleet-mobile-drawer__item ${activeIndex === idx ? 'fleet-mobile-drawer__item--active' : ''}`}
              >
                <div className="fleet-mobile-drawer__item-info">
                  <span className="fleet-mobile-drawer__item-brand">{car.brand}</span>
                  <span className="fleet-mobile-drawer__item-name">{car.name.replace(car.brand + ' ', '')}</span>
                </div>
                <ArrowUpRight size={16} className="fleet-mobile-drawer__item-arrow" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
