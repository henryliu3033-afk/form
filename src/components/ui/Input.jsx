import { useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * Input with label, optional error message, and focus-accent border.
 * Props forwarded to the underlying <input> element.
 */
export default function Input({ label, error, className, ...props }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: 'var(--text-3)' }}
        >
          {label}
        </label>
      )}

      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn('w-full rounded-[var(--radius)] px-4 py-3 text-[15px] outline-none transition-colors duration-150', className)}
        style={{
          background:   'var(--surface)',
          border:       `1px solid ${focused ? 'var(--accent)' : error ? '#EF4444' : 'var(--border)'}`,
          color:        'var(--text)',
          fontFamily:   'var(--font-body)',
        }}
        {...props}
      />

      {error && (
        <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>
      )}
    </div>
  )
}
