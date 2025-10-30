# ⏱️ Cronómetro con React

Aplicación de cronómetro desarrollada con **React** y **Vite**, utilizando los hooks `useState` y `useEffect` para gestionar el estado y los efectos secundarios.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Funcionamiento](#funcionamiento)
- [Hooks Utilizados](#hooks-utilizados)
- [Componentes](#componentes)

## ✨ Características

- ▶️ **Play**: Iniciar el cronómetro
- ⏸️ **Pause**: Pausar el cronómetro
- 🔄 **Reset**: Reiniciar el cronómetro a 00:00:00
- 📱 Diseño responsive
- 🎨 Interfaz moderna con gradientes
- ⏰ Formato de tiempo HH:MM:SS
- 🟢 Indicador visual de estado (corriendo/detenido)

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 6.0.5** - Herramienta de construcción rápida para proyectos web
- **CSS3** - Estilos con gradientes y animaciones
- **Hooks de React** - useState y useEffect

## 📁 Estructura del Proyecto

```
cronometro/
├── src/
│   ├── components/
│   │   ├── Display.jsx      # Componente para mostrar el tiempo
│   │   └── Botones.jsx      # Componente con los botones de control
│   ├── css/
│   │   ├── App.css          # Estilos principales y contenedor
│   │   ├── Display.css      # Estilos del display del tiempo
│   │   └── Botones.css      # Estilos de los botones
│   ├── App.jsx              # Componente principal con la lógica
│   └── main.jsx             # Punto de entrada de la aplicación
├── package.json
└── README.md
```

## 🚀 Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd cronometro
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar el proyecto:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```
http://localhost:5173
```

## ⚙️ Funcionamiento

### Flujo de la aplicación:

1. El usuario ve el cronómetro en **00:00:00** y el estado "Detenido"
2. Al presionar **Play**, el cronómetro comienza a contar
3. El estado cambia a "En ejecución" (verde)
4. El usuario puede **Pausar** en cualquier momento
5. El botón **Reset** reinicia todo a 0

### Formato del tiempo:

El cronómetro muestra el tiempo en formato **HH:MM:SS**:
- `00:00:15` → 15 segundos
- `00:05:30` → 5 minutos y 30 segundos
- `01:30:45` → 1 hora, 30 minutos y 45 segundos

## 🪝 Hooks Utilizados

### 1. **useState** - Manejo del Estado

El hook `useState` se utiliza para gestionar dos estados principales:

```jsx
const [tiempo, setTiempo] = useState(0);
const [isRunning, setIsRunning] = useState(false);
```

#### **Estado `tiempo`:**
- **Propósito:** Almacenar los segundos transcurridos
- **Valor inicial:** `0`
- **Actualización:** Se incrementa cada segundo cuando el cronómetro está corriendo
- **Tipo:** `number`

```jsx
// Ejemplo de actualización:
setTiempo((prevTiempo) => prevTiempo + 1);
```

#### **Estado `isRunning`:**
- **Propósito:** Controlar si el cronómetro está en ejecución o pausado
- **Valor inicial:** `false` (detenido)
- **Actualización:** Cambia a `true` al presionar Play, `false` al presionar Pause
- **Tipo:** `boolean`

```jsx
// Ejemplos de uso:
const handlePlay = () => setIsRunning(true);   // Iniciar
const handlePause = () => setIsRunning(false);  // Pausar
```

### 2. **useEffect** - Gestión del Intervalo

El hook `useEffect` maneja el efecto secundario del temporizador:

```jsx
useEffect(() => {
  let intervalo;

  if (isRunning) {
    intervalo = setInterval(() => {
      setTiempo((prevTiempo) => prevTiempo + 1);
    }, 1000);
  }

  return () => {
    if (intervalo) {
      clearInterval(intervalo);
    }
  };
}, [isRunning]);
```

#### **Funcionamiento:**

1. **Dependencia `[isRunning]`:** 
   - El efecto se ejecuta cuando `isRunning` cambia
   - Si es `true`, crea un intervalo
   - Si es `false`, el intervalo no se crea

2. **Intervalo (`setInterval`):**
   - Se ejecuta cada 1000ms (1 segundo)
   - Incrementa el estado `tiempo` en 1

3. **Cleanup function:**
   - La función de retorno limpia el intervalo
   - Previene fugas de memoria
   - Se ejecuta cuando el componente se desmonta o antes de ejecutar el efecto nuevamente

#### **¿Por qué es importante el cleanup?**

Sin el cleanup, cada vez que cambiaras `isRunning`, se crearía un nuevo intervalo sin eliminar el anterior, resultando en múltiples temporizadores corriendo simultáneamente.

### 🔄 Flujo de los Hooks

```
Usuario presiona "Play"
    ↓
handlePlay() → setIsRunning(true)
    ↓
useEffect detecta cambio en isRunning
    ↓
Se crea setInterval
    ↓
Cada 1 segundo: setTiempo(prev => prev + 1)
    ↓
El componente se re-renderiza con el nuevo tiempo
    ↓
Usuario presiona "Pause"
    ↓
handlePause() → setIsRunning(false)
    ↓
useEffect ejecuta cleanup → clearInterval()
    ↓
El cronómetro se detiene
```

## 🧩 Componentes

### **App.jsx** (Componente Principal)

Responsabilidades:
- ✅ Gestiona el estado del cronómetro (`tiempo`, `isRunning`)
- ✅ Implementa la lógica con `useEffect`
- ✅ Define las funciones de control (play, pause, reset)
- ✅ Formatea el tiempo a HH:MM:SS
- ✅ Coordina los componentes hijos

```jsx
function App() {
  const [tiempo, setTiempo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Lógica del intervalo...
  }, [isRunning]);

  // Funciones de control...

  return (
    // JSX del componente...
  );
}
```

### **Display.jsx** (Componente de Presentación)

Responsabilidades:
- ✅ Muestra el tiempo formateado
- ✅ Recibe `tiempo` como prop
- ✅ Componente puro (solo presentación)

```jsx
function Display({ tiempo }) {
  return (
    <div className="display-container">
      <p className="display-tiempo">{tiempo}</p>
    </div>
  );
}
```

**Props:**
- `tiempo` (string): Tiempo formateado en formato HH:MM:SS

### **Botones.jsx** (Componente de Control)

Responsabilidades:
- ✅ Renderiza los botones de control
- ✅ Deshabilita botones según el estado
- ✅ Ejecuta callbacks del componente padre

```jsx
function Botones({ isRunning, onPlay, onPause, onReset }) {
  return (
    <div className="botones-container">
      <button onClick={onPlay} disabled={isRunning}>
        ▶ Play
      </button>
      <button onClick={onPause} disabled={!isRunning}>
        ⏸ Pause
      </button>
      <button onClick={onReset}>
        🔄 Reset
      </button>
    </div>
  );
}
```

**Props:**
- `isRunning` (boolean): Estado del cronómetro
- `onPlay` (function): Callback para iniciar
- `onPause` (function): Callback para pausar
- `onReset` (function): Callback para reiniciar

## 🎨 Estilos

### Características del diseño:

- **Fondo:** Gradiente morado-azul
- **Card:** Fondo blanco con sombra profunda y bordes redondeados
- **Display:** Gradiente gris con efecto inset
- **Botones:** 
  - Verde (Play)
  - Naranja (Pause)
  - Rojo (Reset)
- **Animaciones:** Hover effects y transiciones suaves
- **Responsive:** Adaptable a dispositivos móviles

## 📚 Conceptos Clave Aprendidos

### ✅ **useState**
- Gestión del estado en componentes funcionales
- Estado inmutable (usar siempre funciones setter)
- Estado basado en el estado anterior con callbacks

### ✅ **useEffect**
- Manejo de efectos secundarios
- Dependencias para controlar cuándo se ejecuta
- Cleanup functions para evitar fugas de memoria
- Temporizadores y asincronía

### ✅ **Componentes**
- Separación de responsabilidades
- Componentes reutilizables
- Props para comunicación entre componentes

### ✅ **Buenas Prácticas**
- Estructura de carpetas organizada
- CSS modular
- Nombres descriptivos
- Código limpio y comentado

## 🐛 Solución de Problemas

### El cronómetro no se detiene al presionar Pause:
- Verificar que el cleanup en `useEffect` esté limpiando el intervalo correctamente

### Múltiples cronómetros corriendo simultáneamente:
- Asegurarse de que la función cleanup está implementada

### Los botones no se deshabilitan correctamente:
- Revisar que las props `isRunning` se pasen correctamente a `Botones.jsx`

## 👨‍💻 Autor

Kevin Nicolas Sierra Gonzalez

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.