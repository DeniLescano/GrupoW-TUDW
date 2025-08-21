/*
import readlineSync from "readline-sync";

export default class MenuSystem {
  constructor(apiManager, fileManager) {
    this.apiManager = apiManager;
    this.fileManager = fileManager;
  }

  async showMenu() {
    console.log("\n=== MENÚ ===");
    console.log("1. Ver todos los productos (API)");
    console.log("2. Ver producto por ID (API)");
    console.log("3. Agregar producto (API)");
    console.log("4. Eliminar producto (API)");
    console.log("5. Ver productos guardados (FileSystem)");
    console.log("6. Agregar producto guardado (FileSystem)");
    console.log("7. Eliminar productos por precio (FileSystem)");
    console.log("0. Salir");

    const option = readlineSync.question("Elegí una opción: ");
    await this.handleOption(option);
  }

  async handleOption(option) {
    switch (option) {
      case "1":
        console.log(await this.apiManager.getAllProducts());
        break;
      case "2":
        const id = readlineSync.question("ID del producto: ");
        console.log(await this.apiManager.getProductById(id));
        break;
      case "3":
        const title = readlineSync.question("Nombre del producto: ");
        const price = readlineSync.questionInt("Precio: ");
        console.log(await this.apiManager.addProduct({ title, price }));
        break;
      case "4":
        const idDelete = readlineSync.question("ID a eliminar: ");
        console.log(await this.apiManager.deleteProduct(idDelete));
        break;
      case "5":
        console.log(this.fileManager.readProducts());
        break;
      case "6":
        const titleFile = readlineSync.question("Nombre del producto: ");
        const priceFile = readlineSync.questionInt("Precio: ");
        this.fileManager.addProduct({ title: titleFile, price: priceFile });
        console.log("Producto guardado.");
        break;
      case "7":
        const limit = readlineSync.questionInt("Eliminar productos con precio mayor a: ");
        this.fileManager.removeProductsAbovePrice(limit);
        console.log("Productos eliminados.");
        break;
      case "0":
        console.log("¡Chau!");
        process.exit();
      default:
        console.log("Opción inválida.");
    }

    await this.showMenu(); // vuelve al menú
  }
}
*/

// NUEVO MENU // 


import readlineSync from "readline-sync";

export default class MenuSystem {
  constructor(apiManager, fileManager) {
    this.apiManager = apiManager;
    this.fileManager = fileManager;
  }

  // Función para mostrar productos con formato tabular
  mostrarProductos(productos, titulo = "Productos") {
    console.log(`\n📦 ${titulo} 📦\n`);
    if (!productos || productos.length === 0) {
      console.log("⚠️ No hay productos para mostrar.");
      return;
    }

    const tabla = productos.map(p => ({
      ID: p.id || "-",
      Nombre: p.title || p.nombre || "-",
      Precio: `$${p.price || p.precio || 0}`,
      Categoría: p.category || "-"
    }));

    console.table(tabla);
  }

  async showMenu() {
    console.log("\n=== MENÚ ===");
    console.log("1. Ver todos los productos (API)");
    console.log("2. Ver producto por ID (API)");
    console.log("3. Agregar producto (API)");
    console.log("4. Eliminar producto (API)");
    console.log("5. Ver productos guardados (FileSystem)");
    console.log("6. Agregar producto guardado (FileSystem)");
    console.log("7. Eliminar productos por precio (FileSystem)");
    console.log("0. Salir");

    const option = readlineSync.question("Elegí una opción: ");
    await this.handleOption(option);

    // Pausa antes de volver al menú
    console.log("\nPresioná ENTER para volver al menú...");
    readlineSync.question('');
    await this.showMenu(); // vuelve a mostrar el menú
}


  async handleOption(option) {
    try {
      switch (option) {
        case "1":
          try {
            const products = await this.apiManager.getAllProducts();
            this.mostrarProductos(products, "Todos los productos (API)");
          } catch (error) {
            console.error("❌ No se pudieron recuperar los productos. Verifica tu conexión o la API.");
          }
          break;

        case "2":
          try {
            const id = readlineSync.question("ID del producto: ");
            const product = await this.apiManager.getProductById(id);
            if (!product) {
              console.log(`⚠️ Producto con ID ${id} no encontrado.`);
            } else {
              this.mostrarProductos([product], `Producto con ID ${id}`);
            }
          } catch (error) {
            console.error("❌ Error al buscar el producto. Intenta nuevamente.");
          }
          break;

        case "3":
          try {
            const title = readlineSync.question("Nombre del producto: ");
            const price = readlineSync.questionFloat("Precio: ");
            const newProduct = await this.apiManager.addProduct({ title, price });
            this.mostrarProductos([newProduct], "Producto agregado (API)");
          } catch (error) {
            console.error("❌ Error al agregar el producto. Verifica los datos ingresados.");
          }
          break;

        case "4":
          try {
            const idDelete = readlineSync.question("ID a eliminar: ");
            const result = await this.apiManager.deleteProduct(idDelete);
            console.log("✅ Resultado de la operación:", result);
          } catch (error) {
            console.error("❌ Error al eliminar el producto. Revisa que el ID exista.");
          }
          break;

        case "5":
          try {
            const productsFile = this.fileManager.readProducts();
            this.mostrarProductos(productsFile, "Productos en archivo local");
          } catch (error) {
            console.error("❌ Error al leer los productos desde el archivo local.");
          }
          break;

        case "6":
          try {
            const titleFile = readlineSync.question("Nombre del producto: ");
            const priceFile = readlineSync.questionFloat("Precio: ");
            this.fileManager.addProduct({ title: titleFile, price: priceFile });
            console.log("✅ Producto guardado en archivo local.");
          } catch (error) {
            console.error("❌ Error al agregar el producto al archivo local.");
          }
          break;

        case "7":
          try {
            const limit = readlineSync.questionFloat("Eliminar productos con precio mayor a: ");
            this.fileManager.removeProductsAbovePrice(limit);
            console.log("✅ Productos eliminados correctamente.");
          } catch (error) {
            console.error("❌ Error al eliminar productos del archivo local.");
          }
          break;

        case "0":
          console.log("¡Chau!");
          process.exit();

        default:
          console.log("⚠️ Opción inválida. Intenta nuevamente.");
      }
    } catch (error) {
      // por si algo inesperado falla
      console.error("❌ Ocurrió un error inesperado:", error.message);
    }

    await this.showMenu(); // vuelve al menú
  }
}
