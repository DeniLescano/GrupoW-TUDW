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
      ID: p.id ?? "-",
      Nombre: p.title ?? p.nombre ?? "-",
      Precio: p.price != null ? `$${p.price}` : "-",
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
    console.log("8. Ver productos por precio máximo");// Nueva opcion 
    console.log("9. Obtener productos limitados de la API");      // Nueva opcion
    console.log("10. Guardar productos de la API en archivo local"); // Nueva opcion
    console.log("11. Modificar producto de la API");             // Nueva opcion
    console.log("0. Salir");

    const option = readlineSync.question("Elegí una opción: ");
    await this.handleOption(option);

    console.log("\nPresioná ENTER para volver al menú...");
    readlineSync.question('');
    await this.showMenu();
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

        case "8":
          try {
            const maxPrice = readlineSync.questionFloat("Mostrar productos con precio hasta: ");
            const productsFile = this.fileManager.readProducts();
            const filtered = productsFile.filter(p => p.price <= maxPrice);
            this.mostrarProductos(filtered, `Productos hasta $${maxPrice}`);
          } catch (error) {
            console.error("❌ Error al filtrar productos por precio.");
          }
          break;

        // NUEVO CASES //
        case "9": // Obtener productos limitados de la API
          try {
            const limit = readlineSync.questionInt("Cantidad de productos a recuperar: ");
            const limitedProducts = await this.apiManager.getLimitedProducts(limit);
            this.mostrarProductos(limitedProducts, `Primeros ${limit} productos`);
          } catch (error) {
            console.error("❌ Error al recuperar productos limitados:", error.message);
          }
          break;

        case "10": // Guardar productos de la API en archivo local
          try {
            const products = await this.apiManager.getAllProducts();
            this.fileManager.saveApiProducts(products); // usa el método nuevo que agregamos
          } catch (error) {
            console.error("❌ Error al guardar productos:", error.message);
          }
          break;

        case "11": // Modificar producto de la API (UPDATE)
          try {
            const id = readlineSync.questionInt("ID del producto a modificar: ");
            const title = readlineSync.question("Nuevo nombre (dejar vacío para no cambiar): ");
            const price = readlineSync.questionFloat("Nuevo precio (0 para no cambiar): ");
            const updatedData = {};
            if (title) updatedData.title = title;
            if (price) updatedData !== 0 && (updatedData.price = price); // solo si el usuario puso un valor
            const updatedProduct = await this.apiManager.updateProduct(id, updatedData);
            console.log("✅ Producto actualizado:");
            this.mostrarProductos([updatedProduct], `Producto con ID ${id}`);
          } catch (error) {
            console.error("❌ Error al actualizar producto:", error.message);
          }
          break;

        case "0":
          console.log("¡Chau!");
          process.exit();

        default:
          console.log("⚠️ Opción inválida. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("❌ Ocurrió un error inesperado:", error.message);
    }

    await this.showMenu();
  }
}