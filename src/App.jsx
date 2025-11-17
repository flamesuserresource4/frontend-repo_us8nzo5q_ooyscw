import { useRef } from 'react'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Energy from './components/Energy'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

function App() {
  const waitlistRef = useRef(null)
  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <Hero onCTAClick={scrollToWaitlist} />
      <Mission />
      <Energy />
      <div ref={waitlistRef}>
        <Waitlist />
      </div>
      <Footer />

      {/* Micro-animations & keyframes */}
      <style>{`
        @keyframes riseSlow { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeSlow { from { opacity: 0 } to { opacity: 1 } }
        @keyframes orb { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-10px) translateX(6px); } }

        .animate-rise-slow { animation: riseSlow 1600ms ease-out forwards; }
        .animate-fade-slow { animation: fadeSlow 2000ms ease-out forwards; }
        .animate-fade-delay { opacity: 0; animation: fadeSlow 2000ms ease-out 200ms forwards; }
        .animate-fade-delay-2 { opacity: 0; animation: fadeSlow 2000ms ease-out 500ms forwards; }
        .animate-fade-delay-3 { opacity: 0; animation: fadeSlow 2000ms ease-out 900ms forwards; }
        .animate-pulse-slow { animation: fadeSlow 2s ease-in-out infinite alternate; }
        .animate-orb { animation: orb 8s ease-in-out infinite; }
        .animate-orb-delayed { animation: orb 9.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default App
