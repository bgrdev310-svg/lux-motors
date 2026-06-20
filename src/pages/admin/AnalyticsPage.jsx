import React, { useState, memo } from 'react';
import AdminSelect from '../../components/admin/AdminSelect';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const areaData = [
  { name: 'Jan', bookings: 42, deliveries: 28 },
  { name: 'Feb', bookings: 55, deliveries: 38 },
  { name: 'Mar', bookings: 68, deliveries: 52 },
  { name: 'Apr', bookings: 61, deliveries: 48 },
  { name: 'May', bookings: 74, deliveries: 58 },
  { name: 'Jun', bookings: 82, deliveries: 65 },
  { name: 'Jul', bookings: 91, deliveries: 72 },
  { name: 'Aug', bookings: 86, deliveries: 68 },
  { name: 'Sep', bookings: 98, deliveries: 78 },
  { name: 'Oct', bookings: 105, deliveries: 84 },
];

const barData = [
  { name: 'SuperSport', count: 28, revenue: 420 },
  { name: 'Luxury', count: 22, revenue: 380 },
  { name: 'SUV', count: 18, revenue: 210 },
  { name: 'Sport', count: 14, revenue: 180 },
  { name: 'Exotic', count: 10, revenue: 160 },
];

const revenueTrendData = [
  { month: 'Jan', current: 120, previous: 105 },
  { month: 'Feb', current: 140, previous: 115 },
  { month: 'Mar', current: 155, previous: 125 },
  { month: 'Apr', current: 145, previous: 130 },
  { month: 'May', current: 170, previous: 140 },
  { month: 'Jun', current: 195, previous: 150 },
  { month: 'Jul', current: 210, previous: 165 },
  { month: 'Aug', current: 205, previous: 160 },
  { month: 'Sep', current: 220, previous: 175 },
  { month: 'Oct', current: 235, previous: 180 },
  { month: 'Nov', current: 245, previous: 190 },
  { month: 'Dec', current: 260, previous: 200 },
];

const fleetUtilization = [
  { category: 'Supercars', rate: 92, color: '#f43f5e' },
  { category: 'Luxury SUVs', rate: 87, color: '#c9a84c' },
  { category: 'Luxury Sedans', rate: 75, color: '#3b82f6' },
  { category: 'Exotics', rate: 81, color: '#a855f7' }
];

const topVehicles = [
  { vehicle: 'Lamborghini Urus', revenue: '220k AED', bookings: 24, utilization: '92%', color: '#f43f5e' },
  { vehicle: 'Ferrari F8 Tributo', revenue: '195k AED', bookings: 18, utilization: '88%', color: '#c9a84c' },
  { vehicle: 'Rolls-Royce Cullinan', revenue: '180k AED', bookings: 15, utilization: '85%', color: '#3b82f6' },
  { vehicle: 'Mercedes-AMG G63', revenue: '165k AED', bookings: 20, utilization: '82%', color: '#a855f7' },
  { vehicle: 'Porsche 911 GT3', revenue: '130k AED', bookings: 16, utilization: '78%', color: '#25D366' },
];

const revenueByVehicle = [
  { name: 'Urus', revenue: 220 },
  { name: 'Ferrari F8', revenue: 195 },
  { name: 'Cullinan', revenue: 180 },
  { name: 'G63 AMG', revenue: 165 },
  { name: 'Porsche 911', revenue: 130 },
];

const pieData = [
  { name: 'Website', value: 40, revenue: '420k AED' },
  { name: 'WhatsApp', value: 35, revenue: '350k AED' },
  { name: 'Referral', value: 15, revenue: '150k AED' },
  { name: 'Walk-in', value: 10, revenue: '100k AED' },
];
const PIE_COLORS = ['#c9a84c', '#25D366', '#f59e0b', '#3b82f6'];

const retentionData = [
  { name: 'Returning Clients', value: 64 },
  { name: 'New Clients', value: 36 }
];
const RETENTION_COLORS = ['#c9a84c', '#3b82f6'];

const bookingStatusData = [
  { name: 'Completed', value: 55 },
  { name: 'Active', value: 25 },
  { name: 'Pending', value: 12 },
  { name: 'Cancelled', value: 8 }
];
const STATUS_COLORS = ['#25D366', '#c9a84c', '#f59e0b', '#f43f5e'];

const topRegions = [
  { name: 'Downtown & DIFC', pct: 42, color: '#c9a84c', bookings: 36, revenue: '480k AED' },
  { name: 'Palm Jumeirah', pct: 26, color: '#25D366', bookings: 22, revenue: '310k AED' },
  { name: 'Dubai Marina', pct: 18, color: '#3b82f6', bookings: 15, revenue: '210k AED' },
  { name: 'DXB Airport Zone', pct: 14, color: '#f59e0b', bookings: 12, revenue: '140k AED' },
];

const CustomTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(12, 14, 28, 0.95)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
      padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6, fontSize: '0.85rem' }}>{label}</div>
      {payload.map((p, i) => {
        let formattedValue = p.value;
        if (p.name && (p.name.toLowerCase().includes('revenue') || p.dataKey === 'revenue' || p.dataKey === 'current' || p.dataKey === 'previous')) {
          formattedValue = typeof p.value === 'number' ? `${p.value}k AED` : p.value;
        }
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: p.color || p.stroke }}>
            <span style={{ width: 8, height: 8, borderRadius: 3, background: p.color || p.stroke, display: 'inline-block' }} />
            {p.name}: <strong style={{ color: '#f0f2f5' }}>{formattedValue}</strong>
          </div>
        );
      })}
    </div>
  );
});

const kpis = [
  { label: 'Conversion Rate', value: '72.4%', trend: '+3.1%', positive: true, icon: <TrendingUp size={20} />, color: '#25D366', target: '75.0%' },
  { label: 'Avg. Booking Value', value: '12.4k AED', trend: '+18%', positive: true, icon: <DollarSign size={20} />, color: '#c9a84c', target: '15.0k AED' },
  { label: 'Avg. Rental Duration', value: '4.8d', trend: '+0.6d', positive: true, icon: <Clock size={20} />, color: '#3b82f6', target: '5.0d' },
  { label: 'VIP Clients', value: '156', trend: '+9', positive: true, icon: <Users size={20} />, color: '#f59e0b', target: '180' },
];

// Memoized chart sub-components to prevent full page re-render on tooltip hover
const RevenueTrendChart = memo(() => (
  <div className="admin-card" style={{ padding: '24px 24px 16px' }}>
    <div className="admin-card-header" style={{ marginBottom: 16 }}>
      <div>
        <h2 className="admin-card-title">Monthly Revenue Trend</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)', marginTop: 2 }}>Current period vs. previous period comparison (k AED)</p>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: '#c9a84c', fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c' }} /> Current
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} /> Previous
        </span>
      </div>
    </div>
    <div style={{ height: 260, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gRevCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" stroke="#4a4f5e" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#4a4f5e" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.15)', strokeWidth: 1.5 }} />
          <Area type="monotone" dataKey="current" stroke="#c9a84c" strokeWidth={2.5} fill="url(#gRevCurrent)" name="Revenue Current" />
          <Area type="monotone" dataKey="previous" stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="5 5" strokeWidth={1.5} fill="none" name="Revenue Previous" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
));

const FleetUtilizationCard = memo(() => (
  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
    <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Fleet Utilization</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, justifyContent: 'center' }}>
      {fleetUtilization.map((f, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 600 }}>{f.category}</span>
            <span style={{ fontWeight: 700, color: f.color }}>{f.rate}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${f.rate}%`, background: f.color, borderRadius: 6 }} />
          </div>
        </div>
      ))}
    </div>
  </div>
));

const BookingsDeliveriesChart = memo(() => (
  <div className="admin-card" style={{ padding: '24px 24px 16px' }}>
    <div className="admin-card-header">
      <h2 className="admin-card-title">Bookings & Deliveries</h2>
    </div>
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gReq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gInst" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="name" stroke="#4a4f5e" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#4a4f5e" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.15)', strokeWidth: 1.5 }} />
          <Area type="monotone" dataKey="bookings" stroke="#c9a84c" strokeWidth={2.5} fill="url(#gReq)" name="Bookings" />
          <Area type="monotone" dataKey="deliveries" stroke="#25D366" strokeWidth={2.5} fill="url(#gInst)" name="Deliveries" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
        <span style={{ width: 10, height: 3, borderRadius: 2, background: '#c9a84c' }} /> Bookings
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
        <span style={{ width: 10, height: 3, borderRadius: 2, background: '#25D366' }} /> Deliveries
      </span>
    </div>
  </div>
));

const FleetCategoryChart = memo(() => (
  <div className="admin-card" style={{ padding: '24px 24px 16px' }}>
    <div className="admin-card-header">
      <h2 className="admin-card-title">Fleet Category Breakdown</h2>
    </div>
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="name" stroke="#4a4f5e" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#4a4f5e" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
          <Bar dataKey="count" fill="#c9a84c" radius={[6, 6, 0, 0]} name="Bookings" />
          <Bar dataKey="revenue" fill="#25D366" radius={[6, 6, 0, 0]} name="Revenue (k AED)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
));

const RevenueByVehicleChart = memo(() => (
  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div className="admin-card-header" style={{ marginBottom: 20 }}>
      <h2 className="admin-card-title">Revenue by Vehicle</h2>
    </div>
    <div style={{ flex: 1, width: '100%', minHeight: 280, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueByVehicle} layout="vertical" margin={{ top: 5, right: 25, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueBarGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a08535" />
              <stop offset="60%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#fbe6ac" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
          <XAxis 
            type="number" 
            stroke="var(--admin-text-muted)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(v) => `${v}k`} 
            tick={{ fill: 'var(--admin-text-secondary)', fontSize: 11 }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="var(--admin-text-muted)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            width={85}
            tick={{ fill: 'var(--admin-text-secondary)', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
          <Bar 
            dataKey="revenue" 
            fill="url(#revenueBarGrad)" 
            radius={[0, 8, 8, 0]} 
            background={{ fill: 'rgba(255, 255, 255, 0.02)', radius: [0, 8, 8, 0] }}
            barSize={18}
            name="Revenue" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
));

const ClientSourcesChart = memo(() => (
  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 className="admin-card-title" style={{ alignSelf: 'flex-start', marginBottom: 16 }}>Client Sources</h2>
    <div style={{ height: 200, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
            {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', marginTop: 12 }}>
      {pieData.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--admin-border)', padding: '8px 10px', borderRadius: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: PIE_COLORS[i], marginTop: 4, flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--admin-text-primary)' }}>{d.name} ({d.value}%)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{d.revenue} Revenue</div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

const RetentionChart = memo(() => (
  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 className="admin-card-title" style={{ alignSelf: 'flex-start', marginBottom: 16 }}>Customer Retention</h2>
    <div style={{ height: 200, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={retentionData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
            {retentionData.map((_, i) => <Cell key={i} fill={RETENTION_COLORS[i]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 16, width: '100%' }}>
      {retentionData.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: RETENTION_COLORS[i] }} />
          <span style={{ fontWeight: 600 }}>{d.name}: {d.value}%</span>
        </div>
      ))}
    </div>
  </div>
));

const BookingStatusChart = memo(() => (
  <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 className="admin-card-title" style={{ alignSelf: 'flex-start', marginBottom: 16 }}>Booking Status Analytics</h2>
    <div style={{ height: 200, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={bookingStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
            {bookingStatusData.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', marginTop: 12 }}>
      {bookingStatusData.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', padding: '6px 10px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--admin-border)', borderRadius: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[i] }} />
          <span style={{ fontWeight: 600, color: 'var(--admin-text-primary)' }}>{d.name}: {d.value}%</span>
        </div>
      ))}
    </div>
  </div>
));

const AnalyticsPage = memo(() => {
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  return (
    <div>
      {/* HEADER */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Analytics & Insights</h1>
          <p className="admin-page-subtitle">Performance overview for Lux Motors DXB fleet & bookings.</p>
        </div>
        <AdminSelect
          value={timeframe}
          onChange={setTimeframe}
          options={['Last 30 Days', 'Last 7 Days', 'This Year', 'All Time']}
          style={{ width: '180px' }}
        />
      </div>

      {/* ROW 1: KPI Row */}
      <div className="admin-grid-4 admin-section-gap">
        {kpis.map((kpi, i) => (
          <div key={i} className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${kpi.color}15`, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {kpi.icon}
              </div>
              <div className={`stat-trend ${kpi.positive ? 'positive' : 'negative'}`} style={{ fontSize: '0.8rem' }}>
                {kpi.positive ? <TrendingUp size={13} style={{ marginRight: 4 }} /> : <TrendingDown size={13} style={{ marginRight: 4 }} />}
                {kpi.trend} vs last period
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{kpi.value}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 8 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)' }}>{kpi.label}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>Target: {kpi.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: Revenue Trend (Large) & Fleet Utilization */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
        <RevenueTrendChart />
        <FleetUtilizationCard />
      </div>

      {/* ROW 3: Bookings & Deliveries & Fleet Category Breakdown */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main">
        <BookingsDeliveriesChart />
        <FleetCategoryChart />
      </div>

      {/* ROW 4: Top Performing Vehicles & Revenue by Vehicle */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Top Performing Vehicles Table */}
        <div className="admin-card" style={{ padding: 24 }}>
          <div className="admin-card-header" style={{ marginBottom: 16 }}>
            <h2 className="admin-card-title">Top Performing Vehicles</h2>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th style={{ textAlign: 'right' }}>Revenue</th>
                  <th style={{ textAlign: 'right' }}>Bookings</th>
                  <th style={{ textAlign: 'right' }}>Utilization</th>
                </tr>
              </thead>
              <tbody>
                {topVehicles.map((vehicle, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: vehicle.color }} />
                      {vehicle.vehicle}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{vehicle.revenue}</td>
                    <td style={{ textAlign: 'right', color: 'var(--admin-text-secondary)' }}>{vehicle.bookings}</td>
                    <td style={{ textAlign: 'right', color: vehicle.color, fontWeight: 700 }}>{vehicle.utilization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <RevenueByVehicleChart />
      </div>

      {/* ROW 5: Client Sources & Customer Retention */}
      <div className="admin-grid-2 admin-section-gap admin-responsive-grid-main">
        <ClientSourcesChart />
        <RetentionChart />
      </div>

      {/* ROW 6: Booking Status Analytics & Top Dubai Locations */}
      <div className="admin-grid-2 admin-responsive-grid-main" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <BookingStatusChart />

        {/* Top Dubai Locations */}
        <div className="admin-card">
          <h2 className="admin-card-title" style={{ marginBottom: 20 }}>Top Dubai Locations</h2>
          {topRegions.map((r, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{r.name}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>
                  {r.bookings} bookings • {r.revenue} ({r.pct}%)
                </span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default AnalyticsPage;
