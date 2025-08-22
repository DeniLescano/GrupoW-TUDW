# 📚 Programación III - Trabajos Prácticos en JavaScript

Este repositorio contiene la resolución de los **TP 1 y TP 2** de la materia **Programación III (UNER)**.
Ambos trabajos fueron desarrollados en **Node.js**, aplicando conceptos de **arrays, modularización, Fetch API y FileSystem**.

---

## 📝 TP 1 - Manejo de Arrays y Menú Interactivo

### 📌 Descripción

Se desarrolló un script que manipula un array de productos inicial y ofrece al usuario un **menú interactivo con 8 opciones**, implementando operaciones de recorrido, CRUD, filtros, mapeos y ordenamientos.

### 🚀 Soluciones Implementadas

* **Menú interactivo (8 opciones)**

  * Navegación circular y validación de entradas.
  * Retorno automático al menú tras cada operación.
* **Sistema de colores y utilidades visuales** para mejorar la experiencia en consola.
* **Funciones modulares** para cada operación (CRUD, recorridos, filtros, etc.).
* **Mejoras en métodos de array** con casos de éxito y fallo (`filter`, `map`, `find`).
* **Estructura modular clara** con arrays iniciales, funciones auxiliares y función principal.

### ▶️ Ejecución

```bash
cd GrupoW-TP1
node productManager.js
```

---

## 📝 TP 2 - Fetch API y FileSystem

### 📌 Descripción

Se desarrolló un script en **Node.js** que combina **operaciones CRUD sobre la API FakeStore** y **persistencia de datos en archivo local JSON** mediante FileSystem. Todas las funcionalidades fueron integradas en un **menú interactivo**.

### 🚀 Soluciones Implementadas

#### 🔗 Operaciones con API (Fetch)

* **GET**: Obtener todos los productos, buscar producto por ID, obtener productos limitados.
* **POST**: Agregar nuevo producto desde consola.
* **PUT (UPDATE)**: Modificar datos de un producto (nombre y/o precio).
* **DELETE**: Eliminar producto por ID.
* **Feedback visual** en consola con tablas y emojis.

#### 💾 Persistencia con FileSystem

* Guardar productos obtenidos desde la API en `productos.json`.
* Visualizar productos persistidos en tabla.
* Agregar producto al archivo local (ID autogenerado).
* Eliminar productos por precio máximo.
* Filtrar productos con precio menor o igual a un valor ingresado.

#### 🖥️ Menú Interactivo

* Opciones numeradas para cada operación.
* Validación de entradas numéricas y de ID.
* Retorno automático al menú.
* Salida controlada con la opción `0`.

### 📂 Organización del Código

1. Configuración inicial y constantes.
2. Funciones de validación.
3. Funciones de API (Fetch CRUD).
4. Funciones de FileSystem.
5. Funciones de interfaz (mostrar productos en tablas).
6. Menú principal.

### ▶️ Ejecución

```bash
cd GrupoW-TP2
node invokeTP2.js
```

---

## 👥 Integrantes

* Francisco Javier Acosta
* Denise Aguilera
* Denise Ailen Lescano
* Nahuel Marcilli
* Julieta Roveres
