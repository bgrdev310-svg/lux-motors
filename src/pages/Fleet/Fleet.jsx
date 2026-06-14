import { useState, useEffect, useRef, useMemo } from 'react';
import './Fleet.css';
import CarCard from '../../components/CarCard/CarCard';
import { ArrowUpRight, Compass, Sparkles, Search, SlidersHorizontal, X, RotateCcw, ChevronDown, Check, Car, Users, Gauge, Zap, Fuel, Calendar, DollarSign, Wind } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useFleetStore } from '../../hooks/useFleetStore';
import { brands } from '../../data/brands';

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
  const { cars: fleetCars } = useFleetStore();
  const studioCars = useMemo(() => fleetCars.filter((c) => c.visible !== false), [fleetCars]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
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
      } else {
        // Swipe right -> Previous car
        setActiveIndex((prev) => (prev - 1 + studioCars.length) % studioCars.length);
      }
    }
  };

  
  // Advanced Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPower, setMinPower] = useState(0);
  const [selectedGearbox, setSelectedGearbox] = useState('All');
  const [selectedEngine, setSelectedEngine] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSeats, setSelectedSeats] = useState('All');
  const [selectedDriveType, setSelectedDriveType] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Dropdown open states
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [gearboxDropdownOpen, setGearboxDropdownOpen] = useState(false);
  const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [seatsDropdownOpen, setSeatsDropdownOpen] = useState(false);
  const [driveTypeDropdownOpen, setDriveTypeDropdownOpen] = useState(false);
  const [fuelDropdownOpen, setFuelDropdownOpen] = useState(false);

  // Dropdown refs for click-outside detection
  const brandRef = useRef(null);
  const gearboxRef = useRef(null);
  const engineRef = useRef(null);
  const yearRef = useRef(null);
  const seatsRef = useRef(null);
  const driveTypeRef = useRef(null);
  const fuelRef = useRef(null);
  const studioRef = useRef(null);

  useEffect(() => {
    if (studioCars.length === 0) return;
    if (activeIndex >= studioCars.length) {
      setActiveIndex(0);
    }
  }, [studioCars.length, activeIndex]);

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
      if (seatsRef.current && !seatsRef.current.contains(event.target)) {
        setSeatsDropdownOpen(false);
      }
      if (driveTypeRef.current && !driveTypeRef.current.contains(event.target)) {
        setDriveTypeDropdownOpen(false);
      }
      if (fuelRef.current && !fuelRef.current.contains(event.target)) {
        setFuelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Compute Dynamic Filtering Options from studioCars
  const dynamicCategories = useMemo(() => {
    const cats = new Set(studioCars.map((car) => car.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [studioCars]);

  const availableBrands = useMemo(() => {
    return new Set(studioCars.map((car) => car.brand.toUpperCase()));
  }, [studioCars]);

  const allFilterBrands = useMemo(() => {
    const list = [...brands];
    const predefinedUpper = new Set(brands.map(b => b.name.toUpperCase()));
    availableBrands.forEach(b => {
      if (!predefinedUpper.has(b)) {
        list.push({
          name: b.charAt(0) + b.slice(1).toLowerCase(),
          slug: b.toLowerCase(),
          logoSlug: b.toLowerCase()
        });
      }
    });
    return list;
  }, [availableBrands]);

  const priceRangeLimit = useMemo(() => {
    if (studioCars.length === 0) return { min: 0, max: 10000 };
    const prices = studioCars.map((car) => car.price).filter((p) => typeof p === 'number' && !isNaN(p));
    if (prices.length === 0) return { min: 0, max: 10000 };
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [studioCars]);

  const powerRangeLimit = useMemo(() => {
    if (studioCars.length === 0) return { min: 0, max: 1000 };
    const powers = studioCars.map((car) => parseInt(car.specs?.power || car.power)).filter((p) => typeof p === 'number' && !isNaN(p));
    if (powers.length === 0) return { min: 0, max: 1000 };
    return {
      min: Math.min(...powers),
      max: Math.max(...powers)
    };
  }, [studioCars]);

  const dynamicYears = useMemo(() => {
    const years = new Set(studioCars.map((car) => String(car.year)).filter(Boolean));
    return ['All', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [studioCars]);

  const dynamicEngineConfigs = useMemo(() => {
    const configs = new Set();
    studioCars.forEach(car => {
      const engineText = car.specs?.engine || '';
      const match = engineText.match(/(V12|V8|V6|Flat-6|Flat-4|Electric|L4|I4|W16)/i);
      if (match) {
        configs.add(match[1]);
      } else if (engineText.trim()) {
        const cleanText = engineText.split(' ').pop();
        if (cleanText && cleanText.length < 10) configs.add(cleanText);
      }
    });
    return ['All', ...Array.from(configs).sort()];
  }, [studioCars]);

  const dynamicSeatsOptions = useMemo(() => {
    const seatsSet = new Set(studioCars.map((car) => car.detailSpecs?.seats || car.seats || '').filter(Boolean));
    return ['All', ...Array.from(seatsSet).sort()];
  }, [studioCars]);

  const dynamicDriveTypes = useMemo(() => {
    const drivesSet = new Set(studioCars.map((car) => car.detailSpecs?.driveType || car.driveType || '').filter(Boolean));
    return ['All', ...Array.from(drivesSet).sort()];
  }, [studioCars]);

  const dynamicFuels = useMemo(() => {
    const fuelsSet = new Set(studioCars.map((car) => car.detailSpecs?.fuel || car.fuel || '').filter(Boolean));
    return ['All', ...Array.from(fuelsSet).sort()];
  }, [studioCars]);

  const gridSectionRef = useScrollReveal({}, [
    activeCategory,
    searchTerm,
    selectedBrands,
    minPrice,
    maxPrice,
    minPower,
    selectedGearbox,
    selectedEngine,
    selectedYear,
    selectedSeats,
    selectedDriveType,
    selectedFuel
  ]);

  const activeCar = studioCars[activeIndex] || studioCars[0];

  if (!activeCar) {
    return (
      <div className="fleet-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>No vehicles in fleet. Check back soon.</p>
      </div>
    );
  }

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

  // Reset Filters Function
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setMinPower(0);
    setSelectedGearbox('All');
    setSelectedEngine('All');
    setSelectedYear('All');
    setSelectedSeats('All');
    setSelectedDriveType('All');
    setSelectedFuel('All');
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
        power: `${car.specs?.power || car.power} HP`,
        acceleration: `${car.specs?.acceleration || car.acceleration}s`,
        engine: car.specs?.engine || car.engine || ''
      },
      seats: car.detailSpecs?.seats || car.seats || '',
      driveType: car.detailSpecs?.driveType || car.driveType || '',
      fuel: car.detailSpecs?.fuel || car.fuel || '',
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
    if (minPrice !== '' && car.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice !== '' && car.price > Number(maxPrice)) {
      return false;
    }
    // 5. Horsepower check
    const hpValue = parseInt(car.specs.power);
    if (minPower > 0 && !isNaN(hpValue) && hpValue < minPower) {
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
    if (selectedYear !== 'All' && String(car.year) !== String(selectedYear)) {
      return false;
    }
    // 9. Seats check
    if (selectedSeats !== 'All' && car.seats !== selectedSeats) {
      return false;
    }
    // 10. Drive Type check
    if (selectedDriveType !== 'All' && car.driveType !== selectedDriveType) {
      return false;
    }
    // 11. Fuel check
    if (selectedFuel !== 'All' && car.fuel !== selectedFuel) {
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



            {/* Mobile-Only Pagination Dots */}
            <div className="fleet-studio__mobile-dots">
              {studioCars.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => {
                    setActiveIndex(idx);
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
              {dynamicCategories.map((category) => (
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
                  <label className="fleet-filter-label">
                    <Car size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Brands
                  </label>
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
                          {allFilterBrands.map((brand) => {
                            const brandUpper = brand.name.toUpperCase();
                            const isChecked = selectedBrands.includes(brandUpper);
                            const isAvailable = availableBrands.has(brandUpper);
                            
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
                  <label className="fleet-filter-label">
                    <DollarSign size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Price / Day (AED)
                  </label>
                  <div className="fleet-price-inputs">
                    <div>
                      <span className="fleet-price-prefix">Min</span>
                      <input
                        type="number"
                        placeholder={priceRangeLimit.min}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <span className="fleet-price-prefix">Max</span>
                      <input
                        type="number"
                        placeholder={priceRangeLimit.max}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Gearbox Select */}
                <div className="fleet-filter-group" ref={gearboxRef}>
                  <label className="fleet-filter-label">
                    <Wind size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Transmission
                  </label>
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
                  <label className="fleet-filter-label">
                    <Gauge size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Engine Config
                  </label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${engineDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setEngineDropdownOpen(!engineDropdownOpen)}
                    >
                      <span>
                        {selectedEngine === 'All' 
                          ? 'All Configurations' 
                          : `${selectedEngine}`}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {engineDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        <button
                          type="button"
                          className={`fleet-dropdown__option ${selectedEngine === 'All' ? 'fleet-dropdown__option--selected' : ''}`}
                          onClick={() => {
                            setSelectedEngine('All');
                            setEngineDropdownOpen(false);
                          }}
                        >
                          <span>All Configurations</span>
                          {selectedEngine === 'All' && <Check size={12} className="fleet-dropdown__check" />}
                        </button>
                        {dynamicEngineConfigs.filter(opt => opt !== 'All').map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`fleet-dropdown__option ${selectedEngine === opt ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedEngine(opt);
                              setEngineDropdownOpen(false);
                            }}
                          >
                            <span>{opt} Engine</span>
                            {selectedEngine === opt && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Year Select */}
                <div className="fleet-filter-group" ref={yearRef}>
                  <label className="fleet-filter-label">
                    <Calendar size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Year Model
                  </label>
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
                        <button
                          type="button"
                          className={`fleet-dropdown__option ${selectedYear === 'All' ? 'fleet-dropdown__option--selected' : ''}`}
                          onClick={() => {
                            setSelectedYear('All');
                            setYearDropdownOpen(false);
                          }}
                        >
                          <span>All Years</span>
                          {selectedYear === 'All' && <Check size={12} className="fleet-dropdown__check" />}
                        </button>
                        {dynamicYears.filter(opt => opt !== 'All').map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`fleet-dropdown__option ${selectedYear === opt ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedYear(opt);
                              setYearDropdownOpen(false);
                            }}
                          >
                            <span>{opt}</span>
                            {selectedYear === opt && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Seats Select */}
                <div className="fleet-filter-group" ref={seatsRef}>
                  <label className="fleet-filter-label">
                    <Users size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Seats
                  </label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${seatsDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setSeatsDropdownOpen(!seatsDropdownOpen)}
                    >
                      <span>
                        {selectedSeats === 'All' 
                          ? 'All Seats' 
                          : selectedSeats}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {seatsDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        <button
                          type="button"
                          className={`fleet-dropdown__option ${selectedSeats === 'All' ? 'fleet-dropdown__option--selected' : ''}`}
                          onClick={() => {
                            setSelectedSeats('All');
                            setSeatsDropdownOpen(false);
                          }}
                        >
                          <span>All Seats</span>
                          {selectedSeats === 'All' && <Check size={12} className="fleet-dropdown__check" />}
                        </button>
                        {dynamicSeatsOptions.filter(opt => opt !== 'All').map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`fleet-dropdown__option ${selectedSeats === opt ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedSeats(opt);
                              setSeatsDropdownOpen(false);
                            }}
                          >
                            <span>{opt}</span>
                            {selectedSeats === opt && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Drive Type Select */}
                <div className="fleet-filter-group" ref={driveTypeRef}>
                  <label className="fleet-filter-label">
                    <Compass size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Drive Type
                  </label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${driveTypeDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setDriveTypeDropdownOpen(!driveTypeDropdownOpen)}
                    >
                      <span>
                        {selectedDriveType === 'All' 
                          ? 'All Drive Types' 
                          : selectedDriveType}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {driveTypeDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        <button
                          type="button"
                          className={`fleet-dropdown__option ${selectedDriveType === 'All' ? 'fleet-dropdown__option--selected' : ''}`}
                          onClick={() => {
                            setSelectedDriveType('All');
                            setDriveTypeDropdownOpen(false);
                          }}
                        >
                          <span>All Drive Types</span>
                          {selectedDriveType === 'All' && <Check size={12} className="fleet-dropdown__check" />}
                        </button>
                        {dynamicDriveTypes.filter(opt => opt !== 'All').map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`fleet-dropdown__option ${selectedDriveType === opt ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedDriveType(opt);
                              setDriveTypeDropdownOpen(false);
                            }}
                          >
                            <span>{opt}</span>
                            {selectedDriveType === opt && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Fuel Type Select */}
                <div className="fleet-filter-group" ref={fuelRef}>
                  <label className="fleet-filter-label">
                    <Fuel size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Fuel Type
                  </label>
                  <div className="fleet-dropdown">
                    <button
                      type="button"
                      className={`fleet-dropdown__trigger ${fuelDropdownOpen ? 'fleet-dropdown__trigger--active' : ''}`}
                      onClick={() => setFuelDropdownOpen(!fuelDropdownOpen)}
                    >
                      <span>
                        {selectedFuel === 'All' 
                          ? 'All Fuel Types' 
                          : selectedFuel}
                      </span>
                      <ChevronDown size={14} className="fleet-dropdown__chevron" />
                    </button>
                    
                    {fuelDropdownOpen && (
                      <div className="fleet-dropdown__menu">
                        <button
                          type="button"
                          className={`fleet-dropdown__option ${selectedFuel === 'All' ? 'fleet-dropdown__option--selected' : ''}`}
                          onClick={() => {
                            setSelectedFuel('All');
                            setFuelDropdownOpen(false);
                          }}
                        >
                          <span>All Fuel Types</span>
                          {selectedFuel === 'All' && <Check size={12} className="fleet-dropdown__check" />}
                        </button>
                        {dynamicFuels.filter(opt => opt !== 'All').map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`fleet-dropdown__option ${selectedFuel === opt ? 'fleet-dropdown__option--selected' : ''}`}
                            onClick={() => {
                              setSelectedFuel(opt);
                              setFuelDropdownOpen(false);
                            }}
                          >
                            <span>{opt}</span>
                            {selectedFuel === opt && <Check size={12} className="fleet-dropdown__check" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Min Horsepower Slider */}
                <div className="fleet-filter-group">
                  <label className="fleet-filter-label">
                    <Zap size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Min Power: {minPower > 0 ? `${minPower} HP` : 'Any'}
                  </label>
                  <input
                    type="range"
                    min={powerRangeLimit.min}
                    max={powerRangeLimit.max}
                    step="10"
                    value={minPower || powerRangeLimit.min}
                    onChange={(e) => setMinPower(Number(e.target.value))}
                    className="fleet-filter-slider"
                  />
                  <div className="fleet-slider-labels">
                    <span>{powerRangeLimit.min} HP</span>
                    <span>{powerRangeLimit.max} HP</span>
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
              minPrice !== '' ||
              maxPrice !== '' ||
              minPower > 0 ||
              selectedGearbox !== 'All' ||
              selectedEngine !== 'All' ||
              selectedYear !== 'All' ||
              selectedSeats !== 'All' ||
              selectedDriveType !== 'All' ||
              selectedFuel !== 'All') && (
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
                  {(minPrice !== '' || maxPrice !== '') && (
                    <span className="fleet-filter-tag">
                      Price: {minPrice || 'Min'}-{maxPrice || 'Max'} AED
                      <button onClick={() => { setMinPrice(''); setMaxPrice(''); }}><X size={12} /></button>
                    </span>
                  )}
                  {minPower > 0 && (
                    <span className="fleet-filter-tag">
                      Power: &gt;={minPower} HP
                      <button onClick={() => setMinPower(0)}><X size={12} /></button>
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
                  {selectedSeats !== 'All' && (
                    <span className="fleet-filter-tag">
                      Seats: {selectedSeats}
                      <button onClick={() => setSelectedSeats('All')}><X size={12} /></button>
                    </span>
                  )}
                  {selectedDriveType !== 'All' && (
                    <span className="fleet-filter-tag">
                      Drive: {selectedDriveType}
                      <button onClick={() => setSelectedDriveType('All')}><X size={12} /></button>
                    </span>
                  )}
                  {selectedFuel !== 'All' && (
                    <span className="fleet-filter-tag">
                      Fuel: {selectedFuel}
                      <button onClick={() => setSelectedFuel('All')}><X size={12} /></button>
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
          <div key={`${activeCategory}-${searchTerm}-${selectedBrands.join(',')}-${minPrice}-${maxPrice}-${minPower}-${selectedGearbox}-${selectedEngine}-${selectedYear}-${selectedSeats}-${selectedDriveType}-${selectedFuel}`} className="fleet-grid__cards" ref={gridSectionRef}>
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
