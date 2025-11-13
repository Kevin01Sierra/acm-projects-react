import React from 'react';
import '../css/ErrorMessage.css';

function ErrorMessage({ errors }) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <div className="error-list">
        {Object.entries(errors).map(([field, message]) => (
          <div key={field} className="error-item">
            <strong>{field}:</strong> {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ErrorMessage;