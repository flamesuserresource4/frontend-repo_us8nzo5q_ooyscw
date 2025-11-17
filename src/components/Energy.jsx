function Energy() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#06060B] overflow-hidden">
      {/* Animated divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[120vw]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow" />
      </div>

      {/* Soft moving orb */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl animate-orb-delayed" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-xl sm:text-2xl text-white/80 leading-relaxed">
          Designed for creators, thinkers, innovators.
          <br />
          Built for those ready to become AI-Augmented.
        </p>
      </div>
    </section>
  )
}

export default Energy
