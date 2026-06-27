import './Footer.css';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const footerLinks = {
  fleet: [
    { label: 'Sports Cars', href: '/fleet?category=sport' },
    { label: 'Super Sport', href: '/fleet?category=supersport' },
    { label: 'Luxury Cars', href: '/fleet?category=luxury' },
    { label: 'SUV', href: '/fleet?category=suv' },
    { label: 'Convertibles', href: '/fleet?category=convertible' },
    { label: 'Monthly Rentals', href: '/fleet?monthly=true' },
  ],
  brands: [
    { label: 'Ferrari', href: '/brands/ferrari' },
    { label: 'Lamborghini', href: '/brands/lamborghini' },
    { label: 'Rolls-Royce', href: '/brands/rolls-royce' },
    { label: 'Porsche', href: '/brands/porsche' },
    { label: 'Bentley', href: '/brands/bentley' },
    { label: 'Mercedes-Benz', href: '/brands/mercedes-benz' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="site-footer">

      {/* ——— Main Footer Content ——— */}
      <div className="footer__main container">
        <div className="footer__top">
          {/* Brand Column */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span className="footer__logo-lux">LUX</span>
              <span className="footer__logo-motors">MOTORS</span>
            </a>
            <span className="footer__logo-accent" />
            <p className="footer__tagline">
              Dubai's premier luxury car rental experience. Drive your dream car today.
            </p>

            <div className="footer__contact-items">
              <a href="tel:+971509924247" className="footer__contact-item">
                <Phone size={14} />
                <span>+971 50 992 4247</span>
              </a>
              <a href="mailto:sales@luxmotorsdxb.com" className="footer__contact-item">
                <Mail size={14} />
                <span>sales@luxmotorsdxb.com</span>
              </a>
              <a
                href="https://maps.app.goo.gl/5yCTjBhVof8PBFYo6"
                className="footer__contact-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={14} />
                <span>Dubai, UAE</span>
              </a>
            </div>

            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="TikTok">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer__links-grid">
            <div className="footer__links-col">
              <h4 className="footer__links-title">Fleet</h4>
              {footerLinks.fleet.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer__links-col">
              <h4 className="footer__links-title">Brands</h4>
              {footerLinks.brands.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer__links-col">
              <h4 className="footer__links-title">Company</h4>
              {footerLinks.company.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ——— Zone 3: Bottom Bar ——— */}
      <div className="footer__bottom-wrapper">
        <div className="footer__bottom container">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Lux Motors DXB. All rights reserved.
          </p>
          <div className="footer__bottom-center">
            <a href="/terms" className="footer__bottom-link">Terms</a>
            <span className="footer__bottom-sep" />
            <a href="/privacy" className="footer__bottom-link">Privacy</a>
            <span className="footer__bottom-sep" />
            <a href="/sitemap" className="footer__bottom-link">Sitemap</a>
            <span className="footer__bottom-sep" />
            <a href="/system-map" className="footer__bottom-link" style={{ color: 'var(--accent)', fontWeight: '600' }}>System Map</a>
          </div>
          <a
            href="#"
            className="footer__back-top"
            aria-label="Back to top"
            onClick={scrollToTop}
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
