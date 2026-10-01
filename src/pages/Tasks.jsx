import React, { useState, useMemo } from 'react';
import { CheckSquare, Plus, Trash2, Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import Toast from '../components/common/Toast';

const TASK_STORAGE_KEY = 'clientflow_tasks';

const loadTasks = () => {
  try {
    const data = localStorage.getItem(TASK_STORAGE_KEY);
    if (data) return JSON.parse(data);
    // seed with sample tasks
    const seed = [
      { id: '1', title: 'Call TechCorp Solutions for demo', description: 'Schedule a product demo call', priority: 'High', dueDate: new Date().toISOString().split('T')[0], done: false, createdAt: new Date().toISOString() },
      { id: '2', title: 'Send proposal to Apex Logistics', description: 'Finalize and send the project proposal', priority: 'High', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], done: false, createdAt: new Date().toISOString() },
      { id: '3', title: 'Follow up with Green Valley Organics', description: 'Check if they reviewed the quote', priority: 'Medium', dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], done: false, createdAt: new Date().toISOString() },
      { id: '4', title: 'Update CRM records', description: 'Sync all latest enquiry statuses', priority: 'Low', dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], done: true, createdAt: new Date().toISOString() },
      { id: '5', title: 'Team meeting — weekly pipeline review', description: 'Discuss active leads and blockers', priority: 'Medium', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], done: false, createdAt: new Date().toISOString() },
    ];
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(seed));
    return seed;
  } catch { return []; }
};

const saveTasks = (tasks) => {
  try { localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks)); } catch {}
};

const PRIORITIES = ['High', 'Medium', 'Low'];
const PRIORITY_COLORS = {
  High:   { color: 'var(--color-danger)',  bg: 'color-mix(in srgb, var(--color-danger) 12%, transparent)',  border: 'color-mix(in srgb, var(--color-danger) 28%, transparent)' },
  Medium: { color: 'var(--color-warning)', bg: 'color-mix(in srgb, var(--color-warning) 12%, transparent)', border: 'color-mix(in srgb, var(--color-warning) 28%, transparent)' },
  Low:    { color: 'var(--color-info)',    bg: 'color-mix(in srgb, var(--color-info) 12%, transparent)',    border: 'color-mix(in srgb, var(--color-info) 28%, transparent)' },
};

const Tasks = () => {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('All'); // All | Pending | Done
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' });
  const [errors, setErrors] = useState({});

  const [today] = useState(() => new Date().toISOString().split('T')[0]);

  const updateTasks = (updated) => { setTasks(updated); saveTasks(updated); };

  const toggleDone = (id) => {
    updateTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    updateTasks(tasks.filter(t => t.id !== id));
    setToast({ message: 'Task deleted.', type: 'success' });
  };

  const validateForm = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAddTask = () => {
    if (!validateForm()) return;
    const newTask = { ...form, id: Date.now().toString(), done: false, createdAt: new Date().toISOString() };
    updateTasks([newTask, ...tasks]);
    setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
    setErrors({});
    setShowForm(false);
    setToast({ message: 'Task added successfully!', type: 'success' });
  };

  const filtered = useMemo(() => {
    return tasks
      .filter(t => {
        if (filter === 'Pending') return !t.done;
        if (filter === 'Done') return t.done;
        return true;
      })
      .filter(t => priorityFilter === 'All' || t.priority === priorityFilter)
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        const pa = PRIORITIES.indexOf(a.priority);
        const pb = PRIORITIES.indexOf(b.priority);
        if (pa !== pb) return pa - pb;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
  }, [tasks, filter, priorityFilter]);

  const pending = tasks.filter(t => !t.done).length;
  const overdue = tasks.filter(t => !t.done && t.dueDate < today).length;
  const done = tasks.filter(t => t.done).length;

  return (
    <div>
      {/* Stats */}
      <div className="stat-grid" style={{ marginBottom: '28px' }}>
        <div className="card stat-card interactive">
          <div className="stat-icon-wrapper bg-primary-light">
            <CheckSquare size={22} color="var(--color-primary)" />
          </div>
          <div className="stat-title">Pending</div>
          <div className="stat-value">{pending}</div>
        </div>
        <div className="card stat-card interactive">
          <div className="stat-icon-wrapper" style={{ background: 'color-mix(in srgb, var(--color-danger) 15%, transparent)' }}>
            <AlertCircle size={22} color="var(--color-danger)" />
          </div>
          <div className="stat-title">Overdue</div>
          <div className="stat-value" style={{ color: 'var(--color-danger)' }}>{overdue}</div>
        </div>
        <div className="card stat-card interactive">
          <div className="stat-icon-wrapper bg-success-light">
            <CheckCircle2 size={22} color="var(--color-success)" />
          </div>
          <div className="stat-title">Completed</div>
          <div className="stat-value" style={{ color: 'var(--color-success)' }}>{done}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex-between mb-24">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['All', 'Pending', 'Done'].map(f => (
            <button
              key={f}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 18px', fontSize: '0.9rem' }}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(v => !v)}>
          <Plus size={18} /> Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="card mb-24" style={{ padding: '24px', borderLeft: '4px solid var(--color-primary)', animation: 'fadeIn 0.3s ease' }}>
          <h3 style={{ marginBottom: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>➕ New Task</h3>
          <div className="form-grid">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Task Title</label>
              <input
                className="form-input"
                placeholder="e.g. Call Priya about demo"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
              {errors.title && <div className="form-error">⚠ {errors.title}</div>}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label required">Due Date</label>
              <input
                type="date"
                className="form-input"
                value={form.dueDate}
                min={today}
                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
              />
              {errors.dueDate && <div className="form-error">⚠ {errors.dueDate}</div>}
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Description</label>
            <input
              className="form-input"
              placeholder="Optional details..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {PRIORITIES.map(p => {
                const pc = PRIORITY_COLORS[p];
                const selected = form.priority === p;
                return (
                  <button
                    key={p}
                    onClick={() => setForm(f => ({ ...f, priority: p }))}
                    style={{
                      padding: '8px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                      background: selected ? pc.bg : 'transparent',
                      border: `1px solid ${selected ? pc.border : 'var(--border-default)'}`,
                      color: selected ? pc.color : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button className="btn btn-secondary" onClick={() => { setShowForm(false); setErrors({}); }}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}

      {/* Task List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <CheckSquare size={48} className="empty-icon" />
          <h2 className="empty-title">No tasks found</h2>
          <p className="empty-text">Add tasks to track your daily follow-ups and to-dos.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={16} /> Add First Task</button>
        </div>
      ) : (
        <div className="task-list">
          {filtered.map(task => {
            const isOverdue = !task.done && task.dueDate < today;
            const isToday = task.dueDate === today;
            const pc = PRIORITY_COLORS[task.priority];
            return (
              <div
                key={task.id}
                className={`card task-item ${isOverdue ? 'past-due' : ''}`}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  opacity: task.done ? 0.6 : 1,
                  cursor: 'default',
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleDone(task.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: task.done ? 'var(--color-success)' : 'var(--text-secondary)', flexShrink: 0, marginTop: '2px' }}
                  aria-label={task.done ? 'Mark undone' : 'Mark done'}
                >
                  {task.done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', textDecoration: task.done ? 'line-through' : 'none' }}>
                      {task.title}
                    </span>
                    <span style={{ padding: '2px 10px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700, background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>
                      {task.priority}
                    </span>
                    {isOverdue && !task.done && (
                      <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={12} /> Overdue
                      </span>
                    )}
                    {isToday && !task.done && (
                      <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', fontWeight: 600 }}>
                        📅 Today
                      </span>
                    )}
                  </div>
                  {task.description && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>{task.description}</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: isOverdue && !task.done ? 'var(--color-danger)' : 'var(--text-secondary)' }}>
                    <Clock size={12} />
                    <span>Due: {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px', borderRadius: '6px', flexShrink: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-danger)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  aria-label="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Tasks;
