import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Solution } from './sections/Solution'
import { Features } from './sections/Features'
import { AIAutomation } from './sections/AIAutomation'
import { HowItWorks } from './sections/HowItWorks'
import { UseCases } from './sections/UseCases'
import { Architecture } from './sections/Architecture'
import { Trust } from './sections/Trust'
import { Pricing } from './sections/Pricing'
import { CTA } from './sections/CTA'
import PaymentPage from './pages/PaymentPage'
import SignUpPage from './pages/SignUpPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <AIAutomation />
        <HowItWorks />
        <UseCases />
        <Architecture />
        <Trust />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paiment" element={<PaymentPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
