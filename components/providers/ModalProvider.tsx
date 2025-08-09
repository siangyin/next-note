"use client"

import { useEffect, useState } from "react"
import SettingsModal from "@/components/common/SettingsModal"
import CoverImageModal from "@/components/common/CoverImageModal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  )
}

export default ModalProvider
