"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface PaymentModalProps {
  invoiceId: string
  invoiceNumber: string
  remainingAmount: number
  onClose: () => void
  onSubmit: (payment: any) => void
}

export function PaymentModal({ invoiceId, invoiceNumber, remainingAmount, onClose, onSubmit }: PaymentModalProps) {
  const [amountPaid, setAmountPaid] = useState(remainingAmount.toString())
  const [mode, setMode] = useState<"cash" | "online" | "upi">("cash")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onSubmit({
        invoiceId,
        amountPaid: Number.parseFloat(amountPaid),
        mode,
        notes,
      })
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Record Payment</h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Invoice Info */}
          <div className="bg-muted/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground">Invoice</p>
            <p className="font-semibold text-foreground">{invoiceNumber}</p>
          </div>

          {/* Remaining Amount */}
          <div className="bg-accent/10 rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground">Remaining Amount</p>
            <p className="font-bold text-accent text-lg">₹{remainingAmount.toLocaleString()}</p>
          </div>

          {/* Payment Amount */}
          <div className="mb-4">
            <label className="text-sm font-medium text-foreground block mb-2">Amount to Pay</label>
            <Input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} placeholder="0" />
          </div>

          {/* Payment Mode */}
          <div className="mb-4">
            <label className="text-sm font-medium text-foreground block mb-2">Payment Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {["cash", "online", "upi"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                    mode === m
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground hover:border-border/50"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground block mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this payment..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
              {isLoading ? "Processing..." : "Record Payment"}
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
