import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { FloatingActions } from './components/ui/FloatingActions'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Solution } from './sections/Solution'
import { TechnicalProof } from './sections/TechnicalProof'
import { Pricing } from './sections/Pricing'
import { CTA } from './sections/CTA'
import PaymentPage from './pages/PaymentPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <TechnicalProof />
        <CTA />
        <Pricing />
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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <FloatingActions />
      </div>
    </Router>
  )
}

export default App
