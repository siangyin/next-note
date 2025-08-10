import { Footer } from "../../components/marketing/Footer"
import { Header } from "../../components/marketing/Header"
import { Hero } from "../../components/marketing/Hero"

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}

export default MarketingPage
