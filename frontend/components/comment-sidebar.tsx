"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, MessageSquare, Send } from "lucide-react"
import { useComments } from "@/hooks/use-comments"
import type { Comment } from "@/types"
import { cn } from "@/lib/utils"

interface CommentSidebarProps {
  documentId: string
  isOpen: boolean
  onClose: () => void
}

export function CommentSidebar({ documentId, isOpen, onClose }: CommentSidebarProps) {
  const [newComment, setNewComment] = useState("")
  const { comments, addComment, resolveComment } = useComments(documentId)

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(newComment)
      setNewComment("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <h2 className="font-semibold">Comments</h2>
          <Badge variant="secondary" className="text-xs">
            {comments.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {comments.map(comment => (
            <CommentThread
              key={comment.id}
              comment={comment}
              onResolve={() => resolveComment(comment.id)}
            />
          ))}

          {comments.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No comments yet</p>
              <p className="text-sm">Select text to add a comment</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Add Comment */}
      <div className="p-4 border-t">
        <div className="space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              size="sm"
              className="gap-2"
            >
              <Send className="w-3 h-3" />
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CommentThreadProps {
  comment: Comment
  onResolve: () => void
}

function CommentThread({ comment, onResolve }: CommentThreadProps) {
  return (
    <div className={cn("p-3 rounded-lg border", comment.resolved && "opacity-60 bg-muted/50")}>
      <div className="flex items-start gap-3">
        <Avatar className="w-6 h-6">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-xs">{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>

          {comment.selectedText && (
            <div className="bg-muted p-2 rounded text-xs mb-2 border-l-2 border-blue-500">
              &quot;{comment.selectedText}&quot;
            </div>
          )}

          <p className="text-sm">{comment.content}</p>

          {!comment.resolved && (
            <Button variant="ghost" size="sm" onClick={onResolve} className="mt-2 text-xs h-6">
              Resolve
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
