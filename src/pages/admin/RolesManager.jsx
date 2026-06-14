import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Shield, Users, Crown, Eye, UserCheck, Search,
  Edit3, Trash2, X, Check, AlertTriangle, LayoutDashboard,
  BarChart3, ClipboardList, Calendar, HelpCircle,
  Contact, Settings, Car, Home
} from 'lucide-react';
import './RolesManager.css';

// ── Role Configuration (themed for Lux Motors) ──
const ROLE_CONFIG = {
  admin:   { label: 'Admin',   icon: <Crown size={20} />,     color: '#c9a84c', gradient: 'linear-gradient(135deg, #c9a84c, #e8d5a3)', desc: 'Full access to everything' },
  manager: { label: 'Manager', icon: <UserCheck size={20} />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', desc: 'Edit most, no roles/settings' },
  viewer:  { label: 'Viewer',  icon: <Eye size={20} />,       color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', desc: 'View only, no editing' },
  client:  { label: 'Client',  icon: <Users size={20} />,     color: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e, #10b981)', desc: 'No admin panel access' },
};

// ── Admin Pages Configuration (matching Lux Motors sidebar) ──
const PAGE_CONFIG = [
  { key: 'dashboard',  label: 'Dashboard',    icon: <LayoutDashboard size={18} /> },
  { key: 'analytics',  label: 'Analytics',    icon: <BarChart3 size={18} /> },
  { key: 'fleet',      label: 'Fleet',        icon: <Car size={18} /> },
  { key: 'requests',   label: 'Bookings',     icon: <ClipboardList size={18} /> },
  { key: 'calendar',   label: 'Schedule',     icon: <Calendar size={18} /> },
  { key: 'homepage',   label: 'Homepage',     icon: <Home size={18} /> },
  { key: 'faq',        label: 'FAQ Manager',  icon: <HelpCircle size={18} /> },
  { key: 'contact',    label: 'Contact Info', icon: <Contact size={18} /> },
  { key: 'settings',   label: 'Settings',     icon: <Settings size={18} /> },
  { key: 'roles',      label: 'Roles & Access', icon: <Shield size={18} /> },
];

// ── Default permissions per role ──
const getDefaultPerms = (role) => {
  const perms = {};
  PAGE_CONFIG.forEach(p => {
    if (role === 'admin') {
      perms[p.key] = { access: true, edit: true };
    } else if (role === 'manager') {
      perms[p.key] = { access: true, edit: p.key !== 'roles' && p.key !== 'settings' };
    } else if (role === 'viewer') {
      perms[p.key] = { access: true, edit: false };
    } else {
      perms[p.key] = { access: false, edit: false };
    }
  });
  return perms;
};

// ── Mock Users (frontend-only demo data) ──
const MOCK_USERS = [
  { _id: '1', fullName: 'Ahmed Benali',    username: 'ahmed.b',   email: 'ahmed@luxmotors.com',    role: 'admin',   status: 'active',   createdAt: '2025-01-15T10:00:00Z', lastLogin: '2026-06-09T08:30:00Z', effectivePermissions: getDefaultPerms('admin') },
  { _id: '2', fullName: 'Sara Mansouri',   username: 'sara.m',    email: 'sara@luxmotors.com',     role: 'manager', status: 'active',   createdAt: '2025-03-20T14:00:00Z', lastLogin: '2026-06-08T16:45:00Z', effectivePermissions: getDefaultPerms('manager') },
  { _id: '3', fullName: 'Youssef Kaddour', username: 'youssef.k', email: 'youssef@luxmotors.com',  role: 'viewer',  status: 'active',   createdAt: '2025-06-10T09:00:00Z', lastLogin: '2026-06-07T11:20:00Z', effectivePermissions: getDefaultPerms('viewer') },
  { _id: '4', fullName: 'Lina Haddad',     username: 'lina.h',    email: 'lina@luxmotors.com',     role: 'manager', status: 'active',   createdAt: '2025-04-05T08:30:00Z', lastLogin: '2026-06-09T07:10:00Z', effectivePermissions: getDefaultPerms('manager') },
  { _id: '5', fullName: 'Omar Boudjemaa',  username: 'omar.b',    email: 'omar@client.com',        role: 'client',  status: 'active',   createdAt: '2025-08-12T15:30:00Z', lastLogin: '2026-06-05T19:00:00Z', effectivePermissions: getDefaultPerms('client') },
  { _id: '6', fullName: 'Amira Cherif',    username: 'amira.c',   email: 'amira@client.com',       role: 'client',  status: 'inactive', createdAt: '2025-09-22T12:00:00Z', lastLogin: '2026-04-15T10:00:00Z', effectivePermissions: getDefaultPerms('client') },
  { _id: '7', fullName: 'Karim Zidane',    username: 'karim.z',   email: 'karim@luxmotors.com',    role: 'viewer',  status: 'active',   createdAt: '2025-11-01T07:00:00Z', lastLogin: '2026-06-06T14:30:00Z', effectivePermissions: getDefaultPerms('viewer') },
  { _id: '8', fullName: 'Nadia Ferhat',    username: 'nadia.f',   email: 'nadia@client.com',       role: 'client',  status: 'suspended',createdAt: '2025-07-18T11:00:00Z', lastLogin: '2026-03-01T09:00:00Z', effectivePermissions: getDefaultPerms('client') },
];

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const Toggle = ({ checked, onChange, disabled }) => (
  <label className={`toggle-switch ${disabled ? 'disabled' : ''}`}>
    <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
    <span className="toggle-slider" />
  </label>
);

const RolesManager = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editRole, setEditRole] = useState('');
  const [editPerms, setEditPerms] = useState({});

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Compute stats from current users ──
  const stats = {
    total: users.length,
    byRole: users.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {}),
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditPerms(user.effectivePermissions || getDefaultPerms(user.role));
  };

  const handleSave = () => {
    if (!editingUser) return;
    setSaving(true);

    // Simulate save with timeout (frontend-only)
    setTimeout(() => {
      setUsers(prev => prev.map(u =>
        u._id === editingUser._id
          ? { ...u, role: editRole, effectivePermissions: editPerms }
          : u
      ));
      showToast(`${editingUser.fullName}'s role updated successfully`);
      setEditingUser(null);
      setSaving(false);
    }, 500);
  };

  const handleStatusChange = (userId, status) => {
    setUsers(prev => prev.map(u =>
      u._id === userId ? { ...u, status } : u
    ));
    showToast('Status updated');
  };

  const handleDelete = (userId) => {
    setUsers(prev => prev.filter(u => u._id !== userId));
    showToast('User deleted');
    setDeleteConfirm(null);
  };

  const togglePerm = (page, field) => {
    setEditPerms(prev => ({
      ...prev,
      [page]: { ...prev[page], [field]: !prev[page]?.[field] }
    }));
  };

  // ── Filtering ──
  const filtered = users.filter(u => {
    if (activeTab !== 'all' && u.role !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return u.fullName?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q);
    }
    return true;
  });

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

  const timeAgo = (date) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }}>
      {/* Header */}
      <motion.div className="admin-page-header" variants={fadeUp} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="admin-page-title">Roles & Access Control</h1>
          <p className="admin-page-subtitle">Manage user roles, permissions, and access levels across admin pages.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)' }}>{users.length} users total</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="roles-stats-grid" variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }}>
        {Object.entries(ROLE_CONFIG).map(([role, cfg]) => {
          const count = stats?.byRole?.[role] || 0;
          const pct = stats?.total ? Math.round((count / stats.total) * 100) : 0;
          return (
            <div key={role} className={`role-stat-card ${role}-role`} onClick={() => setActiveTab(role)} style={{ cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: -15, right: -15, width: 70, height: 70, background: cfg.gradient, opacity: 0.1, borderRadius: '50%', filter: 'blur(18px)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div className="role-stat-icon" style={{ background: `${cfg.color}18`, color: cfg.color }}>{cfg.icon}</div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: cfg.color, background: `${cfg.color}15`, padding: '3px 10px', borderRadius: 20 }}>{pct}%</span>
              </div>
              <div className="role-stat-value">{count}</div>
              <div className="role-stat-label">{cfg.label}s</div>
              <div className="role-stat-bar">
                <div className="role-stat-bar-fill" style={{ width: `${Math.max(pct, 3)}%`, background: cfg.gradient }} />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <motion.div className="roles-tabs" variants={fadeUp} transition={{ duration: 0.4, delay: 0.15 }}>
        {[{ key: 'all', label: 'All Users', count: users.length }, ...Object.entries(ROLE_CONFIG).map(([k, v]) => ({ key: k, label: v.label, count: stats?.byRole?.[k] || 0 }))].map(tab => (
          <button key={tab.key} className={`roles-tab ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
            <span className="roles-tab-badge">{tab.count}</span>
          </button>
        ))}
      </motion.div>

      {/* Toolbar */}
      <motion.div className="roles-toolbar" variants={fadeUp} transition={{ duration: 0.4, delay: 0.2 }}>
        <div className="roles-search">
          <Search size={16} style={{ color: 'var(--admin-text-muted)', flexShrink: 0 }} />
          <input placeholder="Search by name, email, or username..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </motion.div>

      {/* Users Grid */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4, delay: 0.25 }}>
        {filtered.length === 0 ? (
          <div className="roles-empty">
            <Users size={48} />
            <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>No users found</p>
            <p style={{ fontSize: '0.85rem' }}>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="users-grid">
            {filtered.map(user => {
              const cfg = ROLE_CONFIG[user.role] || ROLE_CONFIG.client;
              const st = user.status || 'active';
              const accessCount = user.effectivePermissions ? Object.values(user.effectivePermissions).filter(p => p.access).length : 0;
              const isSelf = user._id === '1'; // First user is "you" for demo
              return (
                <div key={user._id} className="user-card" style={isSelf ? { borderColor: 'rgba(201, 168, 76, 0.25)' } : {}}>
                  <div className="user-card-header">
                    <div className="user-card-avatar" style={{ background: cfg.gradient }}>{getInitials(user.fullName)}</div>
                    <div className="user-card-info">
                      <div className="user-card-name" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {user.fullName}
                        {isSelf && <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c9a84c', background: 'rgba(201, 168, 76, 0.15)', padding: '2px 8px', borderRadius: 10 }}>YOU</span>}
                      </div>
                      <div className="user-card-email">@{user.username} · {user.email}</div>
                    </div>
                    <div className="user-card-actions">
                      <button className="user-action-btn" title="Edit role & permissions" onClick={() => openEditModal(user)}><Edit3 size={15} /></button>
                      {!isSelf && <button className="user-action-btn danger" title="Delete user" onClick={() => setDeleteConfirm(user)}><Trash2 size={15} /></button>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span className={`role-badge ${user.role}`}>{cfg.icon} {cfg.label}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center' }}>
                      <span className={`status-dot ${st}`} />{st.charAt(0).toUpperCase() + st.slice(1)}
                    </span>
                    {user.role !== 'client' && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', marginLeft: 'auto' }}>
                        {accessCount}/{PAGE_CONFIG.length} pages
                      </span>
                    )}
                  </div>
                  <div className="user-card-meta">
                    <span>Joined {timeAgo(user.createdAt)}</span>
                    <span>Last login: {timeAgo(user.lastLogin)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Edit Permissions Modal */}
      {editingUser && (
        <div className="roles-modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="roles-modal" onClick={e => e.stopPropagation()}>
            <div className="roles-modal-header">
              <div className="roles-modal-title">
                <Shield size={20} style={{ color: 'var(--admin-accent)' }} />
                Edit Access — {editingUser.fullName}
              </div>
              <button className="roles-modal-close" onClick={() => setEditingUser(null)}><X size={16} /></button>
            </div>
            <div className="roles-modal-body">
              {/* Role Selection */}
              <div className="perm-section-title">Assign Role</div>
              <div className="role-select-grid">
                {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
                  <div key={role} className={`role-select-card ${role} ${editRole === role ? 'selected' : ''}`} onClick={() => {
                    setEditRole(role);
                    setEditPerms(getDefaultPerms(role));
                  }}>
                    <div className="role-select-icon" style={{ background: `${cfg.color}18`, color: cfg.color }}>{cfg.icon}</div>
                    <div className="role-select-name">{cfg.label}</div>
                    <div className="role-select-desc">{cfg.desc}</div>
                  </div>
                ))}
              </div>

              {/* Granular Permissions — only for manager/viewer */}
              {(editRole === 'manager' || editRole === 'viewer') && (
                <>
                  <div className="perm-section-title">Page-Level Permissions</div>
                  <div className="perm-grid">
                    {PAGE_CONFIG.map(page => (
                      <div key={page.key} className="perm-row">
                        <div className="perm-row-label">{page.icon} {page.label}</div>
                        <div className="perm-toggles">
                          <div className="perm-toggle-group">
                            <span>Access</span>
                            <Toggle checked={!!editPerms[page.key]?.access} onChange={() => togglePerm(page.key, 'access')} />
                          </div>
                          <div className="perm-toggle-group">
                            <span>Edit</span>
                            <Toggle checked={!!editPerms[page.key]?.edit} onChange={() => togglePerm(page.key, 'edit')} disabled={!editPerms[page.key]?.access} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {editRole === 'admin' && (
                <div style={{ padding: '24px', background: 'rgba(201, 168, 76, 0.06)', borderRadius: 'var(--admin-radius-sm)', border: '1px solid rgba(201, 168, 76, 0.15)', textAlign: 'center' }}>
                  <Crown size={28} style={{ color: '#c9a84c', marginBottom: 8 }} />
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>Full Administrator Access</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)' }}>Admins have unrestricted access to all pages and features. Permissions cannot be customized.</p>
                </div>
              )}

              {editRole === 'client' && (
                <div style={{ padding: '24px', background: 'rgba(34,197,94,0.06)', borderRadius: 'var(--admin-radius-sm)', border: '1px solid rgba(34,197,94,0.15)', textAlign: 'center' }}>
                  <Users size={28} style={{ color: '#22c55e', marginBottom: 8 }} />
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>Client Account</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)' }}>Clients cannot access the admin panel. They can only use the public-facing website and track their bookings.</p>
                </div>
              )}

              {/* Status */}
              <div className="perm-section-title" style={{ marginTop: 20 }}>Account Status</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['active', 'inactive', 'suspended'].map(s => (
                  <button key={s} className={`roles-filter-btn ${(editingUser.status || 'active') === s ? 'active' : ''}`}
                    onClick={() => handleStatusChange(editingUser._id, s)}
                    style={{ flex: 1, justifyContent: 'center', textTransform: 'capitalize' }}>
                    <span className={`status-dot ${s}`} style={{ marginRight: 0 }} />{s}
                  </button>
                ))}
              </div>
            </div>
            <div className="roles-modal-footer">
              <button className="admin-btn secondary" onClick={() => setEditingUser(null)}>Cancel</button>
              <button className="admin-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : <><Check size={16} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="roles-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="roles-modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="roles-modal-header">
              <div className="roles-modal-title" style={{ color: 'var(--admin-danger)' }}>
                <AlertTriangle size={20} /> Delete User
              </div>
              <button className="roles-modal-close" onClick={() => setDeleteConfirm(null)}><X size={16} /></button>
            </div>
            <div className="roles-modal-body" style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: 8, fontWeight: 600 }}>Are you sure you want to delete <strong>{deleteConfirm.fullName}</strong>?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)' }}>This action cannot be undone. All data associated with this user will be permanently removed.</p>
            </div>
            <div className="roles-modal-footer" style={{ justifyContent: 'center' }}>
              <button className="admin-btn secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="admin-btn danger" onClick={() => handleDelete(deleteConfirm._id)}>
                <Trash2 size={16} /> Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`roles-toast ${toast.type}`}>
          {toast.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
          {toast.msg}
        </div>
      )}
    </motion.div>
  );
};

export default RolesManager;
