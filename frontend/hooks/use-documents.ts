"use client"

import { useState, useEffect } from "react"
import type { Document } from "@/types"

// Mock GraphQL query - replace with actual GraphQL client
const mockDocuments: Document[] = [
  {
    id: "doc-1",
    title: "Project Proposal",
    content: "<h1>Project Proposal</h1><p>This is a sample document...</p>",
    lastModified: "2 hours ago",
    collaborators: 3,
    userRole: "owner",
  },
  {
    id: "doc-2",
    title: "Meeting Notes",
    content: "<h1>Meeting Notes</h1><p>Today's meeting covered...</p>",
    lastModified: "1 day ago",
    collaborators: 1,
    userRole: "editor",
  },
  {
    id: "doc-3",
    title: "Design System",
    content: "<h1>Design System</h1><p>Our design system includes...</p>",
    lastModified: "3 days ago",
    collaborators: 5,
    userRole: "viewer",
  },
]

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate GraphQL query
    const fetchDocuments = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDocuments(mockDocuments)
      setLoading(false)
    }

    fetchDocuments()
  }, [])

  return { documents, loading }
}
