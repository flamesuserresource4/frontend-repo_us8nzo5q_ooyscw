import Spline from '@splinetool/react-spline'

function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(92,52,235,0.25),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(0,176,255,0.18),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(255,120,80,0.08),transparent_40%)]" />

      {/* Spline 3D animation */}
      <div className="absolute inset-0" aria-hidden>
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Atmospheric glow overlay (not blocking interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="mb-6 animate-fade-slow">
          <div className="mx-auto h-24 w-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_0_120px_rgba(99,102,241,0.25)]" />
        </div>

        <h1 className="tracking-[0.2em] text-5xl sm:text-6xl md:text-7xl font-semibold text-white/95 drop-shadow-[0_0_30px_rgba(168,85,247,0.25)] animate-rise-slow">
          AI-SPACE
        </h1>
        <p className="mt-4 text-sm sm:text-base uppercase tracking-[0.25em] text-white/60 animate-fade-delay">
          Human → AI-Augmented
        </p>

        <p className="mt-6 text-white/70 text-base sm:text-lg max-w-xl animate-fade-delay-2">
          Your evolution begins soon.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 animate-fade-delay-3">
          <button onClick={onCTAClick} className="group relative rounded-full px-8 py-4 text-base sm:text-lg font-medium text-white tracking-wide">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-70 blur-xl transition-opacity group-hover:opacity-90" />
            <span className="relative z-10 inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4">
              <span>Join the Waitlist</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white/80"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </button>

          <a href="#mission" className="text-white/50 hover:text-white/70 text-xs tracking-widest uppercase transition-colors">
            A new era is coming.
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
