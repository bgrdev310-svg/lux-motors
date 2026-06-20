import React, { useState, useMemo, memo } from 'react';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Search } from 'lucide-react';

const initialFaqs = [
  { id: 1, question: 'What documents do I need to rent a luxury car in Dubai?', answer: 'UAE residents need Emirates ID, UAE driving license, and passport. Tourists need passport, visa, home country license, and International Driving Permit (IDP).', visible: true, category: 'Requirements' },
  { id: 2, question: 'Is a security deposit required?', answer: 'Yes. A refundable security deposit is held via credit card pre-authorization and released within 21–30 business days after return.', visible: true, category: 'Pricing' },
  { id: 3, question: 'Do you offer doorstep delivery?', answer: 'Yes. We deliver to hotels, airports, residences, and events anywhere in Dubai and the UAE.', visible: true, category: 'Service' },
  { id: 4, question: 'What is the daily mileage allowance?', answer: 'Standard rentals include 250 km per day. Additional kilometers are charged at 15 AED per km.', visible: false, category: 'Policies' },
  { id: 5, question: 'Can I rent with a chauffeur?', answer: 'Yes. Executive RTA-licensed chauffeurs are available on request for select vehicles.', visible: true, category: 'Service' },
];

const FAQManager = memo(() => {
  const [faqs, setFaqs] = useState(initialFaqs);

  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useMemo(() => 
    faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase())),
    [faqs, searchTerm]
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">FAQ Manager</h1>
          <p className="admin-page-subtitle">Manage frequently asked questions displayed on your site.</p>
        </div>
        <button className="admin-btn"><Plus size={16} /> Add FAQ</button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }} className="admin-faq-stats">
        {[
          { label: 'Total FAQs', value: faqs.length, color: '#c9a84c' },
          { label: 'Visible', value: faqs.filter(f => f.visible).length, color: '#22c55e' },
          { label: 'Hidden', value: faqs.filter(f => !f.visible).length, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '14px 24px', borderRadius: 12, background: `${s.color}10`,
            border: `1px solid ${s.color}20`, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)', fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div className="admin-search" style={{ width: '100%', maxWidth: 400 }}>
          <Search size={18} color="var(--admin-text-muted)" />
          <input type="text" placeholder="Search FAQs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* FAQ List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((faq) => (
          <div key={faq.id} className="admin-card admin-faq-item" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <GripVertical size={18} color="var(--admin-text-muted)" style={{ cursor: 'grab', flexShrink: 0 }} />
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{faq.question}</span>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: 6,
                  background: 'rgba(201, 168, 76,0.1)', color: '#e8d5a3',
                }}>{faq.category}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {faq.answer}
              </div>
            </div>

            <div className="admin-faq-actions" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button className="admin-icon-btn" style={{ width: 34, height: 34, color: faq.visible ? '#22c55e' : '#f59e0b', borderColor: faq.visible ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)' }} title={faq.visible ? 'Visible' : 'Hidden'}>
                {faq.visible ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button className="admin-icon-btn" style={{ width: 34, height: 34 }} title="Edit">
                <Edit2 size={15} />
              </button>
              <button className="admin-icon-btn" style={{ width: 34, height: 34, color: '#f43f5e', borderColor: 'rgba(244,63,94,0.2)' }} title="Delete">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FAQManager;
