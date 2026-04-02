import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  fullname: string
  email: string
  phone_number?: string
  avatar_url: string | null
  role: string
  is_active: boolean
}

interface AuthState {
  user: User | null
  isLoading: boolean

  setUser: (user: User | null) => void 
  setLoading: (loading: boolean) => void
  logout: () => void
  updateProfile: (newData: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()( 
  persist( 
    (set) => ({
      user: null,
      isLoading: true,

      setUser: (user) => set({ user, isLoading: false }), 
      setLoading: (isLoading) => set({ isLoading }), 
      logout: () => set({ user: null, isLoading: false }), 
      updateProfile: (newData) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, ...newData } : null,
        })),
    }),
    {
      name: 'auth-storage',           // tên key trong localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)