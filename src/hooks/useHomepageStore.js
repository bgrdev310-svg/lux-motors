import { useState, useEffect, useCallback } from 'react';
import { heroCar } from '../data/cars';

const STORAGE_KEY = 'luxmotors-homepage-config-v1';

export const DEFAULT_CONFIG = {
  // Hero Section
  heroLabel: "Dubai's Premier Luxury Fleet",
  heroTitleLine1: "Command",
  heroTitleLine2: "The Road.",
  heroTitleAccent: "Own The Moment.",
  heroDescription: "Exotic sports cars, luxury sedans, and elite SUVs — delivered to your doorstep across Dubai. Experience automotive excellence with Lux Motors.",
  heroPrimaryCtaText: "Explore Fleet",
  heroPrimaryCtaLink: "/fleet",
  heroSecondaryCtaText: "Book Now",
  heroSecondaryCtaLink: "https://wa.me/971509924247",
  heroTrustText: "Trusted by 1,000+ clients",
  heroBgImage: "", // fallback to heroCar.image when empty
  
  // Hero Car Info
  heroCarName: heroCar.name,
  heroCarTagline: heroCar.tagline,
  heroCarSpecAcceleration: heroCar.specs.acceleration,
  heroCarSpecPower: heroCar.specs.power,
  heroCarSpecEngine: heroCar.specs.engine,

  // Featured Fleet Section
  fleetLabel: "Our Fleet",
  fleetTitle: "Drive Your Dream",
  fleetSubtitle: "From fierce supercars to elegant luxury sedans, find the perfect car for every occasion.",
  fleetCtaText: "View All Cars",

  // Why Choose Us Section
  wcuLabel: "Why Lux Motors",
  wcuTitle: "The Luxury Standard",
  wcuSubtitle: "More than a rental — an experience crafted for those who demand excellence.",
  wcuBenefits: [
    {
      id: 0,
      icon: 'Sparkles',
      title: 'Premium Fleet',
      description: '500+ handpicked luxury, sports, and exotic vehicles maintained to perfection.',
      metric: '500+ ELITE VEHICLES',
      tagline: 'Track-Ready Perfection',
      facts: [
        { label: 'Average Fleet Age', val: '< 1 Year' },
        { label: 'System Checkups', val: '100% Daily' },
        { label: 'Detailing Protocol', val: 'Showroom Spec' },
        { label: 'Performance Tier', val: 'Track-Certified' },
        { label: 'Brands Available', val: '15+ Marques' }
      ]
    },
    {
      id: 1,
      icon: 'MapPin',
      title: 'Free Delivery',
      description: 'Complimentary delivery and pickup to any location across Dubai.',
      metric: '100% COMPLIMENTARY',
      tagline: 'Direct-To-Door Concierge',
      facts: [
        { label: 'Average Dispatch Speed', val: '< 60 Minutes' },
        { label: 'Service Boundaries', val: 'All Dubai Districts' },
        { label: 'Airport Meet & Greet', val: 'VIP Terminal Support' },
        { label: 'Yacht Club Delivery', val: 'Available' },
        { label: 'Hotel Valet Hand-Off', val: '5-Star Properties' }
      ]
    },
    {
      id: 2,
      icon: 'CreditCard',
      title: 'Best Prices',
      description: 'Competitive rates with no hidden fees. Save up to 40% on monthly rentals.',
      metric: 'UP TO 40% SAVINGS',
      tagline: 'Unmatched Luxury Value',
      facts: [
        { label: 'Price Match Promise', val: 'Guaranteed' },
        { label: 'Hidden Broker Fees', val: 'Zero' },
        { label: 'Deposit Release Speed', val: 'Instant Refund' },
        { label: 'Monthly Discount', val: 'Up to 40%' },
        { label: 'Loyalty Rewards', val: 'Elite Tier System' }
      ]
    },
    {
      id: 3,
      icon: 'Clock',
      title: 'Flexible Rentals',
      description: 'Daily, weekly, or monthly plans. Extend or modify your booking anytime.',
      metric: '100% ADAPTABLE',
      tagline: 'On-Demand Mobility Control',
      facts: [
        { label: 'Minimum Period', val: '1 Single Day' },
        { label: 'Extension Approval', val: 'Real-Time' },
        { label: 'Cancellation Policy', val: 'Free up to 24h' },
        { label: 'Swap Vehicles', val: 'Mid-Rental Allowed' },
        { label: 'Long-Term Leasing', val: 'Up to 12 Months' }
      ]
    },
    {
      id: 4,
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Round-the-clock assistance via phone, WhatsApp, or email.',
      metric: 'ELITE CONCIERCE',
      tagline: 'Always at Your Disposal',
      facts: [
        { label: 'Average Response Time', val: '< 2 Minutes' },
        { label: 'Contact Channels', val: 'WhatsApp / Phone / Mail' },
        { label: 'Concierge Language', val: 'Multi-lingual Elite' },
        { label: 'Emergency Roadside', val: 'Instant Dispatch' },
        { label: 'Client Satisfaction', val: '99.2% Rating' }
      ]
    },
    {
      id: 5,
      icon: 'Shield',
      title: 'Fully Insured',
      description: 'Comprehensive insurance coverage for your complete peace of mind.',
      metric: 'ALL-INCLUSIVE COVER',
      tagline: 'Zero-Risk Grand Touring',
      facts: [
        { label: 'Coverage Scope', val: 'Comprehensive Multi-risk' },
        { label: 'Deductible Options', val: 'Zero Liability Avail.' },
        { label: 'Roadside Assistance', val: '24/7 Nationwide' },
        { label: 'Claim Processing', val: 'Same-Day Resolution' },
        { label: 'Personal Liability', val: 'Fully Covered' }
      ]
    }
  ],

  // Testimonials Section
  testimonialsLabel: "Testimonials",
  testimonialsTitle: "Voices From Real Drivers",
  testimonialsList: [
    {
      id: 1,
      name: 'Alexander K.',
      location: 'Moscow, Russia',
      rating: 5,
      text: 'Absolutely phenomenal service. The Lamborghini Urus was delivered right to my hotel at Palm Jumeirah. Spotless condition, full tank. Will definitely be back.',
      avatar: 'AK',
      car: 'Lamborghini Urus',
    },
    {
      id: 2,
      name: 'Sarah M.',
      location: 'London, UK',
      rating: 5,
      text: 'Rented a Rolls-Royce Ghost for my wedding weekend. The team went above and beyond — decorated the car beautifully. An unforgettable experience.',
      avatar: 'SM',
      car: 'Rolls-Royce Ghost',
    },
    {
      id: 3,
      name: 'James W.',
      location: 'New York, USA',
      rating: 5,
      text: 'Third time renting from Lux Motors. Consistency is their superpower. Ferrari 488 was a dream on Sheikh Zayed Road. Competitive pricing too.',
      avatar: 'JW',
      car: 'Ferrari 488 GTB',
    },
    {
      id: 4,
      name: 'Fatima A.',
      location: 'Dubai, UAE',
      rating: 5,
      text: 'Best luxury rental in Dubai, hands down. Used their monthly package for a Porsche — saved 40%. Professional team available around the clock.',
      avatar: 'FA',
      car: 'Porsche 911',
    },
  ],

  // Prestige CTA Section
  ctaBadge: "EXCLUSIVITY REDEFINED",
  ctaTitleLine1: "NEVER SETTLE FOR",
  ctaTitleLine2: "THE ORDINARY.",
  ctaDescription: "Unleash ultimate performance and supreme comfort on the roads of Dubai. Our curated fleet of supercars, prestige sedans, and luxury SUVs is at your command.",
  ctaBtnText: "Rent Your Masterpiece",
  ctaBtnLink: "/fleet"
};

export function loadHomepageConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        // Merge with defaults to ensure any new keys exist
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    }
  } catch {
    /* fall through to defaults */
  }
  return DEFAULT_CONFIG;
}

export function persistHomepageConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent('homepage-config-updated'));
}

export function useHomepageStore() {
  const [config, setConfig] = useState(() => loadHomepageConfig());

  useEffect(() => {
    const sync = () => setConfig(loadHomepageConfig());
    window.addEventListener('homepage-config-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('homepage-config-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const save = useCallback((nextConfig) => {
    persistHomepageConfig(nextConfig);
    setConfig(nextConfig);
  }, []);

  const resetToDefaults = useCallback(() => {
    save(DEFAULT_CONFIG);
  }, [save]);

  return {
    config,
    save,
    resetToDefaults,
    refresh: () => setConfig(loadHomepageConfig())
  };
}
