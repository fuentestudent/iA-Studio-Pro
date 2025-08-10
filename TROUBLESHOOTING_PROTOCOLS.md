# Protocolos de Diagnóstico Interno

## Caso de Estudio: Falla de Conexión a MongoDB Atlas con `+srv`

Este documento registra una lección aprendida durante la resolución de un problema de conectividad a MongoDB Atlas para evitar la repetición de diagnósticos extensos e innecesarios.

### 1. Síntoma Inicial

- Un script o herramienta de red estándar (como `ping`, `Test-NetConnection` en PowerShell, o `telnet`) falla al intentar conectar con el hostname del clúster proporcionado por MongoDB Atlas (ej: `cluster0.xxxxxxxx.mongodb.net`).
- El error sugiere que el host no se puede encontrar o que la conexión es rechazada.

### 2. Cascada de Diagnósticos Incorrectos

El síntoma anterior puede llevar erróneamente a investigar una larga lista de posibles causas que, en este caso, no son el problema real:
- Bloqueos del Firewall (local o de red).
- Interferencia del software Antivirus.
- Posible infección por Malware.
- Problemas de resolución de DNS (servidores DNS, caché local, archivo `hosts`).
- Bloqueos por parte del Proveedor de Internet (ISP).
- Configuración incorrecta de la IP en la lista de acceso de Atlas.

### 3. Causa Raíz Real

La causa real del fallo no es un problema de red, sino una mala interpretación del tipo de conexión.
- Las cadenas de conexión modernas de MongoDB Atlas usan el prefijo `mongodb+srv://`.
- El `+srv` indica que el hostname **no es una dirección directa**, sino un puntero a un registro DNS especial de tipo `SRV`.
- Las herramientas como `ping` o `Test-NetConnection` no saben cómo solicitar registros `SRV` y buscan un registro `A` (una IP directa), que no existe para ese nombre de host. Por lo tanto, fallan por diseño.

### 4. Procedimiento de Diagnóstico Correcto

Para verificar correctamente la conectividad con un clúster `+srv`:

1.  **Identificar el tipo de conexión:** Revisar la cadena de conexión. Si empieza con `mongodb+srv://`, seguir estos pasos.

2.  **Realizar una consulta SRV:** Usar `nslookup` con el tipo específico `SRV` para obtener la lista de nodos reales del clúster. El formato del comando es:
    ```
    nslookup -type=SRV _mongodb._tcp.<hostname_del_cluster>
    ```
    *Ejemplo:*
    ```
    nslookup -type=SRV _mongodb._tcp.cluster0.hxltzpx.mongodb.net
    ```

3.  **Probar la conexión al nodo real:** La consulta anterior devolverá uno o más nombres de host de servidores reales (ej: `ac-nhvtijn-shard-00-00.hxltzpx.mongodb.net`). Usar `Test-NetConnection` o una herramienta similar para probar la conectividad a uno de **esos** nombres de host en el puerto `27017`.
    *Ejemplo:*
    ```powershell
    Test-NetConnection -ComputerName ac-nhvtijn-shard-00-00.hxltzpx.mongodb.net -Port 27017
    ```

4.  **Interpretar el resultado:** Si la prueba al nodo real tiene éxito (`TcpTestSucceeded: True`), la conectividad de red es correcta. Cualquier fallo posterior reside en la aplicación (driver, autenticación, etc.), no en la red.

### 5. Lección Aprendida Clave

**Analizar siempre la cadena de conexión completa. La presencia de `+srv` cambia radicalmente el método de diagnóstico de red requerido.**

---

## Caso de Estudio: Falla de Conexión a GitHub Codespaces desde VS Code Desktop

Este documento registra el diagnóstico y la solución para un problema de conexión a un entorno de GitHub Codespaces desde la aplicación de escritorio de Visual Studio Code.

### 1. Síntoma Inicial

- La CLI de GitHub (`gh`) no es reconocida en la terminal (`command not found` o similar), a pesar de haber sido instalada manualmente.
- El comando `Codespaces: Connect to Codespace` en la paleta de comandos de VS Code (`Ctrl+Shift+P`) falla sin mostrar ningún mensaje de error en la notificación o en el panel de salida del canal "GitHub Codespaces".

### 2. Cascada de Diagnósticos

El síntoma anterior puede llevar a investigar varias áreas:

- **Problema de PATH:** La CLI de `gh` no está en la variable de entorno PATH del sistema.
- **Extensión de VS Code:** La extensión "GitHub Codespaces" podría estar deshabilitada o corrupta. (Se verificó y estaba instalada y activa).
- **Autenticación:** La sesión del usuario en VS Code con su cuenta de GitHub podría haber expirado o tener problemas. (Se verificó y la sincronización de ajustes estaba activa, implicando una sesión iniciada).
- **Bloqueo de Red:** Un firewall, antivirus o proxy podría estar bloqueando la comunicación de VS Code con los servidores de GitHub.

### 3. Causa Raíz (Provisional)

La causa raíz exacta en la aplicación de escritorio sigue bajo investigación. Sin embargo, el hecho de que el comando falle silenciosamente (sin logs en el panel de salida) sugiere un problema interno en el entorno de VS Code o en la inicialización de la extensión, en lugar de un simple bloqueo de red que normalmente generaría un error de "timeout".

### 4. Procedimiento de Solución y Mitigación

1.  **Solución Inmediata (Desbloqueo):** La forma más rápida y fiable de resolver el problema y continuar trabajando es acceder al Codespace a través de su **versión web**.
    - Navegar a `https://github.com/codespaces`.
    - Iniciar sesión y abrir el Codespace deseado.
    - El entorno web ofrece una experiencia de VS Code completa y funcional, independiente de la configuración de la máquina local.

2.  **Próximo Paso de Diagnóstico (Para la App de Escritorio):** Para encontrar el error de bajo nivel que causa el fallo silencioso, el siguiente paso es utilizar las herramientas de desarrollador de VS Code.
    - Ir al menú `Ayuda` > `Alternar herramientas de desarrollo`.
    - Seleccionar la pestaña `Console`.
    - Intentar ejecutar el comando `Codespaces: Connect to Codespace` de nuevo.
    - Buscar y analizar cualquier mensaje de error que aparezca en rojo en la consola.

### 5. Lección Aprendida Clave

**Cuando una funcionalidad principal de una extensión de VS Code (como la conexión a Codespaces) falla silenciosamente, la solución más rápida es usar una alternativa (versión web) para desbloquear el trabajo, y luego usar las herramientas de desarrollador (`Developer Tools`) para investigar la causa raíz en la aplicación de escritorio.**