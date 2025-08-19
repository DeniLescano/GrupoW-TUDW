// Módulos nativos de Node.js
import { writeFile, readFile } from 'fs/promises';

//Documentacion a tener en cuenta:

// https://fakestoreapi.com/docs

// Constantes
const API_URL = 'https://fakestoreapi.com';
const FILE_PATH = 'products.json';

// --- Funciones para interactuar con la API (Fetch) ---

/**
 * 1. Recupera la información de todos los productos.
 */
async function getAllProducts() {
    try {
        console.log('\n--- 1. Obteniendo todos los productos de la API...');
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const products = await response.json();
        console.log('Todos los productos fueron obtenidos con éxito.');
        return products;
    } catch (error) {
        console.error('Error en getAllProducts:', error.message);
    }
}

/**
 * 2. Recupera la información de un número limitado de productos.
 * @param {number} limit - El número de productos a obtener.
 */
async function getLimitedProducts(limit = 5) {
    try {
        console.log(`\n--- 2. Obteniendo ${limit} productos de la API...`);
        const response = await fetch(`${API_URL}/products?limit=${limit}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const products = await response.json();
        console.log(`${limit} productos fueron obtenidos con éxito.`);
        return products;
    } catch (error) {
        console.error('Error en getLimitedProducts:', error.message);
    }
}

/**
 * 4. Agrega un nuevo producto.
 */
async function addProduct(product) {
    try {
        console.log('\n--- 4. Agregando un nuevo producto a la API...');
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const newProduct = await response.json();
        console.log('Producto agregado con éxito en la API:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Error en addProduct:', error.message);
    }
}

/**
 * 5. Busca la información de un determinado producto por su ID.
 * @param {number} id - El ID del producto a buscar.
 */
async function getProductById(id) {
    try {
        console.log(`\n--- 5. Buscando producto con ID ${id} en la API...`);
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const product = await response.json();
        console.log('Producto encontrado con éxito:', product);
        return product;
    } catch (error) {
        console.error('Error en getProductById:', error.message);
    }
}

/**
 * 6. Elimina un producto.
 * @param {number} id - El ID del producto a eliminar.
 */
async function deleteProduct(id) {
    try {
        console.log(`\n--- 6. Eliminando producto con ID ${id} en la API...`);
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const deletedProduct = await response.json();
        console.log('Producto eliminado con éxito en la API:', deletedProduct);
        return deletedProduct;
    } catch (error) {
        console.error('Error en deleteProduct:', error.message);
    }
}

/**
 * 7. Modifica los datos de un producto.
 * @param {number} id - El ID del producto a modificar.
 * @param {object} productData - Los nuevos datos del producto.
 */
async function updateProduct(id, productData) {
    try {
        console.log(`\n--- 7. Modificando producto con ID ${id} en la API...`);
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const updatedProduct = await response.json();
        console.log('Producto modificado con éxito en la API:', updatedProduct);
        return updatedProduct;
    } catch (error) {
        console.error('Error en updateProduct:', error.message);
    }
}


// --- Funciones para interactuar con el sistema de archivos (FileSystem) ---

/**
 * 3. Persiste los datos en un archivo local JSON.
 * @param {object} data - Los datos a guardar.
 */
async function saveDataToFile(data) {
    try {
        console.log(`\n--- 3. Guardando datos en el archivo ${FILE_PATH}...`);
        await writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
        console.log('Datos guardados con éxito.');
    } catch (error) {
        console.error('Error en saveDataToFile:', error.message);
    }
}

/**
 * Lee los datos del archivo JSON local.
 */
async function readDataFromFile() {
    try {
        console.log(`\n--- Leyendo datos desde ${FILE_PATH}...`);
        const data = await readFile(FILE_PATH, 'utf8');
        console.log('Datos leídos con éxito.');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error en readDataFromFile:', error.message);
        return [];
    }
}

/**
 * Agrega un producto al archivo local.
 * @param {object} product - El producto a agregar.
 */
async function addProductToFile(product) {
    try {
        console.log(`\n--- Agregando producto al archivo local ${FILE_PATH}...`);
        const products = await readDataFromFile();
        products.push(product);
        await saveDataToFile(products);
        console.log('Producto agregado con éxito al archivo local.');
    } catch (error) {
        console.error('Error en addProductToFile:', error.message);
    }
}

/**
 * Elimina los productos superiores a un determinado valor (precio).
 * @param {number} maxPrice - El precio máximo permitido.
 */
async function deleteProductsByPrice(maxPrice) {
    try {
        console.log(`\n--- Eliminando productos con precio mayor a ${maxPrice} del archivo local...`);
        const products = await readDataFromFile();
        const filteredProducts = products.filter(p => p.price <= maxPrice);
        await saveDataToFile(filteredProducts);
        console.log(`Se eliminaron ${products.length - filteredProducts.length} productos.`);
    } catch (error) {
        console.error('Error en deleteProductsByPrice:', error.message);
    }
}


// --- Orquestador principal ---

async function main() {
    console.log('****** INICIO DEL SCRIPT DE TRABAJO PRÁCTICO 2 ******');

    // Punto 2 y 3: Obtener 5 productos y guardarlos en el archivo.
    const limitedProducts = await getLimitedProducts(5);
    if (limitedProducts) {
        await saveDataToFile(limitedProducts);
    }

    // Imprimir en consola para verificar
    let currentData = await readDataFromFile();
    console.log('\nContenido actual del archivo:', currentData);

    // Punto 4: Agregar un nuevo producto a la API
    await addProduct({
        title: 'Producto de Prueba',
        price: 150.5,
        description: 'Un producto de prueba para el TP2.',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    });

    // Punto 5: Buscar un producto por ID
    await getProductById(1);

    // Punto 7: Modificar un producto
    await updateProduct(1, {
        title: 'Producto Modificado',
        price: 199.99,
        description: 'Este producto fue modificado.',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    });

    // Punto 6: Eliminar un producto
    await deleteProduct(2);

    // --- Operaciones de FileSystem ---

    // Agregar producto al archivo local
    await addProductToFile({
        id: 99,
        title: 'Producto Local',
        price: 55.5,
        description: 'Agregado directamente al JSON'
    });
    currentData = await readDataFromFile();
    console.log('\nContenido del archivo tras agregar localmente:', currentData);

    // Eliminar productos del archivo local con precio > 100
    await deleteProductsByPrice(100);
    currentData = await readDataFromFile();
    console.log('\nContenido final del archivo:', currentData);


    console.log('\n****** FIN DEL SCRIPT ******');
}

// Ejecutar el orquestador
main();
