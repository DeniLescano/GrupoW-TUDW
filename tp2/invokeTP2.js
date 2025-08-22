
// Facultad de Ciencias de la Administración - UNER - Programación III

// ==================== CONFIGURACIÓN INICIAL ====================
const BASE_URL = "https://fakestoreapi.com";
const FILENAME = "productos.json";
const fs = require('fs');
const readline = require('readline');

// ==================== FUNCIONES DE VALIDACIÓN ====================
function esEnteroValido(valor) {
    return !isNaN(valor) && Number.isInteger(parseFloat(valor)) && parseInt(valor) > 0;
}

async function obtenerEnteroValido(menu, mensaje) {
    let input;
    do {
        input = await menu.question(mensaje);
        if (!esEnteroValido(input)) {
            console.log("❌ Por favor, ingrese un número entero válido.");
        }
    } while (!esEnteroValido(input));
    return parseInt(input);
}

// ==================== FUNCIONES DE API ====================
async function apiRequest(endpoint, options = {}) {
    try {
        console.log(`🌐 Realizando solicitud a: ${BASE_URL}${endpoint}`);
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Error en la solicitud HTTP: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error("❌ Error en la solicitud:", error.message);
        return null;
    }
}

async function getAllProducts() {
    console.log("📋 Obteniendo todos los productos...");
    return apiRequest("/products");
}

async function getProductById(id) {
    console.log(`🔍 Buscando producto con ID: ${id}`);
    return apiRequest(`/products/${id}`);
}

async function addProduct(product) {
    console.log("➕ Agregando nuevo producto...");
    return apiRequest("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
}

async function deleteProduct(id) {
    console.log(`🗑️ Eliminando producto con ID: ${id}`);
    return apiRequest(`/products/${id}`, {
        method: "DELETE",
    });
}

async function getLimitedProducts(limit) {
    console.log(`📦 Obteniendo ${limit} productos...`);
    return apiRequest(`/products?limit=${limit}`);
}

async function updateProduct(id, updatedData) {
    console.log(`✏️ Actualizando producto con ID: ${id}`);
    return apiRequest(`/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
}

// ==================== FUNCIONES DE ARCHIVOS ====================
function readProducts() {
    try {
        console.log(`📖 Leyendo archivo: ${FILENAME}`);
        const data = fs.readFileSync(FILENAME, "utf-8");
        const productos = JSON.parse(data);
        console.log(`✅ Se leyeron ${productos.length} productos del archivo`);
        return productos;
    } catch (error) {
        console.log("ℹ️ No se encontró archivo previo, iniciando con array vacío");
        return [];
    }
}

function saveProducts(products) {
    console.log(`💾 Guardando ${products.length} productos en: ${FILENAME}`);
    fs.writeFileSync(FILENAME, JSON.stringify(products, null, 2));
    console.log("✅ Productos guardados exitosamente");
}

function addProductToFile(product) {
    console.log("📝 Agregando producto al archivo local...");
    const products = readProducts();
    
    if (!product.id) {
        const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
        product.id = maxId + 1;
    }
    
    products.push(product);
    saveProducts(products);
    console.log(`✅ Producto agregado con ID: ${product.id}`);
    return product;
}

function removeProductsAbovePrice(price) {
    console.log(`🔍 Filtrando productos con precio mayor a: $${price}`);
    let products = readProducts();
    const originalLength = products.length;
    products = products.filter((p) => p.price <= price);
    saveProducts(products);
    const removedCount = originalLength - products.length;
    console.log(`✅ Se eliminaron ${removedCount} productos`);
    return removedCount;
}

function persistirProductosAPI(products) {
    console.log("💾 Persistiendo productos de la API en archivo local...");
    saveProducts(products);
    console.log(`✅ Se persistieron ${products.length} productos de la API en ${FILENAME}`);
}

// ==================== FUNCIONES DE INTERFAZ ====================
function mostrarProductos(productos, titulo = "Productos") {
    console.log(`\n📦 ${titulo} 📦\n`);
    if (!productos || productos.length === 0) {
        console.log("⚠️ No hay productos para mostrar.");
        return;
    }

    const tabla = productos.map(p => ({
        ID: p.id ?? "-",
        Nombre: p.title ?? p.nombre ?? "-",
        Precio: p.price != null ? `$${p.price}` : "-",
        Categoría: p.category || "-"
    }));

    console.table(tabla);
    console.log(`📊 Total de productos: ${productos.length}`);
}

function createMenuInterface() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return {
        question: (prompt) => new Promise((resolve) => rl.question(prompt, resolve)),
        close: () => rl.close()
    };
}

// ==================== MANEJO DE OPCIONES DEL MENÚ ====================
async function handleOption(option, menu) {
    try {
        switch (option) {
            case "1":
                console.log("\n=== OBTENER TODOS LOS PRODUCTOS (API) ===");
                const products = await getAllProducts();
                mostrarProductos(products, "Todos los productos (API)");
                console.log("✅ Operación completada: Obtención de todos los productos");
                break;

            case "2":
                console.log("\n=== OBTENER PRODUCTO POR ID (API) ===");
                const id = await obtenerEnteroValido(menu, "ID del producto: ");
                const product = await getProductById(id);
                product ? mostrarProductos([product], `Producto con ID ${id}`) : 
                         console.log("❌ Producto no encontrado");
                console.log("✅ Operación completada: Búsqueda por ID");
                break;

            case "3":
                console.log("\n=== OBTENER PRODUCTOS LIMITADOS (API) ===");
                const limit = await obtenerEnteroValido(menu, "Cantidad de productos a recuperar: ");
                const limitedProducts = await getLimitedProducts(limit);
                mostrarProductos(limitedProducts, `Primeros ${limit} productos`);
                console.log("✅ Operación completada: Obtención de productos limitados");
                break;

            case "4":
                console.log("\n=== AGREGAR NUEVO PRODUCTO (API) ===");
                const title = await menu.question("Nombre del producto: ");
                const price = parseFloat(await menu.question("Precio: "));
                const newProduct = await addProduct({ title, price });
                newProduct ? mostrarProductos([newProduct], "Producto agregado (API)") : 
                            console.log("❌ Error al agregar producto");
                console.log("✅ Operación completada: Agregar producto");
                break;

            case "5":
                console.log("\n=== ELIMINAR PRODUCTO (API) ===");
                const idDelete = await obtenerEnteroValido(menu, "ID a eliminar: ");
                const result = await deleteProduct(idDelete);
                console.log("✅ Resultado:", result || "Producto eliminado");
                console.log("✅ Operación completada: Eliminación de producto");
                break;

            case "6":
                console.log("\n=== MODIFICAR PRODUCTO (API) ===");
                const updateId = await obtenerEnteroValido(menu, "ID del producto a modificar: ");
                const newTitle = await menu.question("Nuevo nombre (dejar vacío para no cambiar): ");
                const newPriceInput = await menu.question("Nuevo precio (dejar vacío para no cambiar): ");
                const newPrice = newPriceInput ? parseFloat(newPriceInput) : null;
                
                const updatedData = {};
                if (newTitle) updatedData.title = newTitle;
                if (newPrice !== null && !isNaN(newPrice)) updatedData.price = newPrice;
                
                if (Object.keys(updatedData).length === 0) {
                    console.log("⚠️ No se proporcionaron datos para actualizar.");
                    break;
                }
                
                const updatedProduct = await updateProduct(updateId, updatedData);
                updatedProduct ? mostrarProductos([updatedProduct], "Producto actualizado") : 
                                console.log("❌ Error al actualizar producto");
                console.log("✅ Operación completada: Modificación de producto");
                break;

            case "7":
                console.log("\n=== PERSISTIR PRODUCTOS DE LA API ===");
                const apiProducts = await getAllProducts();
                if (apiProducts && apiProducts.length > 0) {
                    persistirProductosAPI(apiProducts);
                } else {
                    console.log("❌ No se pudieron obtener productos de la API");
                }
                console.log("✅ Operación completada: Persistencia de productos API");
                break;

            case "8":
                console.log("\n=== VER PRODUCTOS PERSISTIDOS (FILESYSTEM) ===");
                const productsFile = readProducts();
                mostrarProductos(productsFile, "Productos persistidos");
                console.log("✅ Operación completada: Visualización de productos persistidos");
                break;

            case "9":
                console.log("\n=== AGREGAR PRODUCTO AL ARCHIVO LOCAL (FILESYSTEM) ===");
                const titleFile = await menu.question("Nombre del producto: ");
                const priceFile = parseFloat(await menu.question("Precio: "));
                const localProduct = addProductToFile({ title: titleFile, price: priceFile });
                console.log("✅ Operación completada: Producto agregado al archivo local");
                break;

            case "10":
                console.log("\n=== ELIMINAR PRODUCTOS POR PRECIO (FILESYSTEM) ===");
                const limitPrice = parseFloat(await menu.question("Eliminar productos con precio mayor a: "));
                const removedCount = removeProductsAbovePrice(limitPrice);
                console.log("✅ Operación completada: Eliminación de productos por precio");
                break;

            case "11":
                console.log("\n=== VER PRODUCTOS POR PRECIO MÁXIMO (FILESYSTEM) ===");
                const maxPrice = parseFloat(await menu.question("Mostrar productos con precio hasta: "));
                const allProducts = readProducts();
                const filtered = allProducts.filter(p => p.price <= maxPrice);
                mostrarProductos(filtered, `Productos hasta $${maxPrice}`);
                console.log("✅ Operación completada: Filtrado por precio máximo");
                break;

            case "0":
                console.log("👋 ¡Hasta luego!");
                menu.close();
                process.exit(0);
                return;

            default:
                console.log("❌ Opción inválida. Intenta nuevamente.");
        }
    } catch (error) {
        console.error("❌ Ocurrió un error:", error.message);
    }

    // Pausa antes de volver al menú
    console.log("\n⏎ Presiona Enter para continuar...");
    await menu.question('');
}

// ==================== MENÚ PRINCIPAL ====================
async function showMenu(menu) {
    console.log("\n" + "=".repeat(50));
    console.log("           MENÚ PRINCIPAL - TP 2 JS");
    console.log("=".repeat(50));
    console.log("--- OPERACIONES DE API ---");
    console.log("1.  Ver todos los productos (GET)");
    console.log("2.  Ver producto por ID (GET)");
    console.log("3.  Obtener productos limitados (GET)");
    console.log("4.  Agregar nuevo producto (POST)");
    console.log("5.  Eliminar producto (DELETE)");
    console.log("6.  Modificar producto (UPDATE)");
    console.log("");
    console.log("--- PERSISTENCIA DE DATOS ---");
    console.log("7.  Persistir productos de la API en archivo local");
    console.log("");
    console.log("--- OPERACIONES DE FILESYSTEM ---");
    console.log("8.  Ver productos persistidos");
    console.log("9.  Agregar producto al archivo local");
    console.log("10. Eliminar productos por precio");
    console.log("11. Ver productos por precio máximo");
    console.log("");
    console.log("0.  Salir");
    console.log("=".repeat(50));

    const option = await menu.question("Elegí una opción: ");
    await handleOption(option, menu);
    await showMenu(menu); // Vuelve al menú después de completar una operación
}

// ==================== PROGRAMA PRINCIPAL ====================
(async () => {
    console.log("🚀 Iniciando TP 2 - JavaScript Fetch y FileSystem");
    console.log("📋 Objetivos:");
    console.log("  • Aplicar API Fetch y manejo de archivos con FileSystem");
    console.log("  • Ejecutar el código en el entorno Node.js");
    console.log("🔗 API utilizada: https://fakestoreapi.com/");
    console.log("💾 Archivo local: " + FILENAME);
    console.log("=".repeat(60));
    
    // Verificar que estamos en Node.js
    if (typeof require === 'undefined') {
        console.log("❌ Este script debe ejecutarse en Node.js");
        return;
    }

    try {
        const menu = createMenuInterface();
        await showMenu(menu);
    } catch (error) {
        console.error("❌ Error inicializando la aplicación:", error.message);
    }
})();