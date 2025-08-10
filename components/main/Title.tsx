"use client"

import React, { useEffect, useRef, useState } from "react"
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

  useEffect(() => {
    if (!isEditing) {
      setTitle(initialData.title || "Untitled")
    }
  }, [initialData._id, initialData.title, isEditing])

  const enableInput = () => {
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const disableInput = () => {
    setIsEditing(false)

    if (title !== initialData.title) {
      update({
        id: initialData._id,
        title: title || "Untitled",
      })
    }
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
          onClick={enableInput}
          onBlur={disableInput}
          value={title}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Button
          className="font-normal h-auto p-1"
          variant="ghost"
          size="sm"
          onClick={enableInput}
        >
          <span className="truncate">{title}</span>
        </Button>
      )}
    </div>
  )
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-20 h-8 rounded-md" />
}

export default Title
