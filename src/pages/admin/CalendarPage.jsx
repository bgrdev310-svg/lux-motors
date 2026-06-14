import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dates = Array.from({ length: 35 }, (_, i) => i - 3);

const events = {
  5: [{ time: '10:00', client: 'A. Al-Rashid', type: 'Ferrari Delivery', color: '#c9a84c' }],
  12: [
    { time: '11:00', client: 'J. Wilson', type: 'Ghost Handover', color: '#25D366' },
    { time: '15:00', client: 'S. Laurent', type: 'Urus Return', color: '#c9a84c' },
  ],
  15: [{ time: 'Full Day', client: 'VIP Event Fleet', type: 'Multi-Car Delivery', color: '#3b82f6' }],
  18: [{ time: '14:00', client: 'O. Hassan', type: 'GT3 Pickup', color: '#f59e0b' }],
  22: [{ time: '09:30', client: 'M. Chen', type: 'Aventador Delivery', color: '#e8d5a3' }],
  25: [{ time: '13:00', client: 'F. Al-Mazrouei', type: 'Concierge Meeting', color: '#06b6d4' }],
};

const upcomingEvents = [
  { date: 'Mar 5', time: '10:00 AM', client: 'A. Al-Rashid', type: 'Ferrari Delivery', address: 'DIFC, Dubai', color: '#c9a84c' },
  { date: 'Mar 12', time: '11:00 AM', client: 'J. Wilson', type: 'Ghost Handover', address: 'Palm Jumeirah', color: '#25D366' },
  { date: 'Mar 15', time: 'Full Day', client: 'VIP Event Fleet', type: 'Multi-Car Delivery', address: 'Downtown Dubai', color: '#3b82f6' },
  { date: 'Mar 18', time: '02:00 PM', client: 'O. Hassan', type: 'GT3 Pickup', address: 'Dubai Marina', color: '#f59e0b' },
];

const CalendarPage = () => {
  const [currentMonth] = useState('March 2026');
  const [activeView, setActiveView] = useState('Month');

  return (
    <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <motion.div className="admin-page-header" variants={fadeUp} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="admin-page-title">Rental Schedule</h1>
          <p className="admin-page-subtitle">Manage vehicle deliveries, returns, and VIP appointments.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4, border: '1px solid var(--admin-border)' }}>
            {['Month', 'Week', 'Day'].map(v => (
              <button key={v} onClick={() => setActiveView(v)} style={{
                padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: activeView === v ? 'var(--admin-accent-light)' : 'transparent',
                color: activeView === v ? 'var(--admin-accent-hover)' : 'var(--admin-text-secondary)',
                fontWeight: 600, fontSize: '0.82rem', fontFamily: 'var(--admin-font)',
                transition: 'var(--admin-transition)',
              }}>{v}</button>
            ))}
          </div>
          <button className="admin-btn"><Plus size={16} /> New Appointment</button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }} className="admin-responsive-grid-sidebar" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, flex: 1, minHeight: 0 }}>
        {/* Calendar Grid */}
        <div className="admin-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--admin-border)', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="admin-icon-btn" style={{ width: 34, height: 34 }}><ChevronLeft size={16} /></button>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', minWidth: 160, textAlign: 'center' }}>{currentMonth}</span>
              <button className="admin-icon-btn" style={{ width: 34, height: 34 }}><ChevronRight size={16} /></button>
            </div>
            <button className="admin-btn secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>Today</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--admin-border)' }}>
            {days.map(day => (
              <div key={day} className="admin-cal-day-header" style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700, fontSize: '0.75rem', color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {day}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>
            {dates.map((date, idx) => {
              const validDate = date > 0 && date <= 31;
              const dayEvents = validDate ? events[date] : null;
              const isToday = date === 5;
              return (
                <div key={idx} className={`admin-cal-cell ${dayEvents ? 'admin-cal-has-event' : ''}`} style={{
                  borderRight: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)',
                  padding: 8, minHeight: 90, position: 'relative', cursor: 'pointer',
                  background: isToday ? 'rgba(201, 168, 76,0.04)' : 'transparent',
                  transition: 'background 0.2s',
                }}>
                  <span style={{
                    fontSize: '0.82rem', fontWeight: 600,
                    color: !validDate ? 'var(--admin-text-muted)' : isToday ? '#c9a84c' : 'var(--admin-text-secondary)',
                    opacity: validDate ? 1 : 0.3,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: isToday ? 28 : 'auto', height: isToday ? 28 : 'auto',
                    borderRadius: '50%', background: isToday ? 'var(--admin-accent-light)' : 'transparent',
                  }}>
                    {validDate ? date : (date <= 0 ? 30 + date : date - 31)}
                  </span>
                  {dayEvents && dayEvents.map((ev, ei) => (
                    <div key={ei} className="admin-cal-event" style={{
                      background: `${ev.color}18`, borderLeft: `3px solid ${ev.color}`,
                      padding: '3px 6px', borderRadius: 4, fontSize: '0.68rem', marginTop: 4,
                      cursor: 'pointer', transition: 'transform 0.2s',
                    }}>
                      <div style={{ fontWeight: 700, color: ev.color }}>{ev.time}</div>
                      <div style={{ color: 'var(--admin-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.client}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Upcoming */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Upcoming Events</h2>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcomingEvents.map((ev, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 'var(--admin-radius-sm)',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)',
                cursor: 'pointer', transition: 'var(--admin-transition)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: ev.color, background: `${ev.color}15`, padding: '2px 10px', borderRadius: 6 }}>{ev.date}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>{ev.time}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>{ev.type}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: '0.78rem', color: 'var(--admin-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={12} /> {ev.client}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: 4 }}>
                  <MapPin size={11} /> {ev.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarPage;
