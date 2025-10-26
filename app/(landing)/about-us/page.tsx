import { AboutHero } from "./_components/about-hero"
import { Header } from "./_components/header"
import { Footer } from "./_components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AboutHero />
      </main>

      <Footer />
    </div>
  )
}
