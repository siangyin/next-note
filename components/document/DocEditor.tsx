"use client"

import { useMemo } from "react"
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"
import { PartialBlock } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
  docKey?: string // optional: pass the documentId from parent to force remount on nav
}

const DocEditor = (props: EditorProps) => {
  const { docKey, onChange, initialContent, editable } = props

  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()

  const uploadFile = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file })
    return response.url
  }

  const parsed = useMemo(() => {
    if (!initialContent) return undefined
    try {
      const data = JSON.parse(initialContent)
      return Array.isArray(data) ? (data as PartialBlock[]) : undefined
    } catch {
      return undefined
    }
  }, [initialContent])

  const editor = useCreateBlockNote({
    initialContent: parsed,
    uploadFile,
  })

  return (
    <div key={docKey}>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          // onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
          onChange(JSON.stringify(editor.document))
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}
export default DocEditor
