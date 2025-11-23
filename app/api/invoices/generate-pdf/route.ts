import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invoiceNumber, customerName, customerPhone, items, totalAmount } = body

    // Format invoice data
    const invoiceData = {
      invoiceNumber,
      customerName,
      customerPhone,
      items,
      totalAmount,
      date: new Date().toLocaleDateString("en-IN"),
      companyName: "Gold Shop",
      gstIn: "18AABCT1234A1Z5",
    }

    // Create HTML template for PDF
    const htmlContent = generateInvoiceHTML(invoiceData)

    // Mock response - in production, use html2pdf or similar library
    return NextResponse.json({
      success: true,
      invoiceNumber,
      message: "Invoice PDF generated successfully",
      pdfUrl: `/invoices/${invoiceNumber}.pdf`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

function generateInvoiceHTML(data: any) {
  const itemsHTML = data.items
    .map(
      (item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.productName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${item.weight.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.rate.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${item.gst}%</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.discount.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.weight * item.rate + (item.weight * item.rate * item.gst) / 100 - item.discount).toLocaleString()}</td>
    </tr>
  `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #B8860B; }
        .invoice-details { margin: 20px 0; }
        .section-title { font-weight: bold; font-size: 14px; margin-top: 15px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f5f5f5; padding: 10px; text-align: left; font-weight: bold; }
        td { padding: 10px; }
        .total-row { font-weight: bold; font-size: 16px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">⭐ ${data.companyName}</div>
        <p>Gold Jewelry Invoice</p>
      </div>

      <div class="invoice-details">
        <div class="section-title">Invoice Details:</div>
        <p>Invoice #: ${data.invoiceNumber}</p>
        <p>Date: ${data.date}</p>
      </div>

      <div class="invoice-details">
        <div class="section-title">Customer Information:</div>
        <p>Name: ${data.customerName}</p>
        <p>Phone: ${data.customerPhone}</p>
      </div>

      <div class="section-title">Items:</div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th style="text-align: right;">Weight</th>
            <th style="text-align: right;">Rate</th>
            <th style="text-align: right;">GST %</th>
            <th style="text-align: right;">Discount</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
          <tr class="total-row">
            <td colspan="5" style="text-align: right;">Total Amount:</td>
            <td style="text-align: right;">₹${data.totalAmount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Thank you for your business!</p>
        <p>GST IN: ${data.gstIn}</p>
        <p>Generated on ${new Date().toLocaleString("en-IN")}</p>
      </div>
    </body>
    </html>
  `
}
