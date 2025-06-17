"use client"

import { useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { useWebSocket } from "./use-websocket"
import { debounce } from "lodash"

export function useWebSocketEditor(editor: Editor | null, documentId: string | undefined, isConnected: boolean) {
  const { saveDocument, socket } = useWebSocket(documentId || "")
  const isUpdatingFromRemote = useRef(false)

  // Debounced save function
  const debouncedSave = useRef(
    debounce((content: string) => {
      if (documentId) {
        saveDocument(content)
      }
    }, 1000),
  ).current

  useEffect(() => {
    if (!editor || !socket || !isConnected) return

    // Handle local changes
    const handleUpdate = () => {
      if (isUpdatingFromRemote.current) return

      const content = editor.getHTML()

      // Emit real-time changes
      socket.emit("content-change", {
        documentId,
        content,
        selection: editor.state.selection,
      })

      // Debounced save
      debouncedSave(content)
    }

    // Handle remote changes
    const handleRemoteChange = (data: { content: string; selection?: any }) => {
      isUpdatingFromRemote.current = true

      if (data.content !== editor.getHTML()) {
        editor.commands.setContent(data.content, false)
      }

      setTimeout(() => {
        isUpdatingFromRemote.current = false
      }, 100)
    }

    // Handle cursor positions
    const handleCursorUpdate = (data: { userId: string; selection: any }) => {
      // Update cursor positions for other users
      // This would typically involve custom decorations
    }

    editor.on("update", handleUpdate)
    socket.on("content-changed", handleRemoteChange)
    socket.on("cursor-updated", handleCursorUpdate)

    return () => {
      editor.off("update", handleUpdate)
      socket.off("content-changed", handleRemoteChange)
      socket.off("cursor-updated", handleCursorUpdate)
    }
  }, [editor, socket, isConnected, documentId, debouncedSave, saveDocument])
}
