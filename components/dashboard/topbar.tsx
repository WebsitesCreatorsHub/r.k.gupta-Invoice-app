"use client"

import { Button } from "@/components/ui/button"
import { Menu, LogOut, Settings } from "lucide-react"

interface TopBarProps {
  onLogout: () => void
  onToggleSidebar: () => void
}

export function TopBar({ onLogout, onToggleSidebar }: TopBarProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground hidden md:block">Gold Shop Manager</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
        <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}
