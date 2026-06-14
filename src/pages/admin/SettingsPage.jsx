import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, User, Lock, Bell, Globe, Shield, Camera } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const tabs = [
  { id: 'profile', icon: <User size={18} />, label: 'Profile' },
  { id: 'security', icon: <Lock size={18} />, label: 'Security' },
  { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
  { id: 'general', icon: <Globe size={18} />, label: 'General' },
];

const notificationSettings = [
  { label: 'New request received', desc: 'Get notified when a client submits a request', checked: true },
  { label: 'Daily schedule reminder', desc: 'Receive morning reminders for the day ahead', checked: true },
  { label: 'Delivery completed', desc: 'Be alerted when a job is marked done', checked: true },
  { label: 'Weekly analytics report', desc: 'Summary email every Monday', checked: false },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }}>
      <motion.div className="admin-page-header" variants={fadeUp} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">Manage your account and platform preferences.</p>
        </div>
        <button className="admin-btn"><Save size={16} /> Save All</button>
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }} className="admin-responsive-grid-settings" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
        {/* Tab Nav */}
        <div className="admin-card admin-settings-tabs" style={{ padding: 12, height: 'fit-content', position: 'sticky', top: 20 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className="admin-nav-item" style={{
              width: '100%', textAlign: 'left', border: '1px solid transparent', cursor: 'pointer',
              background: activeTab === t.id ? 'var(--admin-accent-light)' : 'transparent',
              color: activeTab === t.id ? 'var(--admin-accent-hover)' : 'var(--admin-text-secondary)',
              borderColor: activeTab === t.id ? 'rgba(201, 168, 76,0.2)' : 'transparent',
              fontFamily: 'var(--admin-font)',
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {activeTab === 'profile' && (
            <>
              <div className="admin-card">
                <h2 className="admin-card-title" style={{ marginBottom: 24 }}>Profile Information</h2>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 28 }}>
                  <div style={{ position: 'relative' }}>
                    <div className="admin-avatar" style={{ width: 80, height: 80, fontSize: '2rem', borderRadius: 16 }}>A</div>
                    <div style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: 8, background: 'var(--admin-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '3px solid var(--admin-bg)' }}>
                      <Camera size={12} color="white" />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Admin User</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Super Administrator</div>
                  </div>
                </div>
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">First Name</label>
                    <input type="text" className="admin-input" defaultValue="Admin" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Last Name</label>
                    <input type="text" className="admin-input" defaultValue="User" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Email</label>
                  <input type="email" className="admin-input" defaultValue="admin@luxmotorsdxb.com" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Phone</label>
                  <input type="tel" className="admin-input" defaultValue="+1 (555) 000-0000" />
                </div>
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <div className="admin-card">
              <h2 className="admin-card-title" style={{ marginBottom: 24 }}>Change Password</h2>
              <div className="admin-form-group">
                <label className="admin-label">Current Password</label>
                <input type="password" className="admin-input" placeholder="••••••••" />
              </div>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">New Password</label>
                  <input type="password" className="admin-input" placeholder="••••••••" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Confirm Password</label>
                  <input type="password" className="admin-input" placeholder="••••••••" />
                </div>
              </div>
              <button className="admin-btn secondary" style={{ marginTop: 8 }}>Update Password</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="admin-card">
              <h2 className="admin-card-title" style={{ marginBottom: 24 }}>Notification Preferences</h2>
              {notificationSettings.map((n, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < 3 ? '1px solid var(--admin-border)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{n.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: 2 }}>{n.desc}</div>
                  </div>
                  <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked={n.checked} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', inset: 0, borderRadius: 12, background: n.checked ? '#c9a84c' : 'rgba(255,255,255,0.1)', transition: '0.3s' }}>
                      <span style={{ position: 'absolute', top: 3, left: n.checked ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'general' && (
            <div className="admin-card">
              <h2 className="admin-card-title" style={{ marginBottom: 24 }}>General Settings</h2>
              <div className="admin-form-group">
                <label className="admin-label">Language</label>
                <select className="admin-input">
                  <option>English</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Timezone</label>
                <select className="admin-input">
                  <option>UTC -7:00 (Mountain Time - Colorado)</option>
                  <option>UTC +2:00 (Cairo)</option>
                  <option>UTC +0:00 (London)</option>
                  <option>UTC -5:00 (New York)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
