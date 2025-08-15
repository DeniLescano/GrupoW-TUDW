// ============================================================================
// ARRAY DE PRODUCTOS - DATOS INICIALES
// ============================================================================
const products = [
    {
        id: 1,
        name: "Combo 1 – Gestión Empresarial Integral",
        description: "Sistema de gestión contable, panel de inventarios y ventas, y WPA para facturación.",
        price: 5000,
        stock: 10
    },
    {
        id: 2,
        name: "Combo 2 – Comercio y Ventas",
        description: "Punto de venta (POS), tienda online con pasarela de pagos y WPA para gestión de pedidos.",
        price: 4500,
        stock: 15
    },
    {
        id: 3,
        name: "Combo 3 – Salud y Bienestar",
        description: "Software para gestión de turnos y pacientes, portal de reservas online y WPA para agenda médica.",
        price: 4000,
        stock: 20
    },
    {
        id: 4,
        name: "Combo 4 – Educación y Capacitación",
        description: "Plataforma de gestión académica, campus virtual con cursos y WPA para acceso de alumnos.",
        price: 3500,
        stock: 25
    },
    {
        id: 5,
        name: "Combo 5 – Logística y Transporte",
        description: "Sistema de gestión de flotas, panel web para seguimiento de envíos y WPA para control de entregas.",
        price: 4800,
        stock: 12
    }
];

// ============================================================================
// COLORES Y UTILIDADES VISUALES
// ============================================================================
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

// imprimir con colores
function printColor(text, color) {
    console.log(`${color}${text}${colors.reset}`);
}

// separadores visuales
function printSeparator(title, color = colors.cyan) {
    const line = '='.repeat(60);
    console.log(`\n${color}${line}${colors.reset}`);
    printColor(`  ${title}`, color);
    console.log(`${color}${line}${colors.reset}\n`);
}

// Mostrar array completo con formato detallado
function showFullArray(arr, title = "ARRAY COMPLETO") {
    printSeparator(title, colors.yellow);
    
    if (arr.length === 0) {
        printColor("No hay productos para mostrar", colors.red);
        return;
    }
    
    arr.forEach((product, index) => {
        printColor(`[${index + 1}] ${product.name}`, colors.bright);
        console.log(`    ID: ${product.id} | Precio: $${formatPrice(product.price)} | Stock: ${product.stock}`);
        console.log(`    Descripción: ${product.description}`);
        console.log('');
    });
    
    console.log(`Total productos: ${arr.length}\n`);
}

// productos con paginación interactiva
function showProductsPaginated(products, title, pageSize = 3, rl = null, callback = null) {
    printSeparator(title, colors.green);
    
    if (products.length === 0) {
        printColor("No hay productos para mostrar", colors.red);
        if (callback) callback();
        return;
    }
    
    const totalPages = Math.ceil(products.length / pageSize);
    
    // Si no hay readline, mostrar todo sin paginación
    if (!rl) {
        showFullArray(products, title);
        if (callback) callback();
        return;
    }
    
    // Paginación interactiva
    let currentPage = 0;
    
    function mostrarPagina() {
        const start = currentPage * pageSize;
        const end = Math.min(start + pageSize, products.length);
        const pageProducts = products.slice(start, end);
        
        console.clear();
        printSeparator(title, colors.green);
        printColor(`--- Página ${currentPage + 1} de ${totalPages} ---`, colors.yellow);
        
        pageProducts.forEach((product, index) => {
            const globalIndex = start + index;
            printColor(`[${globalIndex + 1}] ${product.name}`, colors.bright);
            console.log(`    ID: ${product.id} | Precio: $${formatPrice(product.price)} | Stock: ${product.stock}`);
            console.log(`    Descripción: ${product.description}`);
            console.log('');
        });
        
        // Opciones de navegación
        if (totalPages > 1) {
            printColor("--- NAVEGACIÓN ---", colors.cyan);
            if (currentPage > 0) {
                printColor("A - Página anterior", colors.blue);
            }
            if (currentPage < totalPages - 1) {
                printColor("S - Página siguiente", colors.blue);
            }
            printColor("M - Volver al menú", colors.green);
            printColor("Enter - Continuar", colors.yellow);
            
            rl.question('Selecciona una opción: ', (answer) => {
                const opcion = answer.trim().toLowerCase();
                
                if (opcion === 'a' && currentPage > 0) {
                    currentPage--;
                    mostrarPagina();
                } else if (opcion === 's' && currentPage < totalPages - 1) {
                    currentPage++;
                    mostrarPagina();
                } else if (opcion === 'm') {
                    if (callback) callback();
                } else {
                    // Enter o cualquier otra tecla - continuar
                    if (currentPage < totalPages - 1) {
                        currentPage++;
                        mostrarPagina();
                    } else {
                        // Última página
                        if (callback) callback();
                    }
                }
            });
        } else {
            // Solo una página
            if (callback) callback();
        }
    }
    
    mostrarPagina();
}

// ============================================================================
// FUNCIONES 
// ============================================================================

// Función para formatear precios (integrada de Denise) - Mejorada para compatibilidad
const formatPrice = (value) => {
    try {
        // Intentar formato argentino primero
        return Number(value).toLocaleString('es-AR');
    } catch (error) {
        // Fallback: formato estándar con separadores de miles
        return Number(value).toLocaleString();
    }
};

// Función para obtener el siguiente ID disponible
const getNextId = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};


// operaciones básicas
function ejecutarOperacionesBasicas() {
    printSeparator("2. OPERACIONES BÁSICAS Y ACCESO", colors.green);
    
    // Mostrar array completo antes de operaciones
    showFullArray(products, "ARRAY ANTES DE OPERACIONES");
    
    console.log("\n--- 2.1 Longitud del Array ---");
    console.log("La cantidad de productos es:", products.length);
    
    console.log("\n--- 2.2 Acceso por Índice ---");
    console.log("Nombre del segundo producto:", products[1]?.name);
    console.log("Nombre del cuarto producto:", products[3]?.name);
}

// recorridos
function ejecutarRecorridos() {
    printSeparator("3. RECORRIDOS DEL ARRAY", colors.green);
    
    // Mostrar array completo antes de recorridos
    showFullArray(products, "ARRAY ANTES DE RECORRIDOS");
    
    console.log("\n--- 3.1 Recorrido con for...of ---");
    for (const product of products) {
        console.log(`${product.name} - $${formatPrice(product.price)}`);
    }
    
    console.log("\n--- 3.2 Recorrido con forEach ---");
    products.forEach(product => {
        console.log(`Producto: ${product.name}, Precio: $${formatPrice(product.price)}`);
    });
}

// métodos CRUD 
function ejecutarCRUD() {
    printSeparator("4. MÉTODOS CRUD - AGREGAR/ELIMINAR", colors.green);
    
    // copia del array para no modificar el original
    let productsCopy = [...products];
    
    // Mostrar copia antes de operaciones
    showFullArray(productsCopy, "COPIA DEL ARRAY ANTES DE OPERACIONES");
    
    console.log("\n--- 4.1 push() - Agregar elementos al final ---");
    showFullArray(productsCopy, "ANTES de push()");
    console.log("Agregando productos predefinidos...");
    
    productsCopy.push(
        { id: 6, name: "Combo 6 - Marketing Digital", description: "Gestión de redes, SEO y campañas.", price: 3200, stock: 30 },
        { id: 7, name: "Combo 7 - Diseño Gráfico", description: "Creación de logos, branding y material visual.", price: 2800, stock: 18 }
    );
    showFullArray(productsCopy, "DESPUÉS de push()");
    
    console.log("\n--- 4.2 pop() - Eliminar último elemento ---");
    showFullArray(productsCopy, "ANTES de pop()");
    const productoEliminadoPop = productsCopy.pop();
    console.log("Producto eliminado con pop():", productoEliminadoPop?.name, `- $${formatPrice(productoEliminadoPop?.price)}`);
    showFullArray(productsCopy, "DESPUÉS de pop()");
    
    console.log("\n--- 4.3 unshift() - Agregar elemento al inicio ---");
    showFullArray(productsCopy, "ANTES de unshift()");
    productsCopy.unshift({ id: 0, name: "Combo 0 - Consultoría Inicial", description: "Análisis de negocio y estrategia.", price: 1500, stock: 50 });
    showFullArray(productsCopy, "DESPUÉS de unshift()");
    
    console.log("\n--- 4.4 shift() - Eliminar primer elemento ---");
    showFullArray(productsCopy, "ANTES de shift()");
    const productoEliminadoShift = productsCopy.shift();
    console.log("Producto eliminado con shift():", productoEliminadoShift?.name, `- $${formatPrice(productoEliminadoShift?.price)}`);
    showFullArray(productsCopy, "DESPUÉS de shift()");
}

// filtros y mapeos con funciones nombradas (integrado de punto4.js)
function ejecutarFiltrosMapeos() {
    printSeparator("5. FILTROS Y MAPEOS - FILTER, MAP, FIND", colors.green);
    
    // copia del array
    let productsCopy = [...products];
    
    // Mostrar array completo antes de operaciones
    showFullArray(productsCopy, "ARRAY ANTES DE FILTROS Y MAPEOS");
    
    console.log("\n--- 5.1 filter() - Filtrar por stock > 0 ---");
    showFullArray(productsCopy, "ANTES de filter()");
    console.log("MÉTODO UTILIZADO: filter()");
    console.log("Función: mayorCero(producto) => producto.stock > 0");
    
    // Función nombrada integrada de punto4.js
    function mayorCero(producto) {
        return producto.stock > 0;
    }
    
    const productosConStock = productsCopy.filter(mayorCero);
    console.log("Resultado: Nuevo array 'productosConStock':");
    showFullArray(productosConStock, "RESULTADO de filter() - productosConStock");
    
    console.log("\n--- 5.2 map() - Extraer nombres ---");
    showFullArray(productsCopy, "ANTES de map()");
    console.log("MÉTODO UTILIZADO: map()");
    console.log("Función: nombres(producto) => producto.name");
    
    // Función nombrada integrada de punto4.js
    function nombres(producto) {
        return producto.name;
    }
    
    const nombresProductos = productsCopy.map(nombres);
    console.log("Resultado: Nuevo array 'nombresProductos':");
    console.log(nombresProductos);
    
    console.log("\n--- 5.3 find() - Buscar producto por ID ---");
    
    // producto que existe
    showFullArray(productsCopy, "ANTES de find()");
    console.log("MÉTODO UTILIZADO: find()");
    console.log("Función: elementoCinco(producto) => producto.id === 3");
    console.log("Buscando producto con id:3 (existe)");
    
    // Función nombrada integrada de punto4.js
    function elementoCinco(producto) {
        return producto.id === 3;
    }
    
    const productoEncontrado = productsCopy.find(elementoCinco);
    if (productoEncontrado) {
        console.log("Producto encontrado:");
        console.log(`  ID: ${productoEncontrado.id} | ${productoEncontrado.name} | Precio: $${formatPrice(productoEncontrado.price)} | Stock: ${productoEncontrado.stock}`);
    } else {
        console.log("No se encontró el producto con id:3.");
    }
    
    // producto que NO existe
    console.log("\nMÉTODO UTILIZADO: find()");
    console.log("Función: producto => producto.id === 99");
    console.log("Buscando producto con id:99 (no existe)");
    const productoNoEncontrado = productsCopy.find(product => product.id === 99);
    if (productoNoEncontrado) {
        console.log("Producto encontrado:", productoNoEncontrado);
    } else {
        console.log("No se encontró el producto con id:99.");
    }
    
    // con stock específico
    console.log("\nMÉTODO UTILIZADO: find()");
    console.log("Función: product => product.stock > 25");
    console.log("Buscando primer producto con stock > 25");
    const productoStockAlto = productsCopy.find(product => product.stock > 25);
    if (productoStockAlto) {
        console.log("Producto con stock > 25 encontrado:");
        console.log(`  ID: ${productoStockAlto.id} | ${productoStockAlto.name} | Precio: $${formatPrice(productoStockAlto.price)} | Stock: ${productoStockAlto.stock}`);
    } else {
        console.log("No se encontró producto con stock > 25.");
    }
}

// ordenamiento con slice() 
function ejecutarOrdenamiento() {
    printSeparator("6. ORDENAMIENTO Y VERIFICACIÓN - SORT", colors.green);
    
    // copia del array 
    let productsCopy = [...products];
    
    // Mostrar array completo antes de ordenar
    showFullArray(productsCopy, "ARRAY ANTES DE ORDENAR");
    
    console.log("\n--- 6.1 sort() - Ordenar por precio decreciente ---");
    const productosOrdenados = [...productsCopy].sort((a, b) => b.price - a.price);
    console.log("Nuevo array 'productosOrdenados' (de mayor a menor precio):");
    showFullArray(productosOrdenados, "RESULTADO DE ORDENAMIENTO (precio decreciente)");
    
    console.log("\n--- 6.2 Verificación de resultados ---");
    console.log("Precio más alto:", `$${formatPrice(productosOrdenados[0].price)}`);
    console.log("Precio más bajo:", `$${formatPrice(productosOrdenados[productosOrdenados.length - 1].price)}`);
    console.log("Total de productos ordenados:", productosOrdenados.length);
}

// ============================================================================
// FUNCIONES INTERACTIVAS 
// ============================================================================

// Agregar producto 
function agregarProductoInteractivo(rl, callback) {
    printSeparator("AGREGAR PRODUCTO INTERACTIVO", colors.blue);
    
    // Mostrar estado actual antes de agregar
    showFullArray(products, "ESTADO ACTUAL DEL INVENTARIO");
    
    rl.question("Ingrese nombre del producto: ", (name) => {
        rl.question("Ingrese precio del producto: ", (price) => {
            rl.question("Ingrese descripción del producto: ", (description) => {
                rl.question("Ingrese stock del producto: ", (stock) => {
                    const nuevoProducto = {
                        id: getNextId(),
                        name,
                        price: Number(price),
                        description,
                        stock: Number(stock)
                    };
                    
                    // Mostrar antes de agregar
                    showFullArray(products, "ESTADO ANTES DE AGREGAR");
                    
                    products.push(nuevoProducto);
                    console.log("Producto agregado exitosamente:");
                    console.log(`  ID: ${nuevoProducto.id} | ${nuevoProducto.name} | Precio: $${formatPrice(nuevoProducto.price)} | Stock: ${nuevoProducto.stock}`);
                    
                    // Mostrar después de agregar
                    showFullArray(products, "ESTADO DESPUÉS DE AGREGAR");
                    
                    // Preguntar si quiere continuar agregando
                    rl.question('\n¿Desea agregar otro producto? (s/n): ', (respuesta) => {
                        if (respuesta.toLowerCase() === 's' || respuesta.toLowerCase() === 'si' || respuesta.toLowerCase() === 'y' || respuesta.toLowerCase() === 'yes') {
                            agregarProductoInteractivo(rl, callback);
                        } else {
                            if (callback) callback();
                        }
                    });
                });
            });
        });
    });
}

// Buscar producto 
function buscarProductoInteractivo(rl, callback) {
    printSeparator("BUSCAR PRODUCTO POR ID", colors.blue);
    
    rl.question("Ingrese el ID del producto: ", (idIngresado) => {
        const encontrado = products.find(p => p.id === Number(idIngresado));
        if (encontrado) {
            console.log("Producto encontrado:");
            console.log(`  ID: ${encontrado.id} | ${encontrado.name} | Precio: $${formatPrice(encontrado.price)} | Stock: ${encontrado.stock}`);
            console.log(`  Descripción: ${encontrado.description}`);
        } else {
            console.log("No se encontró el producto con ID:", idIngresado);
        }
        
        // Preguntar si quiere continuar buscando
        rl.question('\n¿Desea buscar otro producto? (s/n): ', (respuesta) => {
            if (respuesta.toLowerCase() === 's' || respuesta.toLowerCase() === 'si' || respuesta.toLowerCase() === 'y' || respuesta.toLowerCase() === 'yes') {
                buscarProductoInteractivo(rl, callback);
            } else {
                if (callback) callback();
            }
        });
    });
}

// ============================================================================
// FUNCIÓN PRINCIPAL 
// ============================================================================

// TP completo con formato modular y visual
function ejecutarTPCompleto(rl = null, callback = null) {
    printSeparator("EJECUTANDO TP COMPLETO - FORMATO MODULAR", colors.magenta);
    
    if (rl) {
        // Con paginación interactiva
        showProductsPaginated(products, "1. ARRAY INICIAL - 5 PRODUCTOS", 3, rl, () => {
            ejecutarOperacionesBasicas();
            ejecutarRecorridos();
            ejecutarCRUD();
            ejecutarFiltrosMapeos();
            ejecutarOrdenamiento();
            
            printSeparator("TP COMPLETADO EXITOSAMENTE", colors.green);
            if (callback) callback();
        });
    } else {
        // Sin paginación (para compatibilidad)
        showProductsPaginated(products, "1. ARRAY INICIAL - 5 PRODUCTOS");
        ejecutarOperacionesBasicas();
        ejecutarRecorridos();
        ejecutarCRUD();
        ejecutarFiltrosMapeos();
        ejecutarOrdenamiento();
        
        printSeparator("TP COMPLETADO EXITOSAMENTE", colors.green);
    }
}

// ============================================================================
// MENÚ  
// ============================================================================

function showMenu() {
    console.clear();
    printSeparator("MENÚ PRINCIPAL - TP 1 JAVASCRIPT - Grupo W", colors.magenta);
    
    const menuOptions = [
        "1. Ver Array Inicial (5 productos)",
        "2. Operaciones Básicas y Acceso (longitud e índices)",
        "3. Recorridos del Array (for...of y forEach)",
        "4. Métodos CRUD (push, pop, unshift, shift)",
        "5. Filtros y Mapeos (filter, map, find - casos de éxito y fallo)",
        "6. Ordenamiento y Verificación (sort)",
        "7. Ejecutar TP Completo (Formato Modular)",
        "8. Agregar Producto Interactivo (Input del usuario)",
        "9. Buscar Producto por ID (Input del usuario)",
        "0. Salir"
    ];
    
    menuOptions.forEach(option => {
        printColor(option, colors.white);
    });
    
    printSeparator("", colors.magenta);
}

// menú principal 
function mainMenu() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    function mostrarMenu() {
        showMenu();
        rl.question('Selecciona una opción (0-9): ', (answer) => {
            switch(answer.trim()) {
                case '1':
                    showProductsPaginated(products, "ARRAY INICIAL - 5 PRODUCTOS", 3, rl, () => {
                        rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    });
                    break;
                case '2':
                    ejecutarOperacionesBasicas();
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    break;
                case '3':
                    ejecutarRecorridos();
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    break;
                case '4':
                    ejecutarCRUD();
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    break;
                case '5':
                    ejecutarFiltrosMapeos();
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    break;
                case '6':
                    ejecutarOrdenamiento();
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    break;
                case '7':
                    ejecutarTPCompleto(rl, () => {
                        rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    });
                    break;
                case '8':
                    agregarProductoInteractivo(rl, () => {
                        rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    });
                    break;
                case '9':
                    buscarProductoInteractivo(rl, () => {
                        rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    });
                    break;
                case '0':
                    printColor("¡Hasta luego!", colors.green);
                    rl.close();
                    break;
                default:
                    printColor("Opción no válida. Intenta de nuevo.", colors.red);
                    rl.question('\nPresiona Enter para continuar...', mostrarMenu);
            }
        });
    }
    
    mostrarMenu();
}

// Iniciar el menú principal
mainMenu();