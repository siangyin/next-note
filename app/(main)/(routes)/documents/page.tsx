'use client'

import Image from 'next/image'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

const DocumentsPage = () => {
  const { user } = useUser()
  // const create = useMutation(api.documents.create)

  const onCreate = () => {
    // const promise = create({ title: 'Untitled' })
    // toast.promise(promise, {
    //   loading: 'Creating a new note...',
    //   success: 'New note created',
    //   error: 'Failed to create a new note',
    // })
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-3'>
      <Image
        className='dark:hidden'
        src='/empty.png'
        alt='Empty'
        width='300'
        height='300'
      />
      <Image
        className='hidden dark:block'
        src='/empty-dark.png'
        alt='Empty'
        width='300'
        height='300'
      />

      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Next note
      </h2>

      <Button onClick={onCreate}>
        <PlusCircle className='w-4 h-4 mr-2' />
        Create note
      </Button>
    </div>
  )
}
export default DocumentsPage
