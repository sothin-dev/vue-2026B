import apiClient from './index'
import type { Post, FetchPostsParams, CreatePostPayload, UpdatePostPayload, PatchPostPayload } from '@/types'

/**
 * Service layer for Post API operations.
 * Uses the shared Axios instance from api/index.ts.
 */
export const PostsService = {
  /**
   * Fetch paginated list of posts.
   * JSONPlaceholder doesn't return total count headers reliably,
   * so we fetch the full list for accurate pagination.
   */
  async getAll(params: FetchPostsParams = {}, signal?: AbortSignal): Promise<{ data: Post[]; total: number }> {
    const response = await apiClient.get<Post[]>('/posts', { params, signal })
    const total = parseInt(response.headers['x-total-count'] ?? String(response.data.length), 10)
    return { data: response.data, total }
  },

  /** Fetch a single post by ID */
  async getById(id: number, signal?: AbortSignal): Promise<Post> {
    const response = await apiClient.get<Post>(`/posts/${id}`, { signal })
    return response.data
  },

  /** Create a new post */
  async create(post: CreatePostPayload): Promise<Post> {
    const response = await apiClient.post<Post>('/posts', post)
    return response.data
  },

  /** Fully replace a post (PUT) */
  async update(id: number, post: UpdatePostPayload): Promise<Post> {
    const response = await apiClient.put<Post>(`/posts/${id}`, post)
    return response.data
  },

  /** Partially update a post (PATCH) */
  async patch(id: number, changes: PatchPostPayload): Promise<Post> {
    const response = await apiClient.patch<Post>(`/posts/${id}`, changes)
    return response.data
  },

  /** Delete a post */
  async remove(id: number): Promise<void> {
    await apiClient.delete(`/posts/${id}`)
  },
}
