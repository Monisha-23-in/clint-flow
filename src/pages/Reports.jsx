import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Users, Star, XCircle, Activity,
  BarChart3, PieChart, Download, IndianRupee,
  Target, Zap, Award, AlertTriangle
} from 'lucide-react';
import { useEnquiries } from '../hooks/useEnquiries';
import LoadingState from '../components/common/LoadingState';
import StatusBadge from '../components/common/StatusBadge';
import { STATUSES, SOURCES, TEAM_MEMBERS } from '../utils/constants';

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
const BarChart = ({ data, colorVar = 'var(--color-primary)', max }) => {
  const maxVal = max || Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {data.map((item, i) => (
        <div key={i} className="chart-bar" style={{ marginBottom: 0 }}>
          <div className="chart-label" style={{ width: '120px', fontSize: '0.85rem' }}>{item.label}</div>
          <div className="chart-track">
            <div
              className="chart-fill animated-fill"
              style={{
                width: `${maxVal > 0 ? (item.value / maxVal) * 100 : 0}%`,
                background: `linear-gradient(90deg, ${colorVar}, ${item.color || colorVar})`,
              }}
            />
          </div>
          <div className="chart-value" style={{ color: colorVar, fontSize: '0.9rem' }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Donut Chart (CSS-based) ──────────────────────────────────────────────────
const DonutChart = ({ segments, size = 140 }) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let cumulative = 0;
  const r = 54;
  const cx = 70;
  const cy = 70;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
        {total === 0 ? (
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border-default)" strokeWidth="16" />
        ) : (
          segments.filter(s => s.value > 0).map((seg, i) => {
            const dashArray = (seg.value / total) * circ;
            const dashOffset = circ - cumulative * circ / total;
            cumulative += seg.value;
            return (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="20"
                strokeDasharray={`${dashArray} ${circ - dashArray}`}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dasharray 1s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            );
          })
        )}
        <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize="22" fontWeight="700" fill="var(--text-primary)">{total}</text>
        <text x="50%" y="62%" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TOTAL</text>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
            <span style={{ color: 'var(--text-secondary)' }}>{seg.label}</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', marginLeft: 'auto' }}>{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Reports Page ────────────────────────────────────────────────────────
const Reports = () => {
  const { enquiries, loading } = useEnquiries();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [todayStr] = useState(() => new Date().toISOString().split('T')[0]);
  const metrics = useMemo(() => {
    if (!enquiries.length) return null;

    const total = enquiries.length;
    const won   = enquiries.filter(e => e.status === 'Won').length;
    const lost  = enquiries.filter(e => e.status === 'Lost').length;
    const active = total - won - lost;
    const winRate = total > 0 ? Math.round((won / total) * 100) : 0;
    const conversionRate = (won + lost) > 0 ? Math.round((won / (won + lost)) * 100) : 0;

    const totalBudget = enquiries.reduce((a, e) => a + (Number(e.budget) || 0), 0);
    const wonBudget   = enquiries.filter(e => e.status === 'Won').reduce((a, e) => a + (Number(e.budget) || 0), 0);
    const avgDeal     = won > 0 ? Math.round(wonBudget / won) : 0;

    const followUpsDue = enquiries.filter(e => e.followUpDate && e.followUpDate <= todayStr && e.status !== 'Won' && e.status !== 'Lost').length;

    // By Status
    const statusData = STATUSES.map(s => ({
      label: s, value: enquiries.filter(e => e.status === s).length,
    }));

    // By Source
    const sourceData = SOURCES.map(s => ({
      label: s, value: enquiries.filter(e => e.source === s).length,
    })).sort((a, b) => b.value - a.value);

    // By Team Member
    const teamData = TEAM_MEMBERS.map(t => {
      const myEnqs = enquiries.filter(e => e.assignedTo === t);
      const myWon  = myEnqs.filter(e => e.status === 'Won').length;
      const myBudget = myEnqs.reduce((a, e) => a + (Number(e.budget) || 0), 0);
      return {
        name: t,
        total: myEnqs.length,
        won: myWon,
        lost: myEnqs.filter(e => e.status === 'Lost').length,
        active: myEnqs.filter(e => e.status !== 'Won' && e.status !== 'Lost').length,
        winRate: myEnqs.length > 0 ? Math.round((myWon / myEnqs.length) * 100) : 0,
        budget: myBudget,
      };
    }).sort((a, b) => b.won - a.won);

    // Status donut segments
    const STATUS_COLORS_MAP = {
      'New':          'var(--color-primary)',
      'Contacted':    'var(--color-warning)',
      'Qualified':    '#818cf8',
      'Proposal Sent':'var(--color-accent)',
      'Negotiation':  'var(--color-info)',
      'Won':          'var(--color-success)',
      'Lost':         'var(--color-danger)',
    };
    const donutSegments = STATUSES.map(s => ({
      label: s,
      value: enquiries.filter(e => e.status === s).length,
      color: STATUS_COLORS_MAP[s],
    })).filter(s => s.value > 0);

    const SOURCE_COLORS = [
      'var(--color-primary)', 'var(--color-accent)', 'var(--color-info)',
      'var(--color-warning)', 'var(--color-success)', 'var(--color-danger)'
    ];
    const sourceDonut = sourceData.map((s, i) => ({
      ...s, color: SOURCE_COLORS[i % SOURCE_COLORS.length]
    }));

    // Top enquiries by budget
    const topDeals = [...enquiries]
      .filter(e => Number(e.budget) > 0)
      .sort((a, b) => Number(b.budget) - Number(a.budget))
      .slice(0, 5);

    return {
      total, won, lost, active, winRate, conversionRate,
      totalBudget, wonBudget, avgDeal, followUpsDue,
      statusData, sourceData, teamData, donutSegments, sourceDonut, topDeals,
    };
  }, [enquiries, todayStr]);

  const exportCSV = () => {
    const headers = ['Client', 'Contact', 'Email', 'Service', 'Source', 'Status', 'Assigned', 'Budget', 'Follow-up Date'];
    const rows = enquiries.map(e => [
      `"${e.clientName}"`, `"${e.contactPerson}"`, `"${e.email}"`,
      `"${e.service}"`, `"${e.source}"`, `"${e.status}"`,
      `"${e.assignedTo}"`, `"${e.budget || 0}"`, `"${e.followUpDate || ''}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `clientflow_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) return <LoadingState />;
  if (!metrics) return <div className="empty-state"><h2 className="empty-title">No data yet</h2></div>;

  const tabs = ['overview', 'pipeline', 'team', 'sources'];

  return (
    <div>
      {/* ── Header Actions ── */}
      <div className="flex-between mb-24">
        <div style={{ display: 'flex', gap: '8px' }}>
          {tabs.map(t => (
            <button
              key={t}
              className={`btn ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 18px', fontSize: '0.85rem', textTransform: 'capitalize' }}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-secondary" style={{ padding: '10px 16px' }} onClick={exportCSV}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* ══ OVERVIEW TAB ══════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* KPI Cards */}
          <div className="stat-grid">
            <div className="card stat-card interactive">
              <div className="stat-icon-wrapper bg-primary-light"><Users size={22} color="var(--color-primary)" /></div>
              <div className="stat-title">Total Enquiries</div>
              <div className="stat-value">{metrics.total}</div>
              <div className="trend-indicator trend-up"><TrendingUp size={12} /> All time</div>
            </div>
            <div className="card stat-card interactive">
              <div className="stat-icon-wrapper bg-success-light"><Star size={22} color="var(--color-success)" /></div>
              <div className="stat-title">Won Deals</div>
              <div className="stat-value text-success">{metrics.won}</div>
              <div className="trend-indicator trend-up"><TrendingUp size={12} /> {metrics.winRate}% win rate</div>
            </div>
            <div className="card stat-card interactive">
              <div className="stat-icon-wrapper" style={{ background: 'color-mix(in srgb, var(--color-danger) 15%, transparent)' }}>
                <XCircle size={22} color="var(--color-danger)" />
              </div>
              <div className="stat-title">Lost Deals</div>
              <div className="stat-value" style={{ color: 'var(--color-danger)' }}>{metrics.lost}</div>
              <div className="trend-indicator trend-down"><TrendingDown size={12} /> Needs review</div>
            </div>
            <div className="card stat-card interactive">
              <div className="stat-icon-wrapper bg-warning-light"><Activity size={22} color="var(--color-warning)" /></div>
              <div className="stat-title">Active Pipeline</div>
              <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{metrics.active}</div>
              <div className="trend-indicator trend-up"><TrendingUp size={12} /> In progress</div>
            </div>
          </div>

          {/* Revenue + Conversion Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { icon: IndianRupee, label: 'Total Pipeline Value', value: `₹${metrics.totalBudget.toLocaleString('en-IN')}`, color: 'var(--color-primary)', bg: 'bg-primary-light' },
              { icon: Award, label: 'Won Revenue', value: `₹${metrics.wonBudget.toLocaleString('en-IN')}`, color: 'var(--color-success)', bg: 'bg-success-light' },
              { icon: Target, label: 'Conversion Rate', value: `${metrics.conversionRate}%`, color: 'var(--color-info)', bg: 'bg-info-light' },
              { icon: Zap, label: 'Avg Deal Size', value: `₹${metrics.avgDeal.toLocaleString('en-IN')}`, color: 'var(--color-warning)', bg: 'bg-warning-light' },
              { icon: AlertTriangle, label: 'Follow-ups Overdue', value: metrics.followUpsDue, color: 'var(--color-danger)', bg: null, danger: true },
            ].map((kpi, i) => (
              <div key={i} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className={`stat-icon-wrapper ${kpi.bg || ''}`} style={{ position: 'static', flexShrink: 0, background: kpi.bg ? undefined : 'color-mix(in srgb, var(--color-danger) 12%, transparent)' }}>
                  <kpi.icon size={20} color={kpi.color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{kpi.label}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Status Donut + Top Deals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <PieChart size={18} color="var(--color-primary)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Pipeline by Status</h3>
              </div>
              <DonutChart segments={metrics.donutSegments} />
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Award size={18} color="var(--color-warning)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Top Deals by Budget</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {metrics.topDeals.map((enq, i) => (
                  <div key={enq.id}
                    onClick={() => navigate(`/enquiries/${enq.id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: 'var(--surface-hover)', cursor: 'pointer', border: '1px solid var(--border-subtle)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-active)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{enq.clientName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{enq.service}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-success)', fontSize: '0.9rem' }}>₹{Number(enq.budget).toLocaleString('en-IN')}</div>
                      <StatusBadge status={enq.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PIPELINE TAB ══════════════════════════════════════════════════════ */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <BarChart3 size={18} color="var(--color-primary)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Enquiries by Status</h3>
              </div>
              <BarChart
                data={metrics.statusData.map(s => ({ label: s.label, value: s.value }))}
                colorVar="var(--color-primary)"
              />
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <PieChart size={18} color="var(--color-accent)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Pipeline by Status (Donut)</h3>
              </div>
              <DonutChart segments={metrics.donutSegments} />
            </div>
          </div>

          {/* Status Detail Table */}
          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Status Breakdown</h3>
            <div className="table-container" style={{ boxShadow: 'none', border: 'none', background: 'transparent' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Count</th>
                    <th>% of Total</th>
                    <th>Budget (Pipeline)</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.statusData.map(row => {
                    const budget = enquiries.filter(e => e.status === row.label).reduce((a, e) => a + (Number(e.budget) || 0), 0);
                    const pct = metrics.total > 0 ? Math.round((row.value / metrics.total) * 100) : 0;
                    return (
                      <tr key={row.label}>
                        <td><StatusBadge status={row.label} /></td>
                        <td style={{ fontWeight: 700 }}>{row.value}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{pct}%</td>
                        <td style={{ color: 'var(--color-success)', fontWeight: 600 }}>₹{budget.toLocaleString('en-IN')}</td>
                        <td style={{ minWidth: '140px' }}>
                          <div style={{ height: '6px', background: 'var(--surface-hover)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', borderRadius: '3px', transition: 'width 1s ease' }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══ TEAM TAB ══════════════════════════════════════════════════════════ */}
      {activeTab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Team KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {metrics.teamData.map(member => (
              <div key={member.name} className="card interactive" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="avatar" style={{ width: '44px', height: '44px', fontSize: '1rem', flexShrink: 0 }}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{member.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{member.total} enquiries</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-success)', fontSize: '1.3rem' }}>{member.won}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Won</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-warning)', fontSize: '1.3rem' }}>{member.active}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Active</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-danger)', fontSize: '1.3rem' }}>{member.lost}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Lost</div>
                  </div>
                </div>
                {/* Win rate bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Win Rate</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)' }}>{member.winRate}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--surface-hover)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${member.winRate}%`, background: 'linear-gradient(90deg, var(--color-success), var(--color-info))', borderRadius: '3px', transition: 'width 1s ease' }} />
                  </div>
                </div>
                <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  ₹{member.budget.toLocaleString('en-IN')} pipeline
                </div>
              </div>
            ))}
          </div>

          {/* Team Comparison Table */}
          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Team Performance Table</h3>
            <div className="table-container" style={{ boxShadow: 'none', border: 'none', background: 'transparent' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Representative</th>
                    <th>Total</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>Active</th>
                    <th>Win Rate</th>
                    <th>Pipeline</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.teamData.map(m => (
                    <tr key={m.name}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="avatar-sm">{m.name.charAt(0)}</div>
                          <span style={{ fontWeight: 600 }}>{m.name}</span>
                        </div>
                      </td>
                      <td>{m.total}</td>
                      <td style={{ color: 'var(--color-success)', fontWeight: 700 }}>{m.won}</td>
                      <td style={{ color: 'var(--color-danger)', fontWeight: 700 }}>{m.lost}</td>
                      <td style={{ color: 'var(--color-warning)', fontWeight: 700 }}>{m.active}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: m.winRate >= 50 ? 'var(--color-success)' : m.winRate >= 25 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                          {m.winRate}%
                        </span>
                      </td>
                      <td style={{ color: 'var(--color-success)', fontWeight: 600 }}>₹{m.budget.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══ SOURCES TAB ══════════════════════════════════════════════════════ */}
      {activeTab === 'sources' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <BarChart3 size={18} color="var(--color-accent)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Leads by Source</h3>
              </div>
              <BarChart
                data={metrics.sourceData.map((s, i) => ({
                  label: s.label,
                  value: s.value,
                  color: metrics.sourceDonut[i]?.color || 'var(--color-primary)',
                }))}
                colorVar="var(--color-accent)"
              />
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <PieChart size={18} color="var(--color-info)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Source Distribution</h3>
              </div>
              <DonutChart segments={metrics.sourceDonut} />
            </div>
          </div>

          {/* Source Detail Table */}
          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Source Performance</h3>
            <div className="table-container" style={{ boxShadow: 'none', border: 'none', background: 'transparent' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Enquiries</th>
                    <th>Won</th>
                    <th>Win Rate</th>
                    <th>Budget</th>
                    <th>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.sourceData.map((s, i) => {
                    const srcEnqs = enquiries.filter(e => e.source === s.label);
                    const srcWon  = srcEnqs.filter(e => e.status === 'Won').length;
                    const srcWinRate = s.value > 0 ? Math.round((srcWon / s.value) * 100) : 0;
                    const srcBudget = srcEnqs.reduce((a, e) => a + (Number(e.budget) || 0), 0);
                    const share = metrics.total > 0 ? Math.round((s.value / metrics.total) * 100) : 0;
                    return (
                      <tr key={s.label}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: metrics.sourceDonut[i]?.color || 'var(--color-primary)', flexShrink: 0 }} />
                            <span style={{ fontWeight: 600 }}>{s.label}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{s.value}</td>
                        <td style={{ color: 'var(--color-success)', fontWeight: 700 }}>{srcWon}</td>
                        <td>
                          <span style={{ fontWeight: 700, color: srcWinRate >= 50 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                            {srcWinRate}%
                          </span>
                        </td>
                        <td style={{ color: 'var(--color-success)', fontWeight: 600 }}>₹{srcBudget.toLocaleString('en-IN')}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '6px', background: 'var(--surface-hover)', borderRadius: '3px', overflow: 'hidden', minWidth: '80px' }}>
                              <div style={{ height: '100%', width: `${share}%`, background: metrics.sourceDonut[i]?.color || 'var(--color-primary)', borderRadius: '3px' }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: '32px' }}>{share}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
