import React from 'react';
import '../css/SuccessModal.css';

function SuccessModal({ isOpen, onClose, userData }) {
  // ✅ Validación: Si no está abierto o no hay datos, no renderizar nada
  if (!isOpen || !userData) return null;

  // ✅ Función para formatear el país (capitalizar primera letra)
  const formatPais = (pais) => {
    if (!pais) return '';
    return pais.charAt(0).toUpperCase() + pais.slice(1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">✅</div>
          <h2>¡Registro Exitoso!</h2>
        </div>
        
        <div className="modal-body">
          <p>Los datos han sido registrados correctamente:</p>
          <div className="user-data">
            <div className="data-row">
              <strong>Nombre:</strong>
              <span>{userData.nombre || 'N/A'}</span>
            </div>
            <div className="data-row">
              <strong>Email:</strong>
              <span>{userData.email || 'N/A'}</span>
            </div>
            <div className="data-row">
              <strong>Edad:</strong>
              <span>{userData.edad ? `${userData.edad} años` : 'N/A'}</span>
            </div>
            <div className="data-row">
              <strong>Teléfono:</strong>
              <span>{userData.telefono || 'N/A'}</span>
            </div>
            <div className="data-row">
              <strong>País:</strong>
              <span>{formatPais(userData.pais) || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-close">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;