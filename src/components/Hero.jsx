import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Hero({ onCTAClick }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const DPR = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = w * DPR
    canvas.height = h * DPR
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.scale(DPR, DPR)

    const stars = Array.from({ length: Math.min(220, Math.floor(w / 6)) }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.6 + 0.4,
      s: Math.random() * 1.2 + 0.2,
      a: Math.random() * Math.PI * 2,
      v: Math.random() * 0.5 + 0.2,
    }))

    let raf
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // subtle vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(1, 'rgba(0,0,0,0.6)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // stars
      for (const st of stars) {
        st.a += 0.002 * st.v
        const twinkle = 0.5 + Math.sin(st.a) * 0.5
        ctx.globalAlpha = 0.4 + twinkle * 0.6
        ctx.fillStyle = `rgba(${150 + st.z * 100}, ${120 + st.z * 100}, 255, 1)`
        const parX = (pointer.x - w / 2) * 0.003 * st.z
        const parY = (pointer.y - h / 2) * 0.003 * st.z
        ctx.beginPath()
        ctx.arc(st.x + parX, st.y + parY, st.s * st.z, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(render)
    }
    render()

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(DPR, DPR)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [pointer.x, pointer.y])

  // Mouse parallax + tilt
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      setPointer({ x, y })
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const rx = ((y - cy) / cy) * -6 // tilt range
      const ry = ((x - cx) / cx) * 6
      document.documentElement.style.setProperty('--rx', rx.toFixed(3) + 'deg')
      document.documentElement.style.setProperty('--ry', ry.toFixed(3) + 'deg')
      document.documentElement.style.setProperty('--px', ((x - cx) * 0.02).toFixed(2) + 'px')
      document.documentElement.style.setProperty('--py', ((y - cy) * 0.02).toFixed(2) + 'px')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Deep space gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(92,52,235,0.25),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(0,176,255,0.2),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(255,120,80,0.06),transparent_45%)]" />

      {/* Animated prismatic beams */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-70">
        <div className="absolute -left-1/2 top-0 h-[140%] w-[120%] rotate-12 bg-gradient-to-b from-fuchsia-500/5 via-indigo-400/8 to-cyan-400/5 blur-3xl animate-slow-pan" />
        <div className="absolute -right-1/3 -top-1/4 h-[160%] w-[120%] -rotate-6 bg-gradient-to-b from-cyan-400/5 via-purple-400/8 to-emerald-400/5 blur-3xl animate-slow-pan-rev" />
      </div>

      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Spline 3D animation with subtle parallax */}
      <div
        ref={sceneRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translate3d(var(--px), var(--py), 0)' }}
        aria-hidden
      >
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Holographic lens flare layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl animate-pulse-slow" />
        <div className="absolute right-1/4 bottom-1/5 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* 3D floor grid */}
      <div className="pointer-events-none absolute bottom-[-10vh] left-1/2 -translate-x-1/2 w-[200vw] h-[50vh] [perspective:1000px]">
        <div className="absolute inset-0 origin-top [transform:rotateX(68deg)] opacity-50" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px, 80px 80px',
          backgroundPosition: 'center center',
          boxShadow: '0 0 80px 10px rgba(99,102,241,0.25) inset',
        }} />
      </div>

      {/* Atmospheric gradient vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ transform: 'rotateX(var(--rx)) rotateY(var(--ry))' }}>
        <div className="mb-8 animate-fade-slow">
          <div className="mx-auto h-24 w-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_0_160px_rgba(99,102,241,0.35)]" />
        </div>

        <h1 className="tracking-[0.2em] text-5xl sm:text-6xl md:text-7xl font-semibold text-white/95 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)] animate-rise-slow [text-shadow:0_0_12px_rgba(147,197,253,0.25)]">
          <span className="[filter:contrast(110%)_saturate(110%)]">AI-SPACE</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base uppercase tracking-[0.25em] text-white/60 animate-fade-delay">
          Human → AI-Augmented
        </p>

        <p className="mt-6 text-white/70 text-base sm:text-lg max-w-xl animate-fade-delay-2">
          Your evolution begins soon.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 animate-fade-delay-3">
          <button
            onClick={onCTAClick}
            className="group relative rounded-full px-8 py-4 text-base sm:text-lg font-medium text-white tracking-wide [transform:translateZ(0)]"
            style={{ transform: 'rotateX(var(--rx)) rotateY(var(--ry))' }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-70 blur-2xl transition-opacity group-hover:opacity-90" />
            <span className="relative z-10 inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 shadow-[0_8px_40px_rgba(99,102,241,0.35)]">
              <span>Join the Waitlist</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white/80"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </button>

          <a href="#mission" className="text-white/50 hover:text-white/70 text-xs tracking-widest uppercase transition-colors">
            A new era is coming.
          </a>
        </div>
      </div>

      {/* Scanlines / film grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.2)_3px,transparent_4px)]" />
    </section>
  )
}

export default Hero
