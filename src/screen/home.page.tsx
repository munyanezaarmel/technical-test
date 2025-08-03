"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import useSWR, { mutate } from "swr"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ProductList } from "../components/ProductList"
import { ProductForm } from "../components/ProductForm"
import { Button } from "../layout/button.layout"
import { Card, CardHeader, CardContent } from "../layout/card.layout"
import { productApiService, type Product } from "../service/product.service"

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  const { data: products = [], error } = useSWR<Product[]>(
    session ? "/api/products" : null,
    productApiService.getProducts,
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((item) => item.id === active.id)
      const newIndex = products.findIndex((item) => item.id === over.id)

      const newProducts = arrayMove(products, oldIndex, newIndex)

      // Optimistic update
      mutate("/api/products", newProducts, false)

      try {
        await productApiService.reorderProducts(newProducts.map((p) => p.id))
        mutate("/api/products")
      } catch (error) {
        // Revert on error
        mutate("/api/products")
      }
    }
  }

  const handleProductCreated = () => {
    setShowForm(false)
    mutate("/api/products")
  }

  const handleProductUpdated = () => {
    mutate("/api/products")
  }

  const handleProductDeleted = () => {
    mutate("/api/products")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {session.user?.email}</span>
              <Button variant="secondary" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Product List ({products.length})</h2>
            <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Product"}</Button>
          </div>

          {showForm && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Add New Product</h3>
              </CardHeader>
              <CardContent>
                <ProductForm onSuccess={handleProductCreated} />
              </CardContent>
            </Card>
          )}

          {error && <div className="text-red-600 text-center py-4">Failed to load products. Please try again.</div>}

          {products.length === 0 && !error ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No products yet. Add your first product!</p>
              </CardContent>
            </Card>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={products.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                <ProductList products={products} onUpdate={handleProductUpdated} onDelete={handleProductDeleted} />
              </SortableContext>
            </DndContext>
          )}
        </div>
      </main>
    </div>
  )
}
