'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Capture Ideas & Clear Your Mind.
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        <span className='underline'>Next note</span> offers a minimalist,
        distraction-free environment to help you stay focused and organized —
        without clutter or complexity distractions. <br />
        Just you and your notes.
      </h3>

      <Button>
        Start noting
        <ArrowRight className='h-4 w-4 ml-2' />{' '}
      </Button>
    </div>
  )
}
