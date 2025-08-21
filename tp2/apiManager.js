import fetch from "node-fetch";

export default class ApiManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllProducts() {
    const response = await fetch(`${this.baseUrl}/products`);
    return response.json();
  }

  async getProductById(id) {
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    return response.json();
  }

  async addProduct(product) {
    const response = await fetch(`${this.baseUrl}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  async deleteProduct(id) {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }
}
