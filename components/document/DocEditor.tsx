"use client"

import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const DocEditor = (props: EditorProps) => {
  const { onChange, initialContent, editable } = props

  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file })

    return response.url
  }

  // const editor: BlockNoteEditor = useBlockNote({
  //   editable,
  //   initialContent: initialContent
  //     ? (JSON.parse(initialContent) as PartialBlock[])
  //     : undefined,
  //   onEditorContentChange: (editor) => {
  //     onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
  //   },
  //   uploadFile: handleUpload,
  // })

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  })

  return (
    <div>
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
