"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"

const DocumentsPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    )

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a new note",
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-3">
      <Image
        className="dark:hidden"
        src="/empty.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <Image
        className="hidden dark:block"
        src="/empty-dark.png"
        alt="Empty"
        width="300"
        height="300"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Next note
      </h2>

      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create note
      </Button>
    </div>
  )
}
export default DocumentsPage
