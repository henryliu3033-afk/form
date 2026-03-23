import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '../store/cart.store'
import Button from '../components/ui/Button'
import { formatPrice, cartSubtotal } from '../lib/utils'

function CartRow({ item, onRemove, onQty }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex gap-4 py-5" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
        <img src={item.product.images[0]} alt={item.product.name}
          className="w-20 h-24 md:w-24 md:h-28 object-cover rounded-[var(--radius)]"
          style={{ filter: 'brightness(0.88)' }} />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/product/${item.product.id}`}
              className="font-display text-sm md:text-base font-semibold transition-colors block"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}>
              {item.product.name}
            </Link>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-3)' }}>{item.product.category}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-3 h-3 rounded-full border"
                style={{ background: item.color, borderColor: 'var(--border)' }} />
              <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>Size: {item.size}</span>
            </div>
          </div>
          <button onClick={() => onRemove(item.key)} aria-label="Remove"
            className="transition-colors flex-shrink-0 mt-0.5" style={{ color: 'var(--text-3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button onClick={() => onQty(item.key, item.qty - 1)}
              className="w-7 h-7 flex items-center justify-center rounded border text-sm transition-colors"
              style={{ borderColor: 'var(--border-soft)', color: 'var(--text-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-soft)')}>−</button>
            <span className="font-mono text-sm w-5 text-center" style={{ color: 'var(--text)' }}>{item.qty}</span>
            <button onClick={() => onQty(item.key, item.qty + 1)}
              className="w-7 h-7 flex items-center justify-center rounded border text-sm transition-colors"
              style={{ borderColor: 'var(--border-soft)', color: 'var(--text-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-soft)')}>+</button>
          </div>
          <span className="font-display font-semibold text-sm md:text-base" style={{ color: 'var(--text)' }}>
            {formatPrice(item.product.price * item.qty)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCart()
  const subtotal = cartSubtotal(items)
  const shipping  = subtotal >= 200 ? 0 : 18
  const total     = subtotal + shipping

  return (
    <div className="page-enter">
      <div className="container-page py-10 md:py-12">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <h1 className="font-display font-black leading-none text-4xl md:text-6xl" style={{ color: 'var(--text)' }}>
            Your cart
          </h1>
          {items.length > 0 && (
            <button onClick={clearCart}
              className="text-xs md:text-sm font-mono pb-0.5 transition-colors"
              style={{ color: 'var(--text-3)', borderBottom: '1px solid var(--border-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 md:py-32 gap-6 text-center">
            <div className="font-display font-black text-8xl" style={{ color: 'var(--border)' }}>0</div>
            <p className="font-mono text-sm" style={{ color: 'var(--text-3)' }}>Your cart is empty</p>
            <Link to="/shop"><Button variant="primary" size="lg">Browse products →</Button></Link>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Order summary — top on mobile, right on desktop */}
            <div className="lg:col-span-1 lg:order-last">
              <div className="p-5 md:p-6 rounded-[var(--radius-lg)] lg:sticky lg:top-24"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)' }}>
                <h2 className="font-display font-bold text-base md:text-lg mb-5" style={{ color: 'var(--text)' }}>
                  Order summary
                </h2>
                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-3)' }}>Subtotal</span>
                    <span style={{ color: 'var(--text)' }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-3)' }}>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#22C55E' : 'var(--text)' }}>
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  {subtotal < 200 && (
                    <p className="text-xs font-mono" style={{ color: 'var(--text-3)' }}>
                      Add {formatPrice(200 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between pt-3 text-base font-semibold"
                    style={{ borderTop: '1px solid var(--border-soft)' }}>
                    <span style={{ color: 'var(--text)' }}>Total</span>
                    <span style={{ color: 'var(--text)' }}>{formatPrice(total)}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button variant="primary" size="lg" className="w-full justify-center">Checkout →</Button>
                </Link>
                <ul className="mt-5 flex flex-col gap-2">
                  {['Free shipping over $200', 'Secure checkout', 'Ships in 2–4 days'].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-3)' }}>
                      <span style={{ color: '#22C55E' }}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Items list */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {items.map((item) => (
                  <CartRow key={item.key} item={item} onRemove={removeItem} onQty={updateQty} />
                ))}
              </AnimatePresence>
              <Link to="/shop"
                className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
                ← Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
