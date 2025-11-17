import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | exists | error
  const [message, setMessage] = useState('')

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
        setMessage(data.message || 'Thank you. You\'ll hear from us soon.')
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
    <section className="relative w-full py-24 sm:py-32 bg-[#07070E]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_55%),radial-gradient(ellipse_at_70%_20%,rgba(34,197,94,0.06),transparent_50%)]" />
      <div className="relative max-w-xl mx-auto px-6">
        <h3 className="text-center text-2xl sm:text-3xl font-medium text-white/90">Enter Before Everyone Else</h3>
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
      </div>
    </section>
  )
}

export default Waitlist
