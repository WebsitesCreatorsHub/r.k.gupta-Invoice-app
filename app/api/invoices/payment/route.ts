import { type NextRequest, NextResponse } from "next/server"

interface PaymentRecord {
  invoiceId: string
  amountPaid: number
  date: string
  mode: "cash" | "online" | "upi"
  notes?: string
}

// Mock payment history storage
const paymentHistory: PaymentRecord[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invoiceId, amountPaid, mode, notes } = body

    if (!invoiceId || !amountPaid || !mode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payment: PaymentRecord = {
      invoiceId,
      amountPaid,
      date: new Date().toISOString(),
      mode,
      notes,
    }

    paymentHistory.push(payment)

    return NextResponse.json({
      success: true,
      payment,
      message: "Payment recorded successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const invoiceId = request.nextUrl.searchParams.get("invoiceId")

  if (invoiceId) {
    const payments = paymentHistory.filter((p) => p.invoiceId === invoiceId)
    return NextResponse.json({ payments })
  }

  return NextResponse.json({ payments: paymentHistory })
}
