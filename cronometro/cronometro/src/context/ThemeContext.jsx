import { createContext, useState, useContext } from 'react';

// 1. Crear el Context
const ThemeContext = createContext();

// 2. Crear el Provider (Proveedor del contexto)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 'light' o 'dark'

  // Función para alternar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Valores que se compartirán en toda la app
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  
  return context;
}