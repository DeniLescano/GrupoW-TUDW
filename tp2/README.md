# Trabajo Práctico 2: Fetch y FileSystem en Node.js

Este proyecto es una implementación de los requisitos para el Trabajo Práctico N° 2, enfocado en el uso de `fetch` para consumir APIs y el módulo `fs` para interactuar con el sistema de archivos en un entorno Node.js.

## Soluciones Implementadas

El script `tp2.js` es una única secuencia de comandos que ejecuta las siguientes operaciones de forma automática:

*   **Consulta a la API:**
    1.  Obtiene un listado limitado de 5 productos.
    2.  Agrega un nuevo producto de prueba.
    3.  Busca un producto específico por su ID.
    4.  Modifica los datos de un producto existente.
    5.  Elimina un producto.

*   **Manejo de Archivos Locales:**
    1.  **Creación y Escritura:** Guarda los 5 productos obtenidos en un archivo local llamado `products.json`.
    2.  **Lectura:** Lee el contenido del archivo para mostrarlo en consola en diferentes etapas.
    3.  **Añadir:** Agrega un nuevo producto directamente al archivo `products.json`.
    4.  **Filtrado y Eliminación:** Lee todos los productos del archivo, elimina aquellos que superan un precio de $100 y reescribe el archivo con el resultado.

## Cómo Ejecutar el Script

1.  Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2.  Abre una terminal en la carpeta del proyecto.
3.  Ejecuta el comando:
    ```bash
    node tp2.js
    ```
4.  El script mostrará en la consola cada paso que realiza y el resultado de las operaciones. El archivo `products.json` será creado o actualizado en el mismo directorio.

## Sugerencias para Mejorar la Experiencia de Usuario

Manteniendo la simplicidad del script, se podrían aplicar las siguientes mejoras enfocadas puramente en la experiencia de quien ejecuta el código:

1.  **Mejorar la Claridad y Legibilidad en Consola:**
    *   En lugar de imprimir los objetos JSON completos, mostrar resúmenes concisos. Por ejemplo: `[ÉXITO] Producto 'Nuevo Producto' (ID: 21) agregado a la API.`.
    *   Utilizar una indentación clara y prefijos como `[INFO]`, `[ÉXITO]` o `[ERROR]` para que el estado de cada operación sea evidente a simple vista.

2.  **Añadir un Resumen Final de Operaciones:**
    *   Al final de toda la ejecución, imprimir un bloque que resuma todo lo que se hizo. Esto le da al usuario un panorama claro del resultado final sin tener que leer todo el historial.
    *   **Ejemplo de resumen:**
        ```
        --- Resumen de Ejecución ---
        - Productos leídos de la API: 5
        - Productos eliminados del archivo local: 3
        - Contenido final del archivo: 8 productos.
        --------------------------
        ```

3.  **Uso de Colores para Resaltar Mensajes:**
    *   Emplear códigos de color ANSI en los `console.log` para diferenciar los tipos de mensajes. Por ejemplo, usar texto **verde** para los mensajes de éxito, **rojo** para los errores y **amarillo** o **cian** para los títulos o pasos importantes. Esto mejora drásticamente la legibilidad y permite identificar problemas de un solo vistazo.
