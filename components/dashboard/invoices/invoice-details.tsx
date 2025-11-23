"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Download, Share2 } from "lucide-react"

interface InvoiceDetailsProps {
  invoiceNumber: string
  onClose: () => void
}

export function InvoiceDetails({ invoiceNumber, onClose }: InvoiceDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Invoice {invoiceNumber}</h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Invoice Content */}
          <div className="border-t border-b border-border py-6 mb-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">From</p>
                <p className="font-semibold text-foreground">Gold Shop</p>
                <p className="text-sm text-muted-foreground">Premium Jewelry Store</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Bill To</p>
                <p className="font-semibold text-foreground">Rajesh Kumar</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Invoice #</p>
                <p className="font-semibold text-foreground">{invoiceNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Date</p>
                <p className="font-semibold text-foreground">Nov 20, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Due Date</p>
                <p className="font-semibold text-foreground">Dec 5, 2024</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-0">Product</th>
                  <th className="text-right py-3 px-0">Weight</th>
                  <th className="text-right py-3 px-0">Rate</th>
                  <th className="text-right py-3 px-0">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-0">Gold Chain 22K</td>
                  <td className="text-right py-3 px-0">2.5g</td>
                  <td className="text-right py-3 px-0">₹5,000</td>
                  <td className="text-right py-3 px-0 font-semibold">₹12,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-full sm:w-64">
              <div className="flex justify-between py-2 border-b border-border">
                <span>Subtotal</span>
                <span>₹12,500</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span>GST (18%)</span>
                <span>₹2,250</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹14,750</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1 gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
