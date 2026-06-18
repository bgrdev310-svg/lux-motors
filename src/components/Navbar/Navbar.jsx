import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Menu, X, Phone, MessageCircle, Warehouse, User } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'About', href: '/about' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
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
          <Link to="/" className="navbar__logo" aria-label="Lux Motors Home">
            <span className="navbar__logo-lux">LUX</span>
            <span className="navbar__logo-motors">MOTORS</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="navbar__link">
                {link.label}
              </Link>
            ))}
            <Link to="/garage" className="navbar__link navbar__link--icon" aria-label="Garage Client Portal">
              <Warehouse size={16} />
            </Link>
          </div>

          {/* Right Side */}
          <div className="navbar__actions">
            <a href="tel:+971509924247" className="navbar__phone" aria-label="Call us">
              <Phone size={16} />
              <span>+971 50 992 4247</span>
            </a>
            <Link
              to="/login"
              className="navbar__cta"
            >
              <User size={16} />
              <span>Login</span>
            </Link>
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
            <Link
              key={link.label}
              to={link.href}
              className="navbar__mobile-link"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/garage"
            className="navbar__mobile-link navbar__mobile-link--icon"
            style={{ animationDelay: `${navLinks.length * 0.05}s` }}
            onClick={() => setMenuOpen(false)}
          >
            <Warehouse size={20} />
            <span>Garage</span>
          </Link>
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
