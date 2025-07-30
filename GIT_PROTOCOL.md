# Protocolo y Guía Práctica de Git para el Proyecto "Optimización de Proyectos con IA"

Este documento establece las directrices y mejores prácticas para el uso de Git en el proyecto "Optimización de Proyectos con IA", asegurando un flujo de trabajo colaborativo, eficiente y con un historial de versiones claro y consistente. **Este protocolo sirve como una guía paralela y precisa para la gestión de repositorios locales y remotos, complementando la documentación de las fases de desarrollo del proyecto.**

## 1. Configuración Inicial de Git

Antes de comenzar, asegúrate de que Git esté configurado correctamente en tu sistema. Si aún no lo has hecho, ejecuta los siguientes comandos en tu terminal (reemplaza con tu nombre y correo electrónico):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"
```

## 2. Flujo de Trabajo Básico

Se recomienda un flujo de trabajo basado en ramas (branching) para el desarrollo de nuevas funcionalidades y correcciones de errores.

### 2.1. Clonar el Repositorio (si no lo has hecho ya)

Si estás empezando desde cero, clona el repositorio remoto:

```bash
git clone <URL_del_repositorio_remoto>
cd <nombre_del_repositorio>
```

### 2.2. Mantener tu Rama Principal Actualizada

Antes de empezar a trabajar en una nueva funcionalidad o corrección, asegúrate de que tu rama principal (`main` o `master`) esté actualizada con los últimos cambios del repositorio remoto:

```bash
git checkout main
git pull origin main
```

### 2.3. Crear una Nueva Rama para el Desarrollo

Siempre trabaja en una rama separada para cada nueva funcionalidad o corrección de error. Esto mantiene la rama principal limpia y estable.

```bash
git checkout -b feature/nombre-de-la-funcionalidad # Para nuevas funcionalidades
# o
git checkout -b bugfix/descripcion-del-bug # Para correcciones de errores
```

### 2.4. Realizar Cambios y Confirmar (Commit)

Realiza tus cambios en los archivos. Una vez que hayas completado una parte lógica de tu trabajo, añade los cambios al área de preparación (staging area) y luego confírmalos:

```bash
git add .
# o para archivos específicos:
# git add archivo1.py archivo2.md

git commit -m "feat: Descripción concisa de la nueva funcionalidad"
# o
# git commit -m "fix: Descripción concisa de la corrección del bug"
# o
# git commit -m "docs: Actualización de la documentación"
```

**Mensajes de Commit:**
*   Utiliza un formato claro y conciso.
*   Comienza con un prefijo que indique el tipo de cambio (`feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`, etc.).
*   La primera línea debe ser un resumen de no más de 50-72 caracteres.
*   Si es necesario, añade un cuerpo más detallado después de una línea en blanco.
*   **Importante:** Si el mensaje de commit contiene caracteres especiales o espacios que puedan ser interpretados erróneamente por el shell, utiliza la opción `-F` con un archivo temporal:
    ```bash
    echo "docs: Mensaje de commit con espacios y caracteres especiales" > commit_message.txt
    git commit -F commit_message.txt
    rm commit_message.txt
    ```

### 2.5. Subir tus Cambios a la Rama Remota

Una vez que hayas realizado commits en tu rama local, súbelos al repositorio remoto:

```bash
git push origin nombre-de-tu-rama
```

### 2.6. Abrir una Solicitud de Extracción (Pull Request - PR)

Cuando tu funcionalidad o corrección esté lista para ser revisada e integrada en la rama principal, abre una Pull Request en la plataforma Git (GitHub, GitLab, Bitbucket, etc.).

## 3. Verificación del Estado del Repositorio

Para mantener un control preciso del estado de tu repositorio, utiliza los siguientes comandos regularmente:

*   `git status`: Muestra el estado del árbol de trabajo y el área de preparación. Te indicará qué archivos han sido modificados, cuáles están en el área de preparación y cuáles no están siendo rastreados.
*   `git log --oneline -n <cantidad>`: Muestra un historial conciso de los últimos commits. Útil para recordar los cambios recientes y sus mensajes.
*   `git diff HEAD`: Muestra los cambios (incluyendo los no preparados) en los archivos rastreados desde el último commit.
*   `git diff --staged`: Muestra solo los cambios que están en el área de preparación.

## 4. Resolución de Conflictos

Si al hacer `git pull` o al intentar fusionar tu rama, Git detecta conflictos, deberás resolverlos manualmente. Git marcará los archivos con conflictos. Edita los archivos para elegir las versiones correctas y luego:

```bash
git add archivo_con_conflicto
git commit -m "fix: Resolver conflictos de fusión"
```

## 5. Convenciones de Nomenclatura

*   **Ramas:** Utiliza nombres descriptivos y en minúsculas, separados por guiones. Prefijos comunes:
    *   `feature/`: Para nuevas funcionalidades.
    *   `bugfix/`: Para correcciones de errores.
    *   `hotfix/`: Para correcciones urgentes en producción.
    *   `docs/`: Para cambios en la documentación.
    *   `chore/`: Para tareas de mantenimiento que no afectan el código de producción.
*   **Tags:** Utiliza tags para marcar versiones importantes (e.g., `v1.0.0`, `v1.0.1`).

## 6. Ignorar Archivos

Utiliza el archivo `.gitignore` para especificar archivos y directorios que Git debe ignorar (e.g., archivos de configuración local, dependencias de módulos, archivos temporales, logs). Asegúrate de que los archivos sensibles o generados automáticamente no se suban al repositorio.

## 7. Seguridad en Git

*   **Nunca subas credenciales o información sensible** directamente al repositorio. Utiliza variables de entorno o sistemas de gestión de secretos.
*   Revisa los cambios antes de hacer commit y push.
*   Utiliza SSH para la autenticación con el repositorio remoto cuando sea posible.

## 8. Herramientas Adicionales

*   **Visual Studio Code:** Utiliza las extensiones de Git para una mejor experiencia de usuario.
*   **Git LFS:** Para manejar archivos grandes (si es necesario).

---

**Este protocolo es un documento vivo y será actualizado a medida que el proyecto evolucione y surjan nuevas necesidades o mejores prácticas en la gestión de versiones.** La colaboración y el seguimiento de estas directrices son clave para el éxito del proyecto. La colaboración y el seguimiento de estas directrices son clave para el éxito del proyecto.

## 9. Scripts de Inicio y Automatización

Es crucial que cualquier script de inicio o automatización (como `start_app.bat`) sea versionado en el repositorio. Esto asegura que todos los colaboradores tengan acceso a la forma correcta de iniciar y operar la aplicación, y que cualquier cambio en estos scripts sea rastreado y revisado. Mantener estos scripts actualizados y funcionales es tan importante como el código fuente de la aplicación.