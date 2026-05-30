import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Sun/moon toggle — saves choice to localStorage; new visitors default to light.
 */
export default function ThemeToggle({ compact = false, className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? ' theme-toggle--compact' : ''}${className ? ` ${className}` : ''}`}
      onClick={toggleTheme}
      aria-pressed={isLight}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isLight ? '🌙' : '☀️'}
      </span>
      {!compact && (
        <span className="theme-toggle-label">{isLight ? 'Dark' : 'Light'}</span>
      )}
    </button>
  );
}
