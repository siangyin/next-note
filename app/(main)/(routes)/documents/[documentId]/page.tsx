"use client"

// import { useMemo } from "react"
import { useParams } from "next/navigation"
import { useMutation, useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import { Skeleton } from "@/components/ui/skeleton"
import DocCover from "@/components/document/DocCover"
import DocToolBar from "@/components/document/DocToolBar"
import DocEditor from "@/components/document/DocEditor"

// interface DocumentIdPageProps {
//   params: {
//     documentId: Id<"documents">
//   }
// }

const DocumentIdPage = () => {
  const { documentId } = useParams<{ documentId: Id<"documents"> }>()
  console.log("==>>>", documentId)

  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  })

  const update = useMutation(api.documents.update)

  const onChange = (content: string) => {
    update({
      id: documentId,
      content,
    })
  }

  if (document === undefined) {
    return (
      <div>
        <DocCover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[60%]" />
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
        <DocToolBar initialData={document} />
        <DocEditor />
      </div>
    </div>
  )
}

export default DocumentIdPage
