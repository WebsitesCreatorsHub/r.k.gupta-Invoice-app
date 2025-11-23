"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Plus, Edit2, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  weight: number
  basePrice: number
  image: string
}

const mockProducts: Product[] = [
  { id: "1", name: "Gold Chain 22K", category: "Chains", weight: 2.5, basePrice: 5000, image: "🔗" },
  { id: "2", name: "Gold Bracelet", category: "Bracelets", weight: 3.0, basePrice: 6000, image: "💍" },
  { id: "3", name: "Gold Ring", category: "Rings", weight: 1.5, basePrice: 3000, image: "💎" },
  { id: "4", name: "Gold Pendant", category: "Pendants", weight: 2.0, basePrice: 4000, image: "🌟" },
  { id: "5", name: "Gold Earrings", category: "Earrings", weight: 1.0, basePrice: 2000, image: "✨" },
]

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState(mockProducts)
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    weight: 0,
    basePrice: 0,
    image: "",
  })

  const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addProduct = () => {
    if (newProduct.name && newProduct.category) {
      setProducts([...products, { ...newProduct, id: Date.now().toString() }])
      setNewProduct({ name: "", category: "", weight: 0, basePrice: 0, image: "" })
      setShowForm(false)
    }
  }

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your gold products catalog</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Product Name</label>
              <Input
                placeholder="Gold Chain 22K"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Category</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option>Chains</option>
                <option>Bracelets</option>
                <option>Rings</option>
                <option>Pendants</option>
                <option>Earrings</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Weight (grams)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={newProduct.weight || ""}
                onChange={(e) => setNewProduct({ ...newProduct, weight: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Base Price (₹)</label>
              <Input
                type="number"
                placeholder="0"
                value={newProduct.basePrice || ""}
                onChange={(e) => setNewProduct({ ...newProduct, basePrice: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={addProduct} className="flex-1">
              Save Product
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">{product.image}</div>
            <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{product.category}</p>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Weight</p>
                <p className="font-medium text-foreground">{product.weight}g</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Price</p>
                <p className="font-medium text-foreground">₹{product.basePrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-muted rounded transition-colors">
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  )
}
