import { prisma } from "../config/database"

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

export const productService = {
  async getProducts(userId: string) {
    return await prisma.product.findMany({
      where: { userId },
      orderBy: { order: "asc" },
    })
  },

  async createProduct(userId: string, data: CreateProductData) {
    const maxOrder = await prisma.product.findFirst({
      where: { userId },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    return await prisma.product.create({
      data: {
        ...data,
        userId,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })
  },

  async updateProduct(id: string, userId: string, data: UpdateProductData) {
    const product = await prisma.product.findFirst({
      where: { id, userId },
    })

    if (!product) {
      throw new Error("Product not found")
    }

    return await prisma.product.update({
      where: { id },
      data,
    })
  },

  async deleteProduct(id: string, userId: string) {
    const product = await prisma.product.findFirst({
      where: { id, userId },
    })

    if (!product) {
      throw new Error("Product not found")
    }

    await prisma.product.delete({
      where: { id },
    })
  },

  async reorderProducts(userId: string, productIds: string[]) {
    const products = await prisma.product.findMany({
      where: { userId, id: { in: productIds } },
    })

    if (products.length !== productIds.length) {
      throw new Error("Invalid product IDs")
    }

    await prisma.$transaction(
      productIds.map((id, index) =>
        prisma.product.update({
          where: { id },
          data: { order: index },
        }),
      ),
    )
  },
}
