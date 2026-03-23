import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { useAuth } from '../store/auth.store'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const PERKS = [
  'Early access to new drops',
  'Order history & tracking',
  'Members-only releases',
  'Free returns for 1 year',
]

export default function Register() {
  const { register, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  if (isLoggedIn) { navigate('/'); return null }

  const f = (key) => ({
    value:    form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
  })

  const validate = () => {
    const e = {}
    if (!form.name)             e.name     = 'Required'
    if (!form.email)            e.email    = 'Required'
    if (form.password.length < 6) e.password = 'Min 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    register(form.name, form.email)
    navigate('/')
  }

  return (
    <div className="page-enter min-h-[calc(100vh-130px)] grid md:grid-cols-2">

      {/* ── Left — perks panel ── */}
      <div className="hidden md:flex flex-col justify-end relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.25)' }}
        />
        <div className="relative z-10 p-16">
          <p className="font-mono text-[12px] tracking-widest mb-5" style={{ color: 'var(--accent)' }}>
            Member benefits
          </p>
          <ul className="flex flex-col gap-3 mb-8">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]" style={{ color: 'rgba(250,250,250,0.7)' }}>
                <span style={{ color: 'var(--accent)' }}>—</span> {p}
              </li>
            ))}
          </ul>
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
            Join FORM
          </p>
          <h1
            className="font-display font-black leading-none mb-10"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--text)' }}
          >
            Create account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input label="Your name"        required placeholder="John Doe"        error={errors.name}     {...f('name')} />
            <Input label="Email"   type="email"   required placeholder="you@example.com" error={errors.email}    {...f('email')} />
            <Input label="Password" type="password" required placeholder="Min 6 characters" error={errors.password} {...f('password')} />
            <Input label="Confirm password" type="password" required placeholder="Repeat password" error={errors.confirm} {...f('confirm')} />

            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
              By creating an account, you agree to our{' '}
              <Link to="/" className="underline" style={{ color: 'var(--text-2)' }}>Terms</Link>
              {' '}and{' '}
              <Link to="/" className="underline" style={{ color: 'var(--text-2)' }}>Privacy Policy</Link>.
            </p>

            <Button type="submit" variant="primary" size="lg" className="w-full justify-center mt-1" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account →'}
            </Button>
          </form>

          <p className="mt-8 text-center text-[14px]" style={{ color: 'var(--text-3)' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
            >
              Sign in →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
