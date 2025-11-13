import React, { useState } from 'react';
import '../css/InputField.css';

function InputPassword({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false 
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error ? 'input-error' : ''}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="password-toggle"
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
    </div>
  );
}

export default InputPassword;