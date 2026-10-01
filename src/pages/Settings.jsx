import React from 'react';
import { Check, Palette, Moon, Waves, Flame, Leaf, Flower2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const themeIcons = {
  midnight: Moon,
  ocean:    Waves,
  sunset:   Flame,
  forest:   Leaf,
  rose:     Flower2,
};

const Settings = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="settings-container">
      <div className="settings-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Palette size={20} color="var(--color-primary)" />
          <h2 className="settings-section-title" style={{ margin: 0 }}>Appearance</h2>
        </div>
        <p className="settings-section-desc">
          Choose a color theme for your dashboard. The change is instant and saved automatically.
        </p>

        <div className="theme-cards-grid">
          {Object.values(themes).map((t) => {
            const Icon = themeIcons[t.id];
            const isActive = theme === t.id;
            const [c1, c2, c3] = t.previewColors;

            return (
              <button
                key={t.id}
                id={`settings-theme-${t.id}`}
                className={`theme-card ${isActive ? 'active' : ''}`}
                onClick={() => setTheme(t.id)}
                aria-label={`${t.label} theme`}
                aria-pressed={isActive}
              >
                {/* Color preview stripe */}
                <div className="theme-card-preview">
                  <div className="theme-card-preview-stripe" style={{ background: c3 }} />
                  <div className="theme-card-preview-stripe" style={{ background: c1 }} />
                  <div className="theme-card-preview-stripe" style={{ background: c2 }} />
                </div>

                <div className="theme-card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    {Icon && <Icon size={12} color="var(--text-secondary)" />}
                    <span className="theme-card-name">{t.emoji} {t.label}</span>
                  </div>
                  <span className="theme-card-desc">{t.description}</span>
                </div>

                {isActive && (
                  <div className="theme-card-badge" aria-label="Currently active">
                    <Check size={11} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="settings-divider" />

      <div className="settings-section">
        <h2 className="settings-section-title">Current Theme Info</h2>
        <p className="settings-section-desc">Details about the active theme palette.</p>

        <div className="card" style={{ padding: '20px 24px' }}>
          {(() => {
            const t = themes[theme];
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px',
                  background: `linear-gradient(135deg, ${t.previewColors[0]}, ${t.previewColors[1]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  flexShrink: 0,
                }}>
                  {t.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.label}
                    </span>
                    <span className="badge badge-new" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      Active
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {t.previewColors.map((c, i) => (
                    <div key={i} style={{
                      width: '28px', height: '28px',
                      borderRadius: '8px',
                      background: c,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      title: c,
                    }} title={c} />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
