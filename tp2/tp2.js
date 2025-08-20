const fs = require('fs').promises;
const readline = require('readline');

// Configuración
const API_BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_FILE = 'productos.json';

// Interfaz para entrada de usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para hacer preguntas al usuario
function pregunta(texto) {
    return new Promise((resolve) => {
        rl.question(texto, resolve);
    });
}

// Clase principal para manejar la API y archivos
class FakeStoreManager {
    constructor() {
        this.apiUrl = API_BASE_URL;
        this.productsFile = PRODUCTS_FILE;
    }

    // ============= MÉTODOS API FETCH =============

    /**
     * GET - Recuperar todos los productos
     */
    async getAllProducts() {
        try {
            console.log('\n🔄 Recuperando todos los productos...');
            const response = await fetch(`${this.apiUrl}/products`);
            
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const products = await response.json();
            console.log(`✅ Se recuperaron ${products.length} productos`);
            this.displayProducts(products, "Todos los productos");
            return products;
        } catch (error) {
            console.error('❌ Error al recuperar productos:', error.message);
            return [];
        }
    }

    /**
     * GET - Recuperar número limitado de productos
     */
    async getLimitedProducts(limit = 5) {
        try {
            console.log(`\n🔄 Recuperando ${limit} productos...`);
            const response = await fetch(`${this.apiUrl}/products?limit=${limit}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const products = await response.json();
            console.log(`✅ Se recuperaron ${products.length} productos limitados`);
            this.displayProducts(products, `${limit} productos limitados`);
            return products;
        } catch (error) {
            console.error('❌ Error al recuperar productos limitados:', error.message);
            return [];
        }
    }

    /**
     * GET - Buscar producto por ID
     */
    async getProductById(id) {
        try {
            console.log(`\n🔄 Buscando producto con ID: ${id}...`);
            const response = await fetch(`${this.apiUrl}/products/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const product = await response.json();
            console.log(`✅ Producto encontrado:`);
            this.displayProducts([product], `Producto ID: ${id}`);
            return product;
        } catch (error) {
            console.error(`❌ Error al buscar producto con ID ${id}:`, error.message);
            return null;
        }
    }

    /**
     * POST - Agregar nuevo producto (pide datos por consola)
     */
    async addNewProduct() {
        try {
            console.log('\n📝 Ingrese los datos del nuevo producto:');
            const title = await pregunta('Título: ');
            const priceInput = await pregunta('Precio: ');
            const price = parseFloat(priceInput) || 0;
            const description = await pregunta('Descripción: ');
            const image = await pregunta('URL de imagen: ');
            const category = await pregunta('Categoría: ');

            const productData = {
                title,
                price,
                description,
                image,
                category
            };

            console.log('\n🔄 Agregando nuevo producto...');
            const response = await fetch(`${this.apiUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newProduct = await response.json();
            console.log(`✅ Producto agregado exitosamente:`);
            console.log(`   🆔 ID asignado: ${newProduct.id}`);
            console.log(`   📝 Título: ${productData.title}`);
            console.log(`   💰 Precio: $${productData.price}`);
            console.log(`   📂 Categoría: ${productData.category}`);
            return newProduct;
        } catch (error) {
            console.error('❌ Error al agregar producto:', error.message);
            return null;
        }
    }

    /**
     * PUT - Modificar producto existente
     */
    async updateProduct(id) {
        try {
            console.log(`\n📝 Ingrese los nuevos datos para el producto con ID: ${id}`);
            const title = await pregunta('Nuevo título: ');
            const priceInput = await pregunta('Nuevo precio: ');
            const price = parseFloat(priceInput) || 0;
            const description = await pregunta('Nueva descripción: ');
            const image = await pregunta('Nueva URL de imagen: ');
            const category = await pregunta('Nueva categoría: ');

            const productData = {
                title,
                price,
                description,
                image,
                category
            };

            console.log(`\n🔄 Modificando producto con ID: ${id}...`);
            const response = await fetch(`${this.apiUrl}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedProduct = await response.json();
            console.log(`✅ Producto ${id} modificado exitosamente:`);
            console.log(`   📝 Nuevo título: ${productData.title}`);
            console.log(`   💰 Nuevo precio: $${productData.price}`);
            console.log(`   📂 Nueva categoría: ${productData.category}`);
            return updatedProduct;
        } catch (error) {
            console.error(`❌ Error al modificar producto ${id}:`, error.message);
            return null;
        }
    }

    /**
     * DELETE - Eliminar producto
     */
    async deleteProduct(id) {
        try {
            console.log(`\n🔄 Eliminando producto con ID: ${id}...`);
            const response = await fetch(`${this.apiUrl}/products/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log(`✅ Producto ${id} eliminado exitosamente`);
            console.log(`   🗑️  Respuesta de la API:`, result);
            return result;
        } catch (error) {
            console.error(`❌ Error al eliminar producto ${id}:`, error.message);
            return null;
        }
    }

    // ============= MÉTODOS FILESYSTEM =============

    /**
     * Persistir productos en archivo JSON
     */
    async saveProductsToFile(products) {
        try {
            console.log(`\n💾 Guardando ${products.length} productos en archivo...`);
            await fs.writeFile(this.productsFile, JSON.stringify(products, null, 2));
            console.log(`✅ Productos guardados en ${this.productsFile}`);
            console.log(`📊 Total de productos en archivo: ${products.length}`);
        } catch (error) {
            console.error('❌ Error al guardar archivo:', error.message);
        }
    }

    /**
     * Leer productos desde archivo JSON
     */
    async loadProductsFromFile() {
        try {
            console.log(`\n📖 Cargando productos desde ${this.productsFile}...`);
            const data = await fs.readFile(this.productsFile, 'utf8');
            const products = JSON.parse(data);
            console.log(`✅ Se cargaron ${products.length} productos desde archivo`);
            return products;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`ℹ️  El archivo ${this.productsFile} no existe aún`);
            } else {
                console.error('❌ Error al leer archivo:', error.message);
            }
            return [];
        }
    }

    /**
     * Agregar producto al archivo local
     */
    async addProductToFile() {
        try {
            let products = await this.loadProductsFromFile();

            // Asignar nuevo ID basado en el último ID existente
            const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
            const id = maxId + 1;

            console.log('\n➕ Ingrese los datos del producto a agregar al archivo local:');
            console.log(`(ID asignado automáticamente: ${id})`);
            const title = await pregunta('Título: ');
            const priceInput = await pregunta('Precio: ');
            const price = parseFloat(priceInput) || 0;
            const description = await pregunta('Descripción: ');
            const image = await pregunta('URL de imagen: ');
            const category = await pregunta('Categoría: ');

            const newProduct = {
                id,
                title,
                price,
                description,
                image,
                category
            };

            products.push(newProduct);
            await this.saveProductsToFile(products);
            console.log(`✅ Producto "${newProduct.title}" agregado con ID: ${newProduct.id}`);
            this.displayProducts([newProduct], "Producto agregado al archivo");
        } catch (error) {
            console.error('❌ Error al agregar producto al archivo:', error.message);
        }
    }

    /**
     * Eliminar productos superiores a un valor determinado
     */
    async removeProductsAbovePrice(maxPrice) {
        try {
            console.log(`\n🗑️  Eliminando productos con precio superior a $${maxPrice}...`);
            let products = await this.loadProductsFromFile();
            const initialCount = products.length;
            
            console.log(`📊 Productos antes del filtro: ${initialCount}`);
            
            // Mostrar productos que serán eliminados
            const productsToRemove = products.filter(product => product.price > maxPrice);
            if (productsToRemove.length > 0) {
                console.log(`\n🚫 Productos que serán eliminados (precio > $${maxPrice}):`);
                productsToRemove.forEach(p => {
                    console.log(`   - ${p.title} (ID: ${p.id}, Precio: $${p.price})`);
                });
            }
            
            // Filtrar productos con precio menor o igual al máximo
            const filteredProducts = products.filter(product => product.price <= maxPrice);
            const removedCount = initialCount - filteredProducts.length;
            
            await this.saveProductsToFile(filteredProducts);
            console.log(`✅ Operación completada:`);
            console.log(`   🗑️  Productos eliminados: ${removedCount}`);
            console.log(`   📦 Productos restantes: ${filteredProducts.length}`);
            
            if (filteredProducts.length > 0) {
                this.displayProducts(filteredProducts, `Productos restantes (precio ≤ $${maxPrice})`);
            }
            
            return filteredProducts;
        } catch (error) {
            console.error('❌ Error al eliminar productos:', error.message);
            return [];
        }
    }

    /**
     * Mostrar productos en consola
     */
    displayProducts(products, title = "Productos") {
        console.log(`\n📋 ${title}:`);
        console.log('='.repeat(80));
        
        if (products.length === 0) {
            console.log('   📭 No hay productos para mostrar');
            return;
        }
        
        products.forEach((product, index) => {
            console.log(`\n${index + 1}. 🆔 ID: ${product.id}`);
            console.log(`   📝 Título: ${product.title}`);
            console.log(`   💰 Precio: $${product.price}`);
            console.log(`   📂 Categoría: ${product.category}`);
            if (product.rating) {
                console.log(`   ⭐ Rating: ${product.rating.rate} (${product.rating.count} reviews)`);
            }
            if (index < products.length - 1) {
                console.log('   ' + '-'.repeat(70));
            }
        });
        console.log('='.repeat(80));
    }
}

// ============= SISTEMA DE MENÚS =============

class MenuSystem {
    constructor() {
        this.manager = new FakeStoreManager();
    }

    mostrarMenuPrincipal() {
        console.log('\n🎯 ===============================================');
        console.log('📚 TP2 - FakeStore API y FileSystem - Grupo W');
        console.log('🎯 ===============================================\n');
        
        console.log('📋 MENÚ PRINCIPAL:\n');
        console.log(' 1 - Recuperar todos los productos (GET)');
        console.log(' 2 - Recuperar productos limitados (GET)');
        console.log(' 3 - Persistir datos en archivo JSON');
        console.log(' 4 - Agregar nuevo producto (POST)');
        console.log(' 5 - Buscar producto por ID (GET)');
        console.log(' 6 - Eliminar producto (DELETE)');
        console.log(' 7 - Modificar producto (PUT)');
        console.log(' 8 - Agregar producto al archivo local');
        console.log(' 9 - Eliminar productos por precio');
        console.log('10 - Ver productos del archivo local');
        console.log('11 - Ejecutar TODAS las operaciones (DEMO COMPLETA)');
        console.log(' 0 - Salir\n');
    }

    async ejecutarOpcion(opcion) {
        switch(opcion) {
            case '1':
                await this.manager.getAllProducts();
                break;
                
            case '2':
                const limite = await pregunta('¿Cuántos productos quiere recuperar? (default: 5): ');
                const num = parseInt(limite) || 5;
                await this.manager.getLimitedProducts(num);
                break;
                
            case '3':
                console.log('\n📋 Primero recuperaremos productos limitados para persistir...');
                const productos = await this.manager.getLimitedProducts(5);
                if (productos.length > 0) {
                    await this.manager.saveProductsToFile(productos);
                }
                break;
                
            case '4':
                console.log('\n📝 Agregando producto de ejemplo...');
                const nuevoProducto = {
                    title: 'Producto TP2 - Grupo W',
                    price: 29.99,
                    description: 'Producto creado para demostrar POST en el TP2',
                    image: 'https://fakestoreapi.com/img/placeholder.jpg',
                    category: 'electronics'
                };
                await this.manager.addNewProduct(nuevoProducto);
                break;
                
            case '5':
                const idBuscar = await pregunta('Ingrese el ID del producto a buscar (default: 1): ');
                const id = parseInt(idBuscar) || 1;
                await this.manager.getProductById(id);
                break;
                
            case '6':
                const idEliminar = await pregunta('Ingrese el ID del producto a eliminar (default: 20): ');
                const idDel = parseInt(idEliminar) || 20;
                await this.manager.deleteProduct(idDel);
                break;
                
            case '7':
                const idModificar = await pregunta('Ingrese el ID del producto a modificar (default: 1): ');
                const idMod = parseInt(idModificar) || 1;
                const productoModificado = {
                    title: 'Producto Modificado - TP2',
                    price: 19.99,
                    description: 'Producto modificado para demostrar PUT',
                    image: 'https://fakestoreapi.com/img/modified.jpg',
                    category: 'electronics'
                };
                await this.manager.updateProduct(idMod, productoModificado);
                break;
                
            case '8':
                const productoLocal = {
                    title: 'Producto Local - Archivo',
                    price: 45.50,
                    description: 'Producto agregado directamente al archivo local',
                    image: 'https://fakestoreapi.com/img/local.jpg',
                    category: 'clothing'
                };
                await this.manager.addProductToFile(productoLocal);
                break;
                
            case '9':
                const precioMax = await pregunta('Ingrese el precio máximo (productos superiores serán eliminados, default: 30): ');
                const precio = parseFloat(precioMax) || 30;
                await this.manager.removeProductsAbovePrice(precio);
                break;
                
                            case '10':
                const productosArchivo = await this.manager.loadProductsFromFile();
                this.manager.displayProducts(productosArchivo, "Productos en archivo local");
                break;
                
            case '11':
                await this.ejecutarDemoCompleta();
                return true; // Indica que se ejecutó la demo completa
                
            case '0':
                return false;
                
            default:
                console.log('❌ Opción no válida. Intente nuevamente.');
        }
        return true;
    }

    async ejecutarDemoCompleta() {
        console.log('\n🚀 ===============================================');
        console.log('         📋 EJECUTANDO TODOS LOS PUNTOS DEL TP       ');
        console.log('🚀 ===============================================\n');
        
        try {
            // 1. GET - Todos los productos
            console.log('1️⃣  PUNTO 1: Recuperar todos los productos');
            const todosProductos = await this.manager.getAllProducts();

            // 2. GET - Productos limitados
            console.log('\n2️⃣  PUNTO 2: Recuperar productos limitados');
            const productosLimitados = await this.manager.getLimitedProducts(5);

            // 3. Persistir en archivo
            console.log('\n3️⃣  PUNTO 3: Persistir datos en archivo JSON');
            await this.manager.saveProductsToFile(productosLimitados);

            // 4. POST - Agregar producto
            console.log('\n4️⃣  PUNTO 4: Agregar nuevo producto (POST)');
            const nuevoProducto = {
                title: 'TP2 - Producto Demo Completa',
                price: 35.99,
                description: 'Producto creado en la demo completa del TP2',
                image: 'https://fakestoreapi.com/img/demo.jpg',
                category: 'electronics'
            };
            await this.manager.addNewProduct(nuevoProducto);

            // 5. GET - Buscar por ID
            console.log('\n5️⃣  PUNTO 5: Buscar producto por ID');
            await this.manager.getProductById(1);

            // 6. DELETE - Eliminar producto
            console.log('\n6️⃣  PUNTO 6: Eliminar producto (DELETE)');
            await this.manager.deleteProduct(19);

            // 7. PUT - Modificar producto
            console.log('\n7️⃣  PUNTO 7: Modificar producto (PUT)');
            const productoModificado = {
                title: 'Producto Modificado en Demo',
                price: 25.50,
                description: 'Producto modificado durante la demo completa',
                image: 'https://fakestoreapi.com/img/demo-modified.jpg',
                category: 'clothing'
            };
            await this.manager.updateProduct(2, productoModificado);

            // 8. Agregar al archivo local
            console.log('\n8️⃣  PUNTO 8: Agregar producto al archivo local');
            const productoLocal = {
                title: 'Producto Local Demo',
                price: 18.75,
                description: 'Producto local agregado en la demo',
                image: 'https://fakestoreapi.com/img/local-demo.jpg',
                category: 'jewelery'
            };
            await this.manager.addProductToFile(productoLocal);

            // 9. Mostrar archivo actual
            console.log('\n📋 ESTADO ACTUAL: Productos en archivo local');
            const productosActuales = await this.manager.loadProductsFromFile();
            this.manager.displayProducts(productosActuales, "Productos antes del filtro");

            // 10. Eliminar por precio
            console.log('\n9️⃣  PUNTO 9: Eliminar productos superiores a $25');
            await this.manager.removeProductsAbovePrice(25);

            console.log('\n🎉 ===============================================');
            console.log('       ✅ TODOS LOS PUNTOS EJECUTADOS CON EXITO     ');
            console.log('🎉 ===============================================\n');
            
            console.log('📋 RESUMEN DE OPERACIONES REALIZADAS:');
            console.log('✅ 1. Recuperación de todos los productos (GET)');
            console.log('✅ 2. Recuperación de productos limitados (GET)');
            console.log('✅ 3. Persistencia de datos en archivo JSON');
            console.log('✅ 4. Creación de nuevo producto (POST)');
            console.log('✅ 5. Búsqueda de producto por ID (GET)');
            console.log('✅ 6. Eliminación de producto (DELETE)');
            console.log('✅ 7. Modificación de producto (PUT)');
            console.log('✅ 8. Adición de producto al archivo local');
            console.log('✅ 9. Eliminación de productos por precio');
            console.log('✅ 10. Verificación de operaciones en consola');

        } catch (error) {
            console.error('❌ Error durante la demo completa:', error.message);
        }
    }

    async iniciar() {
        console.log('🚀 Iniciando aplicación...\n');
        
        let continuar = true;
        while (continuar) {
            this.mostrarMenuPrincipal();
            const opcion = await pregunta('👉 Seleccione una opción: ');
            
            console.clear();
            const resultado = await this.ejecutarOpcion(opcion.trim());
            
            if (resultado === false) {
                continuar = false;
                console.log('\n👋 ¡Gracias por usar el sistema! Hasta luego.');
            } else if (resultado === true) {
                // Es la demo completa, no pausar
                console.log('\n📍 Presiona ENTER para volver al menú...');
                await pregunta('');
            } else {
                // Operación individual
                console.log('\n📍 Presiona ENTER para volver al menú...');
                await pregunta('');
            }
        }
        
        rl.close();
    }
}

// ============= EJECUCIÓN PRINCIPAL =============
async function main() {
    const menu = new MenuSystem();
    await menu.iniciar();
}

// Verificar si fetch está disponible
if (typeof fetch === 'undefined') {
    console.log('❌ Error: fetch no está disponible en esta versión de Node.js');
    console.log('💡 Solución: Usa Node.js v18 o superior, o instala node-fetch');
    process.exit(1);
}

// Ejecutar si es el archivo principal
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { FakeStoreManager, MenuSystem };
