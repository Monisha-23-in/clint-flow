import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─── Theme Definitions ──────────────────────────────────────────────────────
export const THEMES = {
  midnight: {
    id: 'midnight',
    label: 'Midnight',
    description: 'Dark & professional',
    previewColors: ['#3b82f6', '#a855f7', '#0f172a'],
    emoji: '🌙',
  },
  ocean: {
    id: 'ocean',
    label: 'Ocean',
    description: 'Cool & refreshing',
    previewColors: ['#06b6d4', '#10b981', '#0c1a2e'],
    emoji: '🌊',
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset',
    description: 'Warm & energetic',
    previewColors: ['#f97316', '#ec4899', '#1a0f0a'],
    emoji: '🌅',
  },
  forest: {
    id: 'forest',
    label: 'Forest',
    description: 'Natural & calm',
    previewColors: ['#22c55e', '#84cc16', '#0a1a0f'],
    emoji: '🌿',
  },
  rose: {
    id: 'rose',
    label: 'Rose',
    description: 'Vibrant & bold',
    previewColors: ['#e11d48', '#9333ea', '#1a0a12'],
    emoji: '🌸',
  },
};

export const THEME_IDS = Object.keys(THEMES);

// ─── Context ────────────────────────────────────────────────────────────────
const ThemeContext = createContext(null);

const STORAGE_KEY = 'clientflow-theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEME_IDS.includes(saved) ? saved : 'midnight';
  });

  // Apply theme to <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((newTheme) => {
    if (THEME_IDS.includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};
