import React from 'react';
import '../css/InputField.css';

function InputEmail({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false 
}) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type="email"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''}`}
      />
    </div>
  );
}

export default InputEmail;