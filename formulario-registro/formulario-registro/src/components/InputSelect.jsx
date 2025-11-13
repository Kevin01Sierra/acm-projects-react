import React from 'react';
import '../css/InputField.css';

function InputSelect({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  error,
  required = false 
}) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'input-error' : ''}`}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;