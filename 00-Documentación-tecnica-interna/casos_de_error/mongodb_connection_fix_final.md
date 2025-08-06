# Solución Definitiva de Error de Conexión a MongoDB Atlas (getaddrinfo ENOTFOUND)

**Fecha:** 5 de Agosto de 2025

**Proyecto:** Optimización de Proyectos con IA

## Problema Persistente

A pesar de que la cadena de conexión `mongodb+srv://` era sintácticamente correcta y el documento `mongodb_connection_fix.md` indicaba que el problema original era la omisión del `+srv`, las pruebas de integración y la conexión del backend seguían fallando con errores de resolución de DNS como `querySrv ENODATA` y `getaddrinfo ENOTFOUND`.

## Diagnóstico Exhaustivo

1.  **`nslookup -type=SRV _mongodb._tcp.cluster0.hxltzpx.mongodb.net` (sin especificar DNS):** Falló con `Non-existent domain`. Esto inicialmente sugirió un problema de red o DNS local.
2.  **`nslookup -type=SRV _mongodb._tcp.cluster0.hxltzpx.mongodb.net 8.8.8.8` (con DNS de Google):** Tuvo éxito, devolviendo los nombres de host de los shards (`ac-nhvtijn-shard-00-00.hxltzpx.mongodb.net`, etc.). Esto confirmó que los servidores DNS de Google podían resolver los registros SRV, aislando el problema al resolvedor DNS predeterminado del sistema o a cómo Node.js lo utilizaba.
3.  **`Test-NetConnection -ComputerName ac-nhvtijn-shard-00-01.hxltzpx.mongodb.net -Port 27017` (después de confirmar DNS de Google en el sistema):** Inicialmente falló, pero tras una re-ejecución (y confirmación de que los DNS de Google estaban activos en el sistema), **tuvo éxito**. Esto demostró que el sistema operativo sí podía resolver y alcanzar los hosts de los shards a nivel de red.

La contradicción entre el éxito de `Test-NetConnection` y el fallo persistente en Node.js (`getaddrinfo ENOTFOUND`) indicó que el problema no era la red en sí, sino la forma en que Node.js (o Mongoose) interactuaba con el sistema de resolución de nombres en este entorno específico.

## Causa Raíz Real

La causa raíz fue una incompatibilidad o un comportamiento inesperado en la resolución de DNS de Node.js/Mongoose al intentar resolver los registros SRV en el entorno del usuario, incluso cuando el sistema operativo subyacente podía hacerlo con los servidores DNS correctos. La solución `node --dns-result-order=ipv4first` no fue suficiente para mitigar este comportamiento.

## Solución Aplicada

La solución definitiva fue **evitar por completo la resolución de DNS basada en SRV** para la conexión a MongoDB. Esto se logró utilizando la **cadena de conexión estándar de MongoDB Atlas**, que lista explícitamente todos los nombres de host de los shards y sus puertos, eliminando la necesidad de que el driver realice una consulta SRV.

**Cadena de Conexión Estándar Utilizada:**
`mongodb://user_db:fpTf038SRLeYLf8p@ac-nhvtijn-shard-00-00.hxltzpx.mongodb.net:27017,ac-nhvtijn-shard-00-01.hxltzpx.mongodb.net:27017,ac-nhvtijn-shard-00-02.hxltzpx.mongodb.net:27017/?ssl=true&replicaSet=atlas-v5fo2r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

Esta cadena fue aplicada en:
-   El script `test` en `backend/package.json`.
-   El script `start` en `backend/package.json`.
-   El archivo `.env.test` (aunque este ya contenía la cadena `+srv` correcta, se mantuvo la consistencia con la nueva cadena estándar para evitar futuros problemas).

## Verificación

Tras aplicar la cadena de conexión estándar, todas las pruebas del backend (`npm test`) se ejecutaron y pasaron con éxito, confirmando la conectividad completa con la base de datos de prueba.

## Conclusión

Este caso subraya que, aunque `mongodb+srv://` es el método recomendado por MongoDB Atlas, en ciertos entornos con configuraciones de DNS o comportamientos de resolución de nombres específicos de Node.js, puede ser necesario recurrir a la cadena de conexión estándar para asegurar una conectividad fiable. La clave fue un diagnóstico exhaustivo que diferenció los problemas de red de los problemas de resolución de nombres dentro del entorno de ejecución de la aplicación.
