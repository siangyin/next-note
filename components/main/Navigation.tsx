"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react"
import { toast } from "sonner"

import { useMutation } from "convex/react"
import { useMediaQuery } from "usehooks-ts"
import { useParams, usePathname } from "next/navigation"
import { useSearch } from "@/hooks/use-search"
import { useSettings } from "@/hooks/use-settings"

import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"

import UserItem from "@/components/main/UserItem"
import Item from "@/components/main/Item"
import DocumentList from "@/components/main/DocumentList"
import TrashBox from "@/components/main/TrashBox"
import Navbar from "@/components/main/Navbar"

const DURATION_300 = 300

const Navigation = () => {
  const pathname = usePathname()
  const params = useParams()
  const isMobile = useMediaQuery("(max-width:768px)")
  const search = useSearch()
  const settings = useSettings()
  const create = useMutation(api.documents.create)

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    isResizingRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      )
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
      setTimeout(() => {
        setIsResetting(false)
      }, DURATION_300)
    }
  }, [isMobile])

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      navbarRef.current.style.setProperty("left", "0")
      setTimeout(() => setIsResetting(false), DURATION_300)
    }
  }

  const handleCreate = async () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      // router.push(`/documents/${documentId}`)
      console.log(`Created document with ID: ${documentId}`)
    )

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create note.",
    })
  }

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile, pathname, resetWidth])

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          `group/sidebar h-full bg-neutral-50  dark:bg-background overflow-y-auto relative flex flex-col w-60 z-[99]`,
          isResetting && `transition-all ease-in-out duration-${DURATION_300}`,
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            `w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute
          top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition`,
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>

        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item label="New page" icon={PlusCircle} onClick={handleCreate} />
        </div>

        <div className="mt-4">
          <DocumentList />
          <Item
            label="Add new page"
            icon={Plus}
            isSearch
            onClick={handleCreate}
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72 "
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10
        right-0 top-0"
        ></div>
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          `absolute top-0 z-[99] left-60 w-[calc(100%-240px)]`,
          isResetting && `transition-all ease-in-out duration-${DURATION_300}`,
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="w-6 h-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  )
}
export default Navigation
