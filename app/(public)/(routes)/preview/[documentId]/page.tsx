"use client"

import { useMemo, useRef } from "react"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { useMutation, useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import { Skeleton } from "@/components/ui/skeleton"
import DocCover from "@/components/document/DocCover"
import DocToolBar from "@/components/document/DocToolBar"

const DocumentIdPage = () => {
  const { documentId } = useParams<{ documentId: Id<"documents"> }>()

  // dynamic(..., { ssr: false }) → Prevents SSR and lazy-loads your editor to avoid hydration/window errors. eg: “window is not defined” errors during SSR
  // useMemo around dynamic() → Keeps the same editor component instance between renders, so it doesn’t reset on every state change.
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/document/DocEditor"), { ssr: false }),
    []
  )
  const document = useQuery(api.documents.getById, { documentId })
  const update = useMutation(api.documents.update)

  console.log("==>>> document", document)

  const saveTimer = useRef<number | null>(null)
  const lastSaved = useRef<string | null>(null)

  // const onChange = (content: string) => {
  //   update({
  //     id: documentId,
  //     content,
  //   })
  // }

  const onChange = (content: string) => {
    // Avoid writing identical content repeatedly
    if (lastSaved.current === content) return

    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current)
    }
    saveTimer.current = window.setTimeout(async () => {
      lastSaved.current = content
      await update({ id: documentId, content })
    }, 800) // 800–1200ms feels nice
  }

  if (document === undefined) {
    return (
      <div>
        <DocCover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
  }

  if (document === null) {
    return <div>Not found</div>
  }

  return (
    <div className="pb-40">
      <DocCover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <DocToolBar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
          docKey={documentId}
        />
      </div>
    </div>
  )
}

export default DocumentIdPage
