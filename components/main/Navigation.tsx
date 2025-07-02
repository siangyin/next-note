import { cn } from '@/lib/utils'
import { ChevronsLeft } from 'lucide-react'
import { useRef } from 'react'

const Navigation = () => {
  const isResizingRef = useRef(false)

  return (
    <>
      <aside
        className={cn(
          `group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[99999]`
        )}
      >
        <div
          role='button'
          className={cn(
            `w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute
          top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition`
          )}
        >
          <ChevronsLeft className='w-6 h-6' />
        </div>

        <div>
          <span>Action items</span>
        </div>

        <div className='mt-4'>
          <span>Documents</span>
        </div>

        <div
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10
        right-0 top-0'
        ></div>
      </aside>
      Navigation
    </>
  )
}
export default Navigation
