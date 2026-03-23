import { Link } from 'react-router'

const LINKS = {
  Shop:    [['All Products', '/shop'], ['Tops', '/shop?cat=Tops'], ['Hoodies', '/shop?cat=Hoodies'], ['Bottoms', '/shop?cat=Bottoms'], ['Outerwear', '/shop?cat=Outerwear']],
  Help:    [['Sizing Guide', '/'], ['Shipping', '/'], ['Returns', '/'], ['FAQ', '/'], ['Contact', '/']],
  Company: [['About', '/'], ['Stockists', '/'], ['Press', '/'], ['Careers', '/']],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border-soft)' }}>
      <div className="container-page py-16">

        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <div className="font-display text-3xl font-black tracking-[0.18em] mb-4" style={{ color: 'var(--text)' }}>
              FORM
            </div>
            <p className="text-[14px] leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--text-3)' }}>
              Premium essentials made with intent. Small-batch production. Consistent quality.
            </p>
            {/* Newsletter */}
            <div className="flex max-w-xs">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-[14px] outline-none"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRight: 'none',
                  borderRadius: 'var(--radius) 0 0 var(--radius)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button
                className="px-4 text-[13px] font-semibold"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: '0 var(--radius) var(--radius) 0',
                }}
              >Join</button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[12px] font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-[14px] transition-colors"
                      style={{ color: 'var(--text-2)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[13px] font-mono"
          style={{ borderTop: '1px solid var(--border-soft)', color: 'var(--text-3)' }}
        >
          <span>© {new Date().getFullYear()} FORM. All rights reserved.</span>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((l) => (
              <Link key={l} to="/" className="transition-colors hover:text-[var(--text-2)]" style={{ color: 'var(--text-3)' }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
