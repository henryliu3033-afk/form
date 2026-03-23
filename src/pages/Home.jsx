import { Link } from 'react-router'
import { motion } from 'motion/react'
import ProductCard from '../components/product/ProductCard'
import Button from '../components/ui/Button'
import { getFeatured, PRODUCTS } from '../constants/products'

function Marquee() {
  const words = ['New Arrivals', 'Premium Essentials', 'Drop 002 Coming Soon', 'Free Shipping $200+', 'Made to Last']
  const items = [...words, ...words]
  return (
    <div className="overflow-hidden py-3 border-y" style={{ background: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
      <div className="marquee-track flex gap-12 w-max">
        {items.map((w, i) => (
          <span key={i} className="font-mono text-[13px] tracking-widest whitespace-nowrap flex items-center gap-12" style={{ color: 'var(--text-3)' }}>
            {w} <span style={{ color: 'var(--accent)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const CATEGORY_CARDS = [
  { label: 'Tops',        img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80' },
  { label: 'Hoodies',     img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80' },
  { label: 'Bottoms',     img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80' },
  { label: 'Outerwear',   img: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80' },
  { label: 'Accessories', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80' },
]

export default function Home() {
  const featured = getFeatured()

  return (
    <div className="page-enter">

      {/* ── HERO ── */}
      <section className="relative flex items-end min-h-[88vh] overflow-hidden" style={{ background: 'var(--surface)' }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.2)', transform: 'scale(1.02)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg) 15%, transparent 60%)' }} />
        <div className="absolute inset-0 flex items-center overflow-hidden select-none pointer-events-none" aria-hidden="true">
          <span className="font-display font-black leading-none whitespace-nowrap"
            style={{ fontSize: 'clamp(120px, 22vw, 320px)', color: 'transparent', WebkitTextStroke: '1px rgba(250,250,250,0.05)', letterSpacing: '-0.03em', paddingLeft: '4rem' }}>
            FORM
          </span>
        </div>
        <div className="relative z-10 w-full pb-20 md:pb-28">
          <div className="container-page">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <p className="font-mono text-[13px] tracking-widest mb-4" style={{ color: 'var(--accent)' }}>● Drop 001 — Live now</p>
              <h1 className="font-display font-black leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(52px, 9vw, 128px)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Built for<br />
                <span style={{ WebkitTextStroke: '2px var(--text)', color: 'transparent' }}>the essentials.</span>
              </h1>
              <p className="text-[17px] mb-8 max-w-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Premium basics with uncompromising construction. Every piece is made in small batches.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop"><Button variant="primary" size="lg">Shop collection →</Button></Link>
                <Link to="/shop?cat=Outerwear"><Button variant="outline" size="lg">View outerwear</Button></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── FEATURED ── */}
      <section className="py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-[12px] tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>Drop 001</p>
              <h2 className="font-display font-black leading-none" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}>Featured</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-1.5 text-[14px] font-medium transition-colors pb-0.5"
              style={{ color: 'var(--text-3)', borderBottom: '1px solid var(--border-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section className="py-20" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border-soft)' }}>
        <div className="container-page">
          <h2 className="font-display font-black mb-10" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text)' }}>Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORY_CARDS.map(({ label, img }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={`/shop?cat=${label}`} className="group block relative overflow-hidden rounded-[var(--radius-lg)]" style={{ aspectRatio: '1/1.4' }}>
                  <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: 'brightness(0.5)' }} />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display font-bold text-[16px]" style={{ color: 'var(--text)' }}>{label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section className="py-24">
        <div className="container-page grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[12px] tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Our approach</p>
            <h2 className="font-display font-black leading-[0.95] mb-7" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text)' }}>
              Fewer things.<br />Better things.
            </h2>
            <p className="text-[16px] leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
              We don't make trends. We make clothes that outlast them. Every FORM piece is produced in limited runs with premium fabrics built to hold.
            </p>
            <p className="text-[16px] leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
              No markdowns. No second runs. When it's gone, it's gone.
            </p>
            <Link to="/shop"><Button variant="outline" size="lg">Shop Drop 001</Button></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="relative">
            <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80" alt="FORM editorial"
              className="w-full object-cover rounded-[var(--radius-lg)]"
              style={{ aspectRatio: '4/5', filter: 'brightness(0.75) contrast(1.05)' }}
            />
            <div className="absolute bottom-5 left-5 px-3 py-2 rounded-[var(--radius)] font-mono text-[12px] tracking-wider" style={{ background: 'var(--accent)', color: '#fff' }}>
              Drop 001 · 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ALL PRODUCTS TEASER ── */}
      <section className="py-20" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border-soft)' }}>
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display font-black leading-none" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text)' }}>All products</h2>
            <Link to="/shop"><Button variant="ghost" size="sm">View all →</Button></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {PRODUCTS.slice(4, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
