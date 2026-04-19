import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '../../store/cart.store'
import { useAuth } from '../../store/auth.store'
import { cartCount } from '../../lib/utils'

// ── Nav link data ──────────────────────────────────────────
const NAV_LINKS = [
  { to: '/shop',                    label: 'Shop All' },
  { to: '/shop?cat=Tops',           label: 'Tops' },
  { to: '/shop?cat=Hoodies',        label: 'Hoodies' },
  { to: '/shop?cat=Bottoms',        label: 'Bottoms' },
  { to: '/shop?cat=Outerwear',      label: 'Outerwear' },
  { to: '/shop?cat=Accessories',    label: 'Accessories' },
]

// ── Sub-components ─────────────────────────────────────────
function CartButton({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open cart (${count} items)`}
      className="relative flex items-center gap-2 cursor-pointer transition-colors"
      style={{ color: 'var(--text)' }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>

      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center
                     rounded-full text-[11px] font-mono font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {count}
        </motion.span>
      )}
    </button>
  )
}

function HamburgerIcon({ open }) {
  return (
    <div className="flex flex-col gap-[5px] cursor-pointer">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[1.5px] w-[22px] transition-all duration-300 origin-center"
          style={{
            background: 'var(--text)',
            opacity:    i === 1 && open ? 0 : 1,
            transform:
              i === 0 && open ? 'rotate(45deg) translate(4px, 4.5px)' :
              i === 2 && open ? 'rotate(-45deg) translate(4px, -4.5px)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

// ── Main Navbar ─────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  const { items, openCart } = useCart()
  const { isLoggedIn, logout } = useAuth()
  const count = cartCount(items)

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <>
      {/* ── Announcement bar ── */}
      <div
        className="w-full py-2.5 text-center text-[13px] font-mono tracking-wider"
        style={{ background: 'var(--accent)', color: '#fff' }}
      >
        Free shipping on orders over $200 · New arrivals every Monday
      </div>

      {/* ── Main nav bar ── */}
      <header
        className="sticky top-0 z-50 transition-shadow duration-300"
        style={{
          height:     'var(--nav-height)',
          background: scrolled ? 'rgba(9,9,11,0.96)' : 'var(--bg)',
          borderBottom: '1px solid var(--border-soft)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* 
          3-column grid:
            col 1 (1fr) = Logo — left-aligned
            col 2 (auto) = Nav links — truly centered
            col 3 (1fr) = Auth + Cart — right-aligned
        */}
        <div
          className="mx-auto h-full w-full px-4 md:px-12"
          style={{
            maxWidth: '1280px',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* Col 1 — Logo */}
          <Link
            to="/"
            className="font-display text-2xl font-black"
            style={{ color: 'var(--text)', letterSpacing: '0.18em' }}
          >
            FORM
          </Link>

          {/* Col 2 — Nav links (centered) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-body text-[15px] font-medium transition-colors duration-150"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Col 3 — Auth + Cart (right-aligned) */}
          <div className="flex items-center gap-5 justify-end">
            {/* Auth links – desktop only */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="hidden md:block text-[14px] font-medium transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-[14px] font-medium transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                Sign in
              </Link>
            )}

            {/* Cart */}
            <CartButton count={count} onClick={openCart} />

            {/* Hamburger – mobile only */}
            <button
              className="md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden z-40"
            style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-soft)' }}
          >
            <div className="container-page flex flex-col py-6 gap-5">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[17px] font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {label}
                </Link>
              ))}
              <hr style={{ borderColor: 'var(--border-soft)' }} />
              {isLoggedIn ? (
                <button onClick={logout} className="text-left text-[15px]" style={{ color: 'var(--text-3)' }}>
                  Sign out
                </button>
              ) : (
                <>
                  <Link to="/login"    className="text-[15px]" style={{ color: 'var(--text-2)' }}>Sign in</Link>
                  <Link to="/register" className="text-[15px]" style={{ color: 'var(--text-2)' }}>Create account</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
