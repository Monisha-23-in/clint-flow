import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mail, Phone, User, ArrowRight, TrendingUp, Building2, Star } from 'lucide-react';
import { useEnquiries } from '../hooks/useEnquiries';
import StatusBadge from '../components/common/StatusBadge';
import LoadingState from '../components/common/LoadingState';

const Clients = () => {
  const { enquiries, loading } = useEnquiries();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Derive unique clients from enquiries (group by clientName)
  const clients = useMemo(() => {
    const map = {};
    enquiries.forEach(enq => {
      const key = enq.clientName.toLowerCase().trim();
      if (!map[key]) {
        map[key] = {
          id: enq.id,
          clientName: enq.clientName,
          contactPerson: enq.contactPerson,
          email: enq.email,
          phone: enq.phone,
          source: enq.source,
          enquiries: [],
          totalBudget: 0,
          wonCount: 0,
        };
      }
      map[key].enquiries.push(enq);
      map[key].totalBudget += Number(enq.budget) || 0;
      if (enq.status === 'Won') map[key].wonCount++;
    });
    return Object.values(map).sort((a, b) => a.clientName.localeCompare(b.clientName));
  }, [enquiries]);

  const filtered = useMemo(() =>
    clients.filter(c =>
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    ), [clients, search]);

  if (loading) return <LoadingState />;

  const totalWon = clients.reduce((a, c) => a + c.wonCount, 0);
  const totalBudget = clients.reduce((a, c) => a + c.totalBudget, 0);

  return (
    <div>
      {/* Stats Row */}
      <div className="stat-grid" style={{ marginBottom: '28px' }}>
        <div className="card stat-card interactive">
          <div className="stat-icon-wrapper bg-primary-light">
            <Building2 size={22} color="var(--color-primary)" />
          </div>
          <div className="stat-title">Total Clients</div>
          <div className="stat-value">{clients.length}</div>
        </div>
        <div className="card stat-card interactive">
          <div className="stat-icon-wrapper bg-success-light">
            <Star size={22} color="var(--color-success)" />
          </div>
          <div className="stat-title">Won Deals</div>
          <div className="stat-value text-success">{totalWon}</div>
        </div>
        <div className="card stat-card interactive">
          <div className="stat-icon-wrapper bg-info-light">
            <TrendingUp size={22} color="var(--color-info)" />
          </div>
          <div className="stat-title">Total Pipeline Value</div>
          <div className="stat-value" style={{ fontSize: '1.6rem' }}>
            ₹{totalBudget.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-24" style={{ padding: '20px 24px' }}>
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search clients by name, contact, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Client Cards Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <User size={48} className="empty-icon" />
          <h2 className="empty-title">No clients found</h2>
          <p className="empty-text">Clients appear here automatically from your enquiries.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(client => (
            <div
              key={client.id}
              className="card interactive"
              style={{ padding: '24px', cursor: 'pointer', position: 'relative' }}
              onClick={() => navigate(`/enquiries/${client.enquiries[0].id}`)}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '1.1rem', flexShrink: 0 }}>
                  {client.clientName.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {client.clientName}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{client.contactPerson}</div>
                </div>
                {client.wonCount > 0 && (
                  <span style={{ background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)', border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)', borderRadius: '50px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                    ★ Won
                  </span>
                )}
              </div>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Mail size={13} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Phone size={13} />
                  <span>{client.phone}</span>
                </div>
              </div>

              {/* Footer Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Enquiries</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{client.enquiries.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Source</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{client.source}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Budget</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-success)', fontSize: '0.9rem' }}>
                    {client.totalBudget > 0 ? `₹${client.totalBudget.toLocaleString('en-IN')}` : '—'}
                  </div>
                </div>
                <ArrowRight size={16} color="var(--text-secondary)" />
              </div>

              {/* Latest status badges */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                {[...new Set(client.enquiries.map(e => e.status))].slice(0, 3).map(s => (
                  <StatusBadge key={s} status={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
