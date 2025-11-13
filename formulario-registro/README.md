# 📝 Formulario de Registro con Sistema de Validaciones

Aplicación de formulario de registro desarrollada con **React** y **Vite**, implementando un sistema robusto de **excepciones personalizadas** y **validaciones en tiempo real** utilizando arquitectura modular por componentes.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Sistema de Excepciones](#sistema-de-excepciones)
- [Sistema de Validaciones](#sistema-de-validaciones)
- [Componentes](#componentes)
- [Flujo de Validación](#flujo-de-validación)
- [Manejo de Errores](#manejo-de-errores)

## ✨ Características

- 📝 **Formulario completo** con múltiples tipos de inputs
- ⚠️ **Sistema de excepciones personalizadas** (Try-Catch)
- ✅ **Validaciones en tiempo real** por campo
- 🎯 **Feedback visual inmediato** de errores
- 🔒 **Campo de contraseña** con mostrar/ocultar
- 🎨 **Validación de formato** (email, teléfono, edad)
- 🔐 **Validación de seguridad** en contraseñas
- 📊 **Modal de confirmación** con datos registrados
- 📱 **Diseño responsive** y moderno
- 🧩 **Arquitectura modular** por componentes

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 6.0.5** - Herramienta de construcción rápida
- **CSS3** - Estilos con gradientes y animaciones
- **JavaScript ES6+** - Clases, módulos y destructuring
- **Hooks de React** - useState para gestión de estado
- **Try-Catch** - Manejo de excepciones

## 📁 Estructura del Proyecto

```
formulario-registro/
├── src/
│   ├── components/
│   │   ├── InputText.jsx           # Input de texto genérico
│   │   ├── InputEmail.jsx          # Input específico para email
│   │   ├── InputPassword.jsx       # Input de contraseña con toggle
│   │   ├── InputNumber.jsx         # Input numérico
│   │   ├── InputSelect.jsx         # Select/Dropdown
│   │   ├── ErrorMessage.jsx        # Componente para mostrar errores
│   │   └── SuccessModal.jsx        # Modal de registro exitoso
│   ├── exceptions/
│   │   ├── ValidationException.js  # Clases de excepciones personalizadas
│   │   └── validators.js           # Funciones de validación
│   ├── css/
│   │   ├── App.css                 # Estilos principales
│   │   ├── InputField.css          # Estilos de inputs
│   │   ├── ErrorMessage.css        # Estilos de errores
│   │   └── SuccessModal.css        # Estilos del modal
│   ├── App.jsx                     # Componente principal
│   └── main.jsx                    # Punto de entrada
├── package.json
└── README.md
```

## 🚀 Instalación

### **Prerrequisitos:**
- Node.js (versión 14 o superior)
- npm o yarn

### **Pasos de instalación:**

1. **Clonar o crear el proyecto:**
```bash
npm create vite@latest formulario-registro -- --template react
cd formulario-registro
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```
http://localhost:5173
```

5. **Compilar para producción:**
```bash
npm run build
```

## 🔥 Sistema de Excepciones

El proyecto implementa un sistema de **excepciones personalizadas** siguiendo el paradigma de programación orientada a objetos y el patrón de manejo de errores de JavaScript.

### **Jerarquía de Excepciones**

```
Error (clase nativa de JavaScript)
    ↓
ValidationException (clase base personalizada)
    ↓
    ├── EmptyFieldException
    ├── InvalidEmailException
    ├── InvalidPasswordException
    ├── InvalidAgeException
    └── InvalidPhoneException
```

### **Clase Base: ValidationException**

```javascript
export class ValidationException extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationException';
    this.field = field;              // Campo que generó el error
    this.timestamp = new Date().toISOString();  // Timestamp del error
  }
}
```

**Propiedades:**
- `name`: Nombre de la excepción
- `message`: Mensaje descriptivo del error
- `field`: Campo del formulario que causó el error
- `timestamp`: Fecha y hora del error

### **Excepciones Específicas**

#### **1. EmptyFieldException**
```javascript
export class EmptyFieldException extends ValidationException {
  constructor(field) {
    super(field, `El campo ${field} no puede estar vacío`);
    this.name = 'EmptyFieldException';
  }
}
```
**Uso:** Valida que un campo no esté vacío
**Ejemplo:** `throw new EmptyFieldException('nombre');`

---

#### **2. InvalidEmailException**
```javascript
export class InvalidEmailException extends ValidationException {
  constructor() {
    super('email', 'El formato del email no es válido');
    this.name = 'InvalidEmailException';
  }
}
```
**Uso:** Valida el formato correcto de un email
**Patrón:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

#### **3. InvalidPasswordException**
```javascript
export class InvalidPasswordException extends ValidationException {
  constructor(message) {
    super('password', message);
    this.name = 'InvalidPasswordException';
  }
}
```
**Uso:** Valida requisitos de seguridad de la contraseña
**Requisitos:**
- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número

---

#### **4. InvalidAgeException**
```javascript
export class InvalidAgeException extends ValidationException {
  constructor() {
    super('edad', 'La edad debe estar entre 18 y 100 años');
    this.name = 'InvalidAgeException';
  }
}
```
**Uso:** Valida que la edad esté en un rango válido (18-100)

---

#### **5. InvalidPhoneException**
```javascript
export class InvalidPhoneException extends ValidationException {
  constructor() {
    super('telefono', 'El teléfono debe tener 10 dígitos');
    this.name = 'InvalidPhoneException';
  }
}
```
**Uso:** Valida formato de teléfono (10 dígitos)
**Patrón:** `/^\d{10}$/`

---

### **Ventajas del Sistema de Excepciones**

✅ **Tipado de errores**: Cada error tiene su propia clase
✅ **Mensajes descriptivos**: Errores claros para el usuario
✅ **Trazabilidad**: Timestamp y campo asociado
✅ **Escalabilidad**: Fácil agregar nuevas excepciones
✅ **Mantenibilidad**: Código organizado y reutilizable

---

## ✅ Sistema de Validaciones

### **Arquitectura de Validadores**

El sistema utiliza funciones puras que lanzan excepciones cuando detectan datos inválidos:

```javascript
// Patrón básico de validador
export const validatorFunction = (value) => {
  if (condiciónInválida) {
    throw new CustomException();
  }
};
```

### **Validadores Implementados**

#### **1. validateNotEmpty**
```javascript
export const validateNotEmpty = (field, value) => {
  if (!value || value.trim() === '') {
    throw new EmptyFieldException(field);
  }
};
```
**Función:** Valida que el campo no esté vacío ni contenga solo espacios
**Parámetros:**
- `field` (string): Nombre del campo
- `value` (string): Valor a validar

**Ejemplo de uso:**
```javascript
try {
  validateNotEmpty('nombre', formData.nombre);
} catch (error) {
  console.error(error.message); // "El campo nombre no puede estar vacío"
}
```

---

#### **2. validateEmail**
```javascript
export const validateEmail = (email) => {
  validateNotEmpty('email', email);
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new InvalidEmailException();
  }
};
```
**Función:** Valida formato de email
**Validaciones:**
1. No está vacío
2. Cumple con formato de email (usuario@dominio.com)

**Ejemplos:**
- ✅ Válidos: `usuario@ejemplo.com`, `test.user@mail.co`
- ❌ Inválidos: `usuario@`, `@ejemplo.com`, `usuario`

---

#### **3. validatePassword**
```javascript
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
```
**Función:** Valida seguridad de la contraseña
**Validaciones en cascada:**
1. No está vacía
2. Mínimo 8 caracteres
3. Al menos una mayúscula (A-Z)
4. Al menos una minúscula (a-z)
5. Al menos un número (0-9)

**Ejemplos:**
- ✅ Válidas: `Password123`, `MiClave2024`
- ❌ Inválidas: `pass` (corta), `password` (sin mayúscula), `PASSWORD` (sin minúscula), `Password` (sin número)

---

#### **4. validateAge**
```javascript
export const validateAge = (age) => {
  validateNotEmpty('edad', age);
  
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
    throw new InvalidAgeException();
  }
};
```
**Función:** Valida edad en rango válido
**Validaciones:**
1. No está vacía
2. Es un número válido
3. Mayor o igual a 18
4. Menor o igual a 100

---

#### **5. validatePhone**
```javascript
export const validatePhone = (phone) => {
  validateNotEmpty('teléfono', phone);
  
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    throw new InvalidPhoneException();
  }
};
```
**Función:** Valida formato de teléfono
**Validaciones:**
1. No está vacío
2. Exactamente 10 dígitos numéricos

**Ejemplos:**
- ✅ Válidos: `3001234567`, `6012345678`
- ❌ Inválidos: `300-123-4567` (guiones), `300123456` (9 dígitos), `abc1234567` (letras)

---

#### **6. validateMinLength** (Genérico)
```javascript
export const validateMinLength = (field, value, minLength) => {
  validateNotEmpty(field, value);
  
  if (value.length < minLength) {
    throw new ValidationException(
      field,
      `El campo ${field} debe tener al menos ${minLength} caracteres`
    );
  }
};
```
**Función:** Validador genérico de longitud mínima
**Uso flexible:** Puede aplicarse a cualquier campo

---

## 🧩 Componentes

### **Componentes de Input**

Todos los componentes de input siguen una estructura consistente:

#### **Props comunes:**
```javascript
{
  label,        // Etiqueta del campo
  name,         // Nombre del campo (debe coincidir con el estado)
  value,        // Valor actual del campo
  onChange,     // Función para manejar cambios
  placeholder,  // Texto de ayuda
  error,        // Mensaje de error (si existe)
  required      // Si el campo es obligatorio
}
```

---

### **1. InputText**

```jsx
<InputText
  label="Nombre Completo"
  name="nombre"
  value={formData.nombre}
  onChange={handleInputChange}
  placeholder="Ej: Juan Pérez"
  error={errors.nombre}
  required
/>
```

**Características:**
- Input de texto genérico
- Estilo de error condicional
- Indicador visual de campo requerido (*)

---

### **2. InputEmail**

```jsx
<InputEmail
  label="Correo Electrónico"
  name="email"
  value={formData.email}
  onChange={handleInputChange}
  placeholder="ejemplo@correo.com"
  error={errors.email}
  required
/>
```

**Características:**
- Type="email" para validación HTML5 nativa
- Teclado optimizado en móviles (@, .com)

---

### **3. InputPassword**

```jsx
<InputPassword
  label="Contraseña"
  name="password"
  value={formData.password}
  onChange={handleInputChange}
  placeholder="Mínimo 8 caracteres"
  error={errors.password}
  required
/>
```

**Características especiales:**
- ✅ Botón para mostrar/ocultar contraseña (👁️)
- ✅ Estado interno con `useState` para visibilidad
- ✅ Type dinámico (text/password)

**Implementación:**
```javascript
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
```

---

### **4. InputNumber**

```jsx
<InputNumber
  label="Edad"
  name="edad"
  value={formData.edad}
  onChange={handleInputChange}
  placeholder="18"
  min="18"
  max="100"
  error={errors.edad}
  required
/>
```

**Características:**
- Props adicionales: `min`, `max`
- Flechas de incremento/decremento ocultas en CSS
- Teclado numérico en móviles

---

### **5. InputSelect**

```jsx
<InputSelect
  label="País"
  name="pais"
  value={formData.pais}
  onChange={handleInputChange}
  options={paisesOptions}
  error={errors.pais}
  required
/>
```

**Características:**
- Recibe array de opciones: `[{value, label}]`
- Opción por defecto: "Seleccione una opción"
- Flecha personalizada con CSS

**Formato de opciones:**
```javascript
const paisesOptions = [
  { value: 'colombia', label: 'Colombia' },
  { value: 'mexico', label: 'México' },
  // ...
];
```

---

### **6. ErrorMessage**

```jsx
<ErrorMessage errors={errors} />
```

**Función:** Muestra todos los errores de validación en un contenedor destacado

**Características:**
- ✅ Solo se renderiza si hay errores
- ✅ Animación de "shake" al aparecer
- ✅ Lista todos los errores por campo
- ✅ Diseño llamativo con ícono de advertencia

**Implementación:**
```javascript
if (!errors || Object.keys(errors).length === 0) {
  return null;  // No renderizar si no hay errores
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
```

---

### **7. SuccessModal**

```jsx
<SuccessModal
  isOpen={showModal}
  onClose={handleCloseModal}
  userData={submittedData}
/>
```

**Función:** Muestra los datos registrados exitosamente

**Características:**
- ✅ Overlay con blur de fondo
- ✅ Modal centrado con animación
- ✅ Muestra todos los datos del formulario
- ✅ Formateo de datos (país capitalizado)
- ✅ Click fuera del modal para cerrar

**Validación de datos:**
```javascript
if (!isOpen || !userData) return null;

const formatPais = (pais) => {
  if (!pais) return '';
  return pais.charAt(0).toUpperCase() + pais.slice(1);
};
```

---

## 🔄 Flujo de Validación

### **Flujo completo del formulario:**

```
┌─────────────────────────────────────────────────────┐
│  1. Usuario escribe en un campo                     │
│     ↓                                               │
│  2. handleInputChange() actualiza formData          │
│     ↓                                               │
│  3. Limpia el error de ese campo (si existía)       │
│     ↓                                               │
│  4. Usuario hace clic en "Registrar"                │
│     ↓                                               │
│  5. handleSubmit() previene el submit por defecto   │
│     ↓                                               │
│  6. Ejecuta validateForm()                          │
│     ↓                                               │
│  ┌──────────────────────────────────────────┐       │
│  │  Para cada campo:                        │       │
│  │    try {                                 │       │
│  │      validatorFunction(value)            │       │
│  │    } catch (error) {                     │       │
│  │      newErrors[field] = error.message    │       │
│  │    }                                     │       │
│  └──────────────────────────────────────────┘       │
│     ↓                                               │
│  7. setErrors(newErrors)                            │
│     ↓                                               │
│  8. ¿Hay errores?                                   │
│     │                                               │
│     ├─ SÍ → Muestra ErrorMessage                    │
│     │        Usuario corrige errores                │
│     │        Vuelve al paso 1                       │
│     │                                               │
│     └─ NO → 9. Guardar datos en submittedData       │
│              10. Mostrar SuccessModal               │
│              11. Limpiar formulario                 │
│              12. Usuario cierra modal               │
│              13. Listo para nuevo registro          │
└─────────────────────────────────────────────────────┘
```

---

### **Implementación en App.jsx**

#### **Estado del formulario:**
```javascript
const [formData, setFormData] = useState({
  nombre: '',
  email: '',
  password: '',
  edad: '',
  telefono: '',
  pais: '',
});

const [errors, setErrors] = useState({});
const [showModal, setShowModal] = useState(false);
const [submittedData, setSubmittedData] = useState(null);
```

---

#### **Función handleInputChange:**
```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  // Actualizar el valor del campo
  setFormData({
    ...formData,
    [name]: value,
  });

  // Limpiar error del campo mientras el usuario escribe
  if (errors[name]) {
    setErrors({
      ...errors,
      [name]: null,
    });
  }
};
```

**Características:**
- Usa destructuring para obtener `name` y `value`
- Actualiza solo el campo modificado (spread operator)
- Limpia el error inmediatamente para mejor UX

---

#### **Función validateForm:**
```javascript
const validateForm = () => {
  const newErrors = {};

  // Validar nombre
  try {
    validateNotEmpty('nombre', formData.nombre);
  } catch (error) {
    newErrors.nombre = error.message;
  }

  // Validar email
  try {
    validateEmail(formData.email);
  } catch (error) {
    newErrors.email = error.message;
  }

  // Validar password
  try {
    validatePassword(formData.password);
  } catch (error) {
    newErrors.password = error.message;
  }

  // Validar edad
  try {
    validateAge(formData.edad);
  } catch (error) {
    newErrors.edad = error.message;
  }

  // Validar teléfono
  try {
    validatePhone(formData.telefono);
  } catch (error) {
    newErrors.telefono = error.message;
  }

  // Validar país
  try {
    validateNotEmpty('país', formData.pais);
  } catch (error) {
    newErrors.pais = error.message;
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Patrón Try-Catch:**
- Cada validación está envuelta en try-catch
- Si se lanza una excepción, se captura el mensaje
- Todos los errores se acumulan en `newErrors`
- Retorna `true` si no hay errores

---

#### **Función handleSubmit:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();  // Prevenir recarga de página

  if (validateForm()) {
    console.log('Formulario válido:', formData);
    
    // IMPORTANTE: Guardar datos ANTES de resetear
    setSubmittedData({ ...formData });
    
    // Mostrar modal de éxito
    setShowModal(true);
    
    // Limpiar formulario para nueva entrada
    setFormData({
      nombre: '',
      email: '',
      password: '',
      edad: '',
      telefono: '',
      pais: '',
    });
  } else {
    console.log('Formulario con errores:', errors);
  }
};
```

**Orden crítico:**
1. Guardar datos en `submittedData`
2. Mostrar modal
3. Resetear formulario

*Si se invierte el orden, el modal mostrará campos vacíos*

---

## 🎯 Manejo de Errores

### **Estrategia de Manejo de Errores**

El proyecto implementa una estrategia de **validación defensiva** con múltiples capas:

#### **Capa 1: Validación HTML5 (Básica)**
```jsx
<input
  type="email"          // Validación de formato básico
  required              // No permite envío vacío
  min="18"              // Valor mínimo
  max="100"             // Valor máximo
/>
```

#### **Capa 2: Validación JavaScript (Personalizada)**
```javascript
try {
  validateEmail(email);   // Validación con regex personalizado
} catch (error) {
  // Capturar y mostrar error
}
```

#### **Capa 3: Feedback Visual**
```css
.input-error {
  border-color: #e74c3c;
  background-color: #fff5f5;
}
```

---

### **Tipos de Feedback**

#### **1. Error por campo (Inline)**
```jsx
<input className={`input-field ${error ? 'input-error' : ''}`} />
```
- Borde rojo en el input
- Fondo ligeramente rojo

#### **2. Mensajes de error agrupados**
```jsx
<ErrorMessage errors={errors} />
```
- Contenedor destacado en la parte superior
- Lista todos los errores
- Animación de "shake"

#### **3. Limpieza automática de errores**
```javascript
if (errors[name]) {
  setErrors({ ...errors, [name]: null });
}
```
- Los errores desaparecen al corregir el campo

---

### **Mejores Prácticas Implementadas**

✅ **Validación temprana**: Se valida mientras el usuario escribe
✅ **Mensajes claros**: Errores descriptivos y accionables
✅ **Feedback inmediato**: Sin necesidad de enviar el formulario
✅ **Experiencia no intrusiva**: Los errores no bloquean la interacción
✅ **Consistencia visual**: Todos los errores se muestran igual
✅ **Accesibilidad**: Labels asociados con inputs (htmlFor/id)

---

## 🎨 Estilos y UX

### **Características de diseño:**

- **Gradientes modernos**: Fondo morado-azul
- **Animaciones suaves**: Entrada, hover, focus
- **Estados visuales claros**: Normal, focus, error, disabled
- **Responsive design**: Adaptable a todos los dispositivos
- **Feedback táctil**: Escalado en botones al hacer clic
- **Modal elegante**: Overlay con blur, animación slide-up

### **Paleta de colores:**

- **Principal**: #667eea → #764ba2 (gradiente morado)
- **Éxito**: #11998e → #38ef7d (gradiente verde)
- **Error**: #ff6b6b → #ee5a6f (gradiente rojo)
- **Texto**: #333 (oscuro), #666 (medio), #aaa (placeholder)

---

## 📚 Conceptos Clave Aprendidos

### ✅ **Excepciones Personalizadas**
- Creación de clases que extienden `Error`
- Jerarquía de excepciones
- Propiedades personalizadas (field, timestamp)

### ✅ **Try-Catch**
- Captura de excepciones
- Manejo de múltiples errores
- Acumulación de errores de validación

### ✅ **Validaciones**
- Validación con expresiones regulares (regex)
- Validación de rangos numéricos
- Validación de formatos específicos
- Validaciones en cascada

### ✅ **Componentes Modulares**
- Un componente por tipo de input
- Reutilización de código
- Props consistentes
- Separación de responsabilidades

### ✅ **Gestión de Estado**
- useState para formularios
- Estado para errores
- Estado para modal
- Estado para datos enviados

### ✅ **Manejo de Eventos**
- preventDefault()
- Destructuring de event.target
- onChange handlers
- onClick handlers

### ✅ **Arquitectura de Carpetas**
- Separación por tipo (components, exceptions, css)
- Escalabilidad
- Mantenibilidad

---

## 🐛 Solución de Problemas Comunes

### **Problema 1: Los datos no aparecen en el modal**
**Causa:** El formulario se resetea antes de mostrar el modal
**Solución:** Usar un estado separado (`submittedData`) para guardar los datos antes de resetear

```javascript
setSubmittedData({ ...formData });  // Primero guardar
setShowModal(true);                 // Luego mostrar
setFormData({ /* vacío */ });       // Finalmente resetear
```

---

### **Problema 2: Los errores no desaparecen al escribir**
**Causa:** No se limpian los errores en `handleInputChange`
**Solución:**
```javascript
if (errors[name]) {
  setErrors({ ...errors, [name]: null });
}
```

---

### **Problema 3: Validación no funciona**
**Causa:** No se está usando try-catch correctamente
**Solución:** Envolver cada validación en su propio try-catch

```javascript
try {
  validateEmail(formData.email);
} catch (error) {
  newErrors.email = error.message;
}
```

---

### **Problema 4: El modal no se cierra**
**Causa:** Falta la función `handleCloseModal`
**Solución:**
```javascript
const handleCloseModal = () => {
  setShowModal(false);
};
```

---

### **Problema 5: Error "Cannot read property of undefined"**
**Causa:** `userData` puede ser null en el modal
**Solución:**
```javascript
if (!isOpen || !userData) return null;
```

---

## 🚀 Posibles Mejoras

### **Funcionalidades adicionales:**

1. **Validación asíncrona:**
   - Verificar si el email ya existe en BD
   - Validar código postal con API

2. **Más campos:**
   - Fecha de nacimiento con date picker
   - Dirección con autocompletado
   - Upload de foto de perfil

3. **Persistencia:**
   - Guardar formulario en localStorage
   - Recuperar datos al recargar página

4. **Feedback mejorado:**
   - Indicador de fortaleza de contraseña
   - Sugerencias de corrección
   - Tooltips de ayuda

5. **Accesibilidad:**
   - ARIA labels
   - Navegación por teclado
   - Modo de alto contraste

6. **Internacionalización:**
   - Múltiples idiomas
   - Formatos de fecha/hora localizados

---

## 👨‍💻 Autor

Kevin Nicolas Sierra Gonzalez

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🎓 Recursos de Aprendizaje

### **Conceptos relacionados:**
- [MDN - Error](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [MDN - Try...Catch](https://developer.mozilla.org/es/docs/Web/JavaScript)