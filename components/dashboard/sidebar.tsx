"use client";
import { Home, FileText, Plus, Package, X } from "lucide-react";
import { useRouter } from "next/navigation";

type View = "dashboard" | "invoices" | "create-invoice" | "products";

interface SidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({
  isOpen,
  onOpenChange,
  currentView,
  onViewChange,
}: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Dashboard", view: "dashboard" as View },
    { icon: FileText, label: "All Invoices", view: "invoices" as View },
    { icon: Plus, label: "Create Invoice", view: "create-invoice" as View },
    { icon: Package, label: "Products", view: "products" as View },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50 w-64 h-screen bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border md:hidden">
          <h2 className="text-lg font-bold text-sidebar-foreground">
            R.K Gupta
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-sidebar-foreground hover:bg-sidebar-accent/20 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="hidden md:flex h-16 items-center justify-start border-b border-sidebar-border pl-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-sidebar-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L15.09 8.26H22L16.95 12.91L19.09 19.16L12 14.5L4.91 19.16L7.05 12.91L2 8.26H8.91L12 2Z" />
              </svg>
            </div>
            <span className="font-bold text-sidebar-foreground text-sm">
              R.K Gupta Shop
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onViewChange(item.view);
                onOpenChange(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer
                ${
                  currentView === item.view
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">
            Invoice Management System
          </p>
        </div>
      </aside>
    </>
  );
}
