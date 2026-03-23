import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useAuth } from '../store/auth.store'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login() {
  const { login, isLoggedIn } = useAuth()
  const navigate              = useNavigate()

  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  if (isLoggedIn) { navigate('/'); return null }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 700))
    if (!email || !password) { setError('Please fill in all fields.'); setLoading(false); return }
    login(email)
    navigate('/')
  }

  return (
    <div className="page-enter min-h-[calc(100vh-130px)] grid md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <p className="font-display font-black text-7xl leading-none" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(250,250,250,0.12)' }}>FORM</p>
          <p className="font-mono text-[13px] tracking-widest mt-4" style={{ color: 'rgba(250,250,250,0.3)' }}>
            Drop 001 — Live now
          </p>
        </div>
      </div>

      {/* ── Right — form ── */}
      <div className="flex items-center justify-center px-10 py-16 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <p className="font-mono text-[12px] tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
            Welcome back
          </p>
          <h1
            className="font-display font-black leading-none mb-10"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--text)' }}
          >
            Sign in
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            {error && <p className="text-[13px]" style={{ color: '#EF4444' }}>{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center mt-2"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in →'}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{ background: 'var(--border-soft)' }} />
            <span className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-soft)' }} />
          </div>

          <p className="text-center text-[14px]" style={{ color: 'var(--text-3)' }}>
            No account?{' '}
            <Link
              to="/register"
              className="font-medium transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
            >
              Create one →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
