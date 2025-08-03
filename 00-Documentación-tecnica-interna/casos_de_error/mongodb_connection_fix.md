# Solución de Error de Conexión a MongoDB Atlas por Omisión de `+srv`

**Fecha:** 2025-08-03

**Proyecto:** Optimización de Proyectos con IA

## Problema

Las pruebas de integración y la conexión general a la base de datos fallaban consistentemente con errores de timeout (`MongooseError: Operation ... buffering timed out`) a pesar de que las credenciales y el hostname del clúster eran correctos.

## Causa Raíz

El error fue causado por la omisión del indicador `+srv` en el protocolo de la cadena de conexión de MongoDB (`mongodb://` en lugar de `mongodb+srv://`). Este error, que fue introducido por mi parte durante la configuración inicial, es crítico porque el `+srv` instruye al driver de MongoDB a realizar una consulta DNS de tipo `SRV` para descubrir dinámicamente los nodos del clúster de Atlas. Sin él, el driver intenta conectarse directamente a un hostname que no está diseñado para recibir conexiones directas, resultando en un timeout.

## Solución Aplicada

1.  **Diagnóstico:** Tras descartar problemas de red (firewall/antivirus) y de formato de la URI, se revisó la cadena de conexión completa y se identificó la ausencia del `+srv`.
2.  **Remediación:** Se corrigió la cadena de conexión en la variable de entorno `MONGODB_URI_TEST` (y en cualquier otra configuración relevante) para incluir `mongodb+srv://`.

    **Cadena de Conexión Incorrecta (Ejemplo):**
    `mongodb://user_db:password@cluster0.hxltzpx.mongodb.net/test_db_integrada?retryWrites=true&w=majority`

    **Cadena de Conexión Correcta:**
    `mongodb+srv://user_db:password@cluster0.hxltzpx.mongodb.net/test_db_integrada?retryWrites=true&w=majority&appName=Cluster0`

3.  **Verificación:** Se volvieron a ejecutar las pruebas de integración (`npm test`), que se conectaron y pasaron con éxito de inmediato.

## Conclusión

Este caso de error subraya la importancia crítica del protocolo `+srv` en las cadenas de conexión de MongoDB Atlas. La omisión de este detalle, aunque pequeño, cambia fundamentalmente el mecanismo de conexión. Este incidente, causado por un error de mi parte, ha sido documentado para servir como una lección fundamental y un punto de referencia clave para la solución de problemas de conexión a MongoDB en el futuro.