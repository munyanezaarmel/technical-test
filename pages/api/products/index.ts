import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { productService } from "../../../src/backend/product.service"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    switch (req.method) {
      case "GET":
        const products = await productService.getProducts(session.user.id)
        return res.status(200).json(products)

      case "POST":
        const newProduct = await productService.createProduct(session.user.id, req.body)
        return res.status(201).json(newProduct)

      default:
        return res.status(405).json({ error: "Method not allowed" })
    }
  } catch (error) {
    console.error("Products API error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
