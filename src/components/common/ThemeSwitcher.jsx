import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = (id) => {
    setTheme(id);
    setOpen(false);
  };

  return (
    <div className="theme-panel-wrapper">
      <button
        id="theme-switcher-btn"
        ref={btnRef}
        className="theme-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        title="Change theme"
      >
        <Palette size={18} />
      </button>

      {open && (
        <div className="theme-panel" ref={panelRef} role="menu" aria-label="Theme options">
          <p className="theme-panel-title">Choose Theme</p>
          <div className="theme-options">
            {Object.values(themes).map((t) => (
              <button
                key={t.id}
                id={`theme-option-${t.id}`}
                className={`theme-option ${theme === t.id ? 'active' : ''}`}
                onClick={() => handleSelect(t.id)}
                role="menuitem"
              >
                {/* Color swatches preview */}
                <div className="theme-swatches">
                  {t.previewColors.map((c, i) => (
                    <span
                      key={i}
                      className="theme-swatch"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                <div className="theme-option-info">
                  <div className="theme-option-label">
                    {t.emoji} {t.label}
                  </div>
                  <div className="theme-option-desc">{t.description}</div>
                </div>

                {theme === t.id && (
                  <span className="theme-check" aria-label="Active theme">
                    <Check size={11} color="white" strokeWidth={3} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
