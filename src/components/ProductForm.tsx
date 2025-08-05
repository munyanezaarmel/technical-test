"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../layout/button.layout"
import { Input } from "../layout/input.layout"
import { productApiService } from "../service/product.service"

interface ProductFormProps {
  onSuccess: () => void
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    comment: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await productApiService.createProduct({
        name: formData.name,
        amount: formData.amount,
        comment: formData.comment || undefined,
      })

      setFormData({ name: "", amount: "", comment: "" })
      onSuccess()
    } catch (error) {
      console.error("Failed to create product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
          required
        />
        <Input
          label="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Enter amount"
          required
        />
      </div>
      <Input
        label="Comment (Optional)"
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        placeholder="Add a comment"
      />
      <div className="flex justify-end">
        <Button type="submit" loading={loading} disabled={!formData.name.trim() || !formData.amount.trim()}>
          Add Product
        </Button>
      </div>
    </form>
  )
}
