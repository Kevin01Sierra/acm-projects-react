import { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import './css/App.css';
import Display from './components/Display';
import Botones from './components/Botones';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [tiempo, setTiempo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Consumir el contexto
  const { theme } = useTheme();

  useEffect(() => {
    let intervalo;

    if (isRunning) {
      intervalo = setInterval(() => {
        setTiempo((prevTiempo) => prevTiempo + 1);
      }, 1000);
    }

    return () => {
      if (intervalo) {
        clearInterval(intervalo);
      }
    };
  }, [isRunning]);

  const handlePlay = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTiempo(0);
  };

  const formatearTiempo = (segundosTotales) => {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      
      <div className="cronometro-card">
        <h1 className="titulo">Cronómetro</h1>
        
        <Display 
          tiempo={formatearTiempo(tiempo)} 
        />
        
        <Botones 
          isRunning={isRunning}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
        />
        
        <div className="estado-container">
          <span className={`estado ${isRunning ? 'activo' : 'inactivo'}`}>
            {isRunning ? '● En ejecución' : '○ Detenido'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;