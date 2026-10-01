import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Plus, Bell,
  Activity, Users, Star, Calendar, Zap, ArrowRight,
  Target, BarChart3, Clock, CheckCircle2, Sparkles
} from 'lucide-react';
import { useEnquiries } from '../hooks/useEnquiries';
import StatusBadge from '../components/common/StatusBadge';
import LoadingState from '../components/common/LoadingState';
import { STATUSES, SOURCES } from '../utils/constants';

/* ── Animated Number Counter ─────────────────────────────────────────── */
const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    if (end === 0) return;
    const duration = 900;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setDisplay(Math.floor(start));
      if (start >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{prefix}{display.toLocaleString('en-IN')}{suffix}</>;
};

/* ── Mini Sparkline ──────────────────────────────────────────────────── */
const Sparkline = ({ data, color }) => {
  const max = Math.max(...data, 1);
  const w = 80, h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      <circle cx={(1) * w} cy={h - (data[data.length - 1] / max) * h} r="3" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
};

const Dashboard = () => {
  const { enquiries, loading } = useEnquiries();
  const navigate = useNavigate();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const greeting = useMemo(() => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, [time]);

  const [todayStr] = useState(() => new Date().toISOString().split('T')[0]);
  const metrics = useMemo(() => {
    if (!enquiries) return {};
    const total    = enquiries.length;
    const newEnqs  = enquiries.filter(e => e.status === 'New').length;
    const won      = enquiries.filter(e => e.status === 'Won').length;
    const lost     = enquiries.filter(e => e.status === 'Lost').length;
    const active   = total - won - lost;
    const winRate  = total > 0 ? Math.round((won / total) * 100) : 0;
    const totalBudget = enquiries.reduce((a, e) => a + (Number(e.budget) || 0), 0);

    const followUps = enquiries.filter(e =>
      e.followUpDate && e.followUpDate <= todayStr && e.status !== 'Won' && e.status !== 'Lost'
    ).length;

    const statusCounts = {};
    STATUSES.forEach(s => statusCounts[s] = 0);
    enquiries.forEach(e => { if (statusCounts[e.status] !== undefined) statusCounts[e.status]++; });

    const sourceCounts = {};
    SOURCES.forEach(s => sourceCounts[s] = 0);
    enquiries.forEach(e => { if (sourceCounts[e.source] !== undefined) sourceCounts[e.source]++; });

    const upcomingFollowUpsList = enquiries
      .filter(e => e.followUpDate && e.status !== 'Won' && e.status !== 'Lost')
      .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate))
      .slice(0, 5);

    return { total, new: newEnqs, active, won, lost, followUps, winRate, totalBudget, statusCounts, sourceCounts, upcomingFollowUpsList };
  }, [enquiries, todayStr]);

  if (loading) return <LoadingState />;

  const recentEnquiries = [...enquiries]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const statusMax = Math.max(...Object.values(metrics.statusCounts || {}), 1);
  const sourceMax = Math.max(...Object.values(metrics.sourceCounts || {}), 1);

  const STATUS_ACCENT = {
    'New': 'var(--color-primary)', 'Contacted': 'var(--color-warning)',
    'Qualified': '#818cf8', 'Proposal Sent': 'var(--color-accent)',
    'Negotiation': 'var(--color-info)', 'Won': 'var(--color-success)', 'Lost': 'var(--color-danger)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ══ TOP HERO BANNER ════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--surface-card) 0%, var(--surface-sidebar) 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        padding: '24px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '24px', flexWrap: 'wrap',
      }}>
        {/* Animated orbs */}
        <div style={{ position: 'absolute', top: '-40px', right: '80px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)', pointerEvents: 'none', animation: 'pulse-orb 4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '250px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, var(--glow-accent) 0%, transparent 70%)', pointerEvents: 'none', animation: 'pulse-orb 6s ease-in-out infinite reverse' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Sparkles size={16} color="var(--color-primary)" style={{ filter: 'drop-shadow(0 0 6px var(--color-primary))' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-primary)' }}>
              AI Dashboard
            </span>
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            {greeting}, Monisha 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} &nbsp;·&nbsp;
            <span style={{ fontFeatureSettings: '"tnum"', letterSpacing: '0.5px' }}>
              {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', boxShadow: '0 0 20px var(--glow-primary)' }} onClick={() => navigate('/enquiries/new')}>
            <Plus size={16} /> New Enquiry
          </button>
          <button className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '0.9rem' }} onClick={() => navigate('/reports')}>
            <BarChart3 size={16} /> Reports
          </button>
          <button className="btn btn-secondary" style={{ padding: '10px', borderRadius: '50%' }}>
            <Bell size={16} />
          </button>
        </div>
      </div>

      {/* ══ KPI ROW ════════════════════════════════════════════════════════ */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Enquiries', value: metrics.total, icon: Users, color: 'var(--color-primary)', bg: 'bg-primary-light', spark: [3,5,4,7,6,8,metrics.total||8], trend: '+12%', up: true },
          { label: 'Active Pipeline', value: metrics.active, icon: Activity, color: 'var(--color-info)', bg: 'bg-info-light', spark: [2,4,3,5,4,6,metrics.active||6], trend: '+5%', up: true },
          { label: 'Won Deals', value: metrics.won, icon: Star, color: 'var(--color-success)', bg: 'bg-success-light', spark: [1,2,1,3,2,3,metrics.won||3], trend: '+15%', up: true },
          { label: 'Follow-ups Due', value: metrics.followUps, icon: Calendar, color: 'var(--color-warning)', bg: 'bg-warning-light', spark: [5,7,6,8,7,9,metrics.followUps||9], trend: 'Urgent', up: false, urgent: true },
        ].map((card, i) => (
          <div key={i} className="col-6 col-lg-3">
            <div className="card h-100" style={{
            padding: '20px', position: 'relative', overflow: 'hidden',
            border: card.urgent ? `1px solid color-mix(in srgb, ${card.color} 30%, transparent)` : '1px solid var(--border-subtle)',
            cursor: 'pointer', transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px color-mix(in srgb, ${card.color} 20%, transparent)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div className={`stat-icon-wrapper ${card.bg}`} style={{ position: 'static', width: '40px', height: '40px' }}>
                <card.icon size={20} color={card.color} />
              </div>
              <Sparkline data={card.spark} color={card.color} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: card.color, lineHeight: 1, marginBottom: '4px', filter: `drop-shadow(0 0 8px ${card.color}40)` }}>
              <AnimatedNumber value={card.value} />
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {card.label}
            </div>
            <div className={`trend-indicator ${card.up ? 'trend-up' : 'trend-down'}`} style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
              {card.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {card.trend}
            </div>
            </div>
          </div>
        ))}
      </div>

      {/* ══ MAIN BODY: Charts left, Sidebar right ══════════════════════════ */}
      <div className="row g-3">
        {/* LEFT: Charts + Table */}
        <div className="col-12 col-xl-8 d-flex flex-column gap-3">
          {/* Charts Row */}
          <div className="row g-3">

            {/* Status Chart */}
            <div className="col-12 col-md-6">
              <div className="card h-100" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '20px', borderRadius: '3px', background: 'var(--color-primary)', boxShadow: '0 0 8px var(--color-primary)' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Enquiries by Status</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/reports')}>View all →</span>
              </div>
              {STATUSES.map(status => {
                const count = metrics.statusCounts[status] || 0;
                const pct = (count / statusMax) * 100;
                return (
                  <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ width: '90px', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-secondary)', flexShrink: 0 }}>{status}</span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--surface-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`,
                        background: `linear-gradient(90deg, ${STATUS_ACCENT[status] || 'var(--color-primary)'}, ${STATUS_ACCENT[status] || 'var(--color-primary)'}80)`,
                        borderRadius: '4px',
                        boxShadow: `0 0 6px ${STATUS_ACCENT[status] || 'var(--color-primary)'}60`,
                        transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                        position: 'relative',
                      }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 2s infinite' }} />
                      </div>
                    </div>
                    <span style={{ width: '20px', textAlign: 'right', fontSize: '0.82rem', fontWeight: 700, color: STATUS_ACCENT[status] || 'var(--color-primary)' }}>{count}</span>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Source Chart */}
            <div className="col-12 col-md-6">
              <div className="card h-100" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '20px', borderRadius: '3px', background: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Leads by Source</span>
                </div>
              </div>
              {SOURCES.map((source, i) => {
                const count = metrics.sourceCounts[source] || 0;
                const pct = (count / sourceMax) * 100;
                const colors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-info)', 'var(--color-warning)', 'var(--color-success)', 'var(--color-danger)'];
                const c = colors[i % colors.length];
                return (
                  <div key={source} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ width: '70px', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-secondary)', flexShrink: 0 }}>{source}</span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--surface-hover)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`,
                        background: `linear-gradient(90deg, ${c}, ${c}80)`,
                        borderRadius: '4px',
                        boxShadow: `0 0 6px ${c}60`,
                        transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                      }} />
                    </div>
                    <span style={{ width: '20px', textAlign: 'right', fontSize: '0.82rem', fontWeight: 700, color: c }}>{count}</span>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          {/* AI Insights Bar */}
          <div style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, transparent), color-mix(in srgb, var(--color-accent) 8%, transparent))',
            border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
            borderRadius: '14px', padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', flexShrink: 0 }}>
              <Zap size={16} style={{ filter: 'drop-shadow(0 0 6px var(--color-primary))' }} />
              <span style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Insights</span>
            </div>
            <div style={{ display: 'flex', gap: '20px', flex: 1, flexWrap: 'wrap' }}>
              {[
                { label: 'Win Rate', value: `${metrics.winRate || 0}%`, color: 'var(--color-success)' },
                { label: 'Pipeline Value', value: `₹${(metrics.totalBudget || 0).toLocaleString('en-IN')}`, color: 'var(--color-primary)' },
                { label: 'Urgent Follow-ups', value: metrics.followUps || 0, color: 'var(--color-warning)' },
                { label: 'Conversion Stage', value: 'Active', color: 'var(--color-info)' },
              ].map((ins, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{ins.label}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: ins.color, filter: `drop-shadow(0 0 6px ${ins.color}60)` }}>{ins.value}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem' }} onClick={() => navigate('/reports')}>
              Full Report <ArrowRight size={14} />
            </button>
          </div>

          {/* Recent Activity Table */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '20px', borderRadius: '3px', background: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Recent Activity</span>
              </div>
              <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => navigate('/enquiries')}>View All →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {recentEnquiries.map(enq => (
                <div key={enq.id}
                  onClick={() => navigate(`/enquiries/${enq.id}`)}
                  style={{
                    display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                    padding: '10px 12px', borderRadius: '10px',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                >
                  <div style={{ flex: '1 1 30%', minWidth: '120px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{enq.clientName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{enq.service}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{enq.source}</div>
                  <StatusBadge status={enq.status} />
                  <div className="avatar-sm" style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>{enq.assignedTo.charAt(0)}</div>
                </div>
              ))}
              {recentEnquiries.length === 0 && (
                <div className="empty-table-msg">No recent enquiries</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-12 col-xl-4 d-flex flex-column gap-3">

          {/* Quick Actions */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '14px' }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Add New Enquiry', icon: Plus, path: '/enquiries/new', color: 'var(--color-primary)' },
                { label: 'View All Enquiries', icon: Users, path: '/enquiries', color: 'var(--color-info)' },
                { label: 'Manage Tasks', icon: CheckCircle2, path: '/tasks', color: 'var(--color-success)' },
                { label: 'Open Calendar', icon: Calendar, path: '/calendar', color: 'var(--color-warning)' },
                { label: 'View Reports', icon: BarChart3, path: '/reports', color: 'var(--color-accent)' },
              ].map((action, i) => (
                <button key={i}
                  onClick={() => navigate(action.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', borderRadius: '10px',
                    background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)',
                    cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.85rem',
                    transition: 'all 0.2s', textAlign: 'left', width: '100%',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-active)'; e.currentTarget.style.borderColor = action.color; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `color-mix(in srgb, ${action.color} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <action.icon size={16} color={action.color} />
                  </div>
                  {action.label}
                  <ArrowRight size={14} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Follow-ups */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} color="var(--color-warning)" style={{ filter: 'drop-shadow(0 0 4px var(--color-warning))' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>Upcoming Follow-ups</span>
              </div>
              {metrics.followUps > 0 && (
                <span style={{ background: 'color-mix(in srgb, var(--color-danger) 15%, transparent)', color: 'var(--color-danger)', border: '1px solid color-mix(in srgb, var(--color-danger) 30%, transparent)', borderRadius: '50px', padding: '2px 8px', fontSize: '0.72rem', fontWeight: 700 }}>
                  {metrics.followUps} due
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {metrics.upcomingFollowUpsList?.map(enq => {
                const isPast = enq.followUpDate < todayStr;
                return (
                  <div key={enq.id}
                    onClick={() => navigate(`/enquiries/${enq.id}`)}
                    style={{
                      padding: '10px 12px', borderRadius: '10px',
                      background: isPast ? 'color-mix(in srgb, var(--color-danger) 8%, transparent)' : 'var(--surface-hover)',
                      border: `1px solid ${isPast ? 'color-mix(in srgb, var(--color-danger) 25%, transparent)' : 'var(--border-subtle)'}`,
                      borderLeft: `3px solid ${isPast ? 'var(--color-danger)' : 'var(--color-warning)'}`,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{enq.clientName}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: isPast ? 'var(--color-danger)' : 'var(--text-secondary)', flexShrink: 0 }}>{enq.followUpDate}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{enq.contactPerson}</div>
                  </div>
                );
              })}
              {(!metrics.upcomingFollowUpsList || metrics.upcomingFollowUpsList.length === 0) && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No follow-ups scheduled</div>
              )}
            </div>
          </div>

          {/* AI Tip Card */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            borderRadius: '14px', padding: '20px',
            boxShadow: '0 8px 32px var(--glow-primary)',
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-30px', left: '10px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Sparkles size={16} color="rgba(255,255,255,0.9)" />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>AI Tip</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 14px 0' }}>
              Deals with follow-ups scheduled within 24 hrs have a <strong style={{ color: 'white' }}>40% higher</strong> conversion rate. You have <strong style={{ color: 'white' }}>{metrics.followUps || 0}</strong> overdue today.
            </p>
            <button onClick={() => navigate('/calendar')} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', padding: '8px 16px', color: 'white', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              View Calendar →
            </button>
          </div>

          {/* Target Progress */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Target size={15} color="var(--color-success)" style={{ filter: 'drop-shadow(0 0 4px var(--color-success))' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Target</span>
            </div>
            {[
              { label: 'Enquiries', current: metrics.total || 0, target: 20, color: 'var(--color-primary)' },
              { label: 'Won Deals', current: metrics.won || 0, target: 5, color: 'var(--color-success)' },
              { label: 'Follow-ups', current: Math.max(0, (metrics.total || 0) - (metrics.followUps || 0)), target: metrics.total || 1, color: 'var(--color-info)' },
            ].map((t, i) => {
              const pct = Math.min(Math.round((t.current / t.target) * 100), 100);
              return (
                <div key={i} style={{ marginBottom: i < 2 ? '14px' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{t.label}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: t.color }}>{t.current}/{t.target}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--surface-hover)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}80)`, borderRadius: '3px', boxShadow: `0 0 6px ${t.color}60`, transition: 'width 1.2s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
