"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types"

const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder-user.jpg",
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setUser(mockUser)
      setLoading(false)
    }, 500)
  }, [])

  return { user, loading }
}
