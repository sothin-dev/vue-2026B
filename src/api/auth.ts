import type { AuthUser } from '@/types'

const MOCK_USER: AuthUser = {
  id: 1,
  username: 'Bret',
  email: 'Sincere@april.biz',
}

/**
 * Mock authentication service.
 * Stores a fake token in localStorage to simulate auth state.
 */
export const AuthService = {
  /** Simulate login - accepts any credentials, returns mock user */
  async login(username: string, password: string): Promise<{ token: string; user: AuthUser }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    const token = 'mock-jwt-token-' + Date.now()
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(MOCK_USER))

    return { token, user: MOCK_USER }
  },

  /** Logout - clear stored auth data */
  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  },

  /** Check if user is currently authenticated */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  /** Get stored user data */
  getUser(): AuthUser | null {
    const raw = localStorage.getItem('auth_user')
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },
}
