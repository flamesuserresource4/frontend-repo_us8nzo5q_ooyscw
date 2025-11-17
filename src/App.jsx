import { useEffect, useRef } from 'react'
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

  // Global parallax (mouse + scroll) feeding CSS variables
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const x = e.clientX - cx
      const y = e.clientY - cy
      const rx = (-y / cy) * 7
      const ry = (x / cx) * 7
      document.documentElement.style.setProperty('--rx', rx.toFixed(3) + 'deg')
      document.documentElement.style.setProperty('--ry', ry.toFixed(3) + 'deg')
      document.documentElement.style.setProperty('--px', (x * 0.03).toFixed(2) + 'px')
      document.documentElement.style.setProperty('--py', (y * 0.03).toFixed(2) + 'px')
    }
    const onScroll = () => {
      const y = window.scrollY || 0
      const h = window.innerHeight || 1
      const p = Math.min(1, Math.max(0, y / (h * 2)))
      document.documentElement.style.setProperty('--scroll', p.toFixed(4))
      document.documentElement.style.setProperty('--vz', (p * 60).toFixed(2) + 'px') // subtle depth shift
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-purple-500/30 selection:text-white">
      {/* Global cinematic layers for continuous 3D flow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Aurora beams sweeping across whole doc */}
        <div className="absolute inset-0 mix-blend-screen opacity-60">
          <div className="absolute -left-1/2 top-[-10%] h-[140%] w-[120%] rotate-12 bg-gradient-to-b from-fuchsia-500/5 via-indigo-400/8 to-cyan-400/5 blur-3xl animate-slow-pan" />
          <div className="absolute -right-1/3 -top-1/4 h-[160%] w-[120%] -rotate-6 bg-gradient-to-b from-cyan-400/5 via-purple-400/8 to-emerald-400/5 blur-3xl animate-slow-pan-rev" />
        </div>
        {/* Subtle tunnel vignette that reacts to scroll */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%)',
          transform: 'translate3d(calc(var(--px) * 0.2), calc(var(--py) * 0.2), 0)'
        }} />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.15)_3px,transparent_4px)]" />
      </div>

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
        @keyframes slowPan { 0% { transform: translate3d(-6%, -4%, 0) } 100% { transform: translate3d(6%, 4%, 0) } }
        @keyframes tunnel { 0% { transform: translateZ(0) rotate(0.001deg); opacity: .7 } 100% { transform: translateZ(-120px) rotate(0.001deg); opacity: .9 } }
        @keyframes zFloat { 0%,100% { transform: translateZ(0) } 50% { transform: translateZ(36px) } }
        @keyframes drift { 0% { transform: translate3d(-2%, 1%, 0) } 100% { transform: translate3d(2%, -1%, 0) } }

        .animate-rise-slow { animation: riseSlow 1600ms ease-out forwards; }
        .animate-fade-slow { animation: fadeSlow 2000ms ease-out forwards; }
        .animate-fade-delay { opacity: 0; animation: fadeSlow 2000ms ease-out 200ms forwards; }
        .animate-fade-delay-2 { opacity: 0; animation: fadeSlow 2000ms ease-out 500ms forwards; }
        .animate-fade-delay-3 { opacity: 0; animation: fadeSlow 2000ms ease-out 900ms forwards; }
        .animate-pulse-slow { animation: fadeSlow 2s ease-in-out infinite alternate; }
        .animate-orb { animation: orb 8s ease-in-out infinite; }
        .animate-orb-delayed { animation: orb 9.5s ease-in-out infinite; }
        .animate-slow-pan { animation: slowPan 18s ease-in-out infinite alternate; }
        .animate-slow-pan-rev { animation: slowPan 22s ease-in-out infinite alternate-reverse; }
        .animate-tunnel { animation: tunnel 18s cubic-bezier(.22,.61,.36,1) infinite alternate; }
        .animate-drift { animation: drift 20s ease-in-out infinite alternate; }
      `}</style>
    </div>
  )
}

export default App
