"use client"

import { useMemo } from "react"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Toolbar } from "@/components/Toolbar"
import { Cover } from "@/components/Cover"
import { Skeleton } from "@/components/ui/skeleton"
import DocCover from "@/components/document/DocCover"
import DocToolBar from "@/components/document/DocToolBar"
import DocEditor from "@/components/document/DocEditor"

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = (props: DocumentIdPageProps) => {
  const { params } = props
  console.log("==>>>", params.documentId)

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  })

  const update = useMutation(api.documents.update)

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    })
  }

  if (document === undefined) {
    return (
      <div>
        {/* <Cover.Skeleton /> */}
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
      {/* <DocCover /> */}
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <DocToolBar initialData={document} />
        <DocEditor />
      </div>
    </div>
  )
}

export default DocumentIdPage
