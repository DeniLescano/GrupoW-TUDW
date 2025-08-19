
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

// Función para formatear precios
const formatPrice = (value) => Number(value).toLocaleString('es-AR');

// ====== MENÚ ======
const mostrarMenu = () => {
    console.log("\n=== MENÚ DE OPCIONES ===");
    console.log("1. Mostrar longitud del array (length)");
    console.log("2. Mostrar el nombre del 2° y 4° producto (índice)");
    console.log("3. Recorrer con for...of (nombre y precio)");
    console.log("4. Recorrer con forEach (frase descriptiva)");
    console.log("5. Agregar dos productos al final (push)");
    console.log("6. Eliminar último producto (pop)");
    console.log("7. Agregar producto al inicio (unshift)");
    console.log("8. Eliminar primer producto (shift)");
    console.log("9. Filtrar productos con stock > 0 (filter)");
    console.log("10. Listar solo nombres de productos (map)");
    console.log("11. Buscar producto por ID (find)");
    console.log("12. Ordenar por precio descendente (sort)");
    console.log("0. Salir");
};

// Configuración para leer desde consola en Node.js
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funciones
const ejecutarOpcion = (opcion) => {
    switch (opcion) {
        case "1":
            console.log(`Cantidad de productos: ${products.length}`);
            break;

        case "2":
            console.log(`Segundo producto: ${products[1]?.name}`);
            console.log(`Cuarto producto: ${products[3]?.name}`);
            break;

        case "3":
            console.log("\n— Recorrido con for...of —");
            for (const product of products) {
                console.log(`${product.name} - $${formatPrice(product.price)}`);
            }
            break;

        case "4":
            console.log("\n— Recorrido con forEach —");
            products.forEach(product => {
                console.log(`Producto: ${product.name}, Precio: $${formatPrice(product.price)}`);
            });
            break;

        case "5":
            const pedirProducto = (num, callback) => {
                readline.question(`Ingrese nombre del producto ${num}: `, (name) => {
                    readline.question(`Ingrese precio del producto ${num}: `, (price) => {
                        readline.question(`Ingrese descripción del producto ${num}: `, (description) => {
                            readline.question(`Ingrese stock del producto ${num}: `, (stock) => {
                                const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                                callback({
                                    id,
                                    name,
                                    price: Number(price),
                                    description,
                                    stock: Number(stock)
                                });
                            });
                        });
                    });
                });
            };
            pedirProducto(1, (producto) => {
                products.push(producto);
                console.log("Array después de push():", products);
                iniciarMenu();
            });
            break;

        case "6":
            const eliminadoPop = products.pop();
            console.log("Producto eliminado:", eliminadoPop);
            console.log("Array después de pop():", products);
            break;

        case "7":
            readline.question("Ingrese nombre del producto 0: ", (name) => {
                readline.question("Ingrese precio del producto 0: ", (price) => {
                    readline.question("Ingrese descripción del producto 0: ", (description) => {
                        readline.question("Ingrese stock del producto 0: ", (stock) => {
                            products.unshift({
                                id: 0,
                                name,
                                price: Number(price),
                                description,
                                stock: Number(stock)
                            });
                            console.log("Array después de unshift():", products);
                            iniciarMenu();
                        });
                    });
                });
            });
            return; 

        case "8":
            const eliminadoShift = products.shift();
            console.log("Producto eliminado:", eliminadoShift);
            console.log("Array después de shift():", products);
            break;

        case "9":
            const productosConStock = products.filter(p => p.stock > 0);
            console.log("Productos con stock > 0:", productosConStock);
            break;

        case "10":
            const nombresProductos = products.map(p => p.name);
            console.log("Nombres de productos:", nombresProductos);
            break;

        case "11":
            readline.question("Ingrese el ID del producto: ", (idIngresado) => {
                const encontrado = products.find(p => p.id === Number(idIngresado));
                if (encontrado) {
                    console.log("Producto encontrado:", encontrado);
                } else {
                    console.log("No se encontró el producto.");
                }
                iniciarMenu();
            });
            return; // Evita cerrar readline

        case "12":
            const productosOrdenados = [...products].sort((a, b) => b.price - a.price);
            console.log("Productos ordenados por precio descendente:", productosOrdenados);
            break;

        case "0":
            console.log("Saliendo...");
            readline.close();
            return;

        default:
            console.log("Opción inválida, intente de nuevo.");
    }

    iniciarMenu();
};

// Función para iniciar el menú
const iniciarMenu = () => {
    mostrarMenu();
    readline.question("Seleccione una opción: ", ejecutarOpcion);
};

// Iniciar programa
console.log("Array de productos original:", products);
iniciarMenu();
