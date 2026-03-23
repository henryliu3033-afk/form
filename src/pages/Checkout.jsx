import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '../store/cart.store'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { formatPrice, cartSubtotal } from '../lib/utils'

// ── Step indicator ──────────────────────────────────────────
function StepBar({ current }) {
  const steps = ['Shipping', 'Payment']
  return (
    <div className="flex items-center gap-3 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-mono font-semibold"
              style={{
                background: current > i + 1 ? '#22C55E' : current === i + 1 ? 'var(--accent)' : 'var(--surface-2)',
                color: current >= i + 1 ? '#fff' : 'var(--text-3)',
              }}
            >
              {current > i + 1 ? '✓' : i + 1}
            </div>
            <span
              className="text-[14px] font-medium"
              style={{ color: current === i + 1 ? 'var(--text)' : 'var(--text-3)' }}
            >
              {s}
            </span>
          </div>
          {i === 0 && <div className="w-10 h-px" style={{ background: 'var(--border-soft)' }} />}
        </div>
      ))}
    </div>
  )
}

// ── Order summary sidebar ───────────────────────────────────
function OrderSummary({ items, subtotal, shipping, total }) {
  return (
    <div
      className="p-5 rounded-[var(--radius-lg)] sticky top-24"
      style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)' }}
    >
      <p className="font-mono text-[12px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
        Order ({items.length} items)
      </p>

      <div className="flex flex-col gap-3 mb-5">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-14 h-16 object-cover rounded-[var(--radius)]"
                style={{ filter: 'brightness(0.85)' }}
              />
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {item.qty}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[14px] font-semibold truncate" style={{ color: 'var(--text)' }}>
                {item.product.name}
              </p>
              <p className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>
                Size: {item.size}
              </p>
            </div>
            <span className="font-display font-semibold text-[14px] flex-shrink-0" style={{ color: 'var(--text)' }}>
              {formatPrice(item.product.price * item.qty)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-4" style={{ borderTop: '1px solid var(--border-soft)' }}>
        <div className="flex justify-between text-[14px]">
          <span style={{ color: 'var(--text-3)' }}>Subtotal</span>
          <span style={{ color: 'var(--text)' }}>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span style={{ color: 'var(--text-3)' }}>Shipping</span>
          <span style={{ color: shipping === 0 ? '#22C55E' : 'var(--text)' }}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        <div
          className="flex justify-between pt-3 text-[16px] font-semibold"
          style={{ borderTop: '1px solid var(--border-soft)' }}
        >
          <span style={{ color: 'var(--text)' }}>Total</span>
          <span style={{ color: 'var(--text)' }}>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}

// ── Main Checkout ───────────────────────────────────────────
export default function Checkout() {
  const { items, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderNum]            = useState(`F-${Math.floor(10000 + Math.random() * 90000)}`)

  const subtotal = cartSubtotal(items)
  const shipping = subtotal >= 200 ? 0 : 18
  const total    = subtotal + shipping

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'US',
    card: '', expiry: '', cvv: '', cardName: '',
  })
  const f = (key) => ({
    value:    form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
  })

  const submitShipping = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }

  const submitPayment = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      clearCart()
      window.scrollTo(0, 0)
    }, 1800)
  }

  // ── Success screen ──────────────────────────────────────
  if (step === 3) {
    return (
      <div className="page-enter min-h-[70vh] flex items-center justify-center px-8">
        <div className="max-w-sm w-full text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-7"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            ✓
          </motion.div>
          <h1 className="font-display font-black text-4xl mb-3" style={{ color: 'var(--text)' }}>
            Order placed!
          </h1>
          <p className="font-mono text-[13px] mb-2" style={{ color: 'var(--text-3)' }}>
            Order {orderNum}
          </p>
          <p className="text-[15px] mb-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Confirmation sent to {form.email || 'your email'}. Ships in 2–4 business days.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">Continue shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  // ── Main checkout form ──────────────────────────────────
  return (
    <div className="page-enter">
      <div className="container-page py-12">

        {/* Back link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium mb-8 transition-colors"
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          ← Back to cart
        </Link>

        <h1
          className="font-display font-black text-4xl md:text-5xl mb-8"
          style={{ color: 'var(--text)' }}
        >
          Checkout
        </h1>

        <StepBar current={step} />

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Forms column (3/5) ── */}
          <div className="lg:col-span-3 w-full">
            <AnimatePresence mode="wait">

              {/* Step 1 — Shipping */}
              {step === 1 && (
                <motion.form
                  key="shipping"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  onSubmit={submitShipping}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
                      Contact
                    </p>
                    <Input label="Email address" type="email" required placeholder="you@example.com" {...f('email')} />
                  </div>

                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
                      Shipping address
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="First name" required placeholder="John" {...f('firstName')} />
                        <Input label="Last name"  required placeholder="Doe"  {...f('lastName')} />
                      </div>
                      <Input label="Address" required placeholder="123 Street Name" {...f('address')} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="City"     required placeholder="New York" {...f('city')} />
                        <Input label="ZIP code" required placeholder="10001"    {...f('zip')} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="text-[12px] font-mono uppercase tracking-widest"
                          style={{ color: 'var(--text-3)' }}
                        >
                          Country
                        </label>
                        <select
                          required
                          className="w-full rounded-[var(--radius)] px-4 py-3 text-[15px] outline-none"
                          style={{
                            background:  'var(--surface)',
                            border:      '1px solid var(--border)',
                            color:       'var(--text)',
                            fontFamily:  'var(--font-body)',
                          }}
                          {...f('country')}
                        >
                          {[
                            ['US', 'United States'],
                            ['CA', 'Canada'],
                            ['GB', 'United Kingdom'],
                            ['JP', 'Japan'],
                            ['TW', 'Taiwan'],
                            ['AU', 'Australia'],
                          ].map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center mt-2">
                    Continue to payment →
                  </Button>
                </motion.form>
              )}

              {/* Step 2 — Payment */}
              {step === 2 && (
                <motion.form
                  key="payment"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  onSubmit={submitPayment}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-mono text-[12px] uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                        Payment
                      </p>
                      <div className="flex items-center gap-1.5 text-[12px] font-mono" style={{ color: 'var(--text-3)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="11" width="18" height="11" rx="2"/>
                          <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                        SSL secured
                      </div>
                    </div>

                    <div
                      className="px-4 py-3 rounded-[var(--radius)] text-[13px] font-mono mb-4"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)', color: 'var(--text-3)' }}
                    >
                      Demo mode — any card details will work
                    </div>

                    <div className="flex flex-col gap-4">
                      <Input label="Card number"   required placeholder="1234 5678 9012 3456" {...f('card')} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Expiry" required placeholder="MM/YY" {...f('expiry')} />
                        <Input label="CVV"    required placeholder="123"   {...f('cvv')} />
                      </div>
                      <Input label="Name on card" required placeholder="John Doe" {...f('cardName')} />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 justify-center"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1 justify-center"
                      disabled={loading}
                    >
                      {loading ? 'Processing…' : `Pay ${formatPrice(total)} →`}
                    </Button>
                  </div>
                </motion.form>
              )}

            </AnimatePresence>
          </div>

          {/* ── Order summary column (2/5) ── */}
          <div className="lg:col-span-2">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>

        </div>

      </div>
    </div>
  )
}
