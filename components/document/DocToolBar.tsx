"use client"

import React, { useRef, useState } from "react"
import { ImageIcon, Smile, X } from "lucide-react"
import { useMutation } from "convex/react"
import TextAreaAutoSize from "react-textarea-autosize"

import { useConverImage } from "@/hooks/use-cover-image"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"

import { Button } from "@/components/ui/button"

import IconPicker from "@/components/document/IconPicker"

interface ToolbarProps {
  initialData: Doc<"documents">
  preview?: boolean
}
const DocToolBar = (props: ToolbarProps) => {
  const { initialData, preview } = props

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState(initialData.title || "Untitled")
  const [isEditing, setIsEditing] = useState(false)

  const update = useMutation(api.documents.update)
  const removeIcon = useMutation(api.documents.removeIcon)

  const coverImage = useConverImage()

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    })
  }

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    })
  }

  const enableInput = () => {
    if (preview) return

    setIsEditing(true)
    setTimeout(() => {
      setTitle(initialData.title)
      inputRef.current?.focus()
    }, 0)
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

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      disableInput()
    }
  }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex gap-x-2 items-center group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition
          text-muted-foreground text-xs"
            variant="outline"
            size="icon"
            onClick={onRemoveIcon}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="w-4 h-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextAreaAutoSize
          className="text-2xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize:none
        resize-none"
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTitle(event.target.value)
          }}
        />
      ) : (
        <div
          className="pb-[11.5px] text-2xl font-bold break-words outline-none text-[#a0a0a0] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}

export default DocToolBar
