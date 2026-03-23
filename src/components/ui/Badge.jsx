import { BADGE_STYLE } from '../../constants/products'
import { cn } from '../../lib/utils'

/** Renders a product badge (New, Limited, etc.) */
export default function Badge({ label, className }) {
  if (!label) return null
  const style = BADGE_STYLE[label] ?? { bg: 'var(--surface-2)', text: 'var(--text-2)' }

  return (
    <span
      className={cn('inline-block px-2 py-0.5 text-[11px] font-mono font-medium rounded-sm tracking-wider', className)}
      style={{ background: style.bg, color: style.text }}
    >
      {label.toUpperCase()}
    </span>
  )
}
