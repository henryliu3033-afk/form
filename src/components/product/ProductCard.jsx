import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import Badge from '../ui/Badge'
import { formatPrice } from '../../lib/utils'

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link to={`/product/${product.id}`} className="group block">

        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-[var(--radius-lg)]"
          style={{ aspectRatio: '3/4', background: 'var(--surface)' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity:   hovered ? 0 : 1,
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />

          {/* Hover image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{
                opacity:   hovered ? 1 : 0,
                transform: hovered ? 'scale(1)' : 'scale(1.06)',
              }}
            />
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge label={product.badge} />
            </div>
          )}

          {/* "Quick view" overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 py-3 text-center text-[13px] font-mono tracking-widest z-10"
            style={{ background: 'rgba(9,9,11,0.85)', color: 'var(--text)' }}
          >
            View product →
          </motion.div>
        </div>

        {/* Info row */}
        <div className="mt-3 flex items-start justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <p className="font-display text-[15px] font-semibold truncate" style={{ color: 'var(--text)' }}>
              {product.name}
            </p>
            <p className="text-[13px] mt-0.5 font-mono capitalize" style={{ color: 'var(--text-3)' }}>
              {product.category}
            </p>
          </div>
          <p className="font-display font-bold text-[15px] flex-shrink-0 pt-0.5" style={{ color: 'var(--text)' }}>
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Colour dots */}
        <div className="flex gap-1.5 mt-2 px-0.5">
          {product.colors.map((c) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full border"
              style={{ background: c, borderColor: 'var(--border)' }}
            />
          ))}
        </div>
      </Link>
    </motion.article>
  )
}
