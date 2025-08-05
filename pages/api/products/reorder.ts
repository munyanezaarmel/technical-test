import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]" // Updated import path
import { productService } from "../../../src/backend/product.service"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  console.log("Session in reorder API:", session) // Added console log for session

  if (!session?.user?.id) {
    console.log("No session or user ID found") // Added console log for missing session or user ID
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { productIds } = req.body
    console.log("Reordering products for user:", session.user.id) // Added console log for reordering products
    await productService.reorderProducts(session.user.id, productIds)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Reorder API error:", error) // Added console log for error
    return res.status(500).json({ error: "Internal server error" })
  }
}
