import React from 'react';
import '../css/Botones.css';

function Botones({ isRunning, onPlay, onPause, onReset }) {
  return (
    <div className="botones-container">
      <button
        onClick={onPlay}
        disabled={isRunning}
        className="btn btn-play"
      >
        ▶ Play
      </button>

      <button
        onClick={onPause}
        disabled={!isRunning}
        className="btn btn-pause"
      >
        ⏸ Pause
      </button>

      <button
        onClick={onReset}
        className="btn btn-reset"
      >
        🔄 Reset
      </button>
    </div>
  );
}

export default Botones;