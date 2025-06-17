"use client"

import { useState } from "react"
import type { Comment } from "@/types"

const mockComments: Comment[] = [
  {
    id: "comment-1",
    content: "This section needs more detail about the implementation.",
    author: {
      id: "user-1",
      name: "Alice Johnson",
      avatar: "/placeholder-user.jpg",
      email: "alice@example.com",
    },
    timestamp: "2 hours ago",
    selectedText: "implementation details",
    resolved: false,
  },
  {
    id: "comment-2",
    content: "Great point! I'll add more context here.",
    author: {
      id: "user-2",
      name: "Bob Smith",
      avatar: "/placeholder-user.jpg",
      email: "bob@example.com",
    },
    timestamp: "1 hour ago",
    selectedText: "",
    resolved: true,
  },
]

export function useComments(documentId: string) {
  const [comments, setComments] = useState<Comment[]>(mockComments)

  const addComment = (content: string, selectedText?: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "/placeholder-user.jpg",
        email: "current@example.com",
      },
      timestamp: "now",
      selectedText: selectedText || "",
      resolved: false,
    }
    setComments(prev => [newComment, ...prev])
  }

  const resolveComment = (commentId: string) => {
    setComments(prev =>
      prev.map(comment => (comment.id === commentId ? { ...comment, resolved: true } : comment))
    )
  }

  return { comments, addComment, resolveComment }
}
