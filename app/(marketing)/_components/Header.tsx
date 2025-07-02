'use client'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SignInButton } from '@clerk/clerk-react'

import { Button } from '@/components/ui/button'
import Spinner from '@/components/common/Spinner'

export const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Capture Ideas & Clear Your Mind.
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        <strong>Next note</strong> offers a minimalist, distraction-free
        environment to help you stay focused and organized — without clutter or
        complexity distractions. <br />
        Just you and your notes.
      </h3>

      {isLoading ? (
        <div className='w-full flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      ) : isAuthenticated ? (
        <Button asChild>
          <Link href='/documents'>
            Enter Next note
            <ArrowRight className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      ) : (
        <SignInButton mode='modal'>
          <Button>
            Start noting
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
