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

// productos con paginación
function showProductsPaginated(products, title, pageSize = 3) {
    printSeparator(title, colors.green);
    
    if (products.length === 0) {
        printColor("No hay productos para mostrar", colors.red);
        return;
    }
    
    const totalPages = Math.ceil(products.length / pageSize);
    
    for (let page = 0; page < totalPages; page++) {
        const start = page * pageSize;
        const end = Math.min(start + pageSize, products.length);
        const pageProducts = products.slice(start, end);
        
        printColor(`--- Página ${page + 1} de ${totalPages} ---`, colors.yellow);
        
        pageProducts.forEach((product, index) => {
            const globalIndex = start + index;
            printColor(`[${globalIndex + 1}] ${product.name}`, colors.bright);
            console.log(`    ID: ${product.id} | Precio: $${product.price} | Stock: ${product.stock}`);
            console.log(`    Descripción: ${product.description}`);
            console.log('');
        });
        
        if (page < totalPages - 1) {
            printColor("Presiona Enter para continuar...", colors.blue);
        }
    }
}

// ============================================================================
// FUNCIONES ESPECÍFICAS DEL TP
// ============================================================================

// operaciones básicas
function ejecutarOperacionesBasicas() {
    printSeparator("2. OPERACIONES BÁSICAS Y ACCESO", colors.green);
    
    
    console.log("\n--- 2.1 Longitud del Array ---");
    console.log("La cantidad de productos es:", products.length);
    
    console.log("\n--- 2.2 Acceso por Índice ---");
    console.log("Nombre del segundo producto:", products[1].name);
    console.log("Nombre del cuarto producto:", products[3].name);
}

// recorridos
function ejecutarRecorridos() {
    printSeparator("3. RECORRIDOS DEL ARRAY", colors.green);
    
    
    console.log("\n--- 3.1 Recorrido con for...of ---");
    for (const product of products) {
        console.log(`Nombre: ${product.name}, Precio: ${product.price}`);
    }
    
    console.log("\n--- 3.2 Recorrido con forEach ---");
    products.forEach(product => {
        console.log(`Producto: ${product.name}, Precio: ${product.price}`);
    });
}

// métodos CRUD 
function ejecutarCRUD() {
    printSeparator("4. MÉTODOS CRUD - AGREGAR/ELIMINAR", colors.green);
    
    // copia  array para no modificar el original
    let productsCopy = [...products];
    
    console.log("\n--- 4.1 push() - Agregar elementos al final ---");
    productsCopy.push(
        { id: 6, name: "Combo 6 - Marketing Digital", description: "Gestión de redes, SEO y campañas.", price: 3200, stock: 30 },
        { id: 7, name: "Combo 7 - Diseño Gráfico", description: "Creación de logos, branding y material visual.", price: 2800, stock: 18 }
    );
    console.log("Array después de push():", productsCopy);
    
    console.log("\n--- 4.2 pop() - Eliminar último elemento ---");
    const productoEliminadoPop = productsCopy.pop();
    console.log("Producto eliminado con pop():", productoEliminadoPop);
    console.log("Array después de pop():", productsCopy);
    
    console.log("\n--- 4.3 unshift() - Agregar elemento al inicio ---");
    productsCopy.unshift({ id: 0, name: "Combo 0 - Consultoría Inicial", description: "Análisis de negocio y estrategia.", price: 1500, stock: 50 });
    console.log("Array después de unshift():", productsCopy);
    
    console.log("\n--- 4.4 shift() - Eliminar primer elemento ---");
    const productoEliminadoShift = productsCopy.shift();
    console.log("Producto eliminado con shift():", productoEliminadoShift);
    console.log("Array después de shift():", productsCopy);
}

// filtros y mapeos 
function ejecutarFiltrosMapeos() {
    printSeparator("5. FILTROS Y MAPEOS - FILTER, MAP, FIND", colors.green);
    
    // copia  array 
    let productsCopy = [...products];
    
    console.log("\n--- 5.1 filter() - Filtrar por stock > 0 ---");
    console.log("MÉTODO UTILIZADO: filter()");
    console.log("Función: product => product.stock > 0");
    const productosConStock = productsCopy.filter(product => product.stock > 0);
    console.log("Resultado: Nuevo array 'productosConStock':", productosConStock);
    
    console.log("\n--- 5.2 map() - Extraer nombres ---");
    console.log("MÉTODO UTILIZADO: map()");
    console.log("Función: product => product.name");
    const nombresProductos = productsCopy.map(product => product.name);
    console.log("Resultado: Nuevo array 'nombresProductos':", nombresProductos);
    
    console.log("\n--- 5.3 find() - Buscar producto por ID ---");
    
    // producto que existe
    console.log("MÉTODO UTILIZADO: find()");
    console.log("Función: product => product.id === 3");
    console.log("Buscando producto con id:3 (existe)");
    const productoEncontrado = productsCopy.find(product => product.id === 3);
    if (productoEncontrado) {
        console.log("Producto encontrado:", productoEncontrado);
    } else {
        console.log("No se encontró el producto con id:3.");
    }
    
    // producto que NO existe
    console.log("\nMÉTODO UTILIZADO: find()");
    console.log("Función: product => product.id === 99");
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
        console.log("Producto con stock > 25 encontrado:", productoStockAlto);
    } else {
        console.log("No se encontró producto con stock > 25.");
    }
}

// ordenamiento 
function ejecutarOrdenamiento() {
    printSeparator("6. ORDENAMIENTO Y VERIFICACIÓN - SORT", colors.green);
    
    // copia 
    let productsCopy = [...products];
    
    console.log("\n--- 6.1 sort() - Ordenar por precio decreciente ---");
    const productosOrdenados = [...productsCopy].sort((a, b) => b.price - a.price);
    console.log("Nuevo array 'productosOrdenados' (de mayor a menor precio):", productosOrdenados);
    
    console.log("\n--- 6.2 Verificación de resultados ---");
    console.log("Precio más alto:", productosOrdenados[0].price);
    console.log("Precio más bajo:", productosOrdenados[productosOrdenados.length - 1].price);
    console.log("Total de productos ordenados:", productosOrdenados.length);
}

// ============================================================================
// FUNCIÓN PRINCIPAL DEL TP
// ============================================================================

// TP completo con formato modular y visual
function ejecutarTPCompleto() {
    printSeparator("EJECUTANDO TP COMPLETO - FORMATO MODULAR", colors.magenta);
    
    showProductsPaginated(products, "1. ARRAY INICIAL - 5 PRODUCTOS");
    ejecutarOperacionesBasicas();
    ejecutarRecorridos();
    ejecutarCRUD();
    ejecutarFiltrosMapeos();
    ejecutarOrdenamiento();
    
    printSeparator("TP COMPLETADO EXITOSAMENTE", colors.green);
}

// ============================================================================
// MENÚ INTERACTIVO
// ============================================================================

// menú principal
function showMenu() {
    console.clear();
    printSeparator("MENÚ PRINCIPAL - TP 1 JAVASCRIPT- Grupo W", colors.magenta);
    
    const menuOptions = [
        "1. Ver Array Inicial (5 productos)",
        "2. Operaciones Básicas y Acceso (longitud e índices)",
        "3. Recorridos del Array (for...of y forEach)",
        "4. Métodos CRUD (push, pop, unshift, shift)",
        "5. Filtros y Mapeos (filter, map, find - casos de éxito y fallo)",
        "6. Ordenamiento y Verificación (sort)",
        "7. Ejecutar TP Completo (Formato Modular)",
        "8. Salir"
    ];
    
    menuOptions.forEach(option => {
        printColor(option, colors.white);
    });
    
    printSeparator("", colors.magenta);
}

// menú
function mainMenu() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    function mostrarMenu() {
        showMenu();
        rl.question('Selecciona una opción (1-8): ', (answer) => {
            switch(answer.trim()) {
                case '1':
                    showProductsPaginated(products, "ARRAY INICIAL - 5 PRODUCTOS");
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
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
                    ejecutarTPCompleto();
                    rl.question('\nPresiona Enter para volver al menú...', mostrarMenu);
                    break;
                case '8':
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

