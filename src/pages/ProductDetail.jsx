import { useState } from 'react'
import { useParams, Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '../store/cart.store'
import { getById, getRelated } from '../constants/products'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProductCard from '../components/product/ProductCard'
import { formatPrice } from '../lib/utils'

// ── Size selector button ────────────────────────────────────
function SizeButton({ size, selected, inStock, onClick }) {
  return (
    <button
      onClick={() => inStock && onClick(size)}
      disabled={!inStock}
      className="px-4 py-2 rounded-[var(--radius)] text-[14px] font-mono transition-all duration-150"
      style={{
        border:      `1px solid ${selected ? 'var(--accent)' : 'var(--border-soft)'}`,
        background:  selected ? 'var(--accent)' : 'transparent',
        color:       selected ? '#fff' : inStock ? 'var(--text)' : 'var(--border)',
        cursor:      inStock ? 'pointer' : 'not-allowed',
        textDecoration: !inStock ? 'line-through' : 'none',
      }}
    >
      {size}
    </button>
  )
}

// ── Main page ───────────────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams()
  const product = getById(id)
  const { addItem } = useCart()

  const [activeImg, setActiveImg]   = useState(0)
  const [selectedSize, setSize]     = useState(null)
  const [selectedColor, setColor]   = useState(null)
  const [feedback, setFeedback]     = useState('')

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-80 gap-4">
        <p className="font-display font-black text-5xl" style={{ color: 'var(--border)' }}>404</p>
        <Link to="/shop" style={{ color: 'var(--accent)' }}>← Back to shop</Link>
      </div>
    )
  }

  const related = getRelated(product)

  const handleAddToCart = () => {
    if (!selectedSize) { setFeedback('Please select a size'); setTimeout(() => setFeedback(''), 2000); return }
    const color = selectedColor ?? product.colors[0]
    addItem(product, selectedSize, color)
    setFeedback('Added to cart ✓')
    setTimeout(() => setFeedback(''), 2000)
  }

  const lowStock = product.sizes.some((s) => (product.stock[s] ?? 0) > 0 && (product.stock[s] ?? 0) <= 2)

  return (
    <div className="page-enter">
      <div className="container-page py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] font-mono mb-8" style={{ color: 'var(--text-3)' }}>
          <Link to="/shop" className="transition-colors hover:text-[var(--text)]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?cat=${product.category}`} className="transition-colors hover:text-[var(--text)]">
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-2)' }}>{product.name}</span>
        </nav>

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Images */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="w-[68px] h-20 overflow-hidden rounded-[var(--radius)] transition-all"
                  style={{ border: `2px solid ${activeImg === i ? 'var(--accent)' : 'transparent'}` }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 overflow-hidden rounded-[var(--radius-lg)] relative" style={{ background: 'var(--surface)' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
              </AnimatePresence>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge label={product.badge} />
                </div>
              )}
            </div>
          </div>

          {/* ── Info panel ── */}
          <div className="md:pt-2 flex flex-col gap-6">

            {/* Title + price */}
            <div>
              <p className="font-mono text-[12px] tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
                {product.category}
              </p>
              <h1
                className="font-display font-black leading-tight mb-3"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text)' }}
              >
                {product.name}
              </h1>
              <p className="font-display font-bold text-3xl" style={{ color: 'var(--text)' }}>
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {product.description}
            </p>

            {/* Colour picker */}
            <div>
              <p className="font-mono text-[12px] tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
                Colour
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    title={c}
                    className="w-8 h-8 rounded-full transition-all"
                    style={{
                      background: c,
                      border: '2px solid',
                      borderColor: selectedColor === c || (!selectedColor && c === product.colors[0])
                        ? 'var(--accent)'
                        : 'var(--border)',
                      boxShadow: selectedColor === c ? '0 0 0 2px var(--bg), 0 0 0 4px var(--accent)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[12px] tracking-widest" style={{ color: 'var(--text-3)' }}>Size</p>
                <button className="text-[13px] font-mono transition-colors" style={{ color: 'var(--text-3)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-3)')}
                >
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <SizeButton
                    key={size}
                    size={size}
                    selected={selectedSize === size}
                    inStock={(product.stock[size] ?? 0) > 0}
                    onClick={setSize}
                  />
                ))}
              </div>
              {lowStock && (
                <p className="mt-3 text-[13px] font-mono" style={{ color: '#F59E0B' }}>
                  ⚠ Low stock — order soon
                </p>
              )}
            </div>

            {/* Add to cart */}
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="xl"
                className="w-full justify-center"
                onClick={handleAddToCart}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={feedback || 'default'}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    {feedback || 'Add to cart'}
                  </motion.span>
                </AnimatePresence>
              </Button>

              <Button variant="outline" size="xl" className="w-full justify-center">
                ♡ Save to wishlist
              </Button>
            </div>

            {/* Product details list */}
            <div
              className="pt-6"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              <p className="font-mono text-[12px] tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
                Details
              </p>
              <ul className="flex flex-col gap-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-[14px]" style={{ color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>—</span> {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping note */}
            <div
              className="px-4 py-3 rounded-[var(--radius)] text-[13px] font-mono leading-relaxed"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)', color: 'var(--text-3)' }}
            >
              Free shipping on orders $200+ · Ships in 2–4 business days
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="container-page mt-24 pt-16" style={{ borderTop: '1px solid var(--border-soft)' }}>
            <h2
              className="font-display font-black mb-8"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text)' }}
            >
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
