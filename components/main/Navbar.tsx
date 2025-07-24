"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { Menu } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import Title from "@/components/main/Title"
import ArchivedBanner from "@/components/main/ArchivedBanner"
import Publish from "@/components/main/Publish"
import DocMenu from "@/components/main/DocMenu"

interface NavbarProps {
  isCollapsed: boolean
  onResetWidth: () => void
}

const Navbar = (props: NavbarProps) => {
  const { isCollapsed, onResetWidth } = props

  const params = useParams()
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  })

  if (document === undefined) {
    return (
      <nav
        className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
    flex justify-between gap-x-4"
      >
        <Title.Skeleton />
        <div className="flex gap-x-2 items-center">
          <DocMenu.Skeleton />
        </div>
      </nav>
    )
  }

  if (document === null) {
    return null
  }

  return (
    <>
      <nav
        className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
      flex gap-x-4 items-center"
      >
        {isCollapsed && (
          <Menu
            role="button"
            onClick={onResetWidth}
            className="w-6 h-6 text-muted-foreground"
          />
        )}
        <div className="flex justify-between items-center w-full">
          <Title initialData={document} />
          {!document?.isArchived && (
            <div className="flex gap-x-2 items-center">
              <Publish initialData={document} />
              <DocMenu documentId={document._id} />
            </div>
          )}
        </div>
      </nav>

      {document.isArchived && <ArchivedBanner documentId={document._id} />}
    </>
  )
}

export default Navbar
