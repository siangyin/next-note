import Image from 'next/image'

export const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:block'>
          <Image
            src='/drawing.png'
            fill
            className='object-contain'
            alt='document'
          />
        </div>
      </div>
    </div>
  )
}
