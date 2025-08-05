"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Edit2, Trash2, Check, X } from "lucide-react"
import { Button } from "../layout/button.layout"
import { Input } from "../layout/input.layout"
import { Card, CardContent } from "../layout/card.layout"
import { type Product, productApiService } from "../service/product.service"

interface ProductItemProps {
  product: Product
  onUpdate: () => void
  onDelete: () => void
}

export function ProductItem({ product, onUpdate, onDelete }: ProductItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: product.name,
    amount: product.amount,
    comment: product.comment || "",
  })
  const [loading, setLoading] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await productApiService.updateProduct(product.id, editData)
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error("Failed to update product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      name: product.name,
      amount: product.amount,
      comment: product.comment || "",
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      setLoading(true)
      try {
        await productApiService.deleteProduct(product.id)
        onDelete()
      } catch (error) {
        console.error("Failed to delete product:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`transition-shadow hover:shadow-md ${isDragging ? "shadow-lg" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-5 h-5" />
          </button>

          {isEditing ? (
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Product name"
                />
                <Input
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  placeholder="Amount"
                />
              </div>
              <Input
                value={editData.comment}
                onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
                placeholder="Comment (optional)"
              />
            </div>
          ) : (
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">Amount: {product.amount}</p>
                  {product.comment && <p className="text-sm text-gray-500 mt-1">{product.comment}</p>}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  onClick={handleSave}
                  loading={loading}
                  disabled={!editData.name.trim() || !editData.amount.trim()}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel} disabled={loading}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} disabled={loading}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="danger" onClick={handleDelete} loading={loading}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
