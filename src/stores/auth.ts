import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/api/auth'
import type { AuthUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // ─── State ──────────────────────────────────────────────────────────
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<AuthUser | null>(AuthService.getUser())

  // ─── Getters ────────────────────────────────────────────────────────

  /** Whether the user is currently authenticated */
  const isAuthenticated = computed<boolean>(() => !!token.value)

  // ─── Actions ────────────────────────────────────────────────────────

  /**
   * Mock login - accepts any non-empty credentials.
   * Stores the returned token and user in state and localStorage.
   */
  async function login(username: string, password: string) {
    const result = await AuthService.login(username, password)
    token.value = result.token
    user.value = result.user
  }

  /** Logout - clears auth state and localStorage */
  async function logout() {
    await AuthService.logout()
    token.value = null
    user.value = null
  }

  return {
    // State
    token,
    user,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
  }
})
