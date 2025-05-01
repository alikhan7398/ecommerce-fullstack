import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function Settings() {
  const { theme = 'light', toggleTheme = () => {} } = useContext(ThemeContext) || {};

  console.log('Settings: Theme context:', { theme, toggleTheme });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '600px' }}>
        <h3 className="text-center mb-4 fw-bolder">Settings</h3>
        <div className="mb-3">
          <h5>Theme</h5>
          <button
            className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-outline-dark'} w-100`}
            onClick={toggleTheme}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </div>
      </div>
    </div>
  );
}