"use client"

import { Badge } from "@/components/ui/badge"
import { Check, Clock, AlertCircle } from "lucide-react"
import type { SavingStatus } from "@/types"

interface SavingIndicatorProps {
  status: SavingStatus
  lastSaved: Date | null
}

export function SavingIndicator({ status, lastSaved }: SavingIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "saved":
        return {
          icon: Check,
          text: "Saved",
          variant: "secondary" as const,
          className: "text-green-600 dark:text-green-400",
        }
      case "saving":
        return {
          icon: Clock,
          text: "Saving...",
          variant: "secondary" as const,
          className: "text-blue-600 dark:text-blue-400",
        }
      case "error":
        return {
          icon: AlertCircle,
          text: "Error",
          variant: "destructive" as const,
          className: "",
        }
      default:
        return {
          icon: Clock,
          text: "Draft",
          variant: "outline" as const,
          className: "text-muted-foreground",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2 text-sm">
      <Badge variant={config.variant} className={`gap-1 ${config.className}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
      {lastSaved && status === "saved" && (
        <span className="text-xs text-muted-foreground hidden sm:inline">{lastSaved.toLocaleTimeString()}</span>
      )}
    </div>
  )
}
