import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Warehouse, 
  Heart, 
  Clock, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  User, 
  FileText,
  MapPin,
  ChevronRight,
  Phone,
  MessageSquare,
  Sparkles,
  Trash2,
  Hash,
  Zap,
  Gauge,
  Activity,
  FileCheck,
  CalendarRange,
  Key
} from 'lucide-react';
import './RequestStatusPage.css';
import { DEFAULT_FLEET, toCarCardShape } from '../../data/defaultFleet';
import CarCard from '../../components/CarCard/CarCard';

// Formatting date helper
function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Initial mock request data if local storage is empty
const INITIAL_DEMO_REQUESTS = [
  {
    id: 'REQ-8842',
    carSlug: 'lamborghini-aventador',
    pickupDate: '2026-06-20',
    returnDate: '2026-06-25',
    days: 5,
    totalCost: 26250, // 5 * 5000 + 5% VAT
    deposit: 10000,
    status: 'accepted',
    submittedAt: '2026-06-12',
    scheduledDate: '20 Jun 2026',
    scheduledTime: '10:00 AM (DXB Airport VIP Terminal)',
    technicianNote: 'A Lux Motors private chauffeur will deliver the Aventador to your arrivals gate. Please have your original license ready for quick signature verification.',
    responseWindow: 'Approved - Delivery scheduled'
  },
  {
    id: 'REQ-1490',
    carSlug: 'lamborghini-urus',
    pickupDate: '2026-07-01',
    returnDate: '2026-07-03',
    days: 2,
    totalCost: 7350, // 2 * 3500 + 5% VAT
    deposit: 5000,
    status: 'pending',
    submittedAt: '2026-06-13',
    responseWindow: 'Under review. Expect verification in 1 hour.'
  }
];

export default function RequestStatusPage() {
  const [activePane, setActivePane] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // Search state
  const [searchId, setSearchId] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedRequestId, setExpandedRequestId] = useState('');

  // Toast State
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Load bookings and favorites on mount
  useEffect(() => {
    // Load / Seed Requests
    let storedReqs = localStorage.getItem('carRequests');
    if (!storedReqs) {
      localStorage.setItem('carRequests', JSON.stringify(INITIAL_DEMO_REQUESTS));
      storedReqs = JSON.stringify(INITIAL_DEMO_REQUESTS);
    }
    setRequests(JSON.parse(storedReqs));

    // Load Favorites
    const favList = DEFAULT_FLEET.filter(
      (car) => localStorage.getItem(`liked-${car.slug}`) === 'true'
    );
    setFavorites(favList);
  }, []);

  // Sync state with localStorage if requests change
  const updateRequests = (newReqs) => {
    setRequests(newReqs);
    localStorage.setItem('carRequests', JSON.stringify(newReqs));
  };

  // Unlike/remove from favorites
  const handleRemoveFavorite = (e, slug, name) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(`liked-${slug}`, 'false');
    setFavorites((prev) => prev.filter((c) => c.slug !== slug));
    
    // Also dispatch a storage/custom event so other components (like CarDetails Page if open) sync up
    window.dispatchEvent(new Event('storage'));
    triggerToast(`Removed ${name} from Favorites`);
  };

  // Perform search / lookup
  const handleLookup = () => {
    setSearchError('');
    setSearchResult(null);
    const queryId = searchId.trim().toUpperCase();

    if (!queryId) {
      setSearchError('Please fill in a valid Request ID.');
      return;
    }

    setSearchLoading(true);

    setTimeout(() => {
      setSearchLoading(false);
      const found = requests.find((r) => r.id.toUpperCase() === queryId);
      if (found) {
        setSearchResult(found);
        setExpandedRequestId(found.id);
      } else {
        setSearchError('No matching request ID found in your local files.');
      }
    }, 600);
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'accepted':
        return {
          label: 'Accepted & Scheduled',
          className: 'garage-status--accepted',
          desc: 'Your request is verified and delivery arrangements are confirmed.'
        };
      case 'rejected':
        return {
          label: 'Declined',
          className: 'garage-status--rejected',
          desc: 'We were unable to fulfill this request. Please contact concierge.'
        };
      default:
        return {
          label: 'Under Review',
          className: 'garage-status--pending',
          desc: 'Our VIP booking team is reviewing your documents and checking live availability.'
        };
    }
  };

  return (
    <div className="garage-page">
      {/* Decorative Orbs */}
      <div className="garage-page__bg" aria-hidden="true">
        <div className="garage-page__orb garage-page__orb--1" />
        <div className="garage-page__orb garage-page__orb--2" />
        <div className="garage-page__orb garage-page__orb--3" />
        <div className="garage-page__grid" />
      </div>

      {/* VIP Toast Notification */}
      <div className={`garage-toast glass ${showToast ? 'visible' : ''}`}>
        <Sparkles size={16} className="garage-toast__icon" />
        <span>{toastMsg}</span>
      </div>

      <div className="garage-page__container container">
        
        {/* Navigation Breadcrumbs */}
        <nav className="garage-page__breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={12} />
          <span className="active">My Garage</span>
        </nav>

        {/* Header Block */}
        <header className="garage-page__header">
          <div className="garage-page__tag">
            <Warehouse size={14} className="garage-page__tag-icon" />
            <span>VIP CLIENT GARAGE</span>
          </div>
          <h1 className="garage-page__title">
            Your Premium <span className="garage-page__title-gradient">Workspace</span>
          </h1>
          <p className="garage-page__subtitle">
            Manage your high-performance requests, review verified bookings, and reference your saved garage collection.
          </p>
        </header>

        {/* Sliding Tab Controller buttons */}
        <div className="garage-tabs-wrapper glass-panel">
          <div className="garage-tabs">
            <button
              className={`garage-tab-btn ${activePane === 'requests' ? 'active' : ''}`}
              onClick={() => setActivePane('requests')}
            >
              <FileText size={16} />
              <span>Active Bookings ({requests.length})</span>
            </button>
            <button
              className={`garage-tab-btn ${activePane === 'favorites' ? 'active' : ''}`}
              onClick={() => setActivePane('favorites')}
            >
              <Heart size={16} />
              <span>VIP Favorites ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Sliding Pane Container */}
        <div className={`garage-slider-container ${activePane === 'favorites' ? 'show-favorites' : ''}`}>
          <div className="garage-slider">

            {/* PANE 1: Active Bookings */}
            <div className="garage-pane garage-pane--requests">
              {requests.length === 0 ? (
                <div className="garage-empty glass-panel">
                  <Warehouse size={48} className="garage-empty__icon" />
                  <h3>No Active Bookings</h3>
                  <p>You haven't requested any luxury vehicles yet. Browse our exclusive collection to begin.</p>
                  <Link to="/fleet" className="garage-empty__btn">
                    <span>Explore Exotic Fleet</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="garage-requests-list">
                  {requests.map((request) => {
                    const carData = DEFAULT_FLEET.find((c) => c.slug === request.carSlug);
                    if (!carData) return null;

                    const isExpanded = expandedRequestId === request.id;
                    const statusConfig = getStatusDetails(request.status);

                    return (
                      <div 
                        key={request.id} 
                        className={`garage-request-card glass-panel ${isExpanded ? 'expanded' : ''}`}
                        style={{
                          '--card-theme-color': carData.themeColor || '#c9a84c',
                          '--card-theme-rgb': carData.themeRgb || '201, 168, 76'
                        }}
                      >
                        {/* Summary Header Row */}
                        <div className="garage-request-card__summary">
                          <div className="garage-request-card__car-info">
                            <div className="garage-request-card__showcase">
                              <div className="car-glow-backdrop" />
                              <img 
                                src={carData.studioImage || carData.image} 
                                alt={carData.name} 
                                className="car-showcase-img"
                              />
                              <div 
                                className="car-reflection" 
                                style={{ backgroundImage: `url(${carData.studioImage || carData.image})` }} 
                              />
                            </div>
                            <div className="car-meta-info">
                              <span className="car-brand-tag">{carData.brand}</span>
                              <h3 className="car-model-name">{carData.name}</h3>
                              <div className="car-request-meta">
                                <span className="request-id-badge">
                                  <Hash size={11} className="meta-icon" />
                                  <span>{request.id}</span>
                                </span>
                                <span className="request-date-badge">
                                  <CalendarRange size={11} className="meta-icon" />
                                  <span>Submitted: {formatDate(request.submittedAt)}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Specs Dashboard */}
                          <div className="garage-request-card__specs-panel">
                            <div className="mini-spec-item">
                              <span className="mini-spec-label">POWER</span>
                              <span className="mini-spec-value">
                                <Zap size={10} className="mini-spec-icon" />
                                {carData.specs.power} HP
                              </span>
                            </div>
                            <div className="mini-spec-divider" />
                            <div className="mini-spec-item">
                              <span className="mini-spec-label">ACCEL</span>
                              <span className="mini-spec-value">
                                <Activity size={10} className="mini-spec-icon" />
                                {carData.specs.acceleration}s
                              </span>
                            </div>
                            <div className="mini-spec-divider" />
                            <div className="mini-spec-item">
                              <span className="mini-spec-label">TOP SPEED</span>
                              <span className="mini-spec-value">
                                <Gauge size={10} className="mini-spec-icon" />
                                {carData.specs.topSpeed} km/h
                              </span>
                            </div>
                          </div>

                          {/* Status & Action controls */}
                          <div className="garage-request-card__action-block">
                            <div className="status-badge-container">
                              <span className={`status-pill ${statusConfig.className}`}>
                                <span className="status-pulse-dot" />
                                {statusConfig.label}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="details-toggle-btn"
                              onClick={() => setExpandedRequestId(isExpanded ? '' : request.id)}
                            >
                              <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                              <ChevronRight size={14} className={`arrow-icon ${isExpanded ? 'down' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Details Area */}
                        {isExpanded && (
                          <div className="garage-request-card__details animate-fade-in">
                            <div className="garage-details-grid">
                              
                              {/* Left side: Timeline Progress */}
                              <div className="garage-details-col garage-details-col--progress glass">
                                <h4>Request Status Progress</h4>
                                <div className="garage-timeline">
                                  <div className="garage-timeline-step done">
                                    <div className="step-indicator">
                                      <FileCheck size={13} />
                                    </div>
                                    <div className="step-content">
                                      <h5>Submitted</h5>
                                      <p>We received your booking details on {formatDate(request.submittedAt)}.</p>
                                    </div>
                                  </div>

                                  <div className={`garage-timeline-step ${request.status !== 'rejected' ? 'done' : ''} ${request.status === 'pending' ? 'active' : ''}`}>
                                    <div className="step-indicator">
                                      <Clock size={13} />
                                    </div>
                                    <div className="step-content">
                                      <h5>Under Review</h5>
                                      <p>Verifying driver eligibility and document validity audits.</p>
                                    </div>
                                  </div>

                                  <div className={`garage-timeline-step ${request.status === 'accepted' ? 'done' : request.status === 'rejected' ? 'rejected' : ''}`}>
                                    <div className="step-indicator">
                                      {request.status === 'accepted' ? <Key size={13} /> : <Sparkles size={13} />}
                                    </div>
                                    <div className="step-content">
                                      <h5>Decision Status</h5>
                                      <p>{statusConfig.desc}</p>
                                    </div>
                                  </div>
                                </div>

                                {request.status === 'accepted' && request.technicianNote && (
                                  <div className="concierge-note-box glass">
                                    <div className="concierge-note-header">
                                      <Sparkles size={14} className="concierge-note-icon" />
                                      <strong>CONCIERGE ARRIVAL PROTOCOL</strong>
                                    </div>
                                    <p>{request.technicianNote}</p>
                                  </div>
                                )}
                              </div>

                              {/* Right side: Detailed Invoice & Booking Data */}
                              <div className="garage-details-col garage-details-col--invoice glass">
                                <h4>Rental Invoice details</h4>
                                <dl className="garage-dl">
                                  <div>
                                    <dt>
                                      <Calendar size={13} className="invoice-icon" />
                                      <span>Pickup Date</span>
                                    </dt>
                                    <dd>{formatDate(request.pickupDate)}</dd>
                                  </div>
                                  <div>
                                    <dt>
                                      <Calendar size={13} className="invoice-icon" />
                                      <span>Return Date</span>
                                    </dt>
                                    <dd>{formatDate(request.returnDate)}</dd>
                                  </div>
                                  <div>
                                    <dt>
                                      <Clock size={13} className="invoice-icon" />
                                      <span>Total Duration</span>
                                    </dt>
                                    <dd>{request.days} Days</dd>
                                  </div>
                                  <div>
                                    <dt>
                                      <ShieldCheck size={13} className="invoice-icon" />
                                      <span>Refundable Deposit</span>
                                    </dt>
                                    <dd>{request.deposit.toLocaleString()} AED</dd>
                                  </div>
                                  <div className="total-row">
                                    <dt>
                                      <Zap size={14} className="invoice-icon" />
                                      <span>Total Cost (inc. VAT)</span>
                                    </dt>
                                    <dd>{request.totalCost.toLocaleString()} AED</dd>
                                  </div>
                                </dl>

                                <div className="garage-action-links">
                                  <a
                                    href={`https://wa.me/971509924247?text=Hello%20Lux%20Motors!%20Checking%20status%20for%20booking%20ID%20${request.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="concierge-whatsapp-btn"
                                  >
                                    <MessageSquare size={14} />
                                    <span>Chat live with concierge</span>
                                  </a>
                                  <Link to={`/fleet/${carData.slug}`} className="view-car-btn">
                                    <span>Review Specs</span>
                                  </Link>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Lookup Tracker Box at the bottom */}
              <div className="garage-lookup-box glass-panel">
                <div className="garage-lookup-box__glow" />
                <h3 className="lookup-title">Verify A Request ID</h3>
                <p className="lookup-subtitle">
                  Locate custom reservation logs by putting in the identifier code below.
                </p>

                <div className="garage-lookup-form">
                  <div className="lookup-input-group">
                    <label htmlFor="lookup-id">Request ID</label>
                    <input 
                      id="lookup-id"
                      type="text" 
                      placeholder="e.g. REQ-8842"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="lookup-btn"
                    onClick={handleLookup}
                    disabled={searchLoading}
                  >
                    {searchLoading ? 'Searching...' : 'Search Ledger'}
                  </button>
                </div>

                {searchError && (
                  <div className="lookup-error-msg animate-fade-in">
                    {searchError}
                  </div>
                )}

                {searchResult && (
                  <div className="lookup-success-box animate-fade-in">
                    <div className="success-header">
                      <span className="success-id">{searchResult.id}</span>
                      <span className={`success-status ${searchResult.status}`}>
                        {searchResult.status.toUpperCase()}
                      </span>
                    </div>
                    <p>
                      Found request for <strong>{searchResult.carName || DEFAULT_FLEET.find(c => c.slug === searchResult.carSlug)?.name}</strong> booked from <strong>{formatDate(searchResult.pickupDate)}</strong> to <strong>{formatDate(searchResult.returnDate)}</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PANE 2: VIP Favorites */}
            <div className="garage-pane garage-pane--favorites">
              {favorites.length === 0 ? (
                <div className="garage-empty glass-panel">
                  <Heart size={48} className="garage-empty__icon" />
                  <h3>Your Saved Collection is Empty</h3>
                  <p>You haven't liked any luxury models yet. Select the heart icon on any fleet card to bookmark it here.</p>
                  <Link to="/fleet" className="garage-empty__btn">
                    <span>Explore Fleet Collection</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="garage-favorites-grid">
                  {favorites.map((car, idx) => {
                    const cardShape = toCarCardShape(car);
                    return (
                      <div className="favorites-card-wrapper" key={car.slug}>
                        {/* Custom Heart Unliker Button overlay */}
                        <button
                          type="button"
                          className="favorites-card-unliker"
                          onClick={(e) => handleRemoveFavorite(e, car.slug, car.name)}
                          aria-label={`Remove ${car.name} from favorites`}
                          title="Remove from favorites"
                        >
                          <Trash2 size={14} />
                        </button>
                        <CarCard car={cardShape} index={idx} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
