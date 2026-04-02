import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Khởi tạo token từ localStorage (nếu có)
      token: localStorage.getItem("token"),

      setToken: (token) => {
        if (token) {
          localStorage.setItem("token", token)
        } else {
          localStorage.removeItem("token")
        }
        set({ token })
      },

      logout: () => {
        localStorage.removeItem("token")
        set({ token: null })
      },
    }),
    {
      name: 'auth-storage', // Tên key trong localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)
