"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { PanelLeft, Search, Plus, FileText, Clock, Users } from "lucide-react"
import type { Document } from "@/types"
import { cn } from "@/lib/utils"

interface DocumentSidebarProps {
  documents: Document[]
  loading: boolean
  activeDocumentId: string
  onDocumentSelect: (id: string) => void
  isOpen: boolean
  onToggle: () => void
}

export function DocumentSidebar({
  documents,
  loading,
  activeDocumentId,
  onDocumentSelect,
  isOpen,
  onToggle,
}: DocumentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!isOpen) {
    return (
      <div className="w-12 border-r bg-muted/30 flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggle} className="mb-4">
          <PanelLeft className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 border-r bg-muted/30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Documents</h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={onToggle}>
              <PanelLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Document List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-3 rounded-lg">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredDocuments.map((document) => (
                <DocumentItem
                  key={document.id}
                  document={document}
                  isActive={document.id === activeDocumentId}
                  onClick={() => onDocumentSelect(document.id)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

interface DocumentItemProps {
  document: Document
  isActive: boolean
  onClick: () => void
}

function DocumentItem({ document, isActive, onClick }: DocumentItemProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent",
        isActive && "bg-accent border border-border",
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <FileText className="w-4 h-4 mt-0.5 text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{document.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{document.lastModified}</span>
            {document.collaborators > 0 && (
              <>
                <Users className="w-3 h-3 ml-2" />
                <span>{document.collaborators}</span>
              </>
            )}
          </div>
          <Badge variant="secondary" className="mt-2 text-xs">
            {document.userRole}
          </Badge>
        </div>
      </div>
    </div>
  )
}
