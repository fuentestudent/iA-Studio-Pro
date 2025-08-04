# Protocolo de Pruebas Unitarias para INTEGRADA

Este documento establece el protocolo para la implementación y gestión de pruebas unitarias en el proyecto INTEGRADA, asegurando la calidad, fiabilidad y mantenibilidad del código.

## 1. Marco de Pruebas

Se utilizará **Jest** como marco de pruebas principal para el backend (Node.js) y el frontend (React). Jest es una solución completa que ofrece un excelente rendimiento, una sintaxis clara y herramientas integradas para la cobertura de código y la simulación (mocking).

## 2. Configuración Inicial

### 2.1. Instalación de Jest

En el directorio raíz de cada subproyecto (backend y frontend), instala Jest y sus dependencias:

```bash
npm install --save-dev jest @types/jest # Para TypeScript
```

### 2.2. Configuración de Jest

Crea un archivo `jest.config.js` en la raíz de cada subproyecto con la configuración básica.

**Ejemplo para Backend (Node.js):**

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
```

**Ejemplo para Frontend (React con Vite):**

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // O .ts si usas TypeScript
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
```

Asegúrate de que tu `package.json` incluya un script para ejecutar Jest:

```json
"scripts": {
  "test": "jest"
}
```

## 3. Convenciones de Nomenclatura y Ubicación

*   **Archivos de Prueba:** Los archivos de prueba deben terminar con `.test.js` (o `.test.ts` para TypeScript) o `.spec.js` (o `.spec.ts`).
*   **Ubicación:**
    *   **Recomendado:** Colocar los archivos de prueba en un directorio `__tests__` dentro del mismo directorio del código que están probando.
    *   **Alternativa:** Colocar los archivos de prueba junto al archivo que están probando (ej. `miModulo.js` y `miModulo.test.js`).

## 4. Estructura de los Tests

Cada archivo de prueba debe enfocarse en una unidad de código específica (función, componente, módulo).

```javascript
// Ejemplo de test para una función de backend
const { miFuncion } = require('../src/utils/miFuncion');

describe('miFuncion', () => {
  test('debería retornar el valor correcto para una entrada válida', () => {
    expect(miFuncion(2)).toBe(4);
  });

  test('debería lanzar un error para una entrada inválida', () => {
    expect(() => miFuncion('a')).toThrow('Entrada inválida');
  });
});
```

## 5. Ejecución de Pruebas

*   **Ejecutar todos los tests:**
    ```bash
    npm test
    ```
*   **Ejecutar tests específicos:**
    ```bash
    npm test -- miFuncion.test.js
    ```
*   **Ejecutar tests en modo watch:**
    ```bash
    npm test -- --watch
    ```

## 6. Cobertura de Código

Para generar un informe de cobertura de código:

```bash
npm test -- --coverage
```

El informe se generará en el directorio `coverage/`.

## 7. Depuración de Tests

Para depurar tests, puedes usar las herramientas de depuración de tu IDE (ej. VS Code) configurando un launch configuration para Jest, o añadiendo `debugger;` en tu código y ejecutando Jest con `node --inspect-brk node_modules/.bin/jest --runInBand`.

## 8. Seguridad y Datos Sensibles en Pruebas

**¡DIRECTRIZ CRÍTICA DE SEGURIDAD!**

*   **Nunca incluyas credenciales reales, claves API, secretos o cualquier dato sensible directamente en tus archivos de prueba o en el código de la aplicación que se somete a pruebas.**
*   Utiliza variables de entorno para la configuración de pruebas (ej. `MONGODB_URI_TEST`). Estas variables deben ser cargadas de forma segura y **nunca deben ser versionadas en el repositorio Git**. Asegúrate de que los archivos `.env` o similares estén correctamente listados en `.gitignore`.
*   Para pruebas que requieran interacción con servicios externos o bases de datos, utiliza **simulaciones (mocking)** o **bases de datos de prueba aisladas** que no contengan datos reales o sensibles.
*   Si es absolutamente necesario usar datos de prueba, asegúrate de que sean **datos ficticios y anonimizados** que no puedan ser rastreados a información real.

## 9. Integración Continua (CI/CD)

Las pruebas unitarias serán un paso obligatorio en el pipeline de CI/CD. Cualquier cambio que no pase las pruebas unitarias no será desplegado.

---

**Este protocolo es un documento vivo y será actualizado a medida que el proyecto evolucione y surjan nuevas necesidades o mejores prácticas en las pruebas.**
