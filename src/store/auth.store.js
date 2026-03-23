import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuth = create(
  persist(
    (set) => ({
      user:       null,
      isLoggedIn: false,

      login: (email) => {
        // Demo: accept any email/password combination
        const user = {
          id:       `u_${Date.now()}`,
          email,
          name:     email.split('@')[0],
          joinedAt: new Date().toISOString(),
        }
        set({ user, isLoggedIn: true })
      },

      register: (name, email) => {
        const user = {
          id:       `u_${Date.now()}`,
          email,
          name,
          joinedAt: new Date().toISOString(),
        }
        set({ user, isLoggedIn: true })
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: 'form-auth' }
  )
)
