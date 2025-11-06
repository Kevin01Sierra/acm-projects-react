# ⏱️ Cronómetro con React

Aplicación de cronómetro desarrollada con **React** y **Vite**, utilizando los hooks `useState`, `useEffect` y `useContext` para gestionar el estado, los efectos secundarios y el estado global de la aplicación.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Funcionamiento](#funcionamiento)
- [Hooks Utilizados](#hooks-utilizados)
- [Componentes](#componentes)
- [Sistema de Temas con useContext](#sistema-de-temas-con-usecontext)

## ✨ Características

- ▶️ **Play**: Iniciar el cronómetro
- ⏸️ **Pause**: Pausar el cronómetro
- 🔄 **Reset**: Reiniciar el cronómetro a 00:00:00
- 🎨 **Tema Claro/Oscuro**: Cambiar entre modos visual con useContext
- 📱 Diseño responsive
- 🎨 Interfaz moderna con gradientes
- ⏰ Formato de tiempo HH:MM:SS
- 🟢 Indicador visual de estado (corriendo/detenido)

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 6.0.5** - Herramienta de construcción rápida para proyectos web
- **CSS3** - Estilos con gradientes y animaciones
- **Hooks de React** - useState, useEffect y useContext

## 📁 Estructura del Proyecto

```
cronometro/
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx    # Context API para gestión de temas
│   ├── components/
│   │   ├── Display.jsx         # Componente para mostrar el tiempo
│   │   ├── Botones.jsx         # Componente con los botones de control
│   │   └── ThemeToggle.jsx     # Componente para cambiar el tema
│   ├── css/
│   │   ├── App.css             # Estilos principales y temas
│   │   ├── Display.css         # Estilos del display del tiempo
│   │   ├── Botones.css         # Estilos de los botones
│   │   └── ThemeToggle.css     # Estilos del botón de tema
│   ├── App.jsx                 # Componente principal con la lógica
│   └── main.jsx                # Punto de entrada con ThemeProvider
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
6. El botón de **tema** (🌙/☀️) alterna entre modo claro y oscuro

### Formato del tiempo:

El cronómetro muestra el tiempo en formato **HH:MM:SS**:
- `00:00:15` → 15 segundos
- `00:05:30` → 5 minutos y 30 segundos
- `01:30:45` → 1 hora, 30 minutos y 45 segundos

## 🪝 Hooks Utilizados

### 1. **useState** - Manejo del Estado Local

El hook `useState` se utiliza para gestionar dos estados principales del cronómetro:

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

### 3. **useContext** - Gestión del Estado Global

El hook `useContext` permite compartir el estado del tema entre todos los componentes sin necesidad de pasar props manualmente (evitando el "prop drilling").

#### **Creación del Context:**

```jsx
// ThemeContext.jsx
import { createContext, useState, useContext } from 'react';

// 1. Crear el Context
const ThemeContext = createContext();

// 2. Crear el Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook personalizado para consumir el contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  
  return context;
}
```

#### **Uso en main.jsx:**

```jsx
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
```

#### **Consumo en componentes:**

```jsx
// En App.jsx
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={`app-container ${theme}`}>
      {/* ... */}
    </div>
  );
}

// En ThemeToggle.jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

#### **Ventajas de useContext:**

✅ **Evita Prop Drilling**: No necesitas pasar props a través de múltiples niveles de componentes
✅ **Estado Global**: El tema es accesible desde cualquier componente que lo necesite
✅ **Código Limpio**: Los componentes solo importan lo que necesitan
✅ **Fácil Mantenimiento**: Cambios en el contexto no afectan la estructura de componentes
✅ **Reutilizable**: El hook `useTheme()` se puede usar en cualquier componente

#### **Comparación: Con y Sin Context**

**❌ Sin Context (Prop Drilling):**
```jsx
// Pasar props manualmente a través de múltiples niveles
<App theme={theme} toggleTheme={toggleTheme}>
  <Header theme={theme} toggleTheme={toggleTheme}>
    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
  </Header>
  <Display theme={theme} />
  <Botones theme={theme} />
</App>
```

**✅ Con Context:**
```jsx
// Cualquier componente accede directamente al contexto
<ThemeProvider>
  <App>
    <Header>
      <ThemeToggle /> {/* Usa useTheme() internamente */}
    </Header>
    <Display /> {/* Puede acceder al tema si lo necesita */}
    <Botones />
  </App>
</ThemeProvider>
```

### 🔄 Flujo de los Hooks

```
Usuario presiona "Play"
    ↓
handlePlay() → setIsRunning(true)  [useState]
    ↓
useEffect detecta cambio en isRunning  [useEffect]
    ↓
Se crea setInterval
    ↓
Cada 1 segundo: setTiempo(prev => prev + 1)
    ↓
El componente se re-renderiza con el nuevo tiempo
    ↓
Usuario presiona el botón de tema 🌙
    ↓
toggleTheme() en ThemeContext  [useContext]
    ↓
Cambia theme de 'light' a 'dark'
    ↓
TODOS los componentes que usan useTheme() se re-renderizan
    ↓
La aplicación cambia a modo oscuro
```

## 🧩 Componentes

### **App.jsx** (Componente Principal)

Responsabilidades:
- ✅ Gestiona el estado del cronómetro (`tiempo`, `isRunning`)
- ✅ Implementa la lógica con `useEffect`
- ✅ Define las funciones de control (play, pause, reset)
- ✅ Formatea el tiempo a HH:MM:SS
- ✅ Consume el contexto de tema con `useTheme()`
- ✅ Coordina los componentes hijos

```jsx
import { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';

function App() {
  const [tiempo, setTiempo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { theme } = useTheme(); // Consumir contexto

  useEffect(() => {
    // Lógica del intervalo...
  }, [isRunning]);

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle />
      {/* ... resto del componente */}
    </div>
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

### **ThemeToggle.jsx** (Componente de Tema)

Responsabilidades:
- ✅ Renderiza el botón para cambiar el tema
- ✅ Consume el contexto con `useTheme()`
- ✅ No requiere props (obtiene todo del contexto)

```jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
      <span>{theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
    </button>
  );
}
```

**Context consumido:**
- `theme` (string): Tema actual ('light' o 'dark')
- `toggleTheme` (function): Función para alternar el tema

### **ThemeContext.jsx** (Context Provider)

Responsabilidades:
- ✅ Define el contexto de tema
- ✅ Provee el estado global del tema
- ✅ Expone funciones para modificar el tema
- ✅ Proporciona hook personalizado `useTheme()`

```jsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}
```

## 🎨 Sistema de Temas con useContext

### Implementación del Sistema de Temas

El proyecto utiliza **Context API** con `useContext` para implementar un sistema de temas global que permite cambiar entre modo claro y oscuro sin necesidad de pasar props a través de múltiples componentes.

### Arquitectura del Context

```
ThemeContext.jsx (Context + Provider)
         ↓
    main.jsx (Envuelve App con ThemeProvider)
         ↓
    ┌────────────────────────────────┐
    │    Todos los componentes       │
    │    pueden usar useTheme()      │
    └────────────────────────────────┘
         ↓              ↓
    App.jsx      ThemeToggle.jsx
  (consume theme) (consume theme + toggleTheme)
```

### Flujo de Datos con useContext

```
1. Usuario hace clic en ThemeToggle
         ↓
2. Se ejecuta toggleTheme() del contexto
         ↓
3. El estado 'theme' cambia en ThemeProvider
         ↓
4. React notifica a TODOS los componentes que usan useTheme()
         ↓
5. Los componentes se re-renderizan con el nuevo tema
         ↓
6. Los estilos CSS cambian automáticamente (.app-container.dark)
```

### Estilos Dinámicos

Los estilos se aplican dinámicamente usando clases CSS condicionales:

**Modo Claro:**
```css
.app-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Modo Oscuro:**
```css
.app-container.dark {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
```

### Características del diseño:

#### **Modo Claro:**
- **Fondo:** Gradiente morado-azul vibrante
- **Card:** Fondo blanco brillante
- **Display:** Gradiente gris claro
- **Botones:** Colores vivos (verde, naranja, rojo)

#### **Modo Oscuro:**
- **Fondo:** Gradiente azul oscuro profundo
- **Card:** Fondo azul marino (#0f3460)
- **Display:** Gradiente azul oscuro
- **Botones:** Colores atenuados adaptados al tema oscuro
- **Texto:** Colores claros para mejor legibilidad

### Responsive:
- Adaptable a dispositivos móviles
- El texto del botón de tema se oculta en pantallas pequeñas
- Solo muestra el icono 🌙/☀️ en móviles

## 📚 Conceptos Clave Aprendidos

### ✅ **useState**
- Gestión del estado en componentes funcionales
- Estado inmutable (usar siempre funciones setter)
- Estado basado en el estado anterior con callbacks
- Estados independientes para diferentes propósitos

### ✅ **useEffect**
- Manejo de efectos secundarios
- Dependencias para controlar cuándo se ejecuta
- Cleanup functions para evitar fugas de memoria
- Temporizadores y asincronía
- Sincronización con el estado

### ✅ **useContext**
- Gestión de estado global sin prop drilling
- Creación de Context con `createContext()`
- Provider para compartir valores
- Consumer con `useContext()` hook
- Hooks personalizados para encapsular lógica del contexto
- Validación de contexto con error handling

### ✅ **Componentes**
- Separación de responsabilidades
- Componentes reutilizables
- Props para comunicación entre componentes
- Composición de componentes
- Componentes presentacionales vs contenedores

### ✅ **Context API**
- Proveedores (Providers) y consumidores
- Estado compartido entre componentes
- Evitar prop drilling
- Hooks personalizados para contexts
- Buenas prácticas de contexto

### ✅ **Buenas Prácticas**
- Estructura de carpetas organizada
- Separación de concerns (lógica, presentación, estilos)
- CSS modular
- Nombres descriptivos
- Código limpio y comentado
- Manejo de errores en contexts

## 🔄 Comparación de Patrones

### Gestión de Estado:

| Patrón | Uso en el Proyecto | Hook Utilizado |
|--------|-------------------|----------------|
| **Estado Local** | Tiempo del cronómetro, estado play/pause | `useState` |
| **Efectos** | Intervalo del cronómetro | `useEffect` |
| **Estado Global** | Tema de la aplicación (claro/oscuro) | `useContext` |

### Cuándo usar cada hook:

- **useState**: Para estado local de un componente específico
- **useEffect**: Para sincronizar con sistemas externos (timers, APIs)
- **useContext**: Para estado que necesitan múltiples componentes

## 🛠️ Estructura de Datos

### Estado Local (useState):
```javascript
tiempo: number        // Segundos transcurridos
isRunning: boolean    // Estado del cronómetro
```

### Estado Global (useContext):
```javascript
theme: 'light' | 'dark'           // Tema actual
toggleTheme: () => void           // Función para cambiar tema
```

## 🐛 Solución de Problemas

### El cronómetro no se detiene al presionar Pause:
- Verificar que el cleanup en `useEffect` esté limpiando el intervalo correctamente

### Múltiples cronómetros corriendo simultáneamente:
- Asegurarse de que la función cleanup está implementada

### Los botones no se deshabilitan correctamente:
- Revisar que las props `isRunning` se pasen correctamente a `Botones.jsx`

### El tema no cambia al hacer clic:
- Verificar que `ThemeProvider` envuelve la aplicación en `main.jsx`
- Confirmar que `useTheme()` se está usando dentro de un componente hijo de `ThemeProvider`
- Revisar que las clases CSS `.dark` estén definidas correctamente

### Error "useTheme must be used within ThemeProvider":
- Asegurar que el componente que usa `useTheme()` está dentro del árbol de `<ThemeProvider>`
- Verificar que `ThemeProvider` está en `main.jsx` envolviendo `<App />`

### Los estilos del tema oscuro no se aplican:
- Confirmar que la clase `${theme}` se está agregando al contenedor principal
- Verificar que todos los archivos CSS tienen los estilos `.app-container.dark`

## 👨‍💻 Autor

Kevin Nicolas Sierra Gonzalez

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.