import fs from "fs";

export default class FileManager {
  constructor(filename) {
    this.filename = filename;
  }

  readProducts() {
    try {
      return JSON.parse(fs.readFileSync(this.filename, "utf-8"));
    } catch {
      return [];
    }
  }

  saveProducts(products) {
    fs.writeFileSync(this.filename, JSON.stringify(products, null, 2));
  }

  addProduct(product) {
    const products = this.readProducts();
    products.push(product);
    this.saveProducts(products);
  }

  removeProductsAbovePrice(price) {
    let products = this.readProducts();
    products = products.filter((p) => p.price <= price);
    this.saveProducts(products);
  }
}
