import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { Hero } from './_components/Hero'

const MarketingPage = () => {
  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}

export default MarketingPage
