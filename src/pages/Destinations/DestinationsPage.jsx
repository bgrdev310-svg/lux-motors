import { useState, useMemo } from 'react';
import './DestinationsPage.css';
import { destinations, detailedDestinations } from '../../data/destinations';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { 
  MapPin, 
  Search, 
  Sparkles, 
  Building2, 
  Plane, 
  Compass, 
  ArrowUpRight, 
  HelpCircle
} from 'lucide-react';
import Button from '../../components/Button/Button';

export default function DestinationsPage() {
  const sectionRef = useScrollReveal();
  const mainGridRef = useScrollReveal();
  const directoryRef = useScrollReveal();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'hotels', 'communities', 'airports'
  const [currency, setCurrency] = useState('AED'); // 'AED', 'USD'
  
  // Filter detailed locations based on search and selected tab
  const filteredDetailed = useMemo(() => {
    return detailedDestinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dest.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dest.zone.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = activeTab === 'all' || dest.category === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Helper to split filtered items into 6 columns for desktop layout
  const columns = useMemo(() => {
    const colsCount = 6;
    const cols = Array.from({ length: colsCount }, () => []);
    filteredDetailed.forEach((item, idx) => {
      cols[idx % colsCount].push(item);
    });
    return cols;
  }, [filteredDetailed]);

  // Handle clicking on a main location card
  const handleMainLocationClick = (emirate) => {
    // If it's a specific emirate, filter details or pre-fill search
    setSearchQuery(emirate);
    setActiveTab('all');
    
    // Scroll to directory list
    const el = document.getElementById('locations-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
  };

  return (
    <div className="destinations-page">
      {/* Background Orbs */}
      <div className="destinations-page__bg">
        <div className="destinations-page__orb destinations-page__orb--1" />
        <div className="destinations-page__orb destinations-page__orb--2" />
        <div className="destinations-page__orb destinations-page__orb--3" />
        <div className="destinations-page__grid" />
      </div>

      <div className="container">
        {/* Page Header / Hero */}
        <header className="destinations-page__header" ref={sectionRef}>
          <div className="destinations-page__tag reveal">
            <Compass size={14} className="destinations-page__tag-icon" />
            <span>UAE DELIVERY SERVICES</span>
          </div>
          <h1 className="destinations-page__title reveal reveal-delay-1">
            VIP Delivery & <span className="accent">Pick-up Locations</span>
          </h1>
          <p className="destinations-page__subtitle reveal reveal-delay-2">
            Enjoy premium door-to-door delivery and collection of your luxury or exotic rental car. 
            We cater directly to your private villa, resort hotel, business hub, or airport terminal across the UAE.
          </p>
        </header>

        {/* Primary Emirates / Hubs Grid */}
        <section className="destinations-page__main-grid section" ref={mainGridRef}>
          <div className="destinations-page__section-header">
            <span className="section-label">PRIMARY REGIONS</span>
            <h2 className="section-title">Explore Main <span className="accent">Emirates</span></h2>
          </div>

          <div className="destinations__grid">
            {destinations.map((dest, index) => (
              <div
                key={dest.id}
                className={`destinations__card reveal reveal-delay-${(index % 3) + 1}`}
                onClick={() => handleMainLocationClick(dest.emirate === 'Dubai' ? dest.name : dest.emirate)}
              >
                {/* Visual Glass Blobs */}
                <div className="destinations__card-liquid-blob-1" />
                <div className="destinations__card-liquid-blob-2" />

                <div className="destinations__card-image-wrapper">
                  <img 
                    src={dest.image} 
                    alt={`${dest.name} in the UAE`} 
                    className="destinations__card-image"
                    loading="lazy"
                  />
                  <div className="destinations__card-image-overlay" />
                  <div className="destinations__card-image-badge">
                    <MapPin size={11} className="destinations__card-badge-icon" />
                    <span>{dest.emirate}</span>
                  </div>
                </div>

                <div className="destinations__card-body">
                  <div className="destinations__card-header-row">
                    <h3 className="destinations__card-name">{dest.name}</h3>
                    <span className="destinations__card-count">{dest.carsAvailable}+ Cars</span>
                  </div>
                  <p className="destinations__card-desc">{dest.description}</p>
                  
                  <div className="destinations__card-footer">
                    <span className="destinations__card-cta">Filter Directory</span>
                    <div className="destinations__card-arrow-circle">
                      <ArrowUpRight size={14} className="destinations__card-arrow" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Search & List Section */}
        <section 
          id="locations-directory" 
          className="destinations-page__directory glass-panel section"
          ref={directoryRef}
        >
          {/* Glass Grid background pattern inside panel */}
          <div className="destinations-page__directory-grid" />
          
          <div className="destinations-page__directory-header">
            <div>
              <span className="section-label">DIRECTORY</span>
              <h2 className="destinations-page__directory-title">
                Complete Delivery <span className="accent">Network</span>
              </h2>
              <p className="destinations-page__directory-desc">
                Browse our comprehensive lists of hotels, residential communities, resorts, and travel terminals.
              </p>
            </div>

            {/* Currency selector inspired by mockup */}
            <div className="destinations-page__currency-toggle-wrapper">
              <span className="destinations-page__currency-label">Reference Rates:</span>
              <div className="destinations-page__currency-toggle">
                <button 
                  className={`destinations-page__currency-btn ${currency === 'AED' ? 'active' : ''}`}
                  onClick={() => setCurrency('AED')}
                >
                  AED
                </button>
                <button 
                  className={`destinations-page__currency-btn ${currency === 'USD' ? 'active' : ''}`}
                  onClick={() => setCurrency('USD')}
                >
                  USD
                </button>
              </div>
            </div>
          </div>

          {/* Search & Tabs Controls */}
          <div className="destinations-page__controls">
            {/* Search Input */}
            <div className="destinations-page__search-wrapper glass">
              <Search size={18} className="destinations-page__search-icon" />
              <input 
                type="text" 
                placeholder="Search hotels, communities, airports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="destinations-page__search-input"
              />
              {searchQuery && (
                <button className="destinations-page__clear-btn" onClick={() => setSearchQuery('')}>
                  Clear
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="destinations-page__tabs glass">
              <button 
                className={`destinations-page__tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <Compass size={14} />
                <span>All Areas</span>
              </button>
              <button 
                className={`destinations-page__tab-btn ${activeTab === 'communities' ? 'active' : ''}`}
                onClick={() => setActiveTab('communities')}
              >
                <Building2 size={14} />
                <span>Communities</span>
              </button>
              <button 
                className={`destinations-page__tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
                onClick={() => setActiveTab('hotels')}
              >
                <Sparkles size={14} />
                <span>Hotels & Resorts</span>
              </button>
              <button 
                className={`destinations-page__tab-btn ${activeTab === 'airports' ? 'active' : ''}`}
                onClick={() => setActiveTab('airports')}
              >
                <Plane size={14} />
                <span>Airports</span>
              </button>
            </div>
          </div>

          {/* Dynamic Column List Directory */}
          {filteredDetailed.length > 0 ? (
            <div className="destinations-page__columns-grid">
              {columns.map((colItems, colIdx) => (
                <div key={colIdx} className="destinations-page__column">
                  {colItems.map((item, itemIdx) => (
                    <div key={itemIdx} className="destinations-page__list-item">
                      <div className="destinations-page__list-item-hover-glow" />
                      <div className="destinations-page__list-item-content">
                        <MapPin size={12} className="destinations-page__list-item-pin" />
                        <div>
                          <span className="destinations-page__list-item-name">{item.name}</span>
                          <span className="destinations-page__list-item-meta">
                            {item.type} • {item.zone}
                          </span>
                        </div>
                      </div>
                      {item.popular && (
                        <span className="destinations-page__list-item-popular-badge">
                          POPULAR
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="destinations-page__empty">
              <HelpCircle size={48} className="destinations-page__empty-icon" />
              <h3>No Locations Found</h3>
              <p>We couldn't find any delivery areas matching "{searchQuery}".</p>
              <button className="destinations-page__empty-btn" onClick={handleClearFilters}>
                View All Locations
              </button>
            </div>
          )}

          {/* Quick Notice Banner */}
          <div className="destinations-page__notice-banner glass">
            <span className="accent-text">SERVICE HIGHLIGHT:</span> Free delivery & pick-up at Dubai International Airport (DXB), Al Maktoum Airport (DWC), and all major 5-star resort reception desks in Dubai & Abu Dhabi. Delivery services to other emirates available on request.
          </div>
        </section>

        {/* Call to Action for Customized Requests */}
        <section className="destinations-page__cta section">
          <div className="glass-panel destinations-page__cta-panel">
            <div className="destinations-page__cta-glow" />
            <div className="destinations-page__cta-content">
              <span className="section-label">Bespoke Handling</span>
              <h2 className="destinations-page__cta-title">
                Custom Delivery <span className="accent">Destination?</span>
              </h2>
              <p className="destinations-page__cta-desc">
                If your hotel, residence, or private airstrip is not listed above, our logistics team can coordinate a custom handover. We offer trailer drop-off and professional chauffeur arrival at any address in the United Arab Emirates.
              </p>
              <div className="destinations-page__cta-buttons">
                <Button variant="primary" href="/contact?customLocation=true">
                  Coordinate Handover
                </Button>
                <a href="tel:+971509924247" className="destinations-page__cta-phone">
                  Call Logistics (+971 50 992 4247)
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
