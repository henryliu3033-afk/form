import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '../store/cart.store'
import Button from '../components/ui/Button'
import { formatPrice, cartSubtotal } from '../lib/utils'

// ── One row in the cart table ───────────────────────────────
function CartRow({ item, onRemove, onQty }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      style={{ borderBottom: '1px solid var(--border-soft)' }}
    >
      {/* Product */}
      <td className="py-5 pr-4">
        <div className="flex items-center gap-4">
          <Link to={`/product/${item.product.id}`}>
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-20 h-24 object-cover rounded-[var(--radius)] flex-shrink-0"
              style={{ filter: 'brightness(0.88)' }}
            />
          </Link>
          <div>
            <Link
              to={`/product/${item.product.id}`}
              className="font-display text-[16px] font-semibold transition-colors block"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
            >
              {item.product.name}
            </Link>
            <p className="font-mono text-[13px] mt-1" style={{ color: 'var(--text-3)' }}>
              {item.product.category}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full border"
                style={{ background: item.color, borderColor: 'var(--border)' }}
              />
              <span className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>
                Size: {item.size}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Unit price */}
      <td className="py-5 px-4 text-center hidden md:table-cell">
        <span className="font-display text-[15px]" style={{ color: 'var(--text-2)' }}>
          {formatPrice(item.product.price)}
        </span>
      </td>

      {/* Qty stepper */}
      <td className="py-5 px-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onQty(item.key, item.qty - 1)}
            className="w-8 h-8 flex items-center justify-center rounded border text-[16px] transition-colors"
            style={{ borderColor: 'var(--border-soft)', color: 'var(--text-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-2)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-soft)')}
          >−</button>
          <span className="font-mono text-[14px] w-5 text-center" style={{ color: 'var(--text)' }}>
            {item.qty}
          </span>
          <button
            onClick={() => onQty(item.key, item.qty + 1)}
            className="w-8 h-8 flex items-center justify-center rounded border text-[16px] transition-colors"
            style={{ borderColor: 'var(--border-soft)', color: 'var(--text-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-2)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-soft)')}
          >+</button>
        </div>
      </td>

      {/* Line total + remove */}
      <td className="py-5 pl-4 text-right">
        <div className="flex items-center justify-end gap-4">
          <span className="font-display font-semibold text-[16px]" style={{ color: 'var(--text)' }}>
            {formatPrice(item.product.price * item.qty)}
          </span>
          <button
            onClick={() => onRemove(item.key)}
            aria-label="Remove"
            className="transition-colors flex-shrink-0"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </td>
    </motion.tr>
  )
}

// ── Main Cart page ──────────────────────────────────────────
export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCart()

  const subtotal = cartSubtotal(items)
  const shipping  = subtotal >= 200 ? 0 : 18
  const total     = subtotal + shipping

  return (
    <div className="page-enter">
      <div className="container-page py-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <h1
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}
          >
            Your cart
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[13px] font-mono pb-0.5 transition-colors"
              style={{ color: 'var(--text-3)', borderBottom: '1px solid var(--border-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <div className="font-display font-black text-8xl" style={{ color: 'var(--border)' }}>0</div>
            <p className="font-mono text-[14px]" style={{ color: 'var(--text-3)' }}>Your cart is empty</p>
            <Link to="/shop">
              <Button variant="primary" size="lg">Browse products →</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Items table — 2/3 width */}
            <div className="lg:col-span-2">
              <table className="w-full">
                <thead>
                  <tr
                    className="text-left"
                    style={{ borderBottom: '1px solid var(--border-soft)' }}
                  >
                    <th className="pb-4 text-[12px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                      Product
                    </th>
                    <th className="pb-4 text-center text-[12px] font-mono uppercase tracking-widest hidden md:table-cell" style={{ color: 'var(--text-3)' }}>
                      Price
                    </th>
                    <th className="pb-4 text-center text-[12px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                      Qty
                    </th>
                    <th className="pb-4 text-right text-[12px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartRow
                        key={item.key}
                        item={item}
                        onRemove={removeItem}
                        onQty={updateQty}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 mt-8 text-[14px] font-medium transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                ← Continue shopping
              </Link>
            </div>

            {/* Order summary — 1/3 width */}
            <div className="lg:col-span-1">
              <div
                className="p-6 rounded-[var(--radius-lg)] sticky top-24"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)' }}
              >
                <h2 className="font-display font-bold text-[18px] mb-5" style={{ color: 'var(--text)' }}>
                  Order summary
                </h2>

                <div className="flex flex-col gap-3 mb-5">
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
                  {subtotal < 200 && (
                    <p className="text-[13px] font-mono" style={{ color: 'var(--text-3)' }}>
                      Add {formatPrice(200 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div
                    className="flex justify-between pt-4 text-[16px] font-semibold"
                    style={{ borderTop: '1px solid var(--border-soft)' }}
                  >
                    <span style={{ color: 'var(--text)' }}>Total</span>
                    <span style={{ color: 'var(--text)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Checkout →
                  </Button>
                </Link>

                {/* Trust signals */}
                <ul className="mt-5 flex flex-col gap-2">
                  {['Free shipping over $200', 'Secure checkout', 'Ships in 2–4 days'].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-[13px] font-mono" style={{ color: 'var(--text-3)' }}>
                      <span style={{ color: '#22C55E' }}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
