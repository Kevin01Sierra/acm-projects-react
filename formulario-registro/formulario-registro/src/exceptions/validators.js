import {
  EmptyFieldException,
  InvalidEmailException,
  InvalidPasswordException,
  InvalidAgeException,
  InvalidPhoneException,
} from './ValidationException';

// Validador de campo vacío
export const validateNotEmpty = (field, value) => {
  if (!value || value.trim() === '') {
    throw new EmptyFieldException(field);
  }
};

// Validador de email
export const validateEmail = (email) => {
  validateNotEmpty('email', email);
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new InvalidEmailException();
  }
};

// Validador de contraseña
export const validatePassword = (password) => {
  validateNotEmpty('contraseña', password);
  
  if (password.length < 8) {
    throw new InvalidPasswordException('La contraseña debe tener al menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    throw new InvalidPasswordException('La contraseña debe contener al menos una mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    throw new InvalidPasswordException('La contraseña debe contener al menos una minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    throw new InvalidPasswordException('La contraseña debe contener al menos un número');
  }
};

// Validador de edad
export const validateAge = (age) => {
  validateNotEmpty('edad', age);
  
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
    throw new InvalidAgeException();
  }
};

// Validador de teléfono
export const validatePhone = (phone) => {
  validateNotEmpty('teléfono', phone);
  
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    throw new InvalidPhoneException();
  }
};

// Validador genérico de longitud mínima
export const validateMinLength = (field, value, minLength) => {
  validateNotEmpty(field, value);
  
  if (value.length < minLength) {
    throw new ValidationException(
      field,
      `El campo ${field} debe tener al menos ${minLength} caracteres`
    );
  }
};