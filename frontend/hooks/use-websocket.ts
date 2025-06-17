"use client"

import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { toast } from "sonner"
import type { Collaborator, SavingStatus } from "@/types"

export function useWebSocket(documentId: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [savingStatus, setSavingStatus] = useState<SavingStatus>("draft")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3001", {
      transports: ["websocket"],
      timeout: 20000,
    })

    socketRef.current = socket

    socket.on("connect", () => {
      setIsConnected(true)
      reconnectAttempts.current = 0
      socket.emit("join-document", documentId)
      toast.success("Connected to document")
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      toast.error("Disconnected from document")
    })

    socket.on("connect_error", () => {
      setIsConnected(false)
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++
        toast.error(`Connection failed. Retrying... (${reconnectAttempts.current}/${maxReconnectAttempts})`)
      } else {
        toast.error("Unable to connect. Please refresh the page.")
      }
    })

    socket.on("collaborators-updated", (data: Collaborator[]) => {
      setCollaborators(data)
    })

    socket.on("user-joined", (user: { name: string }) => {
      toast.success(`${user.name} joined the document`)
    })

    socket.on("user-left", (user: { name: string }) => {
      toast.info(`${user.name} left the document`)
    })

    socket.on("document-saved", () => {
      setSavingStatus("saved")
      setLastSaved(new Date())
    })

    socket.on("save-error", () => {
      setSavingStatus("error")
      toast.error("Failed to save document")
    })

    socket.on("edit-conflict", () => {
      toast.error("Edit conflict detected. Please refresh to see latest changes.")
    })

    return () => {
      socket.disconnect()
    }
  }, [documentId])

  const saveDocument = (content: string) => {
    if (socketRef.current && isConnected) {
      setSavingStatus("saving")
      socketRef.current.emit("save-document", { documentId, content })
    }
  }

  return {
    isConnected,
    collaborators,
    savingStatus,
    lastSaved,
    saveDocument,
    socket: socketRef.current,
  }
}
