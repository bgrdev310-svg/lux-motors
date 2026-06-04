import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Brands', href: '/brands' },
  { label: 'Events', href: '/events' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollTimeout = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isPageAtTop = currentScrollY < 100;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Handle immediate visibility based on direction
      if (isPageAtTop || menuOpen || isHovered) {
        setIsVisible(true);
      } else if (isScrollingDown) {
        // Hide immediately on scroll down
        setIsVisible(false);
      } else {
        // Show immediately on scroll up
        setIsVisible(true);
      }

      setScrolled(currentScrollY > 20);

      // Handle inactivity hide (0.7s)
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        if (!isPageAtTop && !menuOpen && !isHovered) {
          setIsVisible(false);
        }
      }, 700);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, [menuOpen, isHovered]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isVisible ? '' : 'navbar--hidden'} ${menuOpen ? 'navbar--open' : ''}`}
        id="main-navbar"
        onMouseEnter={() => {
          setIsHovered(true);
          setIsVisible(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <a href="/" className="navbar__logo" aria-label="Lux Motors Home">
            <span className="navbar__logo-lux">LUX</span>
            <span className="navbar__logo-motors">MOTORS</span>
          </a>

          {/* Desktop Links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="navbar__actions">
            <a href="tel:+971509924247" className="navbar__phone" aria-label="Call us">
              <Phone size={16} />
              <span>+971 50 992 4247</span>
            </a>
            <a
              href="https://wa.me/971509924247"
              className="navbar__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
              <span>Book Now</span>
            </a>
            <button
              className="navbar__menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__mobile-link"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="navbar__mobile-footer">
          <a href="tel:+971509924247" className="navbar__mobile-phone">
            <Phone size={18} />
            +971 50 992 4247
          </a>
          <a href="https://wa.me/971509924247" className="navbar__mobile-cta" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
