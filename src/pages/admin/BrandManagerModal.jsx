import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Save, Plus, Trash2, Edit2, ImagePlus, Eye, EyeOff,
  CheckCircle, XCircle, Globe
} from 'lucide-react';
import { useBrandStore } from '../../hooks/useBrandStore';
import './BrandManagerModal.css';

function readFileAsDataUrl(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function createEmptyBrand() {
  return {
    name: '',
    slug: '',
    logoSlug: '',
    domain: '',
    tagline: '',
    description: '',
    founded: new Date().getFullYear(),
    country: '',
    specialty: '',
    available: true,
    visible: true,
    customLogo: '',
  };
}

export default function BrandManagerModal({ isOpen, onClose }) {
  const { brands, addBrand, updateBrand, deleteBrand, getLogoUrl } = useBrandStore();

  const [editingBrand, setEditingBrand] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [brokenLogos, setBrokenLogos] = useState(new Set());

  const openEdit = (brand) => {
    setEditForm(JSON.parse(JSON.stringify(brand)));
    setEditingBrand(brand.slug);
  };

  const openAdd = () => {
    const empty = createEmptyBrand();
    setEditForm(empty);
    setEditingBrand('__new__');
  };

  const closeEdit = () => {
    setEditForm(null);
    setEditingBrand(null);
  };

  const patchField = (key, value) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (url) => patchField('customLogo', url));
    e.target.value = '';
  };

  const handleSave = () => {
    if (!editForm?.name?.trim()) return;
    if (editingBrand === '__new__') {
      addBrand(editForm);
    } else {
      updateBrand(editingBrand, editForm);
    }
    closeEdit();
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteBrand(deleteTarget.slug);
      setDeleteTarget(null);
      if (editingBrand === deleteTarget.slug) closeEdit();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className="brand-modal__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="brand-modal">
        <motion.div
          className="brand-modal__container"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        >
          {/* Header */}
          <div className="brand-modal__header">
            <div className="brand-modal__header-left">
              <h2>Brand Manager</h2>
              <p>Manage, edit, and curate automotive brands across the site.</p>
            </div>
            <div className="brand-modal__header-actions">
              <button type="button" className="fleet-admin__add-btn" onClick={openAdd}>
                <Plus size={16} /> Add Brand
              </button>
              <button type="button" className="brand-modal__close" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body — Brand Grid */}
          <div className="brand-modal__body">
            <div className="brand-modal__grid">
              {brands.length === 0 ? (
                <div className="brand-modal__empty">
                  <Globe size={40} style={{ color: 'var(--admin-text-muted)', marginBottom: 12, opacity: 0.5 }} />
                  <p style={{ color: 'var(--admin-text-secondary)', marginBottom: 16 }}>No brands yet. Click Add Brand above.</p>
                </div>
              ) : (
                brands.map((brand) => (
                  <div
                    key={brand.slug}
                    className={`brand-modal__card ${brand.visible === false ? 'brand-modal__card--hidden' : ''} ${brand.available === false ? 'brand-modal__card--unavailable' : ''}`}
                  >
                    <div className="brand-modal__card-logo-area">
                      {brokenLogos.has(brand.slug) ? (
                        <div className="brand-modal__card-logo-fallback">
                          {brand.name?.charAt(0) || '?'}
                        </div>
                      ) : (
                        <img
                          src={getLogoUrl(brand)}
                          alt={`${brand.name} logo`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            setBrokenLogos((prev) => new Set(prev).add(brand.slug));
                          }}
                        />
                      )}
                    </div>
                    <div className="brand-modal__card-body">
                      <div className="brand-modal__card-name">{brand.name}</div>
                      <div className="brand-modal__card-country">
                        {brand.country} {brand.founded ? `· Est. ${brand.founded}` : ''}
                      </div>
                      <div className="brand-modal__card-tags">
                        <span className={`brand-modal__tag ${brand.available !== false ? 'brand-modal__tag--available' : 'brand-modal__tag--unavailable'}`}>
                          {brand.available !== false ? 'Available' : 'Unavailable'}
                        </span>
                        <span className={`brand-modal__tag ${brand.visible !== false ? 'brand-modal__tag--visible' : 'brand-modal__tag--hidden-tag'}`}>
                          {brand.visible !== false ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                      <div className="brand-modal__card-actions">
                        <button type="button" className="brand-modal__card-action" onClick={() => openEdit(brand)}>
                          <Edit2 size={13} /> Edit
                        </button>
                        <button type="button" className="brand-modal__card-action brand-modal__card-action--danger" onClick={() => setDeleteTarget(brand)}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Edit Overlay */}
          <AnimatePresence>
            {editForm && (
              <motion.div
                className="brand-modal__edit-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="brand-modal__edit-panel"
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                >
                  <div className="brand-modal__edit-header">
                    <h3>{editingBrand === '__new__' ? 'Add New Brand' : `Edit ${editForm.name}`}</h3>
                    <button type="button" className="brand-modal__close" onClick={closeEdit} aria-label="Close edit">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="brand-modal__edit-body">
                    {/* Name + Slug */}
                    <div className="brand-modal__field-row">
                      <div className="brand-modal__field">
                        <label className="brand-modal__label">Brand Name *</label>
                        <input className="brand-modal__input" value={editForm.name} onChange={(e) => patchField('name', e.target.value)} placeholder="Ferrari" />
                      </div>
                      <div className="brand-modal__field">
                        <label className="brand-modal__label">URL Slug</label>
                        <input className="brand-modal__input" value={editForm.slug} onChange={(e) => patchField('slug', e.target.value)} placeholder="ferrari" />
                      </div>
                    </div>

                    {/* Country + Founded */}
                    <div className="brand-modal__field-row">
                      <div className="brand-modal__field">
                        <label className="brand-modal__label">Country</label>
                        <input className="brand-modal__input" value={editForm.country} onChange={(e) => patchField('country', e.target.value)} placeholder="Italy" />
                      </div>
                      <div className="brand-modal__field">
                        <label className="brand-modal__label">Founded Year</label>
                        <input type="number" className="brand-modal__input" value={editForm.founded} onChange={(e) => patchField('founded', Number(e.target.value))} />
                      </div>
                    </div>

                    {/* Tagline */}
                    <div className="brand-modal__field">
                      <label className="brand-modal__label">Tagline</label>
                      <input className="brand-modal__input" value={editForm.tagline} onChange={(e) => patchField('tagline', e.target.value)} placeholder="The Pinnacle of Italian Motorsport Passion" />
                    </div>

                    {/* Description */}
                    <div className="brand-modal__field">
                      <label className="brand-modal__label">Description</label>
                      <textarea className="brand-modal__textarea" rows={3} value={editForm.description} onChange={(e) => patchField('description', e.target.value)} placeholder="Full brand description..." />
                    </div>

                    {/* Domain + Specialty */}
                    <div className="brand-modal__field-row">
                      <div className="brand-modal__field">
                        <label className="brand-modal__label">Website Domain</label>
                        <input className="brand-modal__input" value={editForm.domain} onChange={(e) => patchField('domain', e.target.value)} placeholder="ferrari.com" />
                      </div>
                      <div className="brand-modal__field">
                        <label className="brand-modal__label">Specialty</label>
                        <input className="brand-modal__input" value={editForm.specialty} onChange={(e) => patchField('specialty', e.target.value)} placeholder="Extreme Supercars" />
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="brand-modal__field">
                      <label className="brand-modal__label">Custom Logo</label>
                      <div className="brand-modal__logo-upload">
                        <input type="file" accept="image/*" onChange={handleLogoUpload} />
                        {editForm.customLogo ? (
                          <>
                            <img src={editForm.customLogo} alt="" className="brand-modal__logo-preview" />
                            <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>Click to replace custom logo</p>
                          </>
                        ) : (
                          <>
                            <ImagePlus size={22} color="#c9a84c" style={{ marginBottom: 6 }} />
                            <p style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>Upload a custom logo (optional)</p>
                          </>
                        )}
                      </div>
                      {editForm.customLogo && (
                        <button
                          type="button"
                          onClick={() => patchField('customLogo', '')}
                          style={{ marginTop: 8, fontSize: '0.78rem', color: '#f43f5e', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--admin-font)' }}
                        >
                          Remove custom logo (use default)
                        </button>
                      )}
                    </div>

                    {/* Toggles */}
                    <div className="brand-modal__toggle-row" onClick={() => patchField('available', !editForm.available)}>
                      <div>
                        <div className="brand-modal__toggle-label">
                          {editForm.available ? <><CheckCircle size={14} style={{ color: '#25D366', marginRight: 6 }} /> Available</> : <><XCircle size={14} style={{ color: '#f59e0b', marginRight: 6 }} /> Unavailable</>}
                        </div>
                        <div className="brand-modal__toggle-hint">Indicates if this brand is currently available for rental</div>
                      </div>
                      <button type="button" className={`brand-modal__toggle ${editForm.available ? 'brand-modal__toggle--on' : ''}`} />
                    </div>

                    <div className="brand-modal__toggle-row" onClick={() => patchField('visible', !editForm.visible)}>
                      <div>
                        <div className="brand-modal__toggle-label">
                          {editForm.visible !== false ? <><Eye size={14} style={{ color: '#60a5fa', marginRight: 6 }} /> Visible</> : <><EyeOff size={14} style={{ color: '#f43f5e', marginRight: 6 }} /> Hidden</>}
                        </div>
                        <div className="brand-modal__toggle-hint">Hide from homepage marquee and fleet page brand filters</div>
                      </div>
                      <button type="button" className={`brand-modal__toggle ${editForm.visible !== false ? 'brand-modal__toggle--on' : ''}`} />
                    </div>
                  </div>

                  <div className="brand-modal__edit-footer">
                    <button type="button" className="admin-btn secondary" onClick={closeEdit}>Cancel</button>
                    <button type="button" className="admin-btn" onClick={handleSave} disabled={!editForm.name?.trim()}>
                      <Save size={16} /> {editingBrand === '__new__' ? 'Add Brand' : 'Save Changes'}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation */}
          <AnimatePresence>
            {deleteTarget && (
              <motion.div
                className="brand-modal__delete-dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="brand-modal__delete-box"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                >
                  <h3>Delete {deleteTarget.name}?</h3>
                  <p>
                    This will permanently remove the brand from your catalog. It will no longer appear on the homepage marquee or fleet page filters.
                  </p>
                  <div className="brand-modal__delete-actions">
                    <button type="button" className="admin-btn secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
                    <button type="button" className="admin-btn danger" onClick={confirmDelete}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
