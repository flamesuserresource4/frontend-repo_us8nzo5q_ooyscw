import { useEffect, useRef, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | exists | error
  const [message, setMessage] = useState('')
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onFrame = () => {
      el.style.transform = `rotateX(var(--rx)) rotateY(var(--ry)) translate3d(var(--px), var(--py), calc(var(--vz)))`
      requestAnimationFrame(onFrame)
    }
    requestAnimationFrame(onFrame)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(`${BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus(data.status === 'exists' ? 'exists' : 'success')
        setMessage(data.message || "Thank you. You'll hear from us soon.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.detail || 'Something went wrong. Please try again later.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error. Please try again soon.')
    }
  }

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#07070E] overflow-hidden">
      {/* depth aurora */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60">
        <div className="absolute -left-1/2 top-0 h-[140%] w-[120%] rotate-12 bg-gradient-to-b from-fuchsia-500/5 via-indigo-400/8 to-cyan-400/5 blur-3xl animate-slow-pan" />
        <div className="absolute -right-1/3 -top-1/4 h-[160%] w-[120%] -rotate-6 bg-gradient-to-b from-cyan-400/5 via-purple-400/8 to-emerald-400/5 blur-3xl animate-slow-pan-rev" />
      </div>

      {/* floor grid */}
      <div className="pointer-events-none absolute bottom-[-16vh] left-1/2 -translate-x-1/2 w-[200vw] h-[50vh] [perspective:1000px]">
        <div className="absolute inset-0 origin-top [transform:rotateX(68deg)] opacity-45" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px, 80px 80px',
          backgroundPosition: 'center center',
          boxShadow: '0 0 80px 10px rgba(59,130,246,0.22) inset',
        }} />
      </div>

      <div className="relative max-w-xl mx-auto px-6">
        <div ref={cardRef} className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 will-change-transform">
          <h3 className="text-center text-2xl sm:text-3xl font-medium text-white/90 [text-shadow:0_0_14px_rgba(99,102,241,0.35)]">Enter Before Everyone Else</h3>
          <p className="mt-3 text-center text-white/60">Join the Alpha Waitlist and access the first evolution stage.</p>

          <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full rounded-full bg-white/5 border border-white/15 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 backdrop-blur-sm"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="relative w-full sm:w-auto rounded-full px-6 py-4 text-white font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            >
              {status === 'loading' ? 'Sending…' : 'Get Early Access'}
            </button>
          </form>

          {status !== 'idle' && (
            <p className={`mt-4 text-center text-sm ${status === 'error' ? 'text-red-400' : 'text-white/70'}`}>
              {message}
            </p>
          )}

          {/* holographic borders */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent [mask:linear-gradient(#fff,transparent)]" style={{
            background: 'linear-gradient(90deg, rgba(99,102,241,.35), rgba(56,189,248,.35), rgba(168,85,247,.35))',
            filter: 'blur(8px)',
            opacity: .35,
          }} />
        </div>
      </div>

      {/* film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.15)_3px,transparent_4px)]" />
    </section>
  )
}

export default Waitlist
