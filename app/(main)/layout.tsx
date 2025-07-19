"use client"

import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import Spinner from "@/components/common/Spinner"
import Navigation from "@/components/main/Navigation"
import SearchCommand from "@/components/main/SearchCommand"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect("/")
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
