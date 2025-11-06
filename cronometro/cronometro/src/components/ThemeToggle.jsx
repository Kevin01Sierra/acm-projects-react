import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../css/ThemeToggle.css';

function ThemeToggle() {
  // Consumir el contexto usando el hook personalizado
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? '🌙' : '☀️'}
      <span className="theme-text">
        {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
      </span>
    </button>
  );
}

export default ThemeToggle;