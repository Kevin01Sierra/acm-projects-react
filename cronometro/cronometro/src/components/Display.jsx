import React from 'react';
import '../css/Display.css';

function Display({ tiempo }) {
  return (
    <div className="display-container">
      <p className="display-tiempo">
        {tiempo}
      </p>
    </div>
  );
}

export default Display;