"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, DollarSign } from "lucide-react";
import { PaymentModal } from "./payment-modal";

interface Invoice {
  id: string;
  number: string;
  customer: string;
  amount: number;
  paid: number;
  status: "paid" | "unpaid" | "partial";
  date: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    customer: "Rajesh Kumar",
    amount: 45000,
    paid: 45000,
    status: "paid",
    date: "2024-11-20",
  },
  {
    id: "2",
    number: "INV-002",
    customer: "Priya Singh",
    amount: 32500,
    paid: 0,
    status: "unpaid",
    date: "2024-11-19",
  },
  {
    id: "3",
    number: "INV-003",
    customer: "Amit Patel",
    amount: 78000,
    paid: 78000,
    status: "paid",
    date: "2024-11-18",
  },
  {
    id: "4",
    number: "INV-004",
    customer: "Neha Joshi",
    amount: 55000,
    paid: 25000,
    status: "partial",
    date: "2024-11-17",
  },
  {
    id: "5",
    number: "INV-005",
    customer: "Vikram Rao",
    amount: 92500,
    paid: 0,
    status: "unpaid",
    date: "2024-11-16",
  },
];

interface InvoiceListProps {
  onSelectInvoice?: (invoiceNumber: string) => void;
}

export function InvoiceList({ onSelectInvoice }: InvoiceListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [invoices, setInvoices] = useState(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filtered = invoices.filter((invoice) => {
    const matchSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" || invoice.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handlePaymentSubmit = async (payment: any) => {
    if (selectedInvoice) {
      const newPaid = selectedInvoice.paid + payment.amountPaid;
      const newStatus =
        newPaid >= selectedInvoice.amount
          ? "paid"
          : newPaid > 0
          ? "partial"
          : "unpaid";

      setInvoices(
        invoices.map((inv) =>
          inv.id === selectedInvoice.id
            ? { ...inv, paid: newPaid, status: newStatus }
            : inv
        )
      );
    }
  };

  const statusColors = {
    paid: "bg-primary/10 text-primary",
    unpaid: "bg-destructive/10 text-destructive",
    partial: "bg-accent/10 text-accent",
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track all invoices
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name or invoice #"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "paid", "unpaid", "partial"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                  Invoice #
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                  Customer
                </th>
                <th className="text-right px-4 md:px-6 py-4 text-sm font-semibold">
                  Amount
                </th>
                <th className="text-right px-4 md:px-6 py-4 text-sm font-semibold">
                  Paid
                </th>
                <th className="text-center px-4 md:px-6 py-4 text-sm font-semibold">
                  Status
                </th>
                <th className="text-center px-4 md:px-6 py-4 text-sm font-semibold">
                  Date
                </th>
                <th className="text-center px-4 md:px-6 py-4 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4">
                    <span className="font-medium text-foreground">
                      {invoice.number}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-foreground">
                    {invoice.customer}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right font-medium text-foreground">
                    ₹{invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right text-foreground">
                    ₹{invoice.paid.toLocaleString()}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        statusColors[invoice.status]
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center text-sm text-muted-foreground">
                    {invoice.date}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onSelectInvoice?.(invoice.number)}
                        className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors cursor-pointer">
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowPaymentModal(true);
                        }}
                        className="p-1 hover:bg-primary/10 text-primary rounded transition-colors cursor-pointer"
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {filtered.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-foreground">
                  {invoice.number}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.customer}
                </p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  statusColors[invoice.status]
                }`}
              >
                {invoice.status.charAt(0).toUpperCase() +
                  invoice.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-semibold text-foreground">
                  ₹{invoice.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Paid</p>
                <p className="font-semibold text-foreground">
                  ₹{invoice.paid.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground text-xs">
                  {invoice.date}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSelectInvoice?.(invoice.number)}
                className="flex-1 p-2 bg-muted hover:bg-muted/80 rounded text-sm transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 inline mr-1" /> View
              </button>
              <button
                onClick={() => {
                  setSelectedInvoice(invoice);
                  setShowPaymentModal(true);
                }}
                className="flex-1 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded text-sm transition-colors cursor-pointer"
              >
                <DollarSign className="w-4 h-4 inline mr-1" /> Pay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} invoices
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="cursor-pointer">
            Previous
          </Button>
          <Button size="sm" className="cursor-pointer">
            Next
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <PaymentModal
          invoiceId={selectedInvoice.id}
          invoiceNumber={selectedInvoice.number}
          remainingAmount={selectedInvoice.amount - selectedInvoice.paid}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedInvoice(null);
          }}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
}
