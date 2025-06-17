"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Collaborator } from "@/types"

interface CollaboratorBadgeProps {
  collaborator: Collaborator
}

export function CollaboratorBadge({ collaborator }: CollaboratorBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Avatar className="w-6 h-6 border-2 border-background">
              <AvatarImage
                src={collaborator.avatar || "/placeholder.svg"}
                alt={collaborator.name}
              />
              <AvatarFallback className="text-xs">{collaborator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background"
              style={{ backgroundColor: collaborator.cursorColor }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-medium">{collaborator.name}</p>
            <Badge variant="secondary" className="text-xs mt-1">
              {collaborator.status}
            </Badge>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
