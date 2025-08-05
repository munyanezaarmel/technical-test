import { ProductItem } from "./ProductItem"
import type { Product } from "../service/product.service"

interface ProductListProps {
  products: Product[]
  onUpdate: () => void
  onDelete: () => void
}

export function ProductList({ products, onUpdate, onDelete }: ProductListProps) {
  return (
    <div className="space-y-3">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}
