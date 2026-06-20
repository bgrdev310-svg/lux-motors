import React, { memo, useMemo } from 'react';
import { FileText, Clock, CheckCircle, Plus, Edit, HelpCircle, Contact, Calendar, TrendingUp, TrendingDown, ArrowUpRight, DollarSign, Car, UserPlus, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const miniChartData = [
  { v: 20 }, { v: 35 }, { v: 28 }, { v: 45 }, { v: 38 }, { v: 55 }, { v: 48 }, { v: 62 }, { v: 58 }, { v: 72 }, { v: 65 }, { v: 80 },
];

const stats = [
  { label: 'Total Bookings', value: '86', trend: '+8%', positive: true, icon: <FileText size={22} />, gradient: 'var(--admin-gradient-1)', color: '#c9a84c' },
  { label: 'Pending Reservations', value: '12', trend: '2 VIP urgent', positive: false, icon: <Clock size={22} />, gradient: 'var(--admin-gradient-3)', color: '#f43f5e' },
  { label: 'Active Rentals', value: '34', trend: '+6%', positive: true, icon: <Car size={22} />, gradient: 'var(--admin-gradient-4)', color: '#25D366' },
  { label: 'Revenue', value: '184k AED', trend: '+22%', positive: true, icon: <DollarSign size={22} />, gradient: 'var(--admin-gradient-2)', color: '#e8d5a3' },
];

const recentBookings = [
  { name: 'Ahmed Al-Rashid', vehicle: 'Ferrari 488 GTB', date: 'Mar 08, 2026', status: 'pending' },
  { name: 'James Wilson', vehicle: 'Rolls-Royce Ghost', date: 'Mar 07, 2026', status: 'accepted' },
  { name: 'Sophie Laurent', vehicle: 'Lamborghini Urus', date: 'Mar 06, 2026', status: 'completed' },
  { name: 'Omar Hassan', vehicle: 'Porsche 911 GT3', date: 'Mar 05, 2026', status: 'pending' },
];

const quickActions = [
  { label: 'New Booking', icon: <Plus size={24} />, color: '#c9a84c', path: '/admin/requests' },
  { label: 'Add Vehicle', icon: <Car size={24} />, color: '#25D366', path: '/admin/fleet' },
  { label: 'Add Client', icon: <UserPlus size={24} />, color: '#3b82f6', path: '/admin/requests' },
  { label: 'Schedule Delivery', icon: <Calendar size={24} />, color: '#e8d5a3', path: '/admin/calendar' },
];

const upcomingSchedule = [
  { time: '10:00 AM', client: 'A. Al-Rashid', type: 'Ferrari Delivery — DIFC', color: '#c9a84c' },
  { time: '02:00 PM', client: 'J. Wilson', type: 'Urus Pickup — DXB Airport', color: '#25D366' },
  { time: '04:30 PM', client: 'VIP Concierge', type: 'Ghost Handover — Palm Jumeirah', color: '#f59e0b' },
];

// Memoized mini chart to avoid re-rendering all 4 charts when parent state changes
const MiniChart = memo(({ color, index }) => (
  <div style={{ height: 40, width: 80 }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={miniChartData}>
        <defs>
          <linearGradient id={`mini-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#mini-${index})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
));

const upcomingReturns = [
  { vehicle: 'Lamborghini Urus', returnTime: 'Returns at 4:00 PM', urgency: 'today' },
  { vehicle: 'Ferrari F8', returnTime: 'Returns at 6:30 PM', urgency: 'today' },
  { vehicle: 'Rolls-Royce Cullinan', returnTime: 'Returns Tomorrow', urgency: 'tomorrow' }
];

const vehicleCategories = [
  { category: 'Supercars', count: 8, color: '#f43f5e' },
  { category: 'Luxury SUVs', count: 12, color: '#c9a84c' },
  { category: 'Luxury Sedans', count: 5, color: '#3b82f6' },
  { category: 'Exotics', count: 3, color: '#a855f7' }
];

export default memo(function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Welcome back, Admin 👋</h1>
          <p className="admin-page-subtitle">Here's what's happening at Lux Motors DXB today.</p>
        </div>
        <button type="button" className="admin-btn" onClick={() => navigate('/admin/requests')}>
          <Plus size={18} /> New Booking
        </button>
      </div>

      {/* ROW 1: KPI Cards */}
      <div className="admin-grid-4 admin-section-gap">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card" style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: stat.gradient, opacity: 0.08, borderRadius: '50%' }} />
            <div className="stat-widget">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="stat-icon" style={{ background: `${stat.color}18`, color: stat.color }}>
                  {stat.icon}
                </div>
                <MiniChart color={stat.color} index={i} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-trend ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: Recent Bookings & Today's Schedule + Quick Actions */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Bookings</h2>
            <button type="button" className="admin-btn secondary" onClick={() => navigate('/admin/requests')} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((req, i) => (
                  <tr key={i} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 600 }}>{req.name}</td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>{req.vehicle}</td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>{req.date}</td>
                    <td><span className={`badge ${req.status}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Today's Schedule</h2>
              <button type="button" className="admin-btn secondary" onClick={() => navigate('/admin/calendar')} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                <Calendar size={14} /> Full View
              </button>
            </div>
            {upcomingSchedule.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 0',
                borderBottom: i < upcomingSchedule.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
              }}>
                <div style={{
                  width: 4, height: 40, borderRadius: 4, background: item.color, flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.client}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>{item.type}</div>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>{item.time}</div>
              </div>
            ))}
          </div>

          <div className="admin-card">
            <h2 className="admin-card-title" style={{ marginBottom: 16 }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {quickActions.map((action, i) => (
                <div key={i} onClick={() => navigate(action.path)} style={{
                  padding: '18px 14px', borderRadius: 'var(--admin-radius-sm)',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--admin-border)',
                  cursor: 'pointer', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                }}>
                  <div style={{ color: action.color }}>{action.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{action.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Fleet Status & Urgent Alerts */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main">
        {/* Fleet Status */}
        <div className="admin-card">
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Fleet Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div style={{ padding: '16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(37, 211, 102, 0.04)', border: '1px solid rgba(37, 211, 102, 0.1)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', fontWeight: 500 }}>Available</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#25D366' }}>28</div>
            </div>
            <div style={{ padding: '16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(201, 168, 76, 0.04)', border: '1px solid rgba(201, 168, 76, 0.1)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', fontWeight: 500 }}>Rented</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c9a84c' }}>34</div>
            </div>
            <div style={{ padding: '16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(59, 130, 246, 0.04)', border: '1px solid rgba(59, 130, 246, 0.1)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', fontWeight: 500 }}>Reserved</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3b82f6' }}>9</div>
            </div>
            <div style={{ padding: '16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(244, 63, 94, 0.04)', border: '1px solid rgba(244, 63, 94, 0.1)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', fontWeight: 500 }}>Maintenance</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e' }}>3</div>
            </div>
          </div>
        </div>

        {/* Urgent Alerts */}
        <div className="admin-card">
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Urgent Alerts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: '12px 16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#f43f5e' }}><AlertTriangle size={20} /></div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>2 vehicles due maintenance</div>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#f59e0b' }}><AlertTriangle size={20} /></div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>1 payment overdue</div>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(201, 168, 76, 0.06)', border: '1px solid rgba(201, 168, 76, 0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#c9a84c' }}><AlertTriangle size={20} /></div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>1 VIP booking requires approval</div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: Upcoming Returns & Vehicle Availability Snapshot */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main">
        {/* Upcoming Returns */}
        <div className="admin-card">
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Upcoming Returns</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {upcomingReturns.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(201, 168, 76, 0.08)', color: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Car size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.vehicle}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-secondary)' }}>Dubai Fleet</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: item.urgency === 'today' ? '#f59e0b' : 'var(--admin-text-muted)', background: item.urgency === 'today' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 12 }}>
                  {item.returnTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Availability Snapshot */}
        <div className="admin-card">
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Vehicle Availability Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {vehicleCategories.map((cat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--admin-radius-sm)', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--admin-border)' }}>
                <div style={{ width: 8, height: 28, borderRadius: 4, background: cat.color }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{cat.count}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', fontWeight: 500 }}>{cat.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
