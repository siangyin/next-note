'use client'

import { useConvexAuth } from 'convex/react'
import { cn } from '@/lib/utils'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import Link from 'next/link'

import { useScrollTop } from '@/hooks/use-scroll-top'

import { Button } from '@/components/ui/button'
import { Logo } from './Logo'
import ModeToggle from '@/components/common/ModeToggle'
import Spinner from '@/components/common/Spinner'

const Navbar = () => {
  const scrolled = useScrollTop()
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div
      className={cn(
        `z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6`,
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full'>
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm'>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>Join Next note free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/documents'>Enter Next note</Link>
            </Button>
            <UserButton />
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
