import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Eye, Calendar, User, Phone, Mail, MapPin, Filter, Search, ArrowUpRight } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const requests = [
  { id: 'BK-001', name: 'Ahmed Al-Rashid', phone: '+971 50 123 4567', email: 'ahmed@example.com', address: 'DIFC, Dubai', service: 'Ferrari 488 GTB — 7 Days', date: 'Mar 08, 2026', preferred: 'Mar 15, 2026', status: 'pending' },
  { id: 'BK-002', name: 'James Wilson', phone: '+971 55 987 6543', email: 'james@example.com', address: 'Palm Jumeirah, Dubai', service: 'Rolls-Royce Ghost — 3 Days', date: 'Mar 07, 2026', preferred: 'Mar 10, 2026', status: 'pending' },
  { id: 'BK-003', name: 'Sophie Laurent', phone: '+33 6 12 34 56 78', email: 'sophie@example.com', address: 'Downtown Dubai', service: 'Lamborghini Urus — 5 Days', date: 'Mar 06, 2026', preferred: 'Mar 12, 2026', status: 'accepted' },
  { id: 'BK-004', name: 'Omar Hassan', phone: '+971 52 456 7890', email: 'omar@example.com', address: 'Dubai Marina', service: 'Porsche 911 GT3 — 2 Days', date: 'Mar 05, 2026', preferred: 'Mar 08, 2026', status: 'completed' },
  { id: 'BK-005', name: 'Michael Chen', phone: '+86 138 0000 0000', email: 'mike@example.com', address: 'Business Bay', service: 'Lamborghini Aventador — 1 Day', date: 'Mar 04, 2026', preferred: 'Mar 06, 2026', status: 'rejected' },
  { id: 'BK-006', name: 'Fatima Al-Mazrouei', phone: '+971 54 333 5555', email: 'fatima@example.com', address: 'JBR, Dubai', service: 'Rolls-Royce Ghost — 14 Days', date: 'Mar 03, 2026', preferred: 'Mar 20, 2026', status: 'pending' },
];

const filters = ['All', 'Pending', 'Accepted', 'Completed', 'Rejected'];

const RequestsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => 
    activeFilter === 'All' ? requests : requests.filter(r => r.status === activeFilter.toLowerCase()),
    [activeFilter]
  );

  const counts = useMemo(() => ({
    All: requests.length,
    Pending: requests.filter(r => r.status === 'pending').length,
    Accepted: requests.filter(r => r.status === 'accepted').length,
    Completed: requests.filter(r => r.status === 'completed').length,
    Rejected: requests.filter(r => r.status === 'rejected').length,
  }), []);

  const handleAccept = (req) => { setSelectedRequest(req); setIsModalOpen(true); };

  return (
    <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }}>
      <motion.div className="admin-page-header" variants={fadeUp} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="admin-page-title">Bookings & Reservations</h1>
          <p className="admin-page-subtitle">Manage VIP rental inquiries and delivery schedules.</p>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }} style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding: '8px 18px', borderRadius: 20, border: '1px solid',
            borderColor: activeFilter === f ? 'rgba(201, 168, 76,0.3)' : 'var(--admin-border)',
            background: activeFilter === f ? 'var(--admin-accent-light)' : 'rgba(255,255,255,0.03)',
            color: activeFilter === f ? 'var(--admin-accent-hover)' : 'var(--admin-text-secondary)',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
            fontFamily: 'var(--admin-font)', transition: 'var(--admin-transition)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {f}
            <span style={{
              background: activeFilter === f ? 'rgba(201, 168, 76,0.2)' : 'rgba(255,255,255,0.06)',
              padding: '1px 8px', borderRadius: 10, fontSize: '0.75rem'
            }}>{counts[f]}</span>
          </button>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div className="admin-card" style={{ padding: 0, overflow: 'hidden' }} variants={fadeUp} transition={{ duration: 0.4, delay: 0.15 }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Vehicle / Package</th>
                <th>Pickup Date</th>
                <th>Request Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => (
                <tr key={req.id}>
                  <td style={{ color: 'var(--admin-text-muted)', fontWeight: 600, fontFamily: 'monospace' }}>{req.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{req.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>{req.email}</div>
                  </td>
                  <td style={{ color: 'var(--admin-text-secondary)' }}>{req.service}</td>
                  <td style={{ color: 'var(--admin-text-secondary)' }}>{req.preferred}</td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{req.date}</td>
                  <td><span className={`badge ${req.status}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span></td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      <button className="admin-icon-btn" style={{ width: 34, height: 34 }} title="View">
                        <Eye size={15} />
                      </button>
                      {req.status === 'pending' && (
                        <>
                          <button className="admin-icon-btn" style={{ width: 34, height: 34, color: '#22c55e', borderColor: 'rgba(34,197,94,0.2)' }} title="Accept" onClick={() => handleAccept(req)}>
                            <Check size={15} />
                          </button>
                          <button className="admin-icon-btn" style={{ width: 34, height: 34, color: '#f43f5e', borderColor: 'rgba(244,63,94,0.2)' }} title="Reject">
                            <X size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Accept & Schedule Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
          }} onClick={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 580, margin: 20, maxHeight: '90vh', overflowY: 'auto',
                background: 'rgba(12, 14, 28, 0.98)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius-lg)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5)', padding: '24px 20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Schedule Delivery</h2>
                <button className="admin-icon-btn" onClick={() => setIsModalOpen(false)}><X size={18} /></button>
              </div>

              {selectedRequest && (
                <div style={{
                  background: 'rgba(201, 168, 76,0.04)', border: '1px solid rgba(201, 168, 76,0.1)',
                  padding: 20, borderRadius: 'var(--admin-radius-sm)', marginBottom: 24,
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16,
                }}>
                  {[
                    { icon: <User size={16} />, label: 'Client', value: selectedRequest.name },
                    { icon: <Phone size={16} />, label: 'Phone', value: selectedRequest.phone },
                    { icon: <Mail size={16} />, label: 'Email', value: selectedRequest.email },
                    { icon: <MapPin size={16} />, label: 'Address', value: selectedRequest.address },
                  ].map((field, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--admin-text-muted)', marginTop: 2 }}>{field.icon}</div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.label}</div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{field.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="admin-form-group">
                <label className="admin-label">Assign Concierge</label>
                <select className="admin-input">
                  <option>Select Concierge...</option>
                  <option>VIP Team Alpha</option>
                  <option>VIP Team Bravo</option>
                  <option>Senior Concierge — Khalid</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 22 }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Date</label>
                  <input type="date" className="admin-input" />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Time</label>
                  <input type="time" className="admin-input" />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Notes</label>
                <textarea className="admin-textarea" placeholder="Add instructions for the team..." style={{ minHeight: 80 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 28 }}>
                <button className="admin-btn secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="admin-btn success" onClick={() => setIsModalOpen(false)}>
                  <Check size={16} /> Confirm Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RequestsPage;
