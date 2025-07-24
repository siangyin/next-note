"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"

import { cn } from "@/lib/utils"

import Item, { ItemSkeleton } from "./Item"
import { FileIcon } from "lucide-react"

interface DocumentListProps {
  parentDocumentId?: Id<"documents">
  level?: number
  data?: Doc<"documents">[]
}

const DocumentList = (props: DocumentListProps) => {
  const { parentDocumentId, level = 0 } = props

  const params = useParams()
  const router = useRouter()

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  })

  // [{ creationTime: 1752905696099.1484, _id: "id12345",  isArchived: false, isPublished: false, title: "Untitled", userId: "user_userId1234" }]

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const onExpand = (docId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }))
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  // console.log("==>>> documents", { documents, expanded })

  if (documents === undefined) {
    return (
      <>
        <ItemSkeleton level={level} />
        {level === 0 && (
          <>
            <ItemSkeleton level={level} />
            <ItemSkeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        style={{ paddingLeft: `${level * 12 + 25}px` }}
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80`,
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages available
      </p>

      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          />

          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}

export default DocumentList
