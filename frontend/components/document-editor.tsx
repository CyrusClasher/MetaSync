"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useState } from "react"
import { EditorToolbar } from "@/components/editor-toolbar"
import { useWebSocketEditor } from "@/hooks/use-websocket-editor"
import type { Document } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

interface DocumentEditorProps {
  document: Document | undefined
  isConnected: boolean
  onCommentAdd: () => void
}

export function DocumentEditor({ document, isConnected, onCommentAdd }: DocumentEditorProps) {
  const [selectedText, setSelectedText] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your document...",
      }),
    ],
    content: document?.content || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-8",
      },
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection
      const text = editor.state.doc.textBetween(from, to, " ")
      setSelectedText(text)
    },
  })

  // WebSocket integration for real-time collaboration
  useWebSocketEditor(editor, document?.id, isConnected)

  useEffect(() => {
    if (editor && document?.content) {
      editor.commands.setContent(document.content)
    }
  }, [editor, document?.content])

  if (!document) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <EditorToolbar editor={editor} selectedText={selectedText} onCommentAdd={onCommentAdd} />

      <div className="flex-1 overflow-auto bg-background">
        <div className="max-w-4xl mx-auto">
          <EditorContent editor={editor} className="min-h-full" />
        </div>
      </div>
    </div>
  )
}
