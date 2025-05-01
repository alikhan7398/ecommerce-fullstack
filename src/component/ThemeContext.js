
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  console.log('ThemeProvider: Initializing');
  const [theme, setTheme] = useState(() => {
    console.log('ThemeProvider: Getting theme from localStorage');
    try {
      return localStorage.getItem('theme') || 'light';
    } catch (e) {
      console.error('localStorage error:', e);
      return 'light';
    }
  });

  useEffect(() => {
    console.log('ThemeProvider: Setting theme:', theme);
    document.body.className = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('localStorage error:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log('ThemeProvider: Toggling theme');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};