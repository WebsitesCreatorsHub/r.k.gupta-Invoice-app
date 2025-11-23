"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, FileDown, Check } from "lucide-react"

interface InvoiceItem {
  id: string
  productName: string
  weight: number
  rate: number
  gst: number
  discount: number
}

export function InvoiceCreate() {
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [newItem, setNewItem] = useState<InvoiceItem>({
    id: "1",
    productName: "",
    weight: 0,
    rate: 0,
    gst: 0,
    discount: 0,
  })

  const addItem = () => {
    if (newItem.productName) {
      setItems([...items, { ...newItem, id: Date.now().toString() }])
      setNewItem({
        id: (items.length + 1).toString(),
        productName: "",
        weight: 0,
        rate: 0,
        gst: 0,
        discount: 0,
      })
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const itemTotal = item.weight * item.rate
      const itemWithGST = itemTotal + (itemTotal * item.gst) / 100
      const itemWithDiscount = itemWithGST - item.discount
      return total + itemWithDiscount
    }, 0)
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const invoiceNumber = `INV-${Date.now()}`
      const response = await fetch("/api/invoices/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber,
          customerName,
          customerPhone,
          items,
          totalAmount: calculateTotal(),
        }),
      })

      if (response.ok) {
        setSuccessMessage("PDF generated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
        // In production, download the PDF here
      }
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const saveDraft = async () => {
    setIsSavingDraft(true)
    try {
      // Mock save to localStorage
      const draft = {
        customerName,
        customerPhone,
        items,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem("invoiceDraft", JSON.stringify(draft))
      setSuccessMessage("Draft saved successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } finally {
      setIsSavingDraft(false)
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
        <p className="text-muted-foreground mt-2">Generate a new invoice for customer</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-2">
          <Check className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-primary">{successMessage}</p>
        </div>
      )}

      {/* Customer Details */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Customer Name</label>
            <Input
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
            <Input
              placeholder="Enter phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              type="tel"
            />
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Invoice Items</h2>

        {/* Items List */}
        {items.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2">Product</th>
                  <th className="text-right py-2 px-2">Weight</th>
                  <th className="text-right py-2 px-2">Rate</th>
                  <th className="text-right py-2 px-2">GST %</th>
                  <th className="text-right py-2 px-2">Discount</th>
                  <th className="text-right py-2 px-2">Total</th>
                  <th className="text-center py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => {
                  const itemTotal = item.weight * item.rate
                  const itemWithGST = itemTotal + (itemTotal * item.gst) / 100
                  const finalTotal = itemWithGST - item.discount
                  return (
                    <tr key={item.id} className="hover:bg-muted/30">
                      <td className="py-2 px-2">{item.productName}</td>
                      <td className="text-right py-2 px-2">{item.weight.toFixed(2)}</td>
                      <td className="text-right py-2 px-2">₹{item.rate.toLocaleString()}</td>
                      <td className="text-right py-2 px-2">{item.gst}%</td>
                      <td className="text-right py-2 px-2">₹{item.discount.toLocaleString()}</td>
                      <td className="text-right py-2 px-2 font-semibold">₹{finalTotal.toLocaleString()}</td>
                      <td className="text-center py-2 px-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Item Form */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-3">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Product Name</label>
              <Input
                placeholder="Gold chain"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                size={1}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Weight</label>
              <Input
                type="number"
                placeholder="0.00"
                value={newItem.weight || ""}
                onChange={(e) => setNewItem({ ...newItem, weight: Number.parseFloat(e.target.value) || 0 })}
                size={1}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Rate</label>
              <Input
                type="number"
                placeholder="0"
                value={newItem.rate || ""}
                onChange={(e) => setNewItem({ ...newItem, rate: Number.parseFloat(e.target.value) || 0 })}
                size={1}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">GST %</label>
              <Input
                type="number"
                placeholder="0"
                value={newItem.gst || ""}
                onChange={(e) => setNewItem({ ...newItem, gst: Number.parseFloat(e.target.value) || 0 })}
                size={1}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Discount</label>
              <Input
                type="number"
                placeholder="0"
                value={newItem.discount || ""}
                onChange={(e) => setNewItem({ ...newItem, discount: Number.parseFloat(e.target.value) || 0 })}
                size={1}
                className="text-sm"
              />
            </div>
          </div>
          <Button onClick={addItem} className="w-full gap-2">
            <Plus className="w-4 h-4" /> Add Item
          </Button>
        </div>
      </div>

      {/* Summary & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Items</p>
          <p className="text-3xl font-bold text-primary">{items.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
          <p className="text-3xl font-bold text-accent">
            ₹{calculateTotal().toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </Card>
        <Card className="p-6 flex flex-col justify-center gap-3">
          <Button onClick={generatePDF} disabled={isGeneratingPDF || items.length === 0} className="w-full gap-2">
            <FileDown className="w-4 h-4" />
            {isGeneratingPDF ? "Generating..." : "Generate PDF"}
          </Button>
          <Button
            onClick={saveDraft}
            disabled={isSavingDraft || items.length === 0}
            variant="outline"
            className="w-full bg-transparent"
          >
            {isSavingDraft ? "Saving..." : "Save Draft"}
          </Button>
        </Card>
      </div>
    </div>
  )
}
