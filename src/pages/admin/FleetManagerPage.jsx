import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Search, Car, Edit2, Trash2, X, Save, Eye,
  ImagePlus, Gauge, FileText, HelpCircle, ExternalLink, Sparkles, Layers, Tags
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFleetStore } from '../../hooks/useFleetStore';
import { createEmptyCar, FLEET_CATEGORIES, slugify } from '../../data/defaultFleet';
import BrandManagerModal from './BrandManagerModal';
import './FleetManagerPage.css';

const TABS = [
  { id: 'basic', label: 'Overview', icon: <Car size={14} /> },
  { id: 'specs', label: 'Specs', icon: <Gauge size={14} /> },
  { id: 'media', label: 'Photos', icon: <ImagePlus size={14} /> },
  { id: 'details', label: 'Details', icon: <FileText size={14} /> },
  { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={14} /> },
];

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

function readFileAsDataUrl(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

export default function FleetManagerPage() {
  const { cars, addCar, updateCar, deleteCar } = useFleetStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [brandModalOpen, setBrandModalOpen] = useState(false);

  const stats = useMemo(() => ({
    total: cars.length,
    visible: cars.filter((c) => c.visible !== false).length,
    categories: new Set(cars.map((c) => c.category)).size,
    avgPrice: cars.length ? Math.round(cars.reduce((s, c) => s + c.price, 0) / cars.length) : 0,
  }), [cars]);

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const q = search.toLowerCase();
      const matchSearch = !q || car.name.toLowerCase().includes(q) || car.brand.toLowerCase().includes(q);
      const matchCat = categoryFilter === 'All' || car.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [cars, search, categoryFilter]);

  const openAdd = () => {
    setForm(createEmptyCar());
    setEditingId(null);
    setActiveTab('basic');
    setPanelOpen(true);
  };

  const openEdit = (car) => {
    setForm(JSON.parse(JSON.stringify(car)));
    setEditingId(car.id);
    setActiveTab('basic');
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setForm(null);
    setEditingId(null);
  };

  const patchForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const patchNested = (parent, key, value) => {
    setForm((prev) => ({ ...prev, [parent]: { ...prev[parent], [key]: value } }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    readFileAsDataUrl(file, (url) => patchForm(field, url));
    e.target.value = '';
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    readFileAsDataUrl(file, (url) => {
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), url] }));
    });
    e.target.value = '';
  };

  const removeGalleryImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { q: '', a: '' }],
    }));
  };

  const updateFaq = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    }));
  };

  const removeFaq = (index) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!form?.name?.trim()) return;
    const slug = form.slug?.trim() || slugify(form.name);
    const payload = {
      ...form,
      slug,
      brand: form.brand?.toUpperCase() || form.brand,
      images: form.images?.length ? form.images : [form.image, form.studioImage].filter(Boolean),
    };

    if (editingId) {
      updateCar(editingId, payload);
    } else {
      addCar(payload);
    }
    closePanel();
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteCar(deleteTarget.id);
      setDeleteTarget(null);
      if (editingId === deleteTarget.id) closePanel();
    }
  };

  return (
    <div className="fleet-admin">
      <motion.div className="admin-page-header" variants={fadeUp} initial="initial" animate="animate">
        <div>
          <h1 className="admin-page-title">Fleet Manager</h1>
          <p className="admin-page-subtitle">Add, edit, and curate vehicles shown on the public fleet & detail pages.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button type="button" className="admin-btn secondary" style={{ padding: '12px 20px', borderRadius: 12 }} onClick={() => setBrandModalOpen(true)}>
            <Tags size={18} /> Manage Brands
          </button>
          <button type="button" className="fleet-admin__add-btn" onClick={openAdd}>
            <Plus size={18} /> Add Car
          </button>
        </div>
      </motion.div>

      <motion.div className="fleet-admin__stats" variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.05 }}>
        {[
          { icon: <Car size={22} />, value: stats.total, label: 'Total Vehicles', color: '#c9a84c' },
          { icon: <Eye size={22} />, value: stats.visible, label: 'Live on Site', color: '#25D366' },
          { icon: <Layers size={22} />, value: stats.categories, label: 'Categories', color: '#3b82f6' },
          { icon: <Sparkles size={22} />, value: `${stats.avgPrice.toLocaleString()} AED`, label: 'Avg. Daily Rate', color: '#e8d5a3' },
        ].map((s, i) => (
          <div key={i} className="fleet-admin__stat" style={{ position: 'relative' }}>
            <div className="fleet-admin__stat-icon" style={{ background: `${s.color}18`, color: s.color }}>{s.icon}</div>
            <div>
              <div className="fleet-admin__stat-value">{s.value}</div>
              <div className="fleet-admin__stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div className="fleet-admin__toolbar" variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
        <div className="fleet-admin__toolbar-left">
          <div className="fleet-admin__search">
            <Search size={16} color="var(--admin-text-muted)" />
            <input type="text" placeholder="Search by name or brand..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="fleet-admin__filters">
            {['All', ...FLEET_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`fleet-admin__filter-pill ${categoryFilter === cat ? 'fleet-admin__filter-pill--active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className="fleet-admin__grid" variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.15 }}>
        {filtered.length === 0 ? (
          <div className="fleet-admin__empty">
            <Car size={48} className="fleet-admin__empty-icon" />
            <p style={{ color: 'var(--admin-text-secondary)', marginBottom: 16 }}>No vehicles match your search.</p>
            <button type="button" className="fleet-admin__add-btn" onClick={openAdd}>
              <Plus size={16} /> Add Your First Car
            </button>
          </div>
        ) : (
          filtered.map((car) => (
            <article key={car.id} className={`fleet-admin__card ${car.visible === false ? 'fleet-admin__card--hidden' : ''}`}>
              <div className="fleet-admin__card-image">
                {car.image ? (
                  <img src={car.image} alt={car.name} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--admin-text-muted)' }}>
                    <Car size={40} opacity={0.3} />
                  </div>
                )}
                <span className="fleet-admin__card-badge">{car.category}</span>
                <div className="fleet-admin__card-actions">
                  <Link to={`/fleet/${car.slug}`} target="_blank" className="fleet-admin__card-action" title="Preview">
                    <ExternalLink size={15} />
                  </Link>
                  <button type="button" className="fleet-admin__card-action" onClick={() => openEdit(car)} title="Edit">
                    <Edit2 size={15} />
                  </button>
                  <button type="button" className="fleet-admin__card-action fleet-admin__card-action--danger" onClick={() => setDeleteTarget(car)} title="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="fleet-admin__card-body">
                <div className="fleet-admin__card-brand">{car.brand}</div>
                <div className="fleet-admin__card-name">{car.name}</div>
                <div className="fleet-admin__card-meta">
                  <div className="fleet-admin__card-price">
                    {car.price.toLocaleString()} <small>AED / {car.period}</small>
                  </div>
                  <span className={`fleet-admin__card-status ${car.visible === false ? 'fleet-admin__card-status--hidden' : ''}`}>
                    {car.visible === false ? 'Hidden' : car.availability || 'Available'}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </motion.div>

      {/* Slide panel */}
      <AnimatePresence>
        {panelOpen && form && (
          <>
            <motion.div className="fleet-admin__backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel} />
            <motion.aside
              className="fleet-admin__panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="fleet-admin__panel-header">
                <div>
                  <h2 className="fleet-admin__panel-title">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
                  <p className="fleet-admin__panel-sub">Complete all sections — data syncs to Fleet & Car Details pages.</p>
                </div>
                <button type="button" className="fleet-admin__panel-close" onClick={closePanel} aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <div className="fleet-admin__tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`fleet-admin__tab ${activeTab === tab.id ? 'fleet-admin__tab--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="fleet-admin__panel-body">
                {activeTab === 'basic' && (
                  <>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Vehicle Name *</label>
                      <input className="fleet-admin__input" value={form.name} onChange={(e) => patchForm('name', e.target.value)} placeholder="Ferrari 488 GTB" />
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Brand</label>
                        <input className="fleet-admin__input" value={form.brand} onChange={(e) => patchForm('brand', e.target.value)} placeholder="FERRARI" />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Category</label>
                        <select className="fleet-admin__select" value={form.category} onChange={(e) => patchForm('category', e.target.value)}>
                          {FLEET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Tagline</label>
                      <input className="fleet-admin__input" value={form.tagline} onChange={(e) => patchForm('tagline', e.target.value)} placeholder="Exquisite Balance of Power and Control" />
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Model Year</label>
                        <input className="fleet-admin__input" value={form.year} onChange={(e) => patchForm('year', e.target.value)} placeholder="2024" />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">URL Slug</label>
                        <input className="fleet-admin__input" value={form.slug} onChange={(e) => patchForm('slug', e.target.value)} placeholder="ferrari-488-gtb" />
                      </div>
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Daily Price (AED)</label>
                        <input type="number" className="fleet-admin__input" value={form.price} onChange={(e) => patchForm('price', Number(e.target.value))} />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Security Deposit (AED)</label>
                        <input type="number" className="fleet-admin__input" value={form.deposit} onChange={(e) => patchForm('deposit', Number(e.target.value))} />
                      </div>
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Gearbox</label>
                        <input className="fleet-admin__input" value={form.gearbox} onChange={(e) => patchForm('gearbox', e.target.value)} placeholder="7-Speed Dual-Clutch" />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Availability</label>
                        <input className="fleet-admin__input" value={form.availability} onChange={(e) => patchForm('availability', e.target.value)} placeholder="Available Today" />
                      </div>
                    </div>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.visible !== false} onChange={(e) => patchForm('visible', e.target.checked)} />
                        Show on public fleet page
                      </label>
                    </div>
                  </>
                )}

                {activeTab === 'specs' && (
                  <>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: 20 }}>Numeric specs power the Fleet studio. Text specs appear on Car Details.</p>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Power (HP)</label>
                        <input type="number" className="fleet-admin__input" value={form.specs?.power ?? ''} onChange={(e) => patchNested('specs', 'power', Number(e.target.value))} />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">0-100 km/h (sec)</label>
                        <input type="number" step="0.1" className="fleet-admin__input" value={form.specs?.acceleration ?? ''} onChange={(e) => patchNested('specs', 'acceleration', Number(e.target.value))} />
                      </div>
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Top Speed (km/h)</label>
                        <input type="number" className="fleet-admin__input" value={form.specs?.topSpeed ?? ''} onChange={(e) => patchNested('specs', 'topSpeed', Number(e.target.value))} />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Engine</label>
                        <input className="fleet-admin__input" value={form.specs?.engine ?? ''} onChange={(e) => patchNested('specs', 'engine', e.target.value)} placeholder="3.9L Twin-Turbo V8" />
                      </div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--fa-border)', margin: '24px 0' }} />
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Detail — Power</label>
                        <input className="fleet-admin__input" value={form.detailSpecs?.power ?? ''} onChange={(e) => patchNested('detailSpecs', 'power', e.target.value)} placeholder="670 HP" />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Detail — Acceleration</label>
                        <input className="fleet-admin__input" value={form.detailSpecs?.acceleration ?? ''} onChange={(e) => patchNested('detailSpecs', 'acceleration', e.target.value)} placeholder="3.0s (0-100 km/h)" />
                      </div>
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Seats</label>
                        <input className="fleet-admin__input" value={form.detailSpecs?.seats ?? ''} onChange={(e) => patchNested('detailSpecs', 'seats', e.target.value)} />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Drive Type</label>
                        <input className="fleet-admin__input" value={form.detailSpecs?.driveType ?? ''} onChange={(e) => patchNested('detailSpecs', 'driveType', e.target.value)} />
                      </div>
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Fuel Grade</label>
                        <input className="fleet-admin__input" value={form.detailSpecs?.fuel ?? ''} onChange={(e) => patchNested('detailSpecs', 'fuel', e.target.value)} />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Detail — Top Speed</label>
                        <input className="fleet-admin__input" value={form.detailSpecs?.topSpeed ?? ''} onChange={(e) => patchNested('detailSpecs', 'topSpeed', e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'media' && (
                  <>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Card Image (Fleet grid)</label>
                      <div className="fleet-admin__upload">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} />
                        {form.image && <img src={form.image} alt="" className="fleet-admin__upload-preview" />}
                        <ImagePlus size={24} color="var(--fa-gold)" style={{ marginBottom: 8 }} />
                        <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>Drop or click to upload card image</p>
                      </div>
                    </div>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Studio Background (Fleet hero)</label>
                      <div className="fleet-admin__upload">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'studioImage')} />
                        {form.studioImage && <img src={form.studioImage} alt="" className="fleet-admin__upload-preview" />}
                        <ImagePlus size={24} color="var(--fa-gold)" style={{ marginBottom: 8 }} />
                        <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>Wide studio shot for interactive viewer</p>
                      </div>
                    </div>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Gallery (Car Details page)</label>
                      <div className="fleet-admin__upload">
                        <input type="file" accept="image/*" onChange={handleGalleryUpload} />
                        <ImagePlus size={24} color="var(--fa-gold)" style={{ marginBottom: 8 }} />
                        <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>Add photos to details slideshow</p>
                      </div>
                      {form.images?.length > 0 && (
                        <div className="fleet-admin__gallery">
                          {form.images.map((img, i) => (
                            <div key={i} className="fleet-admin__gallery-item">
                              <img src={img} alt={`Gallery ${i + 1}`} />
                              <button type="button" className="fleet-admin__gallery-remove" onClick={() => removeGalleryImage(i)}>
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="fleet-admin__field-row">
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Theme Color</label>
                        <input type="color" className="fleet-admin__input" style={{ height: 44, padding: 4 }} value={form.themeColor || '#c9a84c'} onChange={(e) => patchForm('themeColor', e.target.value)} />
                      </div>
                      <div className="fleet-admin__field">
                        <label className="fleet-admin__label">Theme RGB (for glow)</label>
                        <input className="fleet-admin__input" value={form.themeRgb || ''} onChange={(e) => patchForm('themeRgb', e.target.value)} placeholder="201, 168, 76" />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'details' && (
                  <>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Driver&apos;s Review / Description</label>
                      <textarea className="fleet-admin__textarea" rows={6} value={form.description} onChange={(e) => patchForm('description', e.target.value)} placeholder="Full vehicle description for the Car Details page..." />
                    </div>
                    <div className="fleet-admin__field">
                      <label className="fleet-admin__label">Minimum Age</label>
                      <input type="number" className="fleet-admin__input" value={form.requirements?.age ?? 25} onChange={(e) => patchNested('requirements', 'age', Number(e.target.value))} />
                    </div>
                  </>
                )}

                {activeTab === 'faqs' && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Model-specific FAQs on Car Details</span>
                      <button type="button" className="admin-btn secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={addFaq}>
                        <Plus size={14} /> Add FAQ
                      </button>
                    </div>
                    {(form.faqs || []).map((faq, i) => (
                      <div key={i} className="fleet-admin__faq-item">
                        <div className="fleet-admin__faq-head">
                          <span>FAQ #{i + 1}</span>
                          <button type="button" className="fleet-admin__card-action fleet-admin__card-action--danger" onClick={() => removeFaq(i)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="fleet-admin__field">
                          <input className="fleet-admin__input" value={faq.q} onChange={(e) => updateFaq(i, 'q', e.target.value)} placeholder="Question" />
                        </div>
                        <textarea className="fleet-admin__textarea" rows={3} value={faq.a} onChange={(e) => updateFaq(i, 'a', e.target.value)} placeholder="Answer" />
                      </div>
                    ))}
                    {(!form.faqs || form.faqs.length === 0) && (
                      <p style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: '24px 0' }}>No FAQs yet. Click Add FAQ above.</p>
                    )}
                  </>
                )}
              </div>

              <div className="fleet-admin__panel-footer">
                <button type="button" className="admin-btn secondary" onClick={closePanel}>Cancel</button>
                <button type="button" className="admin-btn" onClick={handleSave} disabled={!form.name?.trim()}>
                  <Save size={16} /> {editingId ? 'Save Changes' : 'Publish Vehicle'}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div className="fleet-admin__dialog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="fleet-admin__dialog-box" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <h3 className="fleet-admin__dialog-title">Delete {deleteTarget.name}?</h3>
              <p className="fleet-admin__dialog-text">
                This will permanently remove the vehicle from your fleet. It will no longer appear on the public Fleet or Car Details pages.
              </p>
              <div className="fleet-admin__dialog-actions">
                <button type="button" className="admin-btn secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button type="button" className="admin-btn danger" onClick={confirmDelete}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Manager Modal */}
      <AnimatePresence>
        {brandModalOpen && (
          <BrandManagerModal isOpen={brandModalOpen} onClose={() => setBrandModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
