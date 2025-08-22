# 📝 TP 2 - JavaScript: Fetch y FileSystem

## 📌 Descripción

Trabajo práctico de **Programación III (UNER)**. Se desarrolló un script en **Node.js** que combina **operaciones CRUD sobre la API FakeStore** y **persistencia de datos en archivo local JSON** mediante FileSystem. Todas las funcionalidades fueron integradas en un **menú interactivo** con validación de entradas y retroalimentación visual.

## 🚀 Soluciones Implementadas

### 🔗 Operaciones con API (Fetch)

* **GET**: Obtener todos los productos, buscar producto por ID, obtener productos limitados.
* **POST**: Agregar nuevo producto con inputs desde consola.
* **PUT (UPDATE)**: Modificar datos de un producto (nombre y/o precio).
* **DELETE**: Eliminar producto por ID.
* **Feedback visual** en consola (mensajes, tablas, íconos, emojis).

### 💾 Persistencia con FileSystem

* Guardar productos obtenidos desde la API en archivo `productos.json`.
* Visualizar productos persistidos en formato tabla.
* Agregar producto al archivo local (con generación automática de ID).
* Eliminar productos cuyo precio supere un valor definido.
* Filtrar productos cuyo precio sea menor o igual a un valor máximo.

### 🖥️ Menú Interactivo

* Opciones numeradas para cada operación.
* Validación de entradas (IDs y números enteros).
* Retorno automático al menú tras cada operación.
* Salida controlada mediante opción `0`.

## 📂 Organización del Código

1. Configuración inicial y constantes.
2. Funciones de validación.
3. Funciones para API (Fetch CRUD).
4. Funciones para manejo de archivos con FileSystem.
5. Funciones de interfaz (mostrar productos en tablas).
6. Menú principal con control de opciones.

## ▶️ Ejecución

```bash
node .\invokeTP2.js
```
