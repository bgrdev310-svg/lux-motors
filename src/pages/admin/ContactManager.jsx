import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Save, Phone, Mail, MapPin, Clock, Globe, Link,
  Share2, MessageSquare, Edit3, X, Check, RotateCcw,
  Eye, Sparkles, AlertTriangle, ExternalLink
} from 'lucide-react';
import './ContactManager.css';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

// ── Initial contact data ──
const INITIAL_DATA = {
  phone: '+971 50 992 4247',
  email: 'hello@luxmotorsdxb.com',
  whatsapp: '+971 50 992 4247',
  hours: '24/7 VIP Concierge',
  address: 'Business Bay, Dubai, United Arab Emirates',
  instagram: '@luxmotorsdxb',
  facebook: 'facebook.com/luxmotorsdxb',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14448.871142512686!2d55.216399999999994!3d25.1283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6be8a3a2e7c9%3A0xcfe4b806d2036737!2sOasis%20Mall!5e0!3m2!1sen!2sae!4v1717770000000!5m2!1sen!2sae',
};

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const ContactManager = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [savedData, setSavedData] = useState(INITIAL_DATA);
  const [editingField, setEditingField] = useState(null);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(savedData);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSavedData({ ...data });
      setEditingField(null);
      setSaving(false);
      showToast('Contact information saved successfully!');
    }, 600);
  };

  const handleDiscard = () => {
    setData({ ...savedData });
    setEditingField(null);
    showToast('Changes discarded', 'error');
  };

  const toggleEdit = (field) => {
    setEditingField(prev => prev === field ? null : field);
  };

  // ── Field renderer ──
  const renderField = (key, label, icon, color, placeholder) => {
    const isEditing = editingField === key;
    return (
      <div className="cm-field" key={key}>
        <div className="cm-field-label">{label}</div>
        <div className={`cm-field-input-wrap ${isEditing ? 'editing' : ''}`}>
          <div className="cm-field-icon" style={{ background: `${color}15`, color }}>
            {icon}
          </div>
          <input
            className="cm-field-input"
            value={data[key]}
            onChange={e => handleChange(key, e.target.value)}
            disabled={!isEditing}
            placeholder={placeholder}
          />
          <button
            className={`cm-field-edit-btn ${isEditing ? 'active' : ''}`}
            onClick={() => toggleEdit(key)}
            title={isEditing ? 'Done editing' : 'Edit field'}
          >
            {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div className="cm-layout" initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }}>
      {/* Background Orbs */}
      <div className="cm-bg-orbs">
        <div className="cm-orb cm-orb--1" />
        <div className="cm-orb cm-orb--2" />
        <div className="cm-orb cm-orb--3" />
      </div>

      {/* Header */}
      <motion.div className="admin-page-header" variants={fadeUp} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="admin-page-title">Contact Info Manager</h1>
          <p className="admin-page-subtitle">Manage your business contact details, social links, and location shown publicly.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {hasChanges && (
            <div className="cm-changes-indicator">
              <span className="cm-changes-dot" />
              Unsaved changes
            </div>
          )}
        </div>
      </motion.div>

      <div className="cm-grid">
        {/* ── Left Column: Edit Cards ── */}
        <motion.div className="cm-left-col" variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }}>

          {/* Primary Contact Card */}
          <div className="cm-glass-card">
            <div className="cm-card-glow" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)' }} />
            <div className="cm-section">
              <div className="cm-section-header">
                <div className="cm-section-icon" style={{ background: 'rgba(201, 168, 76, 0.12)', color: '#c9a84c' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div className="cm-section-title">Primary Contact</div>
                  <div className="cm-section-subtitle">Phone, email, and working hours</div>
                </div>
              </div>
              <div className="cm-fields">
                {renderField('phone', 'Mobile Number', <Phone size={16} />, '#25D366', '+971 50 000 0000')}
                {renderField('email', 'Email Address', <Mail size={16} />, '#3b82f6', 'hello@example.com')}
                {renderField('hours', 'Working Hours', <Clock size={16} />, '#f59e0b', '24/7 VIP Concierge')}
              </div>
            </div>
          </div>

          {/* Address & Map Card */}
          <div className="cm-glass-card">
            <div className="cm-card-glow" style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.12), transparent 70%)' }} />
            <div className="cm-section">
              <div className="cm-section-header">
                <div className="cm-section-icon" style={{ background: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="cm-section-title">Location & Map</div>
                  <div className="cm-section-subtitle">Office address and Google Maps embed</div>
                </div>
              </div>
              <div className="cm-fields">
                {/* Address textarea */}
                <div className="cm-field">
                  <div className="cm-field-label">Office Address</div>
                  <div className={`cm-field-textarea-wrap ${editingField === 'address' ? 'editing' : ''}`}>
                    <div className="cm-field-textarea-top">
                      <div className="cm-field-icon" style={{ background: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e' }}>
                        <MapPin size={16} />
                      </div>
                      <span style={{ flex: 1 }} />
                      <button
                        className={`cm-field-edit-btn ${editingField === 'address' ? 'active' : ''}`}
                        onClick={() => toggleEdit('address')}
                      >
                        {editingField === 'address' ? <Check size={14} /> : <Edit3 size={14} />}
                      </button>
                    </div>
                    <textarea
                      className="cm-field-textarea"
                      value={data.address}
                      onChange={e => handleChange('address', e.target.value)}
                      disabled={editingField !== 'address'}
                      placeholder="Enter office address..."
                    />
                  </div>
                </div>

                {/* Map URL */}
                <div className="cm-field">
                  <div className="cm-field-label">Google Maps Embed URL</div>
                  <div className={`cm-field-textarea-wrap ${editingField === 'mapUrl' ? 'editing' : ''}`}>
                    <div className="cm-field-textarea-top">
                      <div className="cm-field-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}>
                        <Globe size={16} />
                      </div>
                      <span style={{ flex: 1 }} />
                      <button
                        className={`cm-field-edit-btn ${editingField === 'mapUrl' ? 'active' : ''}`}
                        onClick={() => toggleEdit('mapUrl')}
                      >
                        {editingField === 'mapUrl' ? <Check size={14} /> : <Edit3 size={14} />}
                      </button>
                    </div>
                    <textarea
                      className="cm-field-textarea"
                      value={data.mapUrl}
                      onChange={e => handleChange('mapUrl', e.target.value)}
                      disabled={editingField !== 'mapUrl'}
                      placeholder="https://maps.google.com/embed?..."
                      style={{ minHeight: 48, fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                {/* Map Preview */}
                <div className="cm-map-frame">
                  {data.mapUrl ? (
                    <iframe
                      title="Map Preview"
                      src={data.mapUrl}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="cm-map-placeholder">
                      <Globe size={32} />
                      <span style={{ fontSize: '0.85rem' }}>Paste a Google Maps embed URL above</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="cm-glass-card">
            <div className="cm-card-glow" style={{ background: 'radial-gradient(circle, rgba(225, 48, 108, 0.12), transparent 70%)' }} />
            <div className="cm-section">
              <div className="cm-section-header">
                <div className="cm-section-icon" style={{ background: 'rgba(225, 48, 108, 0.12)', color: '#e1306c' }}>
                  <Share2 size={20} />
                </div>
                <div>
                  <div className="cm-section-title">Social Media</div>
                  <div className="cm-section-subtitle">Social profiles and messaging links</div>
                </div>
              </div>
              <div className="cm-fields">
                {renderField('instagram', 'Instagram Handle', <InstagramIcon size={16} />, '#e1306c', '@yourhandle')}
                {renderField('facebook', 'Facebook Page', <FacebookIcon size={16} />, '#1877f2', 'facebook.com/yourpage')}
                {renderField('whatsapp', 'WhatsApp Number', <MessageSquare size={16} />, '#25d366', '+971 50 000 0000')}
              </div>
            </div>
          </div>

          {/* Save / Discard Actions */}
          {hasChanges && (
            <motion.div
              className="cm-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="cm-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: '2px solid rgba(5,5,8,0.3)', borderTopColor: '#050508', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Saving...
                  </>
                ) : (
                  <><Save size={16} /> Apply Changes</>
                )}
              </button>
              <button className="cm-discard-btn" onClick={handleDiscard}>
                <RotateCcw size={15} /> Discard
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>
          )}
        </motion.div>

        {/* ── Right Column: Preview & Quick Access ── */}
        <motion.div className="cm-right-col" variants={fadeUp} transition={{ duration: 0.4, delay: 0.2 }}>
          {/* Live Preview */}
          <div className="cm-glass-card">
            <div className="cm-card-glow" style={{ background: 'radial-gradient(circle, rgba(201, 168, 76, 0.1), transparent 70%)' }} />
            <div className="cm-section" style={{ paddingBottom: 8 }}>
              <div className="cm-section-header" style={{ marginBottom: 16 }}>
                <div className="cm-section-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' }}>
                  <Eye size={20} />
                </div>
                <div>
                  <div className="cm-section-title">Live Preview</div>
                  <div className="cm-section-subtitle">How visitors see your info</div>
                </div>
              </div>
            </div>

            <div className="cm-preview">
              <div className="cm-preview-mockup">
                <div className="cm-preview-badge">
                  <Sparkles size={10} />
                  PUBLIC VIEW
                </div>
                <div className="cm-preview-title">Contact Us</div>

                <div className="cm-preview-items">
                  <div className="cm-preview-item">
                    <div className="cm-preview-item-icon"><Phone size={14} /></div>
                    <span className="cm-preview-item-text">{data.phone}</span>
                  </div>
                  <div className="cm-preview-item">
                    <div className="cm-preview-item-icon"><Mail size={14} /></div>
                    <span className="cm-preview-item-text">{data.email}</span>
                  </div>
                  <div className="cm-preview-item">
                    <div className="cm-preview-item-icon"><MapPin size={14} /></div>
                    <span className="cm-preview-item-text">{data.address.split(',')[0]}, {data.address.split(',')[1] || ''}</span>
                  </div>
                  <div className="cm-preview-item">
                    <div className="cm-preview-item-icon"><Clock size={14} /></div>
                    <span className="cm-preview-item-text">{data.hours}</span>
                  </div>
                </div>

                <div className="cm-preview-divider" />

                <div className="cm-preview-social">
                  <div className="cm-preview-social-btn ig" title={data.instagram}>
                    <InstagramIcon size={16} />
                  </div>
                  <div className="cm-preview-social-btn fb" title={data.facebook}>
                    <FacebookIcon size={16} />
                  </div>
                  <div className="cm-preview-social-btn wa" title={data.whatsapp}>
                    <MessageSquare size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="cm-glass-card">
            <div className="cm-section">
              <div className="cm-section-header" style={{ marginBottom: 16 }}>
                <div className="cm-section-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}>
                  <ExternalLink size={20} />
                </div>
                <div>
                  <div className="cm-section-title">Quick Links</div>
                  <div className="cm-section-subtitle">Open your public pages</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--admin-text-secondary)', textDecoration: 'none',
                    fontSize: '0.88rem', fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                    e.currentTarget.style.color = '#e8d5a3';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'var(--admin-text-secondary)';
                  }}
                >
                  <Globe size={16} style={{ color: '#c9a84c' }} />
                  View Public Contact Page
                  <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </a>
                <a
                  href={`https://wa.me/${data.whatsapp.replace(/\s/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--admin-text-secondary)', textDecoration: 'none',
                    fontSize: '0.88rem', fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(37,211,102,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(37,211,102,0.2)';
                    e.currentTarget.style.color = '#25d366';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'var(--admin-text-secondary)';
                  }}
                >
                  <MessageSquare size={16} style={{ color: '#25d366' }} />
                  Test WhatsApp Link
                  <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`cm-toast ${toast.type}`}>
          {toast.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
          {toast.msg}
        </div>
      )}
    </motion.div>
  );
};

export default ContactManager;
