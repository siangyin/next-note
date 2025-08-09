"use client"

import React from "react"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useConverImage } from "@/hooks/use-cover-image"

const CoverImageModal = () => {
  const coverImage = useConverImage()

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>upload</div>
      </DialogContent>
    </Dialog>
  )
}

export default CoverImageModal
