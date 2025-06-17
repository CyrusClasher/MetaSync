export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Document {
  id: string
  title: string
  content: string
  lastModified: string
  collaborators: number
  userRole: "viewer" | "editor" | "owner"
}

export interface Collaborator {
  id: string
  name: string
  avatar: string
  cursorColor: string
  status: "typing" | "idle" | "away"
}

export interface Comment {
  id: string
  content: string
  author: User
  timestamp: string
  selectedText: string
  resolved: boolean
}

export type SavingStatus = "draft" | "saving" | "saved" | "error"
