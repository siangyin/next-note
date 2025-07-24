"use client"

import React, { useRef, useState } from "react"
import { useMutation } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface TitleProps {
  initialData: Doc<"documents">
}

const Title = (props: TitleProps) => {
  const { initialData } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const update = useMutation(api.documents.update)

  const [title, setTitle] = useState(initialData.title || "Untitled")
  const [isEditing, setIsEditing] = useState(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)

    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    })
  }

  const disableInput = () => {
    setIsEditing(false)
  }

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      // Handle the Enter key press
      console.log("Enter key pressed")
      disableInput()
    }
  }

  return (
    <div className="flex gap-x-1 items-center">
      {!!initialData.icon && <p>{initialData.icon}</p>}

      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onClick={disableInput}
          onBlur={() => setIsEditing(false)}
          value={title}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Button
          className="font-normal h-auto p-1"
          variant="ghost"
          size="sm"
          onKeyDown={onKeyDown}
          onClick={(): void => {
            // if (event.key === "Enter") {
            console.log("==>>> clicked to disableInput")
            // }
          }}
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  )
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-20 h-8 rounded-md" />
}

export default Title
