import { useEffect, useRef } from 'react'

function Energy() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let t = 0
    const raf = () => {
      t += 0.005
      el.style.transform = `rotateX(calc(var(--rx))) rotateY(calc(var(--ry))) translateZ(${Math.sin(t) * 24}px)`
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#06060B] overflow-hidden">
      {/* Animated divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[120vw]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow" />
      </div>

      {/* volumetric orbs with depth */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl animate-orb-delayed" />

      {/* subtle perspective grid */}
      <div className="pointer-events-none absolute bottom-[-12vh] left-1/2 -translate-x-1/2 w-[200vw] h-[40vh] [perspective:1000px]">
        <div className="absolute inset-0 origin-top [transform:rotateX(68deg)] opacity-35" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '80px 80px, 80px 80px',
          backgroundPosition: 'center center',
          boxShadow: '0 0 70px 8px rgba(147,51,234,0.15) inset',
        }} />
      </div>

      <div ref={ref} className="relative max-w-3xl mx-auto px-6 text-center will-change-transform">
        <p className="text-xl sm:text-2xl text-white/80 leading-relaxed animate-fade-delay-2 [text-shadow:0_0_12px_rgba(168,85,247,0.25)]">
          Designed for creators, thinkers, innovators.
          <br />
          Built for those ready to become AI-Augmented.
        </p>
      </div>

      {/* film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.15)_3px,transparent_4px)]" />
    </section>
  )
}

export default Energy
