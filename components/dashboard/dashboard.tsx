"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { InvoiceList } from "./invoices/invoice-list";
import { InvoiceCreate } from "./invoices/invoice-create";
import { InvoiceDetails } from "./invoices/invoice-details";
import { ProductManagement } from "./products/product-management";

type View = "dashboard" | "invoices" | "create-invoice" | "products";

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          onLogout={onLogout}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-auto">
          {currentView === "dashboard" && <DashboardOverview />}
          {currentView === "invoices" && (
            <InvoiceList onSelectInvoice={setSelectedInvoice} />
          )}
          {currentView === "create-invoice" && <InvoiceCreate />}
          {currentView === "products" && <ProductManagement />}
        </main>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <InvoiceDetails
          invoiceNumber={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to Gold Shop Invoice Management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Invoices"
          value="24"
          change="+4 this month"
          color="primary"
        />
        <StatCard
          title="Paid Amount"
          value="₹2,45,000"
          change="+12% from last month"
          color="accent"
        />
        <StatCard
          title="Pending Amount"
          value="₹85,000"
          change="3 invoices"
          color="secondary"
        />
        <StatCard
          title="Total Products"
          value="156"
          change="+8 this month"
          color="primary"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-foreground mb-4">
            Recent Invoices
          </h2>
          <div className="space-y-3">
            <InvoiceRow
              invoice={{
                id: "#INV-001",
                customer: "Rajesh Kumar",
                amount: "₹45,000",
                status: "paid",
              }}
            />
            <InvoiceRow
              invoice={{
                id: "#INV-002",
                customer: "Priya Singh",
                amount: "₹32,500",
                status: "unpaid",
              }}
            />
            <InvoiceRow
              invoice={{
                id: "#INV-003",
                customer: "Amit Patel",
                amount: "₹78,000",
                status: "paid",
              }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold text-foreground mb-4">Payment Status</h2>
          <div className="space-y-4">
            <PaymentStatusItem
              label="Paid"
              percentage={65}
              color="bg-primary"
            />
            <PaymentStatusItem
              label="Pending"
              percentage={25}
              color="bg-secondary"
            />
            <PaymentStatusItem
              label="Partial"
              percentage={10}
              color="bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, color }: any) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    secondary: "bg-secondary/10 text-secondary",
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {value}
      </p>
      <p
        className={`text-xs ${
          colorClasses[color as keyof typeof colorClasses]
        }`}
      >
        {change}
      </p>
    </div>
  );
}

function InvoiceRow({ invoice }: any) {
  const statusColors = {
    paid: "bg-primary/10 text-primary",
    unpaid: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div>
        <p className="font-medium text-foreground">{invoice.id}</p>
        <p className="text-xs text-muted-foreground">{invoice.customer}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-foreground">{invoice.amount}</p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            statusColors[invoice.status as keyof typeof statusColors]
          }`}
        >
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      </div>
    </div>
  );
}

function PaymentStatusItem({ label, percentage, color }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-muted/30 rounded-full h-2">
        <div
          className={`h-full rounded-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
