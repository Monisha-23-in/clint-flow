import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, User } from 'lucide-react';
import { useEnquiries } from '../hooks/useEnquiries';
import LoadingState from '../components/common/LoadingState';
import { useNavigate } from 'react-router-dom';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const STATUS_COLORS = {
  'New':          'var(--color-primary)',
  'Contacted':    'var(--color-warning)',
  'Qualified':    'var(--gradient-chart-end)',
  'Proposal Sent':'var(--color-accent)',
  'Negotiation':  'var(--color-info)',
  'Won':          'var(--color-success)',
  'Lost':         'var(--color-danger)',
};

const CalendarPage = () => {
  const { enquiries, loading } = useEnquiries();
  const navigate = useNavigate();
  const [today] = useState(() => new Date());

  const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Build events map: date string → [enquiry]
  const eventsByDate = useMemo(() => {
    const map = {};
    enquiries.forEach(enq => {
      if (!enq.followUpDate) return;
      const d = enq.followUpDate.split('T')[0];
      if (!map[d]) map[d] = [];
      map[d].push(enq);
    });
    return map;
  }, [enquiries]);

  // Calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  // prev month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, currentMonth: false, dateStr: null });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, currentMonth: true, dateStr });
  }
  // next month padding
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, currentMonth: false, dateStr: null });
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday  = () => { setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1)); setSelectedDate(today.toISOString().split('T')[0]); };

  const todayStr = today.toISOString().split('T')[0];
  const selectedEvents = eventsByDate[selectedDate] || [];

  // Upcoming events (next 7 days)
  const upcoming = useMemo(() => {
    return Object.entries(eventsByDate)
      .filter(([d]) => d >= todayStr)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 6)
      .flatMap(([date, evts]) => evts.map(e => ({ ...e, followUpDate: date })));
  }, [eventsByDate, todayStr]);

  if (loading) return <LoadingState />;

  return (
    <div className="row g-4 align-items-start">
      {/* ── LEFT: Calendar ── */}
      <div className="col-12 col-xl-8">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="btn btn-secondary"
              style={{ padding: '7px 10px' }}
              onClick={prevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '7px 10px' }}
              onClick={nextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <h2 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            {MONTHS[month]} {year}
          </h2>

          <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={goToday}>
            Today
          </button>
        </div>

        {/* Day Names */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border-subtle)' }}>
          {DAYS.map(d => (
            <div key={d} style={{ textAlign: 'center', padding: '12px 0', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {cells.map((cell, i) => {
            const events = cell.dateStr ? (eventsByDate[cell.dateStr] || []) : [];
            const isToday = cell.dateStr === todayStr;
            const isSelected = cell.dateStr === selectedDate;
            const isCurrentMonth = cell.currentMonth;

            return (
              <div
                key={i}
                onClick={() => cell.dateStr && setSelectedDate(cell.dateStr)}
                style={{
                  minHeight: '80px',
                  padding: '8px',
                  borderRight: (i + 1) % 7 === 0 ? 'none' : '1px solid var(--border-subtle)',
                  borderBottom: i < 35 ? '1px solid var(--border-subtle)' : 'none',
                  background: isSelected ? 'var(--surface-active)' : isToday ? 'color-mix(in srgb, var(--color-primary) 5%, transparent)' : 'transparent',
                  cursor: cell.dateStr ? 'pointer' : 'default',
                  transition: 'background 0.15s',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (cell.dateStr && !isSelected) e.currentTarget.style.background = 'var(--surface-hover)'; }}
                onMouseLeave={e => { if (cell.dateStr && !isSelected) e.currentTarget.style.background = isToday ? 'color-mix(in srgb, var(--color-primary) 5%, transparent)' : 'transparent'; }}
              >
                {/* Day number */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                  <span style={{
                    width: '28px', height: '28px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: isToday || isSelected ? 700 : 400,
                    background: isToday ? 'var(--color-primary)' : 'transparent',
                    color: isToday ? 'white' : isCurrentMonth ? 'var(--text-primary)' : 'var(--text-secondary)',
                    opacity: isCurrentMonth ? 1 : 0.35,
                    boxShadow: isToday ? '0 2px 6px var(--glow-primary)' : 'none',
                  }}>
                    {cell.day}
                  </span>
                </div>

                {/* Event dots */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {events.slice(0, 2).map((e, idx) => (
                    <div key={idx} style={{
                      background: STATUS_COLORS[e.status] || 'var(--color-primary)',
                      borderRadius: '3px',
                      padding: '1px 5px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {e.clientName}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 700, paddingLeft: '4px' }}>
                      +{events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="col-12 col-xl-4 d-flex flex-column gap-4">

        {/* Selected Day Events */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <CalendarDays size={18} color="var(--color-primary)" />
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              {selectedDate === todayStr ? 'Today' : new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </h3>
          </div>

          {selectedEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No follow-ups scheduled
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedEvents.map(enq => (
                <div
                  key={enq.id}
                  onClick={() => navigate(`/enquiries/${enq.id}`)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    borderLeft: `3px solid ${STATUS_COLORS[enq.status] || 'var(--color-primary)'}`,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-active)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{enq.clientName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={11} /> {enq.contactPerson}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: STATUS_COLORS[enq.status] || 'var(--color-primary)', marginTop: '4px', fontWeight: 600 }}>
                    {enq.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Follow-ups */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Clock size={18} color="var(--color-warning)" />
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Upcoming Follow-ups</h3>
          </div>

          {upcoming.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No upcoming follow-ups
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {upcoming.map((enq, i) => {
                const d = new Date(enq.followUpDate + 'T12:00:00');
                const isOverdue = enq.followUpDate < todayStr;
                return (
                  <div
                    key={`${enq.id}-${i}`}
                    onClick={() => navigate(`/enquiries/${enq.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 12px', borderRadius: '8px',
                      background: 'var(--surface-hover)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-active)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: STATUS_COLORS[enq.status], flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{enq.clientName}</div>
                      <div style={{ fontSize: '0.72rem', color: isOverdue ? 'var(--color-danger)' : 'var(--text-secondary)', fontWeight: isOverdue ? 600 : 400 }}>
                        {isOverdue ? '⚠ Overdue · ' : ''}{d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="card" style={{ padding: '16px 20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Status Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.entries(STATUS_COLORS).map(([status, color]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                {status}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
