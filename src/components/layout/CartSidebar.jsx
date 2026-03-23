import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import { useCart } from '../../store/cart.store'
import { formatPrice, cartSubtotal } from '../../lib/utils'
import Button from '../ui/Button'

// ── Single cart item row ────────────────────────────────────
function CartItem({ item, onRemove, onQty }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      className="flex gap-4 py-4"
      style={{ borderBottom: '1px solid var(--border-soft)' }}
    >
      {/* Thumbnail */}
      <Link to={`/product/${item.product.id}`} onClick={onRemove} className="flex-shrink-0">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-[72px] h-[88px] object-cover rounded-[var(--radius)]"
          style={{ filter: 'brightness(0.9)' }}
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-1 justify-center min-w-0">
        <p className="font-display text-[15px] font-semibold truncate" style={{ color: 'var(--text)' }}>
          {item.product.name}
        </p>
        <p className="text-[13px] font-mono" style={{ color: 'var(--text-3)' }}>
          {item.size}
          <span className="mx-1.5 opacity-40">·</span>
          <span
            className="inline-block w-3 h-3 rounded-full align-middle border border-[var(--border)]"
            style={{ background: item.color }}
          />
        </p>

        {/* Qty + price row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQty(item.key, item.qty - 1)}
              className="w-7 h-7 flex items-center justify-center rounded border text-[15px] transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >−</button>
            <span className="font-mono text-sm w-5 text-center" style={{ color: 'var(--text)' }}>{item.qty}</span>
            <button
              onClick={() => onQty(item.key, item.qty + 1)}
              className="w-7 h-7 flex items-center justify-center rounded border text-[15px] transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >+</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-[15px]" style={{ color: 'var(--text)' }}>
              {formatPrice(item.product.price * item.qty)}
            </span>
            <button
              onClick={() => onRemove(item.key)}
              aria-label="Remove item"
              className="transition-colors"
              style={{ color: 'var(--text-3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main CartSidebar ────────────────────────────────────────
export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQty } = useCart()
  const subtotal  = cartSubtotal(items)
  const shipping  = subtotal >= 200 ? 0 : 18
  const total     = subtotal + shipping
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          />

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] z-[70] flex flex-col"
            style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border-soft)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid var(--border-soft)' }}>
              <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text)' }}>
                Cart {itemCount > 0 && <span className="font-mono text-[14px]" style={{ color: 'var(--text-3)' }}>({itemCount})</span>}
              </h2>
              <button onClick={closeCart} aria-label="Close cart"
                className="w-9 h-9 flex items-center justify-center rounded transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                  <div className="text-7xl font-display font-black" style={{ color: 'var(--border)' }}>0</div>
                  <p className="text-[14px] font-mono" style={{ color: 'var(--text-3)' }}>Your cart is empty</p>
                  <Button variant="outline" onClick={closeCart} size="md">
                    <Link to="/shop">Browse products</Link>
                  </Button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem
                      key={item.key}
                      item={item}
                      onRemove={removeItem}
                      onQty={updateQty}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: '1px solid var(--border-soft)' }}>
                {/* Totals */}
                <div className="flex flex-col gap-2 mb-4">
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
                  <div className="flex justify-between pt-3 text-[16px] font-semibold"
                    style={{ borderTop: '1px solid var(--border-soft)' }}>
                    <span style={{ color: 'var(--text)' }}>Total</span>
                    <span style={{ color: 'var(--text)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link to="/checkout" onClick={closeCart}>
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Checkout →
                  </Button>
                </Link>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="block mt-3 text-center text-[13px] font-mono transition-colors"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
