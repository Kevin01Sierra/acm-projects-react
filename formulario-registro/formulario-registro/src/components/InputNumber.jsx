import React from 'react';
import '../css/InputField.css';

function InputNumber({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error,
  min,
  max,
  required = false 
}) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`input-field ${error ? 'input-error' : ''}`}
      />
    </div>
  );
}

export default InputNumber;