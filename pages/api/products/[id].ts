import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { productService } from "../../../src/backend/product.service"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { id } = req.query

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid product ID" })
  }

  try {
    switch (req.method) {
      case "PUT":
        const updatedProduct = await productService.updateProduct(id, session.user.id, req.body)
        return res.status(200).json(updatedProduct)

      case "DELETE":
        await productService.deleteProduct(id, session.user.id)
        return res.status(204).end()

      default:
        return res.status(405).json({ error: "Method not allowed" })
    }
  } catch (error) {
    console.error("Product API error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
