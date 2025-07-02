'use client'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import ModeToggle from '@/components/common/ModeToggle'

const Navbar = () => {
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        `z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6`,
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full'>
        login
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
