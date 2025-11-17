import { useEffect, useRef } from 'react'

function Mission() {
  const planeRef = useRef(null)

  // Simple 3D-like scroll distortion using CSS variables
  useEffect(() => {
    const el = planeRef.current
    if (!el) return
    const onScroll = () => {
      const p = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scroll') || '0')
      el.style.transform = `rotateX(calc(var(--rx))) rotateY(calc(var(--ry))) translate3d(0, 0, ${Math.sin(p * Math.PI) * 30}px)`
    }
    const id = setInterval(onScroll, 50)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="mission" className="relative w-full py-24 sm:py-32 bg-[#050509] overflow-hidden">
      {/* volumetric fog ribbons */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -left-1/4 top-0 h-[140%] w-[120%] rotate-6 bg-gradient-to-b from-fuchsia-500/5 via-indigo-400/8 to-cyan-400/5 blur-3xl animate-slow-pan" />
        <div className="absolute -right-1/3 -top-1/4 h-[160%] w-[120%] -rotate-6 bg-gradient-to-b from-cyan-400/5 via-purple-400/8 to-emerald-400/5 blur-3xl animate-slow-pan-rev" />
      </div>

      {/* parallax grid surface */}
      <div className="pointer-events-none absolute bottom-[-18vh] left-1/2 -translate-x-1/2 w-[200vw] h-[55vh] [perspective:1000px]">
        <div className="absolute inset-0 origin-top [transform:rotateX(70deg)] opacity-40" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '70px 70px, 70px 70px',
          backgroundPosition: 'center center',
          boxShadow: '0 0 80px 10px rgba(56,189,248,0.18) inset',
        }} />
      </div>

      <div ref={planeRef} className="relative max-w-4xl mx-auto px-6 text-center will-change-transform" style={{ transform: 'rotateX(var(--rx)) rotateY(var(--ry))' }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white/90 tracking-wide [text-shadow:0_0_16px_rgba(59,130,246,.25)] animate-rise-slow">
          A New Kind of Intelligence
        </h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/70 animate-fade-delay-2">
          AI-SPACE is the gateway to your next evolution.
          <br className="hidden sm:block" />
          A place where identity, creativity and power merge with artificial intelligence.
          <br className="hidden sm:block" />
          We are building something unprecedented.
        </p>
      </div>

      {/* scanline film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.15)_3px,transparent_4px)]" />
    </section>
  )
}

export default Mission
