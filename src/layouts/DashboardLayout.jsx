import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, PlusCircle, Menu, Contact,
  CheckSquare, Calendar as CalendarIcon, BarChart3, Settings,
  LifeBuoy, Cpu, Wifi, Shield
} from 'lucide-react';
import ThemeSwitcher from '../components/common/ThemeSwitcher';

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cpuPct] = useState(() => Math.floor(Math.random() * 30) + 20);
  const [time, setTime] = useState(() => new Date());
  const location = useLocation();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu  = () => setMobileMenuOpen(false);

  const getPageTitle = () => {
    if (location.pathname === '/')                        return 'Dashboard';
    if (location.pathname === '/enquiries')               return 'Enquiries';
    if (location.pathname === '/enquiries/new')           return 'Add Enquiry';
    if (location.pathname.startsWith('/enquiries/'))      return 'Enquiry Details';
    if (location.pathname === '/clients')                 return 'Clients';
    if (location.pathname === '/tasks')                   return 'Tasks';
    if (location.pathname === '/calendar')                return 'Calendar';
    if (location.pathname === '/reports')                 return 'Reports';
    if (location.pathname === '/settings')                return 'Settings';
    return 'ClientFlow';
  };

  const getPageSubtitle = () => {
    if (location.pathname === '/')                        return 'Overview of your client enquiry pipeline.';
    if (location.pathname === '/enquiries')               return 'Manage and track client requests.';
    if (location.pathname === '/enquiries/new')           return 'Create a new client request.';
    if (location.pathname.startsWith('/enquiries/'))      return 'View and edit details.';
    if (location.pathname === '/clients')                 return 'View and manage your client directory.';
    if (location.pathname === '/tasks')                   return 'Your daily to-dos and follow-ups.';
    if (location.pathname === '/calendar')                return 'Scheduled follow-ups and events.';
    if (location.pathname === '/reports')                 return 'Analytics and performance insights.';
    if (location.pathname === '/settings')                return 'Customize your dashboard appearance.';
    return '';
  };

  const navGroups = [
    {
      label: 'Main',
      items: [
        { to: '/',              icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/enquiries',     icon: Users,           label: 'Enquiries', end: true },
        { to: '/enquiries/new', icon: PlusCircle,      label: 'Add Enquiry' },
      ],
    },
    {
      label: 'Management',
      items: [
        { to: '/clients',  icon: Contact,      label: 'Clients' },
        { to: '/tasks',    icon: CheckSquare,  label: 'Tasks' },
        { to: '/calendar', icon: CalendarIcon, label: 'Calendar' },
      ],
    },
    {
      label: 'Analytics',
      items: [
        { to: '/reports',  icon: BarChart3, label: 'Reports' },
        { to: '/settings', icon: Settings,  label: 'Settings' },
      ],
    },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      <div className={`overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMenu} />

      {/* ── SIDEBAR ── */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">CF</div>
            <div>
              <div className="sidebar-logo-text">ClientFlow</div>
              <div className="sidebar-logo-badge">v2.0 AI</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <nav className="sidebar-nav">
            {navGroups.map(group => (
              <div key={group.label}>
                <div className="nav-section-label">{group.label}</div>
                {group.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <item.icon size={16} className="nav-item-icon" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom System Status */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.3)',
        }}>
          {/* System status row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            {[
              { icon: Cpu,    label: 'CPU',    value: `${cpuPct}%`,  color: 'var(--color-success)',  pct: cpuPct },
              { icon: Wifi,   label: 'API',    value: 'Online',      color: 'var(--color-success)',  pct: 100 },
              { icon: Shield, label: 'Secure', value: 'Active',      color: 'var(--color-primary)',  pct: 100 },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <s.icon size={11} color={s.color} style={{ flexShrink: 0, filter: `drop-shadow(0 0 3px ${s.color})` }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--text-secondary)', width: '40px' }}>{s.label}</span>
                <div style={{ flex: 1, height: '3px', background: 'var(--surface-hover)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, boxShadow: `0 0 4px ${s.color}`, borderRadius: '2px' }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: s.color, width: '36px', textAlign: 'right' }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Clock */}
          <div style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'var(--color-primary)', letterSpacing: '1px', textShadow: '0 0 8px var(--color-primary)' }}>
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>

          {/* Support */}
          <div className="nav-item" style={{ cursor: 'pointer', marginTop: '8px', justifyContent: 'center', fontSize: '0.78rem' }}>
            <LifeBuoy size={14} />
            Support
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
              <Menu size={20} />
            </button>
            <div>
              {/* Breadcrumb-style title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--color-primary)', opacity: 0.7 }}>CF /</span>
                <h1 className="header-title">{getPageTitle()}</h1>
              </div>
              <p className="header-subtitle">{getPageSubtitle()}</p>
            </div>
          </div>

          <div className="header-right">
            {/* Live status dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'var(--surface-hover)', border: '1px solid var(--border-subtle)', borderRadius: '50px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)', animation: 'glow-pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--color-success)', letterSpacing: '0.5px' }}>LIVE</span>
            </div>

            <ThemeSwitcher />

            <div className="user-profile">
              <div className="avatar">MB</div>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Monisha BR</span>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
