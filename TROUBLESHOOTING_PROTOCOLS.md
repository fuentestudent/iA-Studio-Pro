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
