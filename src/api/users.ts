import apiClient from './index'
import type { User, Post } from '@/types'

/**
 * Service layer for User API operations.
 */
export const UsersService = {
  /** Fetch all users */
  async getAll(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users')
    return response.data
  },

  /** Fetch a single user by ID */
  async getById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  /** Fetch posts belonging to a specific user */
  async getPosts(userId: number): Promise<Post[]> {
    const response = await apiClient.get<Post[]>('/posts', {
      params: { userId },
    })
    return response.data
  },
}
