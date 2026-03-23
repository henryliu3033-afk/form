import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartCount, cartSubtotal } from '../lib/utils'

export const useCart = create(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      // ── Drawer controls ───────────────────────────────────
      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      // ── Item actions ──────────────────────────────────────
      addItem: (product, size, color) => {
        const key = `${product.id}|${size}|${color}`
        const existing = get().items.find((i) => i.key === key)

        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.key === key ? { ...i, qty: i.qty + 1 } : i
            ),
          }))
        } else {
          set((s) => ({
            items: [...s.items, { key, product, size, color, qty: 1 }],
          }))
        }
        set({ isOpen: true })
      },

      removeItem: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQty: (key, qty) => {
        if (qty < 1) { get().removeItem(key); return }
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, qty } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),

      // ── Computed helpers ──────────────────────────────────
      get count()    { return cartCount(get().items) },
      get subtotal() { return cartSubtotal(get().items) },
    }),
    { name: 'form-cart' }
  )
)
