import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Save, RotateCcw, Image as ImageIcon, ChevronDown,
  Sparkles, AlertTriangle, Check, Upload, Layers,
  Compass, Zap, MessageSquare, Trash2, ArrowUpRight, HelpCircle,
  PenLine
} from 'lucide-react';
import { useHomepageStore, DEFAULT_CONFIG } from '../../hooks/useHomepageStore';
import AdminSelect from '../../components/admin/AdminSelect';
import './HomepageManager.css';

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const HomepageManager = () => {
  const { config, save, resetToDefaults } = useHomepageStore();
  const [editedConfig, setEditedConfig] = useState(() => ({ ...config }));
  const [expandedSection, setExpandedSection] = useState('hero');
  const [editingSections, setEditingSections] = useState({
    hero: false,
    fleet: false,
    wcu: false,
    testimonials: false,
    cta: false,
  });
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedWcuCardIndex, setSelectedWcuCardIndex] = useState(0);

  const handleWcuCardChange = (cardIndex, field, value) => {
    const updatedBenefits = [...(editedConfig.wcuBenefits || [])];
    if (!updatedBenefits[cardIndex]) return;
    updatedBenefits[cardIndex] = {
      ...updatedBenefits[cardIndex],
      [field]: value
    };
    handleChange('wcuBenefits', updatedBenefits);
  };

  const handleWcuFactChange = (cardIndex, factIndex, key, value) => {
    const updatedBenefits = [...(editedConfig.wcuBenefits || [])];
    if (!updatedBenefits[cardIndex] || !updatedBenefits[cardIndex].facts) return;
    const updatedFacts = [...updatedBenefits[cardIndex].facts];
    if (!updatedFacts[factIndex]) return;
    updatedFacts[factIndex] = {
      ...updatedFacts[factIndex],
      [key]: value
    };
    updatedBenefits[cardIndex] = {
      ...updatedBenefits[cardIndex],
      facts: updatedFacts
    };
    handleChange('wcuBenefits', updatedBenefits);
  };

  const handleTestimonialChange = (testimonialIndex, field, value) => {
    const updatedTestimonials = [...(editedConfig.testimonialsList || [])];
    if (!updatedTestimonials[testimonialIndex]) return;
    updatedTestimonials[testimonialIndex] = {
      ...updatedTestimonials[testimonialIndex],
      [field]: value
    };
    if (field === 'name') {
      const names = value.trim().split(' ');
      let initials = '';
      if (names.length > 0 && names[0]) initials += names[0][0];
      if (names.length > 1 && names[names.length - 1]) initials += names[names.length - 1][0];
      updatedTestimonials[testimonialIndex].avatar = initials.toUpperCase() || 'NC';
    }
    handleChange('testimonialsList', updatedTestimonials);
  };

  const handleAddTestimonial = () => {
    const updatedTestimonials = [...(editedConfig.testimonialsList || [])];
    updatedTestimonials.push({
      id: Date.now(),
      name: 'New Driver',
      location: 'Dubai, UAE',
      rating: 5,
      text: 'Amazing experience, highly recommended!',
      avatar: 'ND',
      car: 'Porsche 911 GT3 RS'
    });
    handleChange('testimonialsList', updatedTestimonials);
    showToast('New testimonial draft added!', 'success');
  };

  const handleDeleteTestimonial = (testimonialIndex) => {
    const updatedTestimonials = [...(editedConfig.testimonialsList || [])];
    updatedTestimonials.splice(testimonialIndex, 1);
    handleChange('testimonialsList', updatedTestimonials);
    showToast('Testimonial removed from list', 'error');
  };

  // Sync state if config updates from outside/other components
  useEffect(() => {
    setEditedConfig({ ...config });
  }, [config]);

  const hasChanges = JSON.stringify(editedConfig) !== JSON.stringify(config);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (key, value) => {
    setEditedConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      save(editedConfig);
      setSaving(false);
      showToast('Homepage configuration applied successfully!');
    }, 600);
  };

  const handleDiscard = () => {
    setEditedConfig({ ...config });
    showToast('Changes discarded', 'error');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all homepage content to system defaults?')) {
      resetToDefaults();
      showToast('Reset to default values', 'success');
    }
  };

  // ── Image Upload Handling ──
  const handleImageFile = (file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB. Please upload a smaller image to save in local storage.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      handleChange('heroBgImage', e.target.result);
      showToast('Background image loaded!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div className="hm-layout" initial="initial" animate="animate" exit="exit">
      {/* Background Glass Decorative Orbs */}
      <div className="hm-bg-orbs">
        <div className="hm-orb hm-orb--1" />
        <div className="hm-orb hm-orb--2" />
        <div className="hm-orb hm-orb--3" />
      </div>

      {/* Header */}
      <motion.div className="admin-page-header" variants={fadeUp}>
        <div>
          <h1 className="admin-page-title">Homepage Manager</h1>
          <p className="admin-page-subtitle">Configure, customize, and edit the main sections of your public homepage in real time.</p>
        </div>
      </motion.div>

      {/* Accordion List */}
      <motion.div className="hm-sections-list" variants={fadeUp}>

        {/* ── Section 1: Hero Section ── */}
        <div className="hm-section-card">
          <div className="hm-card-glow" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)' }} />
          
          <div className="hm-section-trigger" onClick={() => setExpandedSection(expandedSection === 'hero' ? '' : 'hero')}>
            <div className="hm-trigger-left">
              <div className="hm-section-icon" style={{ background: 'rgba(201, 168, 76, 0.12)', color: '#c9a84c' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <div className="hm-section-title">Hero Section</div>
                <div className="hm-section-subtitle">Customize titles, description, primary/secondary CTAs, background and floating car specs</div>
              </div>
            </div>
            <ChevronDown className={`hm-section-chevron ${expandedSection === 'hero' ? 'expanded' : ''}`} size={20} />
          </div>

          <AnimatePresence initial={false}>
            {expandedSection === 'hero' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hm-section-content"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: editingSections.hero ? '#c9a84c' : 'var(--admin-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: editingSections.hero ? '#c9a84c' : 'rgba(255,255,255,0.2)' }} />
                    {editingSections.hero ? 'Mode: Editing Active' : 'Mode: Read-Only'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSections(prev => ({ ...prev, hero: !prev.hero }))}
                    className={`hm-section-edit-btn ${editingSections.hero ? 'hm-section-edit-btn--active' : 'hm-section-edit-btn--inactive'}`}
                  >
                    {editingSections.hero ? <Check size={14} /> : <PenLine size={14} />}
                    {editingSections.hero ? 'Done' : 'Edit Section'}
                  </button>
                </div>
                <div className="hm-fields-grid">
                  {/* Label */}
                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Hero Badge / Top Label</label>
                    <div className="hm-input-wrap">
                      <Sparkles className="hm-input-icon" size={16} />
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroLabel}
                        onChange={e => handleChange('heroLabel', e.target.value)}
                        placeholder="Dubai's Premier Luxury Fleet"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Title components */}
                  <div className="hm-form-group">
                    <label className="hm-label">Title Line 1</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroTitleLine1}
                        onChange={e => handleChange('heroTitleLine1', e.target.value)}
                        placeholder="Command"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Title Line 2</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroTitleLine2}
                        onChange={e => handleChange('heroTitleLine2', e.target.value)}
                        placeholder="The Road."
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Title Accent (Gold Highlighted Word)</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroTitleAccent}
                        onChange={e => handleChange('heroTitleAccent', e.target.value)}
                        placeholder="Own The Moment."
                        style={{ color: '#c9a84c', fontWeight: 'bold' }}
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Hero Description</label>
                    <div className="hm-textarea-wrap">
                      <textarea
                        className="hm-textarea"
                        value={editedConfig.heroDescription}
                        onChange={e => handleChange('heroDescription', e.target.value)}
                        placeholder="Describe your premier fleet services..."
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="hm-form-group">
                    <label className="hm-label">Primary CTA Button Text</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroPrimaryCtaText}
                        onChange={e => handleChange('heroPrimaryCtaText', e.target.value)}
                        placeholder="Explore Fleet"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Primary CTA Button Link</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroPrimaryCtaLink}
                        onChange={e => handleChange('heroPrimaryCtaLink', e.target.value)}
                        placeholder="/fleet"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Secondary CTA */}
                  <div className="hm-form-group">
                    <label className="hm-label">Secondary CTA Button Text</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroSecondaryCtaText}
                        onChange={e => handleChange('heroSecondaryCtaText', e.target.value)}
                        placeholder="Book Now"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Secondary CTA Button Link</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroSecondaryCtaLink}
                        onChange={e => handleChange('heroSecondaryCtaLink', e.target.value)}
                        placeholder="https://wa.me/971509924247"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Trust Text */}
                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Trust Statement / Review Text</label>
                    <div className="hm-input-wrap">
                      <MessageSquare className="hm-input-icon" size={16} />
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroTrustText}
                        onChange={e => handleChange('heroTrustText', e.target.value)}
                        placeholder="Trusted by 1,000+ clients"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Hero Background Image */}
                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Background Image (Upload File or Paste Web URL)</label>
                    <div className="hm-upload-container">
                      <div
                        className={`hm-upload-zone ${!editingSections.hero ? 'disabled' : ''}`}
                        onDragOver={editingSections.hero ? handleDragOver : undefined}
                        onDrop={editingSections.hero ? handleDrop : undefined}
                        onClick={editingSections.hero ? () => fileInputRef.current.click() : undefined}
                      >
                        <Upload className="hm-upload-icon" size={28} />
                        <span className="hm-upload-text">Drag & drop your file here, or <strong style={{ color: '#c9a84c' }}>Browse</strong></span>
                        <span className="hm-upload-subtext">Supports PNG, JPG (Max 2MB)</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          accept="image/*"
                          onChange={e => handleImageFile(e.target.files[0])}
                          disabled={!editingSections.hero}
                        />
                      </div>
                      <div className="hm-upload-preview">
                        {editedConfig.heroBgImage ? (
                          <>
                            <img src={editedConfig.heroBgImage} alt="Hero Background Preview" />
                            {editingSections.hero && (
                              <button
                                className="hm-remove-img-btn"
                                title="Clear Image"
                                onClick={() => handleChange('heroBgImage', '')}
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="hm-preview-fallback">
                            <ImageIcon size={24} style={{ opacity: 0.4 }} />
                            <span>Using Default Lambo Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="hm-input-wrap" style={{ marginTop: 10 }}>
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroBgImage}
                        onChange={e => handleChange('heroBgImage', e.target.value)}
                        placeholder="Or paste direct image URL (https://...)"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  {/* Hero Car Details (Right panel widget) */}
                  <div className="hm-form-group hm-field-fullwidth">
                    <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18, marginBottom: 8 }}>
                      <label className="hm-label" style={{ color: '#c9a84c' }}>Floating Widget Car Telemetry & Specs</label>
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Widget Car Name</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroCarName}
                        onChange={e => handleChange('heroCarName', e.target.value)}
                        placeholder="Lamborghini Urus"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Widget Car Tagline</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroCarTagline}
                        onChange={e => handleChange('heroCarTagline', e.target.value)}
                        placeholder="The World's First Super SUV"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Acceleration Spec (0-100 km/h)</label>
                    <div className="hm-input-wrap">
                      <Zap className="hm-input-icon" size={16} />
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroCarSpecAcceleration}
                        onChange={e => handleChange('heroCarSpecAcceleration', e.target.value)}
                        placeholder="3.6s"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Power Spec</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroCarSpecPower}
                        onChange={e => handleChange('heroCarSpecPower', e.target.value)}
                        placeholder="666 HP"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Engine Spec</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.heroCarSpecEngine}
                        onChange={e => handleChange('heroCarSpecEngine', e.target.value)}
                        placeholder="V8 Twin-Turbo"
                        disabled={!editingSections.hero}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Section 2: Featured Fleet Section ── */}
        <div className="hm-section-card">
          <div className="hm-card-glow" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)' }} />
          
          <div className="hm-section-trigger" onClick={() => setExpandedSection(expandedSection === 'fleet' ? '' : 'fleet')}>
            <div className="hm-trigger-left">
              <div className="hm-section-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}>
                <Compass size={20} />
              </div>
              <div>
                <div className="hm-section-title">Featured Fleet Section</div>
                <div className="hm-section-subtitle">Customize showcase subheadings and the main call to action button</div>
              </div>
            </div>
            <ChevronDown className={`hm-section-chevron ${expandedSection === 'fleet' ? 'expanded' : ''}`} size={20} />
          </div>

          <AnimatePresence initial={false}>
            {expandedSection === 'fleet' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hm-section-content"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: editingSections.fleet ? '#c9a84c' : 'var(--admin-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: editingSections.fleet ? '#c9a84c' : 'rgba(255,255,255,0.2)' }} />
                    {editingSections.fleet ? 'Mode: Editing Active' : 'Mode: Read-Only'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSections(prev => ({ ...prev, fleet: !prev.fleet }))}
                    className={`hm-section-edit-btn ${editingSections.fleet ? 'hm-section-edit-btn--active' : 'hm-section-edit-btn--inactive'}`}
                  >
                    {editingSections.fleet ? <Check size={14} /> : <PenLine size={14} />}
                    {editingSections.fleet ? 'Done' : 'Edit Section'}
                  </button>
                </div>
                <div className="hm-fields-grid">
                  <div className="hm-form-group">
                    <label className="hm-label">Section Label</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.fleetLabel}
                        onChange={e => handleChange('fleetLabel', e.target.value)}
                        placeholder="Our Fleet"
                        disabled={!editingSections.fleet}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Section Title</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.fleetTitle}
                        onChange={e => handleChange('fleetTitle', e.target.value)}
                        placeholder="Drive Your Dream"
                        disabled={!editingSections.fleet}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Section Subtitle</label>
                    <div className="hm-textarea-wrap">
                      <textarea
                        className="hm-textarea"
                        value={editedConfig.fleetSubtitle}
                        onChange={e => handleChange('fleetSubtitle', e.target.value)}
                        placeholder="From fierce supercars to elegant luxury..."
                        style={{ minHeight: 60 }}
                        disabled={!editingSections.fleet}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">CTA Button Text</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.fleetCtaText}
                        onChange={e => handleChange('fleetCtaText', e.target.value)}
                        placeholder="View All Cars"
                        disabled={!editingSections.fleet}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Section 3: Why Choose Us Section ── */}
        <div className="hm-section-card">
          <div className="hm-card-glow" style={{ background: 'radial-gradient(circle, rgba(225,48,108,0.1), transparent 70%)' }} />
          
          <div className="hm-section-trigger" onClick={() => setExpandedSection(expandedSection === 'wcu' ? '' : 'wcu')}>
            <div className="hm-trigger-left">
              <div className="hm-section-icon" style={{ background: 'rgba(225, 48, 108, 0.12)', color: '#e1306c' }}>
                <Layers size={20} />
              </div>
              <div>
                <div className="hm-section-title">Why Choose Us Section</div>
                <div className="hm-section-subtitle">Customize titles and telemetry introduction text</div>
              </div>
            </div>
            <ChevronDown className={`hm-section-chevron ${expandedSection === 'wcu' ? 'expanded' : ''}`} size={20} />
          </div>

          <AnimatePresence initial={false}>
            {expandedSection === 'wcu' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hm-section-content"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: editingSections.wcu ? '#c9a84c' : 'var(--admin-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: editingSections.wcu ? '#c9a84c' : 'rgba(255,255,255,0.2)' }} />
                    {editingSections.wcu ? 'Mode: Editing Active' : 'Mode: Read-Only'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSections(prev => ({ ...prev, wcu: !prev.wcu }))}
                    className={`hm-section-edit-btn ${editingSections.wcu ? 'hm-section-edit-btn--active' : 'hm-section-edit-btn--inactive'}`}
                  >
                    {editingSections.wcu ? <Check size={14} /> : <PenLine size={14} />}
                    {editingSections.wcu ? 'Done' : 'Edit Section'}
                  </button>
                </div>
                <div className="hm-fields-grid">
                  <div className="hm-form-group">
                    <label className="hm-label">Section Label</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.wcuLabel}
                        onChange={e => handleChange('wcuLabel', e.target.value)}
                        placeholder="Why Lux Motors"
                        disabled={!editingSections.wcu}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Section Title</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.wcuTitle}
                        onChange={e => handleChange('wcuTitle', e.target.value)}
                        placeholder="The Luxury Standard"
                        disabled={!editingSections.wcu}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Section Subtitle</label>
                    <div className="hm-textarea-wrap">
                      <textarea
                        className="hm-textarea"
                        value={editedConfig.wcuSubtitle}
                        onChange={e => handleChange('wcuSubtitle', e.target.value)}
                        placeholder="More than a rental — an experience..."
                        style={{ minHeight: 60 }}
                        disabled={!editingSections.wcu}
                      />
                    </div>
                  </div>

                  {/* Cards & Telemetry Editor */}
                  <div className="hm-form-group hm-field-fullwidth" style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
                    <label className="hm-label" style={{ color: '#e1306c', fontSize: '0.8rem' }}>Benefits Cards & HUD Telemetry Config</label>
                    <p style={{ fontSize: '0.75rem', color: '#888', margin: '4px 0 12px 0' }}>Select any of the 6 benefits cards below to edit its title, description, icon, and the technical telemetry specifications displayed on the active HUD dashboard widget.</p>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <div className="hm-wcu-tabs">
                      {(editedConfig.wcuBenefits || []).map((benefit, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`hm-tab-btn ${selectedWcuCardIndex === index ? 'active' : ''}`}
                          onClick={() => setSelectedWcuCardIndex(index)}
                        >
                          <span className="hm-tab-num">0{index + 1}</span>
                          <span className="hm-tab-title">{benefit.title || `Card ${index + 1}`}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {editedConfig.wcuBenefits && editedConfig.wcuBenefits[selectedWcuCardIndex] && (
                    <div className="hm-field-fullwidth hm-wcu-editor-card">
                      <div className="hm-fields-grid">
                        {/* Title */}
                        <div className="hm-form-group">
                          <label className="hm-label">Card Title</label>
                          <div className="hm-input-wrap">
                            <input
                              className="hm-input"
                              type="text"
                              value={editedConfig.wcuBenefits[selectedWcuCardIndex].title || ''}
                              onChange={e => handleWcuCardChange(selectedWcuCardIndex, 'title', e.target.value)}
                              placeholder="Premium Fleet"
                              disabled={!editingSections.wcu}
                            />
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="hm-form-group">
                          <label className="hm-label">Card Icon</label>
                          <AdminSelect
                            value={editedConfig.wcuBenefits[selectedWcuCardIndex].icon || 'Sparkles'}
                            onChange={val => handleWcuCardChange(selectedWcuCardIndex, 'icon', val)}
                            options={['Sparkles', 'MapPin', 'CreditCard', 'Clock', 'Headphones', 'Shield']}
                            disabled={!editingSections.wcu}
                          />
                        </div>

                        {/* Description */}
                        <div className="hm-form-group hm-field-fullwidth">
                          <label className="hm-label">Card Description</label>
                          <div className="hm-textarea-wrap">
                            <textarea
                              className="hm-textarea"
                              value={editedConfig.wcuBenefits[selectedWcuCardIndex].description || ''}
                              onChange={e => handleWcuCardChange(selectedWcuCardIndex, 'description', e.target.value)}
                              placeholder="500+ handpicked vehicles..."
                              style={{ minHeight: 60 }}
                              disabled={!editingSections.wcu}
                            />
                          </div>
                        </div>

                        {/* Telemetry Metric */}
                        <div className="hm-form-group">
                          <label className="hm-label">HUD Telemetry Metric Title</label>
                          <div className="hm-input-wrap">
                            <input
                              className="hm-input"
                              type="text"
                              value={editedConfig.wcuBenefits[selectedWcuCardIndex].metric || ''}
                              onChange={e => handleWcuCardChange(selectedWcuCardIndex, 'metric', e.target.value)}
                              placeholder="500+ ELITE VEHICLES"
                              disabled={!editingSections.wcu}
                            />
                          </div>
                        </div>

                        {/* Telemetry Tagline */}
                        <div className="hm-form-group">
                          <label className="hm-label">HUD Telemetry Tagline</label>
                          <div className="hm-input-wrap">
                            <input
                              className="hm-input"
                              type="text"
                              value={editedConfig.wcuBenefits[selectedWcuCardIndex].tagline || ''}
                              onChange={e => handleWcuCardChange(selectedWcuCardIndex, 'tagline', e.target.value)}
                              placeholder="Track-Ready Perfection"
                              disabled={!editingSections.wcu}
                            />
                          </div>
                        </div>

                        {/* Telemetry Facts (5 rows of label/value inputs) */}
                        <div className="hm-form-group hm-field-fullwidth" style={{ marginTop: 12 }}>
                          <label className="hm-label" style={{ color: '#c9a84c' }}>HUD Diagnostics Spec Rows (Up to 5)</label>
                          <div className="hm-wcu-facts-list">
                            {(editedConfig.wcuBenefits[selectedWcuCardIndex].facts || []).map((fact, factIdx) => (
                              <div className="hm-fact-edit-row" key={factIdx}>
                                <div className="hm-input-wrap" style={{ flex: 1, height: 44 }}>
                                  <span style={{ fontSize: '0.7rem', color: '#666', marginRight: 4 }}>Label:</span>
                                  <input
                                    className="hm-input"
                                    type="text"
                                    value={fact.label || ''}
                                    onChange={e => handleWcuFactChange(selectedWcuCardIndex, factIdx, 'label', e.target.value)}
                                    placeholder="Fact label"
                                    style={{ fontSize: '0.85rem' }}
                                    disabled={!editingSections.wcu}
                                  />
                                </div>
                                <div className="hm-input-wrap" style={{ width: 180, height: 44 }}>
                                  <span style={{ fontSize: '0.7rem', color: '#666', marginRight: 4 }}>Value:</span>
                                  <input
                                    className="hm-input"
                                    type="text"
                                    value={fact.val || ''}
                                    onChange={e => handleWcuFactChange(selectedWcuCardIndex, factIdx, 'val', e.target.value)}
                                    placeholder="Fact value"
                                    style={{ fontSize: '0.85rem' }}
                                    disabled={!editingSections.wcu}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Section 5: Testimonials Section ── */}
        <div className="hm-section-card">
          <div className="hm-card-glow" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)' }} />
          
          <div className="hm-section-trigger" onClick={() => setExpandedSection(expandedSection === 'testimonials' ? '' : 'testimonials')}>
            <div className="hm-trigger-left">
              <div className="hm-section-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <div className="hm-section-title">Testimonials Section</div>
                <div className="hm-section-subtitle">Customize titles and manage customer reviews, ratings, and driver profiles</div>
              </div>
            </div>
            <ChevronDown className={`hm-section-chevron ${expandedSection === 'testimonials' ? 'expanded' : ''}`} size={20} />
          </div>

          <AnimatePresence initial={false}>
            {expandedSection === 'testimonials' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hm-section-content"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: editingSections.testimonials ? '#c9a84c' : 'var(--admin-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: editingSections.testimonials ? '#c9a84c' : 'rgba(255,255,255,0.2)' }} />
                    {editingSections.testimonials ? 'Mode: Editing Active' : 'Mode: Read-Only'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSections(prev => ({ ...prev, testimonials: !prev.testimonials }))}
                    className={`hm-section-edit-btn ${editingSections.testimonials ? 'hm-section-edit-btn--active' : 'hm-section-edit-btn--inactive'}`}
                  >
                    {editingSections.testimonials ? <Check size={14} /> : <PenLine size={14} />}
                    {editingSections.testimonials ? 'Done' : 'Edit Section'}
                  </button>
                </div>
                <div className="hm-fields-grid">
                  <div className="hm-form-group">
                    <label className="hm-label">Section Label</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.testimonialsLabel || ''}
                        onChange={e => handleChange('testimonialsLabel', e.target.value)}
                        placeholder="Testimonials"
                        disabled={!editingSections.testimonials}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Section Title</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.testimonialsTitle || ''}
                        onChange={e => handleChange('testimonialsTitle', e.target.value)}
                        placeholder="Voices From Real Drivers"
                        disabled={!editingSections.testimonials}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth" style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <label className="hm-label" style={{ color: '#10b981' }}>Manage Customer Reviews</label>
                      {editingSections.testimonials && (
                        <button
                          type="button"
                          className="hm-btn-reset"
                          onClick={handleAddTestimonial}
                          style={{ height: 32, padding: '0 12px', fontSize: '0.75rem', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}
                        >
                          + Add Review
                        </button>
                      )}
                    </div>
                    
                    <div className="hm-testimonials-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {(editedConfig.testimonialsList || []).map((t, index) => (
                        <div className="hm-testimonial-item-card" key={t.id || index}>
                          <div className="hm-testimonial-item-header">
                            <span className="hm-testimonial-number">Review #{index + 1}</span>
                            {editingSections.testimonials && (
                              <button
                                type="button"
                                className="hm-btn-delete-testimonial"
                                onClick={() => handleDeleteTestimonial(index)}
                                title="Delete Testimonial"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                          <div className="hm-fields-grid">
                            {/* Author Name */}
                            <div className="hm-form-group">
                              <label className="hm-label">Client Name</label>
                              <div className="hm-input-wrap">
                                <input
                                  className="hm-input"
                                  type="text"
                                  value={t.name || ''}
                                  onChange={e => handleTestimonialChange(index, 'name', e.target.value)}
                                  placeholder="Alexander K."
                                  disabled={!editingSections.testimonials}
                                />
                              </div>
                            </div>

                            {/* Client Location */}
                            <div className="hm-form-group">
                              <label className="hm-label">Location</label>
                              <div className="hm-input-wrap">
                                <input
                                  className="hm-input"
                                  type="text"
                                  value={t.location || ''}
                                  onChange={e => handleTestimonialChange(index, 'location', e.target.value)}
                                  placeholder="Moscow, Russia"
                                  disabled={!editingSections.testimonials}
                                />
                              </div>
                            </div>

                            {/* Rented Car Model */}
                            <div className="hm-form-group">
                              <label className="hm-label">Rented Car</label>
                              <div className="hm-input-wrap">
                                <input
                                  className="hm-input"
                                  type="text"
                                  value={t.car || ''}
                                  onChange={e => handleTestimonialChange(index, 'car', e.target.value)}
                                  placeholder="Lamborghini Urus"
                                  disabled={!editingSections.testimonials}
                                />
                              </div>
                            </div>

                            {/* Rating (1-5 Stars) */}
                            <div className="hm-form-group">
                              <label className="hm-label">Rating (Stars)</label>
                              <AdminSelect
                                value={t.rating || 5}
                                onChange={val => handleTestimonialChange(index, 'rating', val)}
                                options={[
                                  { value: 5, label: '5 Stars' },
                                  { value: 4, label: '4 Stars' },
                                  { value: 3, label: '3 Stars' },
                                  { value: 2, label: '2 Stars' },
                                  { value: 1, label: '1 Star' }
                                ]}
                                disabled={!editingSections.testimonials}
                              />
                            </div>

                            {/* Initials / Avatar */}
                            <div className="hm-form-group hm-field-fullwidth">
                              <label className="hm-label">Avatar Initials</label>
                              <div className="hm-input-wrap" style={{ width: 140 }}>
                                <input
                                  className="hm-input"
                                  type="text"
                                  maxLength="3"
                                  value={t.avatar || ''}
                                  onChange={e => handleTestimonialChange(index, 'avatar', e.target.value)}
                                  placeholder="AK"
                                  disabled={!editingSections.testimonials}
                                />
                              </div>
                            </div>

                            {/* Comment Text */}
                            <div className="hm-form-group hm-field-fullwidth">
                              <label className="hm-label">Review Text</label>
                              <div className="hm-textarea-wrap">
                                <textarea
                                  className="hm-textarea"
                                  value={t.text || ''}
                                  onChange={e => handleTestimonialChange(index, 'text', e.target.value)}
                                  placeholder="Absolutely phenomenal service..."
                                  style={{ minHeight: 60 }}
                                  disabled={!editingSections.testimonials}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(editedConfig.testimonialsList || []).length === 0 && (
                        <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.01)', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.85rem', color: '#666' }}>No testimonials configured. Click "+ Add Review" to create one.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Section 4: Prestige CTA Section ── */}
        <div className="hm-section-card">
          <div className="hm-card-glow" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)' }} />
          
          <div className="hm-section-trigger" onClick={() => setExpandedSection(expandedSection === 'cta' ? '' : 'cta')}>
            <div className="hm-trigger-left">
              <div className="hm-section-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' }}>
                <ArrowUpRight size={20} />
              </div>
              <div>
                <div className="hm-section-title">Prestige CTA Section</div>
                <div className="hm-section-subtitle">Customize the footer call-to-action banner text, description, links, and badges</div>
              </div>
            </div>
            <ChevronDown className={`hm-section-chevron ${expandedSection === 'cta' ? 'expanded' : ''}`} size={20} />
          </div>

          <AnimatePresence initial={false}>
            {expandedSection === 'cta' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hm-section-content"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: editingSections.cta ? '#c9a84c' : 'var(--admin-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: editingSections.cta ? '#c9a84c' : 'rgba(255,255,255,0.2)' }} />
                    {editingSections.cta ? 'Mode: Editing Active' : 'Mode: Read-Only'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSections(prev => ({ ...prev, cta: !prev.cta }))}
                    className={`hm-section-edit-btn ${editingSections.cta ? 'hm-section-edit-btn--active' : 'hm-section-edit-btn--inactive'}`}
                  >
                    {editingSections.cta ? <Check size={14} /> : <PenLine size={14} />}
                    {editingSections.cta ? 'Done' : 'Edit Section'}
                  </button>
                </div>
                <div className="hm-fields-grid">
                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Badge Text</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.ctaBadge}
                        onChange={e => handleChange('ctaBadge', e.target.value)}
                        placeholder="EXCLUSIVITY REDEFINED"
                        disabled={!editingSections.cta}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Title Line 1</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.ctaTitleLine1}
                        onChange={e => handleChange('ctaTitleLine1', e.target.value)}
                        placeholder="NEVER SETTLE FOR"
                        disabled={!editingSections.cta}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Title Line 2 (Highlight Word)</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.ctaTitleLine2}
                        onChange={e => handleChange('ctaTitleLine2', e.target.value)}
                        placeholder="THE ORDINARY."
                        style={{ color: '#c9a84c', fontWeight: 'bold' }}
                        disabled={!editingSections.cta}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group hm-field-fullwidth">
                    <label className="hm-label">Description Text</label>
                    <div className="hm-textarea-wrap">
                      <textarea
                        className="hm-textarea"
                        value={editedConfig.ctaDescription}
                        onChange={e => handleChange('ctaDescription', e.target.value)}
                        placeholder="Unleash ultimate performance..."
                        style={{ minHeight: 80 }}
                        disabled={!editingSections.cta}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Button Action Text</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.ctaBtnText}
                        onChange={e => handleChange('ctaBtnText', e.target.value)}
                        placeholder="Rent Your Masterpiece"
                        disabled={!editingSections.cta}
                      />
                    </div>
                  </div>

                  <div className="hm-form-group">
                    <label className="hm-label">Button Action Link</label>
                    <div className="hm-input-wrap">
                      <input
                        className="hm-input"
                        type="text"
                        value={editedConfig.ctaBtnLink}
                        onChange={e => handleChange('ctaBtnLink', e.target.value)}
                        placeholder="/fleet"
                        disabled={!editingSections.cta}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

      {/* Floating Sticky Bottom Actions Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            className="hm-sticky-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="hm-sticky-info">
              <div className="hm-changes-badge">
                <span className="hm-changes-dot" />
                Unsaved changes
              </div>
            </div>
            <div className="hm-sticky-actions">
              <button className="hm-btn-reset" onClick={handleReset}>
                <RotateCcw size={15} /> System Reset
              </button>
              <button className="hm-btn-discard" onClick={handleDiscard}>
                <Trash2 size={15} /> Discard
              </button>
              <button className="hm-btn-save" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <div style={{ width: 14, height: 14, border: '2px solid rgba(5,5,8,0.3)', borderTopColor: '#050508', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} /> Apply Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent non-sticky System Reset for when no changes exist */}
      {!hasChanges && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -80, marginBottom: 120 }}>
          <button className="hm-btn-reset" onClick={handleReset}>
            <RotateCcw size={15} /> Restore Defaults
          </button>
        </div>
      )}

      {/* Toast popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`hm-toast ${toast.type}`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {toast.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
};

export default HomepageManager;
