import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '../types';

export const useTheme = (): Theme => {
  // Check if user prefers dark mode
  const prefersDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDark, setIsDark] = useLocalStorage('darkMode', prefersDarkMode());

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setIsDark(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setIsDark]);

  // Toggle theme function
  const toggle = () => setIsDark(!isDark);

  return { isDark, toggle };
};