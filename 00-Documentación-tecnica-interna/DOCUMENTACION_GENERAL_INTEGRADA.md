# Documentación General del Proyecto: INTEGRADA (Optimización de Proyectos con IA)

**Fecha de última actualización:** 4 de agosto de 2025

## 1. Visión General y Objetivos del Proyecto

**INTEGRADA** es una plataforma web diseñada para la gestión y optimización de proyectos de inteligencia artificial. Su objetivo principal es integrar múltiples modelos de lenguaje de gran tamaño (LLM) y ofrecer herramientas avanzadas para mejorar la eficiencia, calidad y velocidad en el ciclo de vida del desarrollo de IA.

### Características Principales:
*   **Integración Multi-LLM:** Conexión y gestión centralizada de modelos como Gemini, ChatGPT, Claude, etc.
*   **Optimización de Prompts 4-D:** Metodología para la creación de prompts efectivos.
*   **Agentes de IA Especializados:** Módulos de IA personalizables.
*   **Gestión de Proyectos y Seguimiento:** Herramientas visuales para la organización de proyectos.
*   **Generación Automática de Documentación:** Creación automática de documentación técnica.
*   **Editor de Código Integrado:** Editor con funcionalidades avanzadas.
*   **Previsualización en Vivo:** Observación en tiempo real de los resultados.

## 2. Stack Tecnológico y Arquitectura

*   **Frontend:** React.js, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Base de Datos:** MongoDB
*   **Autenticación:** JWT (JSON Web Tokens)
*   **Contenedores:** Docker
*   **Despliegue:** Netlify/Vercel (Frontend), Docker Swarm/Kubernetes (Backend)

## 3. Funcionalidades Principales

### Sistema de Optimización de Prompts (Metodología 4-D)
*   **ANALIZAR:** Análisis semántico de la entrada del usuario.
*   **DIAGNOSTICAR:** Validación de la completitud y claridad del prompt.
*   **DESARROLLAR:** Selección de técnicas de prompting avanzadas.
*   **ENTREGAR:** Generación de outputs optimizados.

### Agentes IA Especializados por Dominio
*   Agentes pre-entrenados para áreas como marca personal, desarrollo de apps, etc.

### Sistema de Gestión de Proyectos con Tracking
*   Creación y organización de proyectos, tareas e hitos.

### Generación Automática de Documentación Técnica
*   Generación de comentarios de código, descripciones de funciones y manuales.

### Exportación de Resultados en Múltiples Formatos
*   Soporte para TXT, Markdown, PDF, JSON, CSV, etc.

## 4. Integración de Servicios
*   **GitHub API:** Para control de versiones.
*   **Google Fonts:** Para tipografía.
*   **Unsplash API:** Para assets visuales.
*   **Firebase:** Para almacenamiento adicional.
*   **Netlify/Vercel:** Para despliegue automático.

## 5. Agente IA Asistente ("Gemini IA")
*   Asistente conversacional para guiar y apoyar al usuario.
*   Capacidades de autoaprendizaje y sistema de recomendaciones.

## 6. Interfaz de Usuario Avanzada
*   Dashboard interactivo con métricas en tiempo real.
*   Editor de código integrado con resaltado de sintaxis.
*   Previsualización de resultados en vivo.
*   Sistema de notificaciones y alertas.
*   Modo oscuro/claro adaptable.

## 7. Requisitos Específicos
*   Diseño responsivo para todos los dispositivos.
*   Accesibilidad (WCAG 2.1).
*   Performance optimizada (tiempo de carga < 3s).
*   Seguridad (OWASP Top 10).
*   Documentación técnica completa.

## 8. Estado Actual, Fases de Desarrollo y Progreso

El proyecto se encuentra aproximadamente en un **55% de su finalización**, actualmente en la **Fase 2: Funcionalidad Core**.

### Fases del Proyecto (Plan Detallado):
*   **Fase 0: Prerrequisitos y Configuración (Completada)**
    *   Instalación de software (Node.js, Git, Docker).
    *   Creación de cuentas en servicios externos (MongoDB Atlas, GitHub, etc.).
*   **Fase 1: Construcción del Backend (Completada)**
    *   Inicialización del proyecto y configuración del servidor Express.
    *   Implementación de la autenticación con JWT.
    *   Desarrollo del Gateway de API para los LLMs.
*   **Fase 2: Construcción del Frontend (En Progreso)**
    *   Inicialización de la aplicación de React y configuración de Tailwind CSS.
    *   Creación del layout principal y componentes de la UI.
*   **Fase 3: Conexión Frontend y Backend (Próxima)**
    *   Creación de un cliente de API en el frontend.
    *   Implementación del flujo de autenticación completo.
*   **Fase 4: Desarrollo de Funcionalidades Clave (Pendiente)**
    *   Integración del editor de código.
    *   Desarrollo de la gestión de proyectos (CRUD).
    *   Implementación del sistema de optimización 4-D.
*   **Fase 5: Despliegue (Pendiente)**
    *   Dockerización del backend.
    *   Despliegue del frontend en Netlify/Vercel.
    *   Despliegue del backend en un servicio de contenedores.

### Estructura del Proyecto (Monorepo)
```
ia-optimization-platform/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── Dockerfile
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── tailwind.config.js
└── package.json
```

### Bloqueadores Críticos Actuales:
1.  **Fallo del Script de Inicio:** El script `start_app.bat` no funciona correctamente, impidiendo el arranque integrado de la aplicación.

## 9. Conceptualización de la Interfaz de Usuario (UI/UX)

### Estética y Filosofía de Diseño
*   **Estética General:** Minimalista, moderna y centrada en la legibilidad y la interacción intuitiva.
*   **Paleta de Colores:**
    *   **Modo Oscuro:** Base `#121212` (Negro Profundo).
    *   **Modo Claro:** Base `#f8f8f8` (Blanco Puro).
    *   **Acento Principal:** `#4ecdc4` (Verde Azulado).
    *   **Alertas:** `#ff6b6b` (Rojo Coral).
*   **Tipografía:**
    *   **Títulos:** Familia 'Space Grotesk'.
    *   **Cuerpo de Texto:** Familia 'Inter'.
*   **Iconografía:** Iconos minimalistas y monocromáticos basados en líneas finas.
*   **Espaciado:** Abundante espacio en blanco para reducir la carga cognitiva.
*   **Animaciones:** Sutiles y funcionales para guiar al usuario y proporcionar retroalimentación visual.

### Vista 1: Panel de Control (Dashboard)
*   **Referencia Visual:** El archivo `Integrada Plataforma de Optimización.pdf` contiene un mockup detallado del dashboard.
*   **Navegación:** Barra lateral con acceso a las principales secciones.
*   **Área Principal:** Saludo de bienvenida, resumen de proyectos y actividad reciente.

### Vista 2: Editor de Proyectos y Optimización 4-D
*   **Panel Izquierdo:** Gestión del proyecto y metodología 4-D.
*   **Panel Central:** Editor de código integrado.
*   **Panel Derecho:** Previsualización en vivo y asistente de IA.

### Vista 3: Página de Aterrizaje (Landing Page)
*   Diseño atractivo con un titular llamativo y llamadas a la acción.
*   Secciones para describir las características principales del producto.

## 10. Protocolo de Git y Control de Versiones

El proyecto utiliza un flujo de trabajo basado en ramas (`feature/`, `bugfix/`, etc.) y un formato de mensaje de commit estandarizado. Se hace hincapié en no subir credenciales y en revisar los cambios antes de hacer `push`.

## 11. Registro de Errores Críticos

### Errores Resueltos:
*   Interrupciones de conexión a la API de Gemini.
*   Fallos en la creación del proyecto con Vite y en la inicialización de Tailwind CSS.
*   Problemas de sincronización con el repositorio remoto de Git.
*   Errores de `pathspec` en `git commit`.
*   Errores de conexión a MongoDB por variable de entorno no definida.
*   Vulnerabilidad de seguridad por credenciales en archivos versionados.
*   **Conexión a MongoDB (`+srv` omitido):** Se solucionó un error crítico de timeout en la conexión a MongoDB Atlas que impedía el funcionamiento del backend. La causa fue la omisión del protocolo `+srv` en la cadena de conexión, lo cual es indispensable para que el driver de MongoDB descubra los nodos del clúster. La corrección se realizó añadiendo `+srv` a la URI de conexión.

### Errores Pendientes:
*   **P01: `start_app.bat` no funciona:** El script de inicio unificado no se ejecuta correctamente.
