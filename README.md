# INTEGRADA: Plataforma de Optimización para Proyectos con IA

![Banner del Proyecto](URL_DEL_BANNER)  <!-- Opcional: Añadir un banner visualmente atractivo -->

## Descripción General

**INTEGRADA** es una plataforma web de vanguardia, diseñada para revolucionar la forma en que los desarrolladores, equipos de trabajo gestionan y optimizan proyectos con inteligencia artificial. Impulsada por una arquitectura robusta y un diseño intuitivo, INTEGRADA integra de forma inteligente múltiples modelos de lenguaje de gran tamaño (LLM) y ofrece un conjunto de herramientas avanzadas para mejorar la eficiencia, la calidad y la velocidad en todo el ciclo de vida del desarrollo con IA.

Desde la conceptualización de ideas hasta el despliegue, INTEGRADA proporciona una solución integral que combina la potencia de la IA con una gestión de proyectos eficaz, permitiendo a los usuarios maximizar el potencial de sus implementaciones con la inteligencia artificial.

## Características Principales

*   **🤖 Integración Multi-LLM:** Conéctate y gestiona de forma centralizada múltiples modelos de IA como Gemini, ChatGPT, Claude y otros, a través de un gateway de API unificado. Esto permite una flexibilidad sin precedentes y optimiza el uso de recursos.
*   **✨ Optimización de Prompts 4-D:** Nuestra metodología exclusiva (Analizar, Diagnosticar, Desarrollar, Entregar) guía a los usuarios a través de un proceso estructurado para crear prompts más efectivos, obteniendo resultados de mayor calidad y precisión de los LLM.
*   **🧠 Agentes de IA Especializados:** Accede a módulos de IA pre-configurados y personalizables para dominios específicos, como la creación de marca personal o el desarrollo de aplicaciones móviles.n*   **📊 Gestión de Proyectos y Seguimiento:** Organiza, sigue y gestiona el ciclo de vida completo de tus proyectos de IA con herramientas visuales e intuitivas, incluyendo seguimiento de progreso, asignación de tareas y colaboración en equipo.
*   **📄 Generación Automática de Documentación:** Crea automáticamente la documentación técnica y de usuario necesaria para cada proyecto, ahorrando tiempo y esfuerzo, y asegurando la consistencia y mantenibilidad.
*   **💻 Editor de Código Integrado:** Escribe, depura y optimiza código directamente en la plataforma con un editor que ofrece resaltado de sintaxis, autocompletado inteligente y validación en tiempo real.
*   **👁️ Previsualización en Vivo:** Observa en tiempo real los resultados generados por la IA a medida que ajustas tus prompts, configuraciones y código, permitiendo una iteración rápida y eficiente.

## Stack Tecnológico

*   **Frontend:** React.js, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Base de Datos:** MongoDB
*   **Autenticación:** JWT (JSON Web Tokens)
*   **Contenedores:** Docker
*   **Despliegue:** Netlify/Vercel (Frontend), Docker Swarm/Kubernetes (Backend)

## Desempeño Técnico y Colaboración

Este proyecto es el resultado de una colaboración técnica profunda y eficiente, donde cada fase de desarrollo ha sido abordada con un enfoque metódico y orientado a la calidad.

*   **Jhonny José Carbó Fuentes:** Como Director, Arquitecto de Software y visionario del proyecto, ha proporcionado la dirección estratégica, la conceptualización de las funcionalidades clave y la guía arquitectónica, asegurando que la plataforma cumpla con las necesidades del usuario y los estándares de la industria.
*   **Gemini (IA de Google):** Como desarrollador principal e implementador técnico, he traducido la visión y los requisitos en una solución funcional y escalable. Mi contribución abarca desde la configuración del entorno y la arquitectura base, hasta la implementación de los sistemas de autenticación, gestión de proyectos, el gateway de LLMs y el editor de código integrado. La colaboración ha sido iterativa, con un enfoque constante en la optimización del código, la modularidad y la preparación para futuras expansiones.

Para más detalles sobre la propiedad intelectual y los roles, consulta el archivo `PROPIEDAD_INTELECTUAL.md`.

## Estado del Proyecto

Actualmente, el proyecto ha completado la **Fase 1: Cimientos** y ha avanzado significativamente en la **Fase 2: Funcionalidad Core**. Hemos establecido una base sólida para el backend y el frontend, y hemos implementado los componentes clave para el Gateway de API de LLMs, el Sistema de Optimización 4-D y el Editor de Código Integrado.

## Contacto

## Cómo Iniciar la Aplicación

Para iniciar la aplicación INTEGRADA (backend y frontend) en un solo paso, sigue estas instrucciones:

1.  **Configurar Variables de Entorno del Backend:**
    *   Crea un archivo `.env` en el directorio `backend` (`C:\www\Optimización de Proyectos con IA\backend\.env`).
    *   Añade las siguientes variables a ese archivo, reemplazando los placeholders con tus credenciales reales:
        ```
        MONGODB_URI="mongodb+srv://<usuario>:<contraseña>@cluster0.hxltzpx.mongodb.net/integrada_db?retryWrites=true&w=majority&appName=Cluster0"
        JWT_SECRET="tu_secreto_jwt_aqui"
        ```
    *   **¡Importante!** Nunca subas este archivo `.env` a tu repositorio Git, ya que contiene información sensible.

2.  **Ejecutar el Script de Inicio:**
    *   Haz doble clic en `start_app.bat` ubicado en la raíz del proyecto (`C:\www\Optimización de Proyectos con IA\start_app.bat`) o ejecútalo desde la línea de comandos.

Esto abrirá dos nuevas ventanas de terminal: una para el backend (Node.js) y otra para el frontend (Vite). El backend se ejecutará en `http://localhost:3000` y el frontend en `http://localhost:5173` (o el puerto que Vite asigne).

## Contacto

Para cualquier consulta o sugerencia, no dudes en ponerte en contacto.

*   **Jhonny José Carbó Fuentes:** [fuentestudent@hotmail.com](mailto:fuentestudent@hotmail.com).

---
*Este README fue generado y es mantenido con la asistencia de Gemini.*
