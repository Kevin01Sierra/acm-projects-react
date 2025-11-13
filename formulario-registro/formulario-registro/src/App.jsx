import { useState } from 'react';
import './css/App.css';
import InputText from './components/InputText';
import InputEmail from './components/InputEmail';
import InputPassword from './components/InputPassword';
import InputNumber from './components/InputNumber';
import InputSelect from './components/InputSelect';
import ErrorMessage from './components/ErrorMessage';
import SuccessModal from './components/SuccessModal';
import {
  validateNotEmpty,
  validateEmail,
  validatePassword,
  validateAge,
  validatePhone,
} from './exceptions/validators';

function App() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    telefono: '',
    pais: '',
  });

  // Estado de errores
  const [errors, setErrors] = useState({});

  // Estado del modal
  const [showModal, setShowModal] = useState(false);
  
  // ✅ NUEVO: Estado para guardar los datos enviados
  const [submittedData, setSubmittedData] = useState(null);

  // Opciones para el select de países
  const paisesOptions = [
    { value: 'colombia', label: 'Colombia' },
    { value: 'mexico', label: 'México' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'chile', label: 'Chile' },
    { value: 'peru', label: 'Perú' },
  ];

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};

    try {
      validateNotEmpty('nombre', formData.nombre);
    } catch (error) {
      newErrors.nombre = error.message;
    }

    try {
      validateEmail(formData.email);
    } catch (error) {
      newErrors.email = error.message;
    }

    try {
      validatePassword(formData.password);
    } catch (error) {
      newErrors.password = error.message;
    }

    try {
      validateAge(formData.edad);
    } catch (error) {
      newErrors.edad = error.message;
    }

    try {
      validatePhone(formData.telefono);
    } catch (error) {
      newErrors.telefono = error.message;
    }

    try {
      validateNotEmpty('país', formData.pais);
    } catch (error) {
      newErrors.pais = error.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Formulario válido:', formData);
      
      // ✅ PRIMERO: Guardar los datos en un estado separado
      setSubmittedData({ ...formData });
      
      // ✅ SEGUNDO: Mostrar el modal
      setShowModal(true);
      
      // ✅ TERCERO: Resetear formulario
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Formulario de Registro</h1>
        <p className="form-subtitle">Complete todos los campos requeridos</p>

        <ErrorMessage errors={errors} />

        <form onSubmit={handleSubmit} className="form">
          <InputText
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Juan Pérez"
            error={errors.nombre}
            required
          />

          <InputEmail
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ejemplo@correo.com"
            error={errors.email}
            required
          />

          <InputPassword
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mínimo 8 caracteres"
            error={errors.password}
            required
          />

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

          <InputText
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="3001234567"
            error={errors.telefono}
            required
          />

          <InputSelect
            label="País"
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            options={paisesOptions}
            error={errors.pais}
            required
          />

          <button type="submit" className="btn-submit">
            Registrar
          </button>
        </form>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={handleCloseModal}
        userData={submittedData}  // ✅ Ahora usa los datos guardados
      />
    </div>
  );
}

export default App;