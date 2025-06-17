"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { CollaboratorBadge } from "@/components/collaborator-badge"
import { SavingIndicator } from "@/components/saving-indicator"
import { PermissionsBadge } from "@/components/permissions-badge"
import { MessageSquare, Wifi, WifiOff } from "lucide-react"
import type { User, Document, Collaborator, SavingStatus } from "@/types"

interface TopNavigationProps {
  user: User | null
  document: Document | undefined
  collaborators: Collaborator[]
  isConnected: boolean
  savingStatus: SavingStatus
  lastSaved: Date | null
  onToggleComments: () => void
  commentSidebarOpen: boolean
}

export function TopNavigation({
  user,
  document,
  collaborators,
  isConnected,
  savingStatus,
  lastSaved,
  onToggleComments,
  commentSidebarOpen,
}: TopNavigationProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        {/* App Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline">MetaSync</span>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Document Title */}
        <div className="flex-1 min-w-0">
          {document ? (
            <div className="flex items-center gap-2">
              <h1 className="font-medium truncate">{document.title}</h1>
              <PermissionsBadge role={document.userRole} />
            </div>
          ) : (
            <div className="h-5 w-48 bg-muted animate-pulse rounded" />
          )}
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2">
          {isConnected ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
        </div>

        {/* Saving Status */}
        <SavingIndicator status={savingStatus} lastSaved={lastSaved} />

        <Separator orientation="vertical" className="h-6" />

        {/* Collaborators */}
        <div className="flex items-center gap-2">
          {collaborators.slice(0, 3).map((collaborator) => (
            <CollaboratorBadge key={collaborator.id} collaborator={collaborator} />
          ))}
          {collaborators.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{collaborators.length - 3}
            </Badge>
          )}
        </div>

        {/* Comments Toggle */}
        <Button
          variant={commentSidebarOpen ? "default" : "ghost"}
          size="sm"
          onClick={onToggleComments}
          className="gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Comments</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* User Avatar */}
        {user && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </header>
  )
}
