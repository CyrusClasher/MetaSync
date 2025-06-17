"use client"

import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Crown } from "lucide-react"

interface PermissionsBadgeProps {
  role: "viewer" | "editor" | "owner"
}

export function PermissionsBadge({ role }: PermissionsBadgeProps) {
  const getRoleConfig = () => {
    switch (role) {
      case "owner":
        return {
          icon: Crown,
          text: "Owner",
          variant: "default" as const,
          className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        }
      case "editor":
        return {
          icon: Edit,
          text: "Editor",
          variant: "secondary" as const,
          className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        }
      case "viewer":
        return {
          icon: Eye,
          text: "Viewer",
          variant: "outline" as const,
          className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        }
    }
  }

  const config = getRoleConfig()
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={`gap-1 text-xs ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.text}
    </Badge>
  )
}
