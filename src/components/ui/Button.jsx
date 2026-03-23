import { cn } from '../../lib/utils'

/**
 * Button variants:
 *  - primary   white text on accent red (CTA)
 *  - secondary white text on surface (secondary action)
 *  - outline   bordered, transparent bg
 *  - ghost     no border, subtle hover
 */
const VARIANTS = {
  primary:   'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white',
  secondary: 'bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text)]',
  outline:   'border border-[var(--border)] hover:border-[var(--text-2)] bg-transparent text-[var(--text)]',
  ghost:     'bg-transparent hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)]',
}

const SIZES = {
  sm:  'h-8  px-3  text-sm',
  md:  'h-10 px-5  text-[15px]',
  lg:  'h-12 px-7  text-base',
  xl:  'h-14 px-8  text-lg',
  icon:'h-10 w-10',
}

export default function Button({
  variant = 'primary',
  size    = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'font-[var(--font-display)] font-semibold',
        'rounded-[var(--radius)] transition-colors duration-150',
        'focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
