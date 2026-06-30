import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UsersService } from '@/api/users'
import type { User, Post } from '@/types'

export const useUsersStore = defineStore('users', () => {
  // ─── State ──────────────────────────────────────────────────────────
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const userPosts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ─── Actions ────────────────────────────────────────────────────────

  /** Fetch all users */
  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      users.value = await UsersService.getAll()
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch a single user and their posts simultaneously using Promise.all.
   */
  async function fetchUser(id: number) {
    loading.value = true
    error.value = null

    try {
      const [user, posts] = await Promise.all([
        UsersService.getById(id),
        UsersService.getPosts(id),
      ])
      currentUser.value = user
      userPosts.value = posts
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user details'
    } finally {
      loading.value = false
    }
  }

  /** Clear any error state */
  function clearError() {
    error.value = null
  }

  return {
    // State
    users,
    currentUser,
    userPosts,
    loading,
    error,
    // Actions
    fetchUsers,
    fetchUser,
    clearError,
  }
})
