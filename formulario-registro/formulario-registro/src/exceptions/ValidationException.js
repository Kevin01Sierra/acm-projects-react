// Clase personalizada para excepciones de validación
export class ValidationException extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationException';
    this.field = field;
    this.timestamp = new Date().toISOString();
  }
}

// Tipos de errores específicos
export class EmptyFieldException extends ValidationException {
  constructor(field) {
    super(field, `El campo ${field} no puede estar vacío`);
    this.name = 'EmptyFieldException';
  }
}

export class InvalidEmailException extends ValidationException {
  constructor() {
    super('email', 'El formato del email no es válido');
    this.name = 'InvalidEmailException';
  }
}

export class InvalidPasswordException extends ValidationException {
  constructor(message) {
    super('password', message);
    this.name = 'InvalidPasswordException';
  }
}

export class InvalidAgeException extends ValidationException {
  constructor() {
    super('edad', 'La edad debe estar entre 18 y 100 años');
    this.name = 'InvalidAgeException';
  }
}

export class InvalidPhoneException extends ValidationException {
  constructor() {
    super('telefono', 'El teléfono debe tener 10 dígitos');
    this.name = 'InvalidPhoneException';
  }
}