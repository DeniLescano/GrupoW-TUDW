# Resumen del Proyecto y Prototipos

Este proyecto documenta la evolución de una solución de software, desde un simple script de línea de comandos hasta un prototipo de aplicación web interactiva. El objetivo inicial fue resolver un ejercicio de manipulación de arrays en JavaScript, que luego se expandió para explorar diferentes arquitecturas de presentación.

## Estructura de Directorios

- **`solutionCLI/`**:
  Contiene la solución original al trabajo práctico. Es un script (`productManager.js`) diseñado para ser ejecutado con Node.js y probar las distintas operaciones sobre arrays directamente en la terminal.

- **`alphaMVC/`**:
  El primer prototipo web. Es una aplicación de una sola página (SPA) puramente frontend que muestra una lista de productos de forma estática.
  - `view.html`: Estructura de la página.
  - `styles.css`: Estilos visuales.
  - `hardcode.js`: Lógica para renderizar los productos en el navegador.

- **`betaMVC/`**:
  El segundo prototipo web y el más avanzado. Es una SPA interactiva que permite al usuario manipular los datos en tiempo real.
  - `view.html`: Estructura de la página con los botones de acción.
  - `styles.css`: Mismos estilos que alphaMVC.
  - `app.js`: Lógica de frontend que maneja el estado de los productos.
  - `controller.js`: Servidor simple de Node.js para servir archivos estáticos.

- **`abstractions/`**:
  Directorio que contiene diagramas y bocetos conceptuales previos al desarrollo. Incluye:
  - Esquemas de arquitectura inicial
  - Diagramas de flujo de operaciones
  - Notas de diseño conceptual

## Evolución de las Soluciones

La finalidad del proyecto fue explorar cómo una misma lógica de negocio (la manipulación de una lista de productos) puede ser presentada de distintas maneras.

1. **Instancia 1: Script de Consola (`solutionCLI`)**
   - Solución básica al ejercicio del `TP 1 javaScript.pdf`.
   - Script Node.js que ejecuta operaciones sobre arrays mostrando resultados en consola.

2. **Instancia 2: Prototipo Web Estático (`alphaMVC`)**
   - Primera aproximación a interfaz web.
   - Visualización estática de productos mediante `hardcode.js`.
   - Presentación visual atractiva pero sin interactividad.

3. **Instancia 3: Prototipo Web Interactivo (`betaMVC`)**
   - Versión dinámica con botones para operaciones en tiempo real.
   - Arquitectura cliente-servidor básica:
     - Frontend: `app.js` maneja toda la interactividad
     - Backend: `controller.js` solo sirve archivos estáticos

## Cómo Ejecutar los Prototipos

### Para solutionCLI (Node.js):
1. Abre una terminal
2. Navega al directorio: `cd solutionCLI`
3. Ejecuta el script: `node productManager.js`
4. Verás los resultados de las operaciones en la terminal

### Para alphaMVC (Live Server):
1. Abre el archivo `alphaMVC/view.html` en tu editor de código
2. Instala la extensión "Live Server" si no la tienes (VS Code)
3. Haz clic derecho en el archivo y selecciona "Open with Live Server"
4. El navegador se abrirá automáticamente mostrando la versión estática

### Para betaMVC (Node.js Server):
1. Abre una terminal
2. Navega al directorio: `cd betaMVC`
3. Inicia el servidor: `node controller.js`
4. Abre tu navegador en: `http://localhost:3000`