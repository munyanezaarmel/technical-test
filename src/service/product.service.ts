export interface Product {
  id: string
  name: string
  amount: string
  comment?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductData {
  name: string
  amount: string
  comment?: string
}

export interface UpdateProductData {
  name?: string
  amount?: string
  comment?: string
}

export const productApiService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch("/api/products")
    if (!response.ok) throw new Error("Failed to fetch products")
    return response.json()
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create product")
    return response.json()
  },

  async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update product")
    return response.json()
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete product")
  },

  async reorderProducts(productIds: string[]): Promise<void> {
    const response = await fetch("/api/products/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds }),
    })
    if (!response.ok) throw new Error("Failed to reorder products")
  },
}
