import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { motion } from 'motion/react'
import ProductCard from '../components/product/ProductCard'
import { PRODUCTS, CATEGORIES } from '../constants/products'

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name',       label: 'Name A–Z' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || 'All'

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [sortBy, setSortBy] = useState('default')

  const products = useMemo(() => {
    let list = activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory)

    if (sortBy === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, sortBy])

  return (
    <div className="page-enter">
      <div className="container-page py-12">

      {/* ── Page header ── */}
      <div className="mb-10">
        <p className="font-mono text-[12px] tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
          Drop 001
        </p>
        <div className="flex items-end justify-between">
          <h1
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: 'var(--text)' }}
          >
            Shop
          </h1>
          <span className="font-mono text-[13px] pb-1" style={{ color: 'var(--text-3)' }}>
            {products.length} items
          </span>
        </div>
      </div>

      {/* ── Filter / Sort bar — full width sticky with container-page inner ── */}
      <div
        className="sticky z-30 mb-8"
        style={{
          top: 'var(--nav-height)',
          background: 'rgba(9,9,11,0.96)',
          borderBottom: '1px solid var(--border-soft)',
          backdropFilter: 'blur(16px)',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}
      >
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0"
              style={{
                background:   activeCategory === cat ? 'var(--accent)' : 'var(--surface)',
                color:        activeCategory === cat ? '#fff' : 'var(--text-2)',
                border:       `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border-soft)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-[13px] px-3 py-1.5 rounded-[var(--radius)] outline-none cursor-pointer flex-shrink-0"
          style={{
            background: 'var(--surface)',
            border:     '1px solid var(--border-soft)',
            color:      'var(--text-2)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        </div>  {/* end container-page inner */}
      </div>  {/* end sticky bar */}

      {/* ── Product grid ── */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="font-display font-black text-6xl" style={{ color: 'var(--border)' }}>
            Empty
          </p>
          <p className="font-mono text-[13px]" style={{ color: 'var(--text-3)' }}>
            No products in this category
          </p>
          <button
            onClick={() => setActiveCategory('All')}
            className="mt-2 text-[14px] font-medium"
            style={{ color: 'var(--accent)' }}
          >
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
      </div> {/* end container-page */}
    </div>
  )
}
