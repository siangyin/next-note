"use client"

import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Skeleton } from "../ui/skeleton"

interface ItemProps {
  onClick?: () => void
  label: string
  icon: React.ElementType
  id?: Id<"documents">
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const {
    onClick,
    label,
    icon: Icon,
    id,
    onExpand,
    level = 0,
    active,
    documentIcon,
    isSearch,
    expanded,
  } = props

  const isWindows = /Windows/.test(navigator.userAgent)
  console.log("==>>>", navigator.userAgent, isWindows)
  const ChevronIcon = expanded ? ChevronDown : ChevronRight

  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onExpand?.()
  }

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: `${(level ?? 0) * 12 + 12}px` }}
      className={cn(
        `cursor-pointer group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5
    flex items-center text-muted-foreground font-medium`,
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
        >
          <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 w-[18px] h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none inline-flex gap-1 items-center h-5 select-none rounded border
        bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
        >
          <span className="text-xs">{isWindows ? "CTRL" : "⌘"}</span>K
        </kbd>
      )}
    </div>
  )
}

export function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4 bg-neutral-300 rounded-full" />
      <Skeleton className="h-4 w-[80px] bg-neutral-300 rounded-full" />
    </div>
  )
}

export default Item
