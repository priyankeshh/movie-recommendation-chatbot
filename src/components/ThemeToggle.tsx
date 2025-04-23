import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme }) => {
  const { isDark, toggle } = theme;

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-full transition-all duration-300
                 hover:bg-cozy-cream/80 relative
                 border border-cozy-tan/50
                 shadow-cozy bg-cozy-cream/50
                 group"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-5 w-5 text-cozy-amber animate-gentle-pulse" />
        ) : (
          <Moon className="h-5 w-5 text-cozy-navy animate-gentle-pulse" />
        )}
        <div className="absolute inset-0 bg-cozy-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      </div>
      <div className="absolute inset-0 border border-cozy-caramel/30 dark:border-cozy-amber/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110 pointer-events-none"></div>
    </button>
  );
};

export default ThemeToggle;
