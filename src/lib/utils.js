/** Join class names, filtering out falsy values */
export const cn = (...classes) => classes.filter(Boolean).join(' ')

/** Format price with dollar sign */
export const formatPrice = (n) => `$${n.toLocaleString()}`

/** Truncate a string to maxLen with ellipsis */
export const truncate = (str, maxLen = 60) =>
  str.length > maxLen ? str.slice(0, maxLen) + '…' : str

/** Get total item count from cart items array */
export const cartCount = (items) => items.reduce((sum, i) => sum + i.qty, 0)

/** Get subtotal from cart items array */
export const cartSubtotal = (items) =>
  items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
