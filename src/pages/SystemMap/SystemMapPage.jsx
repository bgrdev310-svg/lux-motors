import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Server, 
  Database, 
  Users, 
  Cpu, 
  ArrowRight, 
  Check, 
  Lock, 
  ChevronDown, 
  RefreshCw, 
  Cloud, 
  Globe,
  Eye, 
  FileText,
  Workflow,
  Calendar,
  MapPin,
  CreditCard,
  Bell,
  Smartphone,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  MessageSquare,
  Hash,
  Clock,
  FileCheck,
  Key,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import './SystemMapPage.css';

// Import actual webp images used in the main fleet pages
import ferrariImg from '../../assets/images/car-ferrari.webp';
import porscheImg from '../../assets/images/car-porsche.webp';

export default function SystemMapPage() {
  const [activeArchTab, setActiveArchTab] = useState('journey');
  const [journeySubView, setJourneySubView] = useState('overview'); // 'overview' (default) vs 'simulator'
  
  const [openFaqs, setOpenFaqs] = useState({
    bugs: false,
    crm: false,
    staging: false,
    security: false,
    experience: false
  });

  // State for mock calendar click
  const [selectedMockDay, setSelectedMockDay] = useState(12);
  // State for residency toggle in checkout mockup
  const [residency, setResidency] = useState('local');
  // State for delivery toggle in checkout mockup
  const [deliveryMethod, setDeliveryMethod] = useState('list');
  // State for payment method in checkout mockup
  const [paymentOption, setPaymentOption] = useState('later');
  // State for mock garage card simulation
  const [garageStatus, setGarageStatus] = useState('pending'); // 'pending' (Under Review) vs 'confirmed' (Accepted & Scheduled)
  const [garageDetailsExpanded, setGarageDetailsExpanded] = useState(true);

  const toggleFaq = (key) => {
    setOpenFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const archTabs = [
    { id: 'journey', label: '1. Customer Booking Flow', icon: Users },
    { id: 'admin', label: '2. Admin Verification Hub', icon: Shield },
    { id: 'crm', label: '3. CRM Integration Sync', icon: Workflow },
    { id: 'migration', label: '4. Safe Data Migration', icon: RefreshCw },
    { id: 'deployment', label: '5. Risk-Free Launch', icon: Cloud }
  ];

  // Mock calendar days for JULY 2026
  // Crossed out dates match the details calendar styling
  const mockCalendarDays = [
    { day: 1, state: 'green' },
    { day: 2, state: 'green' },
    { day: 3, state: 'red' },     // Booked & Confirmed
    { day: 4, state: 'red' },     // Booked & Confirmed
    { day: 5, state: 'red' },     // Booked & Confirmed
    { day: 6, state: 'green' },
    { day: 7, state: 'green' },
    { day: 8, state: 'green' },
    { day: 9, state: 'green' },
    { day: 10, state: 'orange' }, // Pending Approval (New custom state)
    { day: 11, state: 'orange' }, // Pending Approval (New custom state)
    { day: 12, state: 'green' },
    { day: 13, state: 'green' },
    { day: 14, state: 'red' },    // Booked & Confirmed
    { day: 15, state: 'red' },    // Booked & Confirmed
    { day: 16, state: 'green' },
    { day: 17, state: 'green' },
    { day: 18, state: 'green' },
    { day: 19, state: 'green' },
    { day: 20, state: 'green' },
    { day: 21, state: 'green' }
  ];

  const tabContentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="sys-map">
      {/* Local Override CSS to prevent cache issues and guarantee exact style replica */}
      <style>{`
        .sys-map__sub-toggle {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 16px;
        }
        .sys-map__sub-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s ease;
        }
        .sys-map__sub-toggle-btn:hover {
          color: #ffffff;
          border-color: rgba(255,255,255,0.2);
          background: rgba(255, 255, 255, 0.05);
        }
        .sys-map__sub-toggle-btn.active {
          color: #050508;
          background: linear-gradient(135deg, #e8d5a3 0%, #c9a84c 100%);
          border-color: #c9a84c;
          box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
        }
        .sys-map__wf-timeline {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding-left: 20px;
        }
        .sys-map__wf-timeline::before {
          content: '';
          position: absolute;
          top: 0;
          left: 44px;
          width: 2px;
          height: 97%;
          background: linear-gradient(180deg, #c9a84c 0%, rgba(201, 168, 76, 0.1) 100%);
          z-index: 0;
        }
        @media (max-width: 767px) {
          .sys-map__wf-timeline {
            padding-left: 0px;
          }
          .sys-map__wf-timeline::before {
            left: 24px;
          }
        }
        .sys-map__wf-step {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .sys-map__wf-step {
            grid-template-columns: 80px 1fr;
            gap: 20px;
          }
        }
        .sys-map__wf-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #12121a;
          border: 2px solid #c9a84c;
          color: #c9a84c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-family: 'Space Grotesk', monospace;
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.3);
          margin-top: 10px;
        }
        .sys-map__wf-card {
          background: rgba(20, 20, 25, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          transition: border-color 0.3s ease;
        }
        @media (max-width: 767px) {
          .sys-map__wf-card {
            padding: 16px 12px;
          }
        }
        .sys-map__wf-card:hover {
          border-color: rgba(201, 168, 76, 0.3);
        }
        .sys-map__wf-title {
          font-size: 1.25rem;
          color: #ffffff;
          font-family: 'Playfair Display', serif;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sys-map__wf-title svg {
          color: #c9a84c;
        }
        .sys-map__wf-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .sys-map__wf-visual {
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
        }
        @media (max-width: 767px) {
          .sys-map__wf-visual {
            padding: 8px;
          }
        }
        /* Green Capsule Available Badge */
        .sys-map__avail-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 30px;
          color: #10b981;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: capitalize;
        }
        .sys-map__avail-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        /* Step 1 Visual Mockups */
        .sys-map__mock-fleet {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 576px) {
          .sys-map__mock-fleet {
            grid-template-columns: 1fr 1fr;
          }
        }
        .sys-map__mock-car {
          background: #0d0d14;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .sys-map__mock-car-header {
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sys-map__mock-car-cat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2px 8px;
          font-size: 9px;
          color: #e8d5a3;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .sys-map__mock-car-img-wrapper {
          height: 160px;
          background: #08080c;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .sys-map__mock-car-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .sys-map__mock-car:hover .sys-map__mock-car-img-wrapper img {
          transform: scale(1.05);
        }
        .sys-map__mock-car-info {
          padding: 16px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .sys-map__mock-car-brand {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }
        .sys-map__mock-car-name {
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          margin-bottom: 12px;
        }
        .sys-map__mock-car-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px dashed rgba(255,255,255,0.06);
          padding-top: 12px;
        }
        .sys-map__mock-car-price {
          color: #c9a84c;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Space Grotesk', monospace;
        }
        /* Step 2 Replica Calendar popover style */
        .sys-map__mock-calendar-wrapper {
          width: 100%;
          max-width: 330px;
          background: #0a0a0e;
          border: 1px solid rgba(201, 168, 76, 0.22);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.7);
          margin-top: 10px;
          box-sizing: border-box;
        }
        .sys-map__mock-calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sys-map__mock-calendar-header h5 {
          font-family: 'Space Grotesk', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #ffffff;
          text-transform: uppercase;
        }
        .sys-map__mock-calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .sys-map__mock-calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          font-size: 11px;
          font-family: 'Space Grotesk', monospace;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          position: relative;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .sys-map__mock-calendar-day:hover:not(.disabled):not(.red):not(.orange) {
          background: rgba(201, 168, 76, 0.08);
          border-color: rgba(201, 168, 76, 0.25);
          color: #e8d5a3;
        }
        .sys-map__mock-calendar-day.selected {
          background: #c9a84c !important;
          color: #050508 !important;
          font-weight: 700;
          border-color: #e8d5a3 !important;
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.4);
        }
        /* Replica Red Booked crossed out */
        .sys-map__mock-calendar-day.red {
          background: rgba(239, 68, 68, 0.12) !important;
          border: 1px solid rgba(239, 68, 68, 0.35) !important;
          color: #f87171 !important;
          opacity: 0.85;
          cursor: not-allowed;
          font-weight: 600;
        }
        .sys-map__mock-calendar-day.red::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 12%;
          right: 12%;
          height: 1px;
          background: rgba(239, 68, 68, 0.5);
          transform: rotate(-15deg);
          pointer-events: none;
        }
        /* Replica Orange Pending crossed out */
        .sys-map__mock-calendar-day.orange {
          background: rgba(249, 115, 22, 0.12) !important;
          border: 1px solid rgba(249, 115, 22, 0.35) !important;
          color: #fb923c !important;
          opacity: 0.85;
          cursor: not-allowed;
          font-weight: 600;
        }
        .sys-map__mock-calendar-day.orange::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 12%;
          right: 12%;
          height: 1px;
          background: rgba(249, 115, 22, 0.5);
          transform: rotate(-15deg);
          pointer-events: none;
        }
        /* Upgraded Booking Confirmation Popup mockup */
        .sys-map__mock-popup-card {
          width: 100%;
          max-width: 500px;
          background: #0d0d12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.8);
          position: relative;
          box-sizing: border-box;
        }
        @media (max-width: 767px) {
          .sys-map__mock-popup-header {
            padding: 16px 12px 12px 12px;
          }
          .sys-map__mock-popup-title {
            font-size: 1.15rem;
          }
          .sys-map__mock-popup-inner-card {
            margin: 0 8px 12px 8px;
            padding: 10px;
          }
          .sys-map__mock-popup-form {
            padding: 0 8px 16px 8px;
            gap: 12px;
          }
          .sys-map__mock-toggle-btn {
            font-size: 10px;
            padding: 5px;
          }
        }
        .sys-map__mock-popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .sys-map__mock-popup-close:hover {
          color: #ffffff;
        }
        .sys-map__mock-popup-header {
          padding: 24px 24px 16px 24px;
        }
        .sys-map__mock-popup-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 4px;
          font-weight: 700;
        }
        .sys-map__mock-popup-subtitle {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
        }
        .sys-map__mock-popup-inner-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 16px;
          margin: 0 24px 16px 24px;
        }
        .sys-map__mock-popup-car-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .sys-map__mock-popup-brand {
          font-size: 9px;
          color: #c9a84c;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 0.5px;
        }
        .sys-map__mock-popup-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          color: #ffffff;
          font-weight: 700;
        }
        .sys-map__mock-popup-specs {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding-top: 10px;
          font-size: 12px;
        }
        .sys-map__mock-popup-spec-item {
          display: flex;
          justify-content: space-between;
        }
        .sys-map__mock-popup-spec-item span:first-child {
          color: rgba(255,255,255,0.4);
        }
        .sys-map__mock-popup-spec-item span:last-child {
          color: #ffffff;
        }
        .sys-map__mock-popup-total {
          border-top: 1px dashed rgba(255,255,255,0.1);
          padding-top: 8px;
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sys-map__mock-popup-total-val {
          color: #c9a84c;
          font-weight: 700;
          font-family: 'Space Grotesk', monospace;
          font-size: 15px;
        }
        .sys-map__mock-popup-form {
          padding: 0 24px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .sys-map__mock-popup-confirm-btn {
          width: 100%;
          background: linear-gradient(135deg, #e8d5a3 0%, #c9a84c 100%);
          color: #050508;
          font-weight: 700;
          font-size: 13px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(201, 168, 76, 0.25);
          transition: transform 0.2s ease;
        }
        .sys-map__mock-popup-confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 168, 76, 0.35);
        }
        /* Step 5: Real replica Garage Card styles */
        .sys-map__garage-card {
          width: 100%;
          max-width: 440px;
          background: #0a0a0f;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          box-sizing: border-box;
        }
        @media (max-width: 575px) {
          .sys-map__garage-card {
            padding: 16px;
          }
        }
        .sys-map__wf-visual-actions {
          display: flex;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .sys-map__wf-visual-actions {
            flex-direction: column;
            gap: 8px;
          }
        }
        .sys-map__garage-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .sys-map__garage-card-status {
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .sys-map__garage-card-status.pending {
          background: rgba(249, 115, 22, 0.1);
          color: #f97316;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }
        .sys-map__garage-card-status.confirmed {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .sys-map__garage-card-img-wrapper {
          height: 150px;
          background: #07070a;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .sys-map__garage-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sys-map__garage-card-title-section {
          margin-bottom: 16px;
        }
        .sys-map__garage-card-car-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: #ffffff;
          font-weight: 700;
        }
        .sys-map__garage-card-req-id {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 8px;
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.6);
        }
        .sys-map__garage-card-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 14px;
          margin-bottom: 16px;
        }
        .sys-map__garage-card-metric-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sys-map__garage-card-metric-item span:first-child {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }
        .sys-map__garage-card-metric-item span:last-child {
          font-size: 12px;
          color: #ffffff;
          font-weight: 600;
        }
        .sys-map__garage-card-toggle-details-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 16px;
        }
        .sys-map__garage-progress-title {
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          color: #c9a84c;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(201, 168, 76, 0.15);
          padding-bottom: 4px;
        }
        .sys-map__progress-steps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }
        .sys-map__progress-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .sys-map__progress-bullet {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #0a0a0f;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: bold;
          z-index: 1;
        }
        .sys-map__progress-step.active-step .sys-map__progress-bullet {
          border-color: #10b981;
          color: #10b981;
        }
        .sys-map__progress-step.active-step .sys-map__progress-bullet.checked {
          background: #10b981;
          color: #050508;
        }
        .sys-map__progress-step.current-step .sys-map__progress-bullet {
          background: #10b981;
          color: #050508;
          border-color: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .sys-map__progress-step-content h6 {
          font-size: 12px;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .sys-map__progress-step-content p {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.4;
        }
        .sys-map__invoice-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 12px;
          border-radius: 8px;
        }
        .sys-map__invoice-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .sys-map__invoice-row span:first-child {
          color: rgba(255, 255, 255, 0.45);
        }
        .sys-map__invoice-row span:last-child {
          color: #ffffff;
        }
        .sys-map__invoice-row.total-row {
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
          padding-top: 8px;
          margin-top: 4px;
          font-weight: bold;
        }
        .sys-map__invoice-row.total-row span:last-child {
          color: #10b981;
        }
        .sys-map__garage-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 16px;
        }
        .sys-map__garage-chat-btn {
          width: 100%;
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }
        .sys-map__garage-specs-btn {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          color: #ffffff;
          padding: 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
        }
        /* Step 6: Admin buttons styled correctly */
        .sys-map__mock-btn.reject-btn {
          border-color: rgba(239, 68, 68, 0.4);
          color: #ef4444;
          background: rgba(239, 68, 68, 0.03);
        }
        .sys-map__mock-btn.reject-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }
        /* ===== Step 5: Full Replica Garage Page Card ===== */
        .sys-map__real-garage-card {
          position: relative;
          border-radius: 20px;
          background: rgba(10, 10, 15, 0.45);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          max-width: 420px;
          width: 100%;
        }
        .sys-map__real-garage-card:hover {
          border-color: rgba(var(--card-theme-rgb), 0.35);
          box-shadow: 0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(var(--card-theme-rgb), 0.06);
          transform: translateY(-4px);
        }
        .sys-map__real-garage-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(var(--card-theme-rgb), 0.12) 0%, rgba(7, 7, 10, 0.75) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .sys-map__real-garage-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .sys-map__real-garage-card:hover .sys-map__real-garage-img-wrap img {
          transform: scale(1.05);
        }
        .sys-map__real-garage-img-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }
        .sys-map__real-garage-category {
          font-family: 'Space Grotesk', monospace;
          font-size: 8px;
          color: var(--card-theme-color);
          background: rgba(var(--card-theme-rgb), 0.12);
          border: 1px solid rgba(var(--card-theme-rgb), 0.25);
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .sys-map__real-garage-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 30px;
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .sys-map__real-garage-status-pill.pending {
          background: rgba(249, 115, 22, 0.12);
          border: 1px solid rgba(249, 115, 22, 0.3);
          color: #f97316;
        }
        .sys-map__real-garage-status-pill.confirmed {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }
        .sys-map__real-garage-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 6px currentColor;
          animation: sysMapPulse 2s infinite;
        }
        @keyframes sysMapPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .sys-map__real-garage-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sys-map__real-garage-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .sys-map__real-garage-brand {
          font-family: 'Space Grotesk', monospace;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--card-theme-color);
          text-transform: uppercase;
        }
        .sys-map__real-garage-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          margin-top: 3px;
          color: #ffffff;
          letter-spacing: -0.3px;
        }
        .sys-map__real-garage-id-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.03);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .sys-map__real-garage-stats {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 14px;
          border-radius: 10px;
        }
        .sys-map__real-garage-stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }
        .sys-map__real-garage-stat-label {
          color: rgba(255, 255, 255, 0.45);
        }
        .sys-map__real-garage-stat-value {
          font-family: 'Space Grotesk', monospace;
          font-weight: 600;
          color: #ffffff;
        }
        .sys-map__real-garage-stat-value.cost {
          color: var(--card-theme-color);
          font-size: 13px;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(var(--card-theme-rgb), 0.15);
        }
        .sys-map__real-garage-footer {
          margin-top: 4px;
          display: flex;
          justify-content: center;
        }
        .sys-map__real-garage-toggle-btn {
          width: 100%;
          justify-content: center;
          padding: 10px;
          font-weight: 600;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .sys-map__real-garage-toggle-btn:hover {
          color: #ffffff;
          border-color: rgba(var(--card-theme-rgb), 0.3);
          background: rgba(var(--card-theme-rgb), 0.05);
        }
        .sys-map__real-garage-details {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px;
          background: rgba(3, 3, 5, 0.5);
        }
        .sys-map__real-garage-details-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sys-map__real-garage-section h4 {
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.45);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 6px;
          margin-bottom: 12px;
        }
        .sys-map__real-garage-timeline {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          padding-left: 8px;
        }
        .sys-map__real-garage-timeline::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 22px;
          bottom: 10px;
          width: 2px;
          background: rgba(255, 255, 255, 0.04);
        }
        .sys-map__real-timeline-step {
          display: flex;
          gap: 14px;
          position: relative;
        }
        .sys-map__real-timeline-step::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 22px;
          bottom: -32px;
          width: 2px;
          background: var(--card-theme-color);
          z-index: 1;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .sys-map__real-timeline-step.done::before {
          transform: scaleY(1);
        }
        .sys-map__real-timeline-step:last-child::before {
          display: none;
        }
        .sys-map__real-step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #07070a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.45);
          z-index: 2;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
          flex-shrink: 0;
        }
        .sys-map__real-timeline-step.done .sys-map__real-step-indicator {
          background: var(--card-theme-color);
          border-color: var(--card-theme-color);
          color: #030305;
          box-shadow: 0 0 15px rgba(var(--card-theme-rgb), 0.35);
        }
        .sys-map__real-timeline-step.done .sys-map__real-step-content h5 {
          color: #ffffff;
        }
        .sys-map__real-timeline-step.active .sys-map__real-step-indicator {
          border-color: var(--card-theme-color);
          color: var(--card-theme-color);
          box-shadow: 0 0 10px rgba(var(--card-theme-rgb), 0.2);
          background: rgba(var(--card-theme-rgb), 0.05);
        }
        .sys-map__real-timeline-step.active .sys-map__real-step-content h5 {
          color: var(--card-theme-color);
        }
        .sys-map__real-step-content h5 {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 3px;
        }
        .sys-map__real-step-content p {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.4;
        }
        .sys-map__real-garage-dl {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sys-map__real-garage-dl > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 6px;
        }
        .sys-map__real-garage-dl dt {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.45);
        }
        .sys-map__real-invoice-icon {
          opacity: 0.5;
          color: var(--card-theme-color);
        }
        .sys-map__real-garage-dl dd {
          color: #ffffff;
          font-family: 'Space Grotesk', monospace;
          font-weight: 600;
        }
        .sys-map__real-total-row {
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-bottom: none !important;
          padding-top: 14px !important;
          margin-top: 4px;
        }
        .sys-map__real-total-row dt {
          font-family: 'Playfair Display', serif !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          color: var(--card-theme-color) !important;
        }
        .sys-map__real-total-row dt .sys-map__real-invoice-icon {
          opacity: 0.8;
        }
        .sys-map__real-total-row dd {
          font-family: 'Playfair Display', serif !important;
          font-size: 18px !important;
          font-weight: 800 !important;
          color: var(--card-theme-color) !important;
          text-shadow: 0 0 12px rgba(var(--card-theme-rgb), 0.2);
        }
        .sys-map__real-garage-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sys-map__real-chat-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 6px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: 1px solid #10b981;
          color: #ffffff;
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
        }
        .sys-map__real-chat-btn:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }
        .sys-map__real-specs-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid rgba(var(--card-theme-rgb), 0.3);
          color: var(--card-theme-color);
          background: transparent;
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .sys-map__real-specs-btn:hover {
          border-color: var(--card-theme-color);
          background: var(--card-theme-color);
          color: #030305;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--card-theme-rgb), 0.25);
        }
        .sys-map__real-garage-card.expanded-card {
          border-color: rgba(var(--card-theme-rgb), 0.45);
          background: rgba(15, 15, 22, 0.6);
          box-shadow: 0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(var(--card-theme-rgb), 0.1);
          transform: translateY(0);
        }
      `}</style>

      <div className="sys-map__container">
        
        {/* ——— Elegant B2B Header ——— */}
        <header className="sys-map__header">
          <div className="sys-map__badge">
            <Shield size={12} />
            <span>Technical Proposal & Architecture Map</span>
          </div>
          <h1 className="sys-map__title">
            How We Build <span className="accent">Lux Motors Ae</span>
          </h1>
          <p className="sys-map__subtitle">
            A comprehensive, interactive overview of the backend workflows, data synchronization, security protocols, and our zero-downtime integration strategy.
          </p>
        </header>

        {/* ——— Original 5 Tabs Menu ——— */}
        <div className="sys-map__tabs">
          {archTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`sys-map__tab-btn ${activeArchTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveArchTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ——— Render Original Tab Layout with Subviews ——— */}
        <div className="sys-map__content-grid">
          <AnimatePresence mode="wait">

            {/* TAB 1: Customer Booking Flow */}
            {activeArchTab === 'journey' && (
              <motion.div
                key="tab-journey"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Simulator sub-view selector buttons inside Tab 1 */}
                <div className="sys-map__sub-toggle">
                  <button 
                    className={`sys-map__sub-toggle-btn ${journeySubView === 'overview' ? 'active' : ''}`}
                    onClick={() => setJourneySubView('overview')}
                  >
                    <Server size={14} />
                    <span>High-Level Architecture</span>
                  </button>
                  <button 
                    className={`sys-map__sub-toggle-btn ${journeySubView === 'simulator' ? 'active' : ''}`}
                    onClick={() => setJourneySubView('simulator')}
                  >
                    <Workflow size={14} />
                    <span>✨ Interactive Booking Lifecycle Simulator</span>
                  </button>
                </div>

                {journeySubView === 'overview' ? (
                  <>
                    {/* Original 4-Step Diagram */}
                    <div className="sys-map__diagram-panel glass-panel" style={{ marginBottom: '30px' }}>
                      <div className="sys-map__flow">
                        
                        <div className="sys-map__node active-node">
                          <div className="sys-map__node-header">
                            <span className="sys-map__node-step">Step 1</span>
                            <div className="sys-map__node-icon-wrapper">
                              <Eye size={20} />
                            </div>
                          </div>
                          <h4 className="sys-map__node-title">Browse & Search</h4>
                          <p className="sys-map__node-desc">Client views premium catalog with live filters (brands, categories, pricing, daily/monthly toggle).</p>
                          <div className="sys-map__node-meta">
                            <span>Platform</span>
                            <span className="sys-map__node-pill">Frontend UI</span>
                          </div>
                        </div>

                        <div className="sys-map__connector">
                          <ArrowRight size={24} />
                        </div>

                        <div className="sys-map__node">
                          <div className="sys-map__node-header">
                            <span className="sys-map__node-step">Step 2</span>
                            <div className="sys-map__node-icon-wrapper">
                              <FileText size={20} />
                            </div>
                          </div>
                          <h4 className="sys-map__node-title">Upload Documents</h4>
                          <p className="sys-map__node-desc">Client securely uploads passport and driving license images directly from checkout form.</p>
                          <div className="sys-map__node-meta">
                            <span>Security</span>
                            <span className="sys-map__node-pill">SSL Encrypted</span>
                          </div>
                        </div>

                        <div className="sys-map__connector">
                          <ArrowRight size={24} />
                        </div>

                        <div className="sys-map__node">
                          <div className="sys-map__node-header">
                            <span className="sys-map__node-step">Step 3</span>
                            <div className="sys-map__node-icon-wrapper">
                              <Database size={20} />
                            </div>
                          </div>
                          <h4 className="sys-map__node-title">Secure Submit</h4>
                          <p className="sys-map__node-desc">Booking request details and temporary files are queued inside database for verification.</p>
                          <div className="sys-map__node-meta">
                            <span>DB Storage</span>
                            <span className="sys-map__node-pill">Postgres SQL</span>
                          </div>
                        </div>

                        <div className="sys-map__connector">
                          <ArrowRight size={24} />
                        </div>

                        <div className="sys-map__node">
                          <div className="sys-map__node-header">
                            <span className="sys-map__node-step">Step 4</span>
                            <div className="sys-map__node-icon-wrapper">
                              <RefreshCw size={20} />
                            </div>
                          </div>
                          <h4 className="sys-map__node-title">Garage Page Sync</h4>
                          <p className="sys-map__node-desc">Client gets unique booking ID link to track booking status, chat, and invoices in real-time.</p>
                          <div className="sys-map__node-meta">
                            <span>Realtime updates</span>
                            <span className="sys-map__node-pill">Garage Portal</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Original Details Card */}
                    <div className="sys-map__details glass-panel">
                      <div className="sys-map__details-text">
                        <h3 className="sys-map__details-title">Elite & Seamless Checkout Experience</h3>
                        <p className="sys-map__details-body">
                          The public interface is optimized to minimize friction. Instead of redirecting clients to third-party forms, document uploads and scheduling happen directly on-page. Once requested, clients can track everything on their custom <strong>Garage</strong> page.
                        </p>
                        <div className="sys-map__feature-list">
                          <div className="sys-map__feature-item">
                            <Check size={16} className="sys-map__feature-icon" />
                            <div className="sys-map__feature-text">
                              <h5>Private Upload Buckets</h5>
                              <p>Files are uploaded directly to access-controlled private buckets (not publicly URL-readable).</p>
                            </div>
                          </div>
                          <div className="sys-map__feature-item">
                            <Check size={16} className="sys-map__feature-icon" />
                            <div className="sys-map__feature-text">
                              <h5>Vetted Dates Engine</h5>
                              <p>Interactive calendar prevents double booking of specific vehicle chassis numbers.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sys-map__tech-spec glass-widget">
                        <h4 className="sys-map__tech-title">Tech Specifications</h4>
                        <div className="sys-map__tech-item">
                          <span>Framework</span>
                          <span>React + Vite (Ultra Fast)</span>
                        </div>
                        <div className="sys-map__tech-item">
                          <span>State Manager</span>
                          <span>React Context + Hooks</span>
                        </div>
                        <div className="sys-map__tech-item">
                          <span>Document Storage</span>
                          <span>Secure Private S3 Buckets</span>
                        </div>
                        <div className="sys-map__tech-item">
                          <span>Client Portal</span>
                          <span>Custom Garage tracking system</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Expanded step-by-step Booking Lifecycle Simulator */
                  <div className="sys-map__wf-timeline">
                    
                    {/* W Step 1: Car Selection & Availability Check */}
                    <div className="sys-map__wf-step">
                      <div className="sys-map__wf-badge">01</div>
                      <div className="sys-map__wf-card">
                        <h4 className="sys-map__wf-title">
                          <Eye size={20} />
                          <span>Car Selection & Availability Check</span>
                        </h4>
                        <p className="sys-map__wf-desc">
                          Customer browses fleet cards → clicks vehicle → navigates to <strong>CarDetails</strong>. The page queries available logs to calculate specs, features, rates, and the <em>nearest free day</em> dynamically.
                        </p>
                        <div className="sys-map__wf-visual">
                          <div className="sys-map__mock-fleet">
                            {/* Ferrari Card */}
                            <div className="sys-map__mock-car">
                              <div className="sys-map__mock-car-header">
                                <span className="sys-map__mock-car-cat">Sport</span>
                                <div className="sys-map__avail-pill">
                                  <span className="sys-map__avail-dot"></span>
                                  <span>Available Today</span>
                                </div>
                              </div>
                              <div className="sys-map__mock-car-img-wrapper">
                                <img src={ferrariImg} alt="Ferrari 488 GTB" />
                              </div>
                              <div className="sys-map__mock-car-info">
                                <div className="sys-map__mock-car-brand">Ferrari</div>
                                <div className="sys-map__mock-car-name">Ferrari 488 GTB</div>
                                <div className="sys-map__mock-car-footer">
                                  <span className="sys-map__mock-car-price">AED 4,000 / day</span>
                                </div>
                              </div>
                            </div>

                            {/* Porsche Card */}
                            <div className="sys-map__mock-car">
                              <div className="sys-map__mock-car-header">
                                <span className="sys-map__mock-car-cat">Sport</span>
                                <div className="sys-map__avail-pill">
                                  <span className="sys-map__avail-dot"></span>
                                  <span>Available Today</span>
                                </div>
                              </div>
                              <div className="sys-map__mock-car-img-wrapper">
                                <img src={porscheImg} alt="Porsche 911 GT3" />
                              </div>
                              <div className="sys-map__mock-car-info">
                                <div className="sys-map__mock-car-brand">Porsche</div>
                                <div className="sys-map__mock-car-name">Porsche 911 GT3</div>
                                <div className="sys-map__mock-car-footer">
                                  <span className="sys-map__mock-car-price">AED 3,000 / day</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* W Step 2: Interactive Calendar Availability */}
                    <div className="sys-map__wf-step">
                      <div className="sys-map__wf-badge">02</div>
                      <div className="sys-map__wf-card">
                        <h4 className="sys-map__wf-title">
                          <Calendar size={20} />
                          <span>Interactive Calendar Availability</span>
                        </h4>
                        <p className="sys-map__wf-desc">
                          The calendar replicates the styled layout of the car details page. Red crossed-out days are fully reserved/confirmed. Orange crossed-out days represent pending approval checks.
                        </p>
                        <div className="sys-map__wf-visual">
                          <div className="sys-map__mock-calendar-legend" style={{ marginBottom: '16px' }}>
                            <div className="sys-map__legend-item">
                              <span className="sys-map__legend-dot green"></span>
                              <span>Available</span>
                            </div>
                            <div className="sys-map__legend-item">
                              <span className="sys-map__legend-dot red"></span>
                              <span>Confirmed Booked (Crossed Red)</span>
                            </div>
                            <div className="sys-map__legend-item">
                              <span className="sys-map__legend-dot orange"></span>
                              <span>Pending Approval (Crossed Orange)</span>
                            </div>
                          </div>

                          <div className="sys-map__mock-calendar-wrapper">
                            <div className="sys-map__mock-calendar-header">
                              <ChevronLeft size={16} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }} />
                              <h5>JULY 2026</h5>
                              <ChevronRight size={16} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }} />
                            </div>

                            {/* Calendar Days Headers */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px', fontSize: '10px', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                              <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
                            </div>

                            {/* Days Grid */}
                            <div className="sys-map__mock-calendar-grid">
                              {/* Empty leading days if needed, assuming July starts on Wed */}
                              <span></span><span></span><span></span>
                              {mockCalendarDays.map((item) => (
                                <div
                                  key={item.day}
                                  className={`sys-map__mock-calendar-day ${item.state} ${selectedMockDay === item.day ? 'selected' : ''}`}
                                  onClick={() => {
                                    if (item.state !== 'red' && item.state !== 'orange') {
                                      setSelectedMockDay(item.day);
                                    }
                                  }}
                                >
                                  <span>{item.day}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* W Step 3: Upgraded Booking Summary Overlay */}
                    <div className="sys-map__wf-step">
                      <div className="sys-map__wf-badge">03</div>
                      <div className="sys-map__wf-card">
                        <h4 className="sys-map__wf-title">
                          <FileText size={20} />
                          <span>Booking Summary & Document Vault Overlay</span>
                        </h4>
                        <p className="sys-map__wf-desc">
                          This is an upgraded, high-fidelity replica of the site's booking confirmation modal, populated with residency document upload selectors, delivery inputs, comment fields, and payments.
                        </p>
                        <div className="sys-map__wf-visual">
                          <div className="sys-map__mock-popup-card">
                            {/* Close Icon */}
                            <X size={18} className="sys-map__mock-popup-close" />
                            
                            <div className="sys-map__mock-popup-header">
                              <h3 className="sys-map__mock-popup-title">Booking Confirmation</h3>
                              <p className="sys-map__mock-popup-subtitle">Review your luxury reservation & upload required documents.</p>
                            </div>

                            {/* Inner Booking Summary Card */}
                            <div className="sys-map__mock-popup-inner-card">
                              <div className="sys-map__mock-popup-car-header">
                                <div>
                                  <span className="sys-map__mock-popup-brand">FERRARI</span>
                                  <h4 className="sys-map__mock-popup-name">Ferrari 488 GTB</h4>
                                </div>
                                <span className="sys-map__mock-car-cat">Sport</span>
                              </div>

                              <div className="sys-map__mock-popup-specs">
                                <div className="sys-map__mock-popup-spec-item">
                                  <span>Rental Duration:</span>
                                  <span>1 Day</span>
                                </div>
                                <div className="sys-map__mock-popup-spec-item">
                                  <span>Daily Rate:</span>
                                  <span>4,000 AED / day</span>
                                </div>
                                <div className="sys-map__mock-popup-spec-item">
                                  <span>Selected Date:</span>
                                  <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>July {selectedMockDay}, 2026</span>
                                </div>
                                <div className="sys-map__mock-popup-total">
                                  <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Total Amount (incl. VAT):</span>
                                  <span className="sys-map__mock-popup-total-val">4,200 AED</span>
                                </div>
                              </div>
                            </div>

                            {/* Upgraded B2B Form Fields */}
                            <div className="sys-map__mock-popup-form">
                              {/* Customer Identity */}
                              <div className="sys-map__mock-split">
                                <div className="sys-map__mock-form-group">
                                  <label className="sys-map__mock-label">First & Last Name</label>
                                  <input type="text" className="sys-map__mock-input" defaultValue="Monther" readOnly />
                                </div>
                                <div className="sys-map__mock-form-group">
                                  <label className="sys-map__mock-label">Phone Number</label>
                                  <input type="text" className="sys-map__mock-input" defaultValue="+971 50 123 4567" readOnly />
                                </div>
                              </div>

                              {/* Residency Checkbox */}
                              <div className="sys-map__mock-form-group">
                                <label className="sys-map__mock-label">Residency Classification</label>
                                <div className="sys-map__mock-toggle-group">
                                  <button 
                                    className={`sys-map__mock-toggle-btn ${residency === 'local' ? 'active' : ''}`}
                                    onClick={() => setResidency('local')}
                                  >
                                    UAE Resident
                                  </button>
                                  <button 
                                    className={`sys-map__mock-toggle-btn ${residency === 'intl' ? 'active' : ''}`}
                                    onClick={() => setResidency('intl')}
                                  >
                                    International Client
                                  </button>
                                </div>
                              </div>

                              {/* Dynamic Upload Desk */}
                              <div className="sys-map__mock-form-group">
                                <label className="sys-map__mock-label">Required Uploads</label>
                                {residency === 'local' ? (
                                  <div className="sys-map__mock-split">
                                    <div className="sys-map__mock-upload-zone">
                                      <FileText size={18} />
                                      <span>Click to upload Emirates ID</span>
                                    </div>
                                    <div className="sys-map__mock-upload-zone">
                                      <FileText size={18} />
                                      <span>Click to upload Driving License</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="sys-map__mock-split">
                                    <div className="sys-map__mock-upload-zone">
                                      <FileText size={16} />
                                      <span>Passport / Visa copy</span>
                                    </div>
                                    <div className="sys-map__mock-upload-zone">
                                      <FileText size={16} />
                                      <span>Int'l Driving License</span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Delivery Location Picker */}
                              <div className="sys-map__mock-form-group">
                                <label className="sys-map__mock-label">Delivery Spot</label>
                                <div className="sys-map__mock-toggle-group" style={{ marginBottom: '6px' }}>
                                  <button 
                                    className={`sys-map__mock-toggle-btn ${deliveryMethod === 'list' ? 'active' : ''}`}
                                    onClick={() => setDeliveryMethod('list')}
                                  >
                                    Location List
                                  </button>
                                  <button 
                                    className={`sys-map__mock-toggle-btn ${deliveryMethod === 'gps' ? 'active' : ''}`}
                                    onClick={() => setDeliveryMethod('gps')}
                                  >
                                    Share GPS Location
                                  </button>
                                </div>
                                {deliveryMethod === 'list' ? (
                                  <select className="sys-map__mock-input" style={{ width: '100%' }}>
                                    <option>Lux Motors Marina Showroom</option>
                                    <option>Burj Khalifa / Downtown Delivery</option>
                                    <option>Dubai Airport Terminal 3</option>
                                  </select>
                                ) : (
                                  <button className="sys-map__mock-btn active" style={{ width: '100%' }}>
                                    <MapPin size={12} />
                                    <span>GPS Location Attached (Choose on Map)</span>
                                  </button>
                                )}
                              </div>

                              {/* Payment Toggles */}
                              <div className="sys-map__mock-form-group">
                                <label className="sys-map__mock-label">Payment Options</label>
                                <div className="sys-map__mock-toggle-group">
                                  <button 
                                    className={`sys-map__mock-toggle-btn ${paymentOption === 'online' ? 'active' : ''}`}
                                    onClick={() => setPaymentOption('online')}
                                  >
                                    Pay Online (Stripe / Apple Pay)
                                  </button>
                                  <button 
                                    className={`sys-map__mock-toggle-btn ${paymentOption === 'later' ? 'active' : ''}`}
                                    onClick={() => setPaymentOption('later')}
                                  >
                                    Pay Later (Cash / Terminal on Delivery)
                                  </button>
                                </div>
                              </div>

                              {/* Comment box */}
                              <div className="sys-map__mock-form-group">
                                <label className="sys-map__mock-label">Add Note / Special Requests</label>
                                <textarea 
                                  className="sys-map__mock-input" 
                                  placeholder="e.g. Please deliver the car clean and with black rims if possible..." 
                                  rows="2" 
                                  style={{ resize: 'none' }}
                                />
                              </div>

                              {/* Submit button replica */}
                              <button 
                                type="button" 
                                className="sys-map__mock-popup-confirm-btn"
                                onClick={() => setGarageStatus('pending')}
                              >
                                Confirm Booking
                              </button>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                    {/* W Step 4: Admin Sync */}
                    <div className="sys-map__wf-step">
                      <div className="sys-map__wf-badge">04</div>
                      <div className="sys-map__wf-card">
                        <h4 className="sys-map__wf-title">
                          <Workflow size={20} />
                          <span>Admin Dashboard & Metrics Sync</span>
                        </h4>
                        <p className="sys-map__wf-desc">
                          Submitting the request updates the back-office dashboard values instantly, incrementing the total reservation counts and adjusting analytics (most rented category/location/revenue).
                        </p>
                        <div className="sys-map__wf-visual">
                          <div className="sys-map__mock-sync-grid">
                            <div className="sys-map__mock-sync-box">
                              <Bell size={18} className="sys-map__mock-sync-icon" />
                              <span className="sys-map__mock-sync-title">New Request</span>
                              <span className="sys-map__mock-sync-data" style={{ color: '#f97316' }}>+1 Pending</span>
                            </div>
                            <div className="sys-map__mock-sync-box">
                              <Users size={18} className="sys-map__mock-sync-icon" />
                              <span className="sys-map__mock-sync-title">Active Orders</span>
                              <span className="sys-map__mock-sync-data">148</span>
                            </div>
                            <div className="sys-map__mock-sync-box">
                              <CreditCard size={18} className="sys-map__mock-sync-icon" />
                              <span className="sys-map__mock-sync-title">Total Revenue</span>
                              <span className="sys-map__mock-sync-data" style={{ color: '#10b981' }}>+AED 4.2k</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* W Step 5: Garage Page Replica */}
                    <div className="sys-map__wf-step">
                      <div className="sys-map__wf-badge">05</div>
                      <div className="sys-map__wf-card">
                        <h4 className="sys-map__wf-title">
                          <Smartphone size={20} />
                          <span>Double-Channel Garage Tracking</span>
                        </h4>
                        <p className="sys-map__wf-desc">
                          If logged in, the booking saves under their account profile. If guest, the booking token stores in the browser's <code>localStorage</code>. Clients can access the **Garage** page upon returning later to track status without registration.
                        </p>
                        <div className="sys-map__wf-visual">
                          <div className="sys-map__mock-garage-container">
                            <div className="sys-map__garage-card">
                              {/* Card Header */}
                              <div className="sys-map__garage-card-header">
                                <span className="sys-map__mock-car-cat">SPORT</span>
                                <span className={`sys-map__garage-card-status ${garageStatus}`}>
                                  {garageStatus === 'pending' ? 'Under Review' : 'Accepted & Scheduled'}
                                </span>
                              </div>

                              {/* Car Image Slot */}
                              <div className="sys-map__garage-card-img-wrapper">
                                <img src={ferrariImg} alt="Ferrari 488 GTB" />
                              </div>

                              {/* Title Section */}
                              <div className="sys-map__garage-card-title-section">
                                <span className="sys-map__mock-car-brand">FERRARI</span>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <h4 className="sys-map__garage-card-car-name">Ferrari 488 GTB</h4>
                                  <span className="sys-map__garage-card-req-id">REQ-4001</span>
                                </div>
                              </div>

                              {/* Card Metrics Summary */}
                              <div className="sys-map__garage-card-metrics">
                                <div className="sys-map__garage-card-metric-item">
                                  <span>Submitted</span>
                                  <span>25 Jun 2026</span>
                                </div>
                                <div className="sys-map__garage-card-metric-item">
                                  <span>Duration</span>
                                  <span>1 Day</span>
                                </div>
                                <div className="sys-map__garage-card-metric-item">
                                  <span>Total Cost</span>
                                  <span>4,200 AED</span>
                                </div>
                              </div>

                              {/* Toggle Accordion */}
                              <button type="button" className="sys-map__garage-card-toggle-details-btn">
                                <span>HIDE DETAILS</span>
                                <ChevronDown size={12} style={{ transform: 'rotate(180deg)' }} />
                              </button>

                              {/* Progress Tracker list */}
                              <div className="sys-map__garage-progress">
                                <h5 className="sys-map__garage-progress-title">REQUEST STATUS PROGRESS</h5>
                                
                                <div className="sys-map__progress-steps-list" style={{ borderLeft: '2px solid rgba(255,255,255,0.06)', marginLeft: '8px', paddingLeft: '16px' }}>
                                  {/* Step 1: Submitted */}
                                  <div className="sys-map__progress-step active-step">
                                    <div className="sys-map__progress-bullet checked">✓</div>
                                    <div className="sys-map__progress-step-content">
                                      <h6>Submitted</h6>
                                      <p>We received your booking details on 25 Jun 2026.</p>
                                    </div>
                                  </div>

                                  {/* Step 2: Under Review */}
                                  <div className={`sys-map__progress-step active-step ${garageStatus === 'pending' ? 'current-step' : 'checked'}`}>
                                    <div className="sys-map__progress-bullet checked">
                                      {garageStatus === 'pending' ? '○' : '✓'}
                                    </div>
                                    <div className="sys-map__progress-step-content">
                                      <h6>Under Review</h6>
                                      <p>Verifying driver eligibility and document validity audits.</p>
                                    </div>
                                  </div>

                                  {/* Step 3: Decision Status */}
                                  <div className={`sys-map__progress-step ${garageStatus === 'confirmed' ? 'active-step current-step' : ''}`}>
                                    <div className="sys-map__progress-bullet">
                                      {garageStatus === 'confirmed' ? '●' : '○'}
                                    </div>
                                    <div className="sys-map__progress-step-content">
                                      <h6>Decision Status</h6>
                                      <p>
                                        {garageStatus === 'pending' 
                                          ? 'Our VIP booking team is reviewing your documents and checking live availability.' 
                                          : 'Your VIP reservation is confirmed and vehicle is scheduled for delivery.'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Invoice breakdown */}
                              <div className="sys-map__garage-invoice" style={{ marginTop: '20px' }}>
                                <h5 className="sys-map__garage-progress-title">RENTAL INVOICE DETAILS</h5>
                                <div className="sys-map__invoice-rows">
                                  <div className="sys-map__invoice-row">
                                    <span>Pickup Date</span>
                                    <span>July {selectedMockDay}, 2026</span>
                                  </div>
                                  <div className="sys-map__invoice-row">
                                    <span>Return Date</span>
                                    <span>July {selectedMockDay + 1}, 2026</span>
                                  </div>
                                  <div className="sys-map__invoice-row">
                                    <span>Total Duration</span>
                                    <span>1 Day</span>
                                  </div>
                                  <div className="sys-map__invoice-row">
                                    <span>Refundable Deposit</span>
                                    <span>5,000 AED</span>
                                  </div>
                                  <div className="sys-map__invoice-row total-row">
                                    <span>Total Cost (incl. VAT)</span>
                                    <span>4,200 AED</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="sys-map__garage-actions">
                                <button type="button" className="sys-map__garage-chat-btn">
                                  <MessageSquare size={14} />
                                  <span>CHAT LIVE WITH CONCIERGE</span>
                                </button>
                                <button type="button" className="sys-map__garage-specs-btn">
                                  <span>REVIEW SPECS</span>
                                </button>
                              </div>

                              {/* LocalStorage Indicator */}
                              <div className="sys-map__mock-garage-cookie" style={{ marginTop: '16px' }}>
                                <Info size={14} style={{ flexShrink: 0 }} />
                                <span>Guest Device Cookie: remembers token REQ-4001.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* W Step 6: Admin logistics approval */}
                    <div className="sys-map__wf-step">
                      <div className="sys-map__wf-badge">06</div>
                      <div className="sys-map__wf-card">
                        <h4 className="sys-map__wf-title">
                          <Shield size={20} />
                          <span>Admin Review & Logistics Confirmation</span>
                        </h4>
                        <p className="sys-map__wf-desc">
                          Admin logs in → reviews documents → accepts booking. This shifts calendar state to Confirmed (Red), sends email notifications, and schedules departure/return logistical times.
                        </p>
                        <div className="sys-map__wf-visual">
                          <div className="sys-map__wf-visual-actions">
                            <button 
                              type="button"
                              className="sys-map__mock-btn reject-btn" 
                              style={{ flex: 1 }} 
                              onClick={() => setGarageStatus('pending')}
                            >
                              Reject Request
                            </button>
                            <button 
                              type="button"
                              className="sys-map__mock-btn active" 
                              style={{ flex: 1, color: '#10b981', borderColor: '#10b981' }} 
                              onClick={() => setGarageStatus('confirmed')}
                            >
                              Approve Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: Admin Verification Hub */}
            {activeArchTab === 'admin' && (
              <motion.div
                key="tab-admin"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Original 3-Step Diagram */}
                <div className="sys-map__diagram-panel glass-panel" style={{ marginBottom: '30px' }}>
                  <div className="sys-map__flow">
                    
                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 1</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Lock size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Secure Portal Login</h4>
                      <p className="sys-map__node-desc">Admin enters portal via secure logins using modern JWT session tokens (HTTPS only).</p>
                      <div className="sys-map__node-meta">
                        <span>Access</span>
                        <span className="sys-map__node-pill">Roles & Permissions</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node active-node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 2</span>
                        <div className="sys-map__node-icon-wrapper">
                          <FileText size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Verification Desk</h4>
                      <p className="sys-map__node-desc">Admin reviews license, passport images, credit status and logs notes safely.</p>
                      <div className="sys-map__node-meta">
                        <span>Security</span>
                        <span className="sys-map__node-pill">Encrypted Storage</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 3</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Check size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Approve / Reject</h4>
                      <p className="sys-map__node-desc">Admin changes request state. Triggers real-time email dispatch and availability calendar update.</p>
                      <div className="sys-map__node-meta">
                        <span>Automation</span>
                        <span className="sys-map__node-pill">NodeMailer / SendGrid</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Original Details Card */}
                <div className="sys-map__details glass-panel">
                  <div className="sys-map__details-text">
                    <h3 className="sys-map__details-title">Complete Back-Office Command & Control</h3>
                    <p className="sys-map__details-body">
                      The admin panel features clean layouts to view current pending orders, verify customer IDs, manage content (Fleet specs, FAQs, Destinations), and review metrics. Security is prioritized so customer documents are never leaked.
                    </p>
                    <div className="sys-map__feature-list">
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Role-Based Access Control</h5>
                          <p>Only verified staff with manager clearance can view sensitive user passport details.</p>
                        </div>
                      </div>
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Real-time Dispatch Alerts</h5>
                          <p>Any action triggers immediate updates to client's Garage tracking link without page reloads.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sys-map__tech-spec glass-widget">
                    <h4 className="sys-map__tech-title">Backend Security Specs</h4>
                    <div className="sys-map__tech-item">
                      <span>Auth Method</span>
                      <span>JWT Secure Cookies (HTTP-only)</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>File Encryption</span>
                      <span>AES-256 Bit Encryption</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>File Access</span>
                      <span>Temporary Signed URL Tokens</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Session Expiry</span>
                      <span>Automatic 12-Hour Autologout</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CRM Integration Sync */}
            {activeArchTab === 'crm' && (
              <motion.div
                key="tab-crm"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Original 3-Step Diagram */}
                <div className="sys-map__diagram-panel glass-panel" style={{ marginBottom: '30px' }}>
                  <div className="sys-map__flow">
                    
                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 1</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Cpu size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Checkout Trigger</h4>
                      <p className="sys-map__node-desc">Client finalizes a rental request. Website handles data locally first to keep speeds instant.</p>
                      <div className="sys-map__node-meta">
                        <span>Event</span>
                        <span className="sys-map__node-pill">Webhook Trigger</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node active-node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 2</span>
                        <div className="sys-map__node-icon-wrapper">
                          <RefreshCw size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Secure API Gateway</h4>
                      <p className="sys-map__node-desc">Custom middleware verifies CRM credentials and formats payload into clean JSON format.</p>
                      <div className="sys-map__node-meta">
                        <span>Gateway</span>
                        <span className="sys-map__node-pill">REST / API Request</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 3</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Database size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">CRM Intake & Sync</h4>
                      <p className="sys-map__node-desc">Your existing CRM automatically receives new booking cards, driver details, and contact logs.</p>
                      <div className="sys-map__node-meta">
                        <span>Output</span>
                        <span className="sys-map__node-pill">Your Current CRM Setup</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Original Details Card */}
                <div className="sys-map__details glass-panel">
                  <div className="sys-map__details-text">
                    <h3 className="sys-map__details-title">Seamless CRM Coexistence</h3>
                    <p className="sys-map__details-body">
                      We do not touch or replace your current CRM workflow! The new frontend premium design serves as a lead generation and visual intake funnel that automatically maps data directly into your current CRM database.
                    </p>
                    <div className="sys-map__feature-list">
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>No Workflow Disruptions</h5>
                          <p>Your team continues managing fleet inventory and leases inside the CRM dashboard they already know.</p>
                        </div>
                      </div>
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Data Consistency Check</h5>
                          <p>Automatic background scripts monitor sync logs to alert us instantly of any connection timeout.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sys-map__tech-spec glass-widget">
                    <h4 className="sys-map__tech-title">API Integration Spec</h4>
                    <div className="sys-map__tech-item">
                      <span>API Protocols</span>
                      <span>RESTful JSON / Webhook Endpoints</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Auth Protocol</span>
                      <span>Bearer Token OAuth 2.0 / API Keys</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Sync Latency</span>
                      <span>Under 1.2 Seconds</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Supported CRMs</span>
                      <span>Salesforce, Hubspot, Odoo, Custom CRM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: Safe Data Migration */}
            {activeArchTab === 'migration' && (
              <motion.div
                key="tab-migration"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Original 3-Step Diagram */}
                <div className="sys-map__diagram-panel glass-panel" style={{ marginBottom: '30px' }}>
                  <div className="sys-map__flow">
                    
                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 1</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Database size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Legacy Backup Run</h4>
                      <p className="sys-map__node-desc">We generate full read-only snapshots of your current website database to ensure 0% risk of data loss.</p>
                      <div className="sys-map__node-meta">
                        <span>Pre-flight</span>
                        <span className="sys-map__node-pill">Read-Only Snapshot</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node active-node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 2</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Cpu size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Mapping & ETL</h4>
                      <p className="sys-map__node-desc">Custom scripts map user profile records, historic rentals, and car fleets to the new database format.</p>
                      <div className="sys-map__node-meta">
                        <span>Process</span>
                        <span className="sys-map__node-pill">Extract, Map, Validate</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 3</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Check size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Parallel Verification</h4>
                      <p className="sys-map__node-desc">Data sets are run side-by-side on test systems to confirm that all records sync without loss or corruption.</p>
                      <div className="sys-map__node-meta">
                        <span>Testing</span>
                        <span className="sys-map__node-pill">Integrity Validation</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Original Details Card */}
                <div className="sys-map__details glass-panel">
                  <div className="sys-map__details-text">
                    <h3 className="sys-map__details-title">Guaranteed Data Integrity</h3>
                    <p className="sys-map__details-body">
                      We map your data structure offline first. We perform full schema validation to ensure old records align with our system. Your existing customer credentials, booking logs, and invoices remain intact.
                    </p>
                    <div className="sys-map__feature-list">
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Zero Data Loss Guarantee</h5>
                          <p>Full database locks and snapshots are maintained throughout the staging process.</p>
                        </div>
                      </div>
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Preserved SEO Metadata</h5>
                          <p>Existing page links are mapped with 301 redirects to ensure your organic Google ranking does not drop.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sys-map__tech-spec glass-widget">
                    <h4 className="sys-map__tech-title">Migration Roadmap</h4>
                    <div className="sys-map__tech-item">
                      <span>Audit Stage</span>
                      <span>Review current data schemas & assets</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Backup Policy</span>
                      <span>Dual 3-point off-site backups</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Redirect Mapping</span>
                      <span>All legacy URL paths (301 redirects)</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Downtime Duration</span>
                      <span>0.0 Seconds (No service pause)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: Risk-Free Launch */}
            {activeArchTab === 'deployment' && (
              <motion.div
                key="tab-deployment"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Original 3-Step Diagram */}
                <div className="sys-map__diagram-panel glass-panel" style={{ marginBottom: '30px' }}>
                  <div className="sys-map__flow">
                    
                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 1</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Server size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Isolated Staging Setup</h4>
                      <p className="sys-map__node-desc">The new design and database run on an isolated staging server. Your current website remains 100% live.</p>
                      <div className="sys-map__node-meta">
                        <span>Environment</span>
                        <span className="sys-map__node-pill">Parallel System</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node active-node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 2</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Shield size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Client Review / QA</h4>
                      <p className="sys-map__node-desc">You personally browse staging, test reservations, uploads, and admin desk, verifying all parameters.</p>
                      <div className="sys-map__node-meta">
                        <span>Testing</span>
                        <span className="sys-map__node-pill">User Approval Desk</span>
                      </div>
                    </div>

                    <div className="sys-map__connector">
                      <ArrowRight size={24} />
                    </div>

                    <div className="sys-map__node">
                      <div className="sys-map__node-header">
                        <span className="sys-map__node-step">Step 3</span>
                        <div className="sys-map__node-icon-wrapper">
                          <Cloud size={20} />
                        </div>
                      </div>
                      <h4 className="sys-map__node-title">Instant DNS Pointer</h4>
                      <p className="sys-map__node-desc">DNS routes switch to Cloudflare Edge. Zero-downtime, instant switch. Old site remains cached for failback.</p>
                      <div className="sys-map__node-meta">
                        <span>Switchover</span>
                        <span className="sys-map__node-pill">Zero Downtime DNS</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Original Details Card */}
                <div className="sys-map__details glass-panel">
                  <div className="sys-map__details-text">
                    <h3 className="sys-map__details-title">Double-Isolated Deployment Plan</h3>
                    <p className="sys-map__details-body">
                      We never test on production. The new platform operates completely independent of your current servers during development. You only flip the switch when you feel 100% confident in the results.
                    </p>
                    <div className="sys-map__feature-list">
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Instant Rollback Guarantee</h5>
                          <p>If any technical challenge arises post-switch, we roll back to your legacy website in 1 click.</p>
                        </div>
                      </div>
                      <div className="sys-map__feature-item">
                        <Check size={16} className="sys-map__feature-icon" />
                        <div className="sys-map__feature-text">
                          <h5>Zero Loss of Bookings</h5>
                          <p>Any booking made during switch hours is captured in database queue layers so no transaction drops.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sys-map__tech-spec glass-widget">
                    <h4 className="sys-map__tech-title">Hosting & Global Speeds</h4>
                    <div className="sys-map__tech-item">
                      <span>Frontend CDN</span>
                      <span>Cloudflare Global Edge Networks</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Backend Infrastructure</span>
                      <span>NodeJS Serverless API Layers</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>Database Clusters</span>
                      <span>AWS/Supabase PostgreSQL with SSL</span>
                    </div>
                    <div className="sys-map__tech-item">
                      <span>SSL Grade</span>
                      <span>Grade A+ TLS 1.3 Encryption</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ——— Visual Security Panel ——— */}
        <section className="sys-map__security-section">
          <div className="sys-map__header">
            <h2 className="sys-map__title" style={{ fontSize: 'var(--text-3xl)' }}>
              Security Features
            </h2>
            <p className="sys-map__subtitle" style={{ fontSize: 'var(--text-sm)' }}>
              We build systems that protect customer data and showroom operations.
            </p>
          </div>

          <div className="sys-map__sec-grid">
            
            <div className="sys-map__sec-card glass-panel">
              <div className="sys-map__sec-icon-container">
                <Shield size={24} />
              </div>
              <h4 className="sys-map__sec-title">Encrypted Document Vault</h4>
              <p className="sys-map__sec-desc">
                Customer passports and driving licenses are automatically stored in secure, private storage buckets. These are accessible only to verified managers using time-limited signed URLs that expire after 5 minutes.
              </p>
            </div>

            <div className="sys-map__sec-card glass-panel">
              <div className="sys-map__sec-icon-container">
                <Lock size={24} />
              </div>
              <h4 className="sys-map__sec-title">Authenticated CRM Gateways</h4>
              <p className="sys-map__sec-desc">
                All data transmission between the website and your CRM is encrypted via HTTPS using TLS 1.3 protocol and verified using secure API authentication tokens, blocking potential man-in-the-middle attacks.
              </p>
            </div>

            <div className="sys-map__sec-card glass-panel">
              <div className="sys-map__sec-icon-container">
                <Database size={24} />
              </div>
              <h4 className="sys-map__sec-title">Database Isolation & Backups</h4>
              <p className="sys-map__sec-desc">
                We store user booking data separately from your system files to prevent cross-contamination. Automated hourly snapshots allow us to recover the database instantly in the event of an emergency.
              </p>
            </div>

          </div>
        </section>

        {/* ——— Stripe Payment Integration Panel ——— */}
        <section className="sys-map__payment-section">
          <div className="sys-map__header">
            <h2 className="sys-map__title" style={{ fontSize: 'var(--text-3xl)' }}>
              Stripe Payment Integration
            </h2>
            <p className="sys-map__subtitle" style={{ fontSize: 'var(--text-sm)' }}>
              A secure, global checkout flow designed to handle regional UAE clients and international tourists seamlessly.
            </p>
          </div>

          <div className="sys-map__pay-grid">
            
            <div className="sys-map__pay-card glass-panel">
              <div className="sys-map__pay-icon-container">
                <CreditCard size={24} />
              </div>
              <h4 className="sys-map__pay-title">Local Client Optimization</h4>
              <p className="sys-map__pay-desc">
                Supports seamless 1-tap checkout via Apple Pay and Google Pay alongside standard credit cards. Transactions are processed in AED natively, bypassing currency conversion fees for local cardholders.
              </p>
            </div>

            <div className="sys-map__pay-card glass-panel">
              <div className="sys-map__pay-icon-container">
                <Globe size={24} />
              </div>
              <h4 className="sys-map__pay-title">International Tourists</h4>
              <p className="sys-map__pay-desc">
                Accepts 135+ global currencies with dynamic checkout display. Integrates automatic currency conversion and supports international networks (Visa, Mastercard, Amex, JCB, Diners Club) without manual intervention.
              </p>
            </div>

            <div className="sys-map__pay-card glass-panel">
              <div className="sys-map__pay-icon-container">
                <ShieldCheck size={24} />
              </div>
              <h4 className="sys-map__pay-title">Radar Fraud Prevention</h4>
              <p className="sys-map__pay-desc">
                Uses Stripe Radar machine learning models to detect fraud patterns. Integrates dynamic 3D Secure (3DS2) authentication triggers for high-risk international payments, preventing chargeback disputes.
              </p>
            </div>

            <div className="sys-map__pay-card glass-panel">
              <div className="sys-map__pay-icon-container">
                <Zap size={24} />
              </div>
              <h4 className="sys-map__pay-title">Zero-Downtime Webhook Sync</h4>
              <p className="sys-map__pay-desc">
                Utilizes asynchronous Stripe webhooks to listen for checkout session success. Guarantees immediate database reservation confirmation, invoice emailing, and CRM sync, even if a user closes their tab early.
              </p>
            </div>

          </div>
        </section>

        {/* ——— Reassurance Center / FAQs ——— */}
        <section className="sys-map__faq-section">
          <div className="sys-map__faq-header">
            <h2 className="sys-map__faq-title">Technical Support & Guarantees</h2>
            <p className="sys-map__faq-subtitle">Answering critical queries to give you total peace of mind.</p>
          </div>

          <div className="sys-map__faq-grid">
            
            <div 
              className={`sys-map__faq-card ${openFaqs.bugs ? 'open' : ''}`}
              onClick={() => toggleFaq('bugs')}
            >
              <div className="sys-map__faq-question">
                <span>What happens if we face bugs or technical difficulties?</span>
                <ChevronDown size={18} className="sys-map__faq-icon" />
              </div>
              {openFaqs.bugs && (
                <p className="sys-map__faq-answer">
                  All contracts include a <strong>Full Support Guarantee</strong>. If any bug pops up, if something breaks, or if you want to tweak a feature during the support period, we handle it instantly at no extra charge. We also conduct thorough automated testing on staging to eliminate 99.9% of bugs before going live.
                </p>
              )}
            </div>

            <div 
              className={`sys-map__faq-card ${openFaqs.crm ? 'open' : ''}`}
              onClick={() => toggleFaq('crm')}
            >
              <div className="sys-map__faq-question">
                <span>Will integrating this new frontend mess with our CRM data?</span>
                <ChevronDown size={18} className="sys-map__faq-icon" />
              </div>
              {openFaqs.crm && (
                <p className="sys-map__faq-answer">
                  No. The website will only <strong>push new leads and bookings</strong> to your CRM using standard webhook APIs. It will not write over, modify, or delete any of your current customer records. It acts as an intake assistant, not a replacement.
                </p>
              )}
            </div>

            <div 
              className={`sys-map__faq-card ${openFaqs.staging ? 'open' : ''}`}
              onClick={() => toggleFaq('staging')}
            >
              <div className="sys-map__faq-question">
                <span>Can we check how the site operates before replacing our current site?</span>
                <ChevronDown size={18} className="sys-map__faq-icon" />
              </div>
              {openFaqs.staging && (
                <p className="sys-map__faq-answer">
                  Yes, this is central to our deployment plan. The entire upgrade is built on an isolated staging server (e.g., <code>staging.luxmotors.ae</code>). We test it thoroughly with dummy data. Only when you give us written approval will we point the main domain to the new platform.
                </p>
              )}
            </div>

            <div 
              className={`sys-map__faq-card ${openFaqs.security ? 'open' : ''}`}
              onClick={() => toggleFaq('security')}
            >
              <div className="sys-map__faq-question">
                <span>How will client licenses and passport files be handled securely?</span>
                <ChevronDown size={18} className="sys-map__faq-icon" />
              </div>
              {openFaqs.security && (
                <p className="sys-map__faq-answer">
                  Files are transferred directly to private Cloud storage via SSL/TLS encryption. The files are not saved to public web directories. To view them in the Admin Desk, the browser requests a signed access token which expires automatically after 5 minutes, preventing link leakage.
                </p>
              )}
            </div>

            <div 
              className={`sys-map__faq-card ${openFaqs.experience ? 'open' : ''}`}
              onClick={() => toggleFaq('experience')}
            >
              <div className="sys-map__faq-question">
                <span>Do you have the experience to handle a high-end luxury site?</span>
                <ChevronDown size={18} className="sys-map__faq-icon" />
              </div>
              {openFaqs.experience && (
                <p className="sys-map__faq-answer">
                  Yes. We use standard, stable enterprise technologies (Vite, React, NodeJS, Cloudflare Edge) which host millions of live applications globally. By using isolated components, structured code repositories, and thorough pre-deployment checklists, we match the technical standards of global development agencies.
                </p>
              )}
            </div>

          </div>
        </section>

        {/* ——— Pitch Call to Action ——— */}
        <section className="sys-map__cta">
          <h2 className="sys-map__cta-title">Ready to Upgrade Lux Motors Online Presence?</h2>
          <p className="sys-map__cta-desc">
            Let's launch the staging sandbox to demonstrate the integration flow live. We build parallel, you review, zero risk.
          </p>
          <button type="button" className="sys-map__cta-btn">
            <span>Ready</span>
            <ArrowRight size={18} />
          </button>
        </section>

      </div>
    </div>
  );
}
