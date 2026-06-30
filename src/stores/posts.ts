import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PostsService } from '@/api/posts'
import type { Post, CreatePostPayload, UpdatePostPayload, FetchPostsParams } from '@/types'

export const usePostsStore = defineStore('posts', () => {
  // ─── State ──────────────────────────────────────────────────────────
  const posts = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const searchKeyword = ref('')
  const itemsPerPage = 10

  // AbortController for canceling in-flight requests
  let abortController: AbortController | null = null

  // Track recently deleted IDs so we don't show them after optimistic delete
  const deletedIds = ref<Set<number>>(new Set())

  // ─── Getters ────────────────────────────────────────────────────────

  /** Filter posts by the search keyword (title/body) */
  const filteredPosts = computed<Post[]>(() => {
    if (!searchKeyword.value.trim()) {
      return posts.value
    }
    const keyword = searchKeyword.value.toLowerCase()
    return posts.value.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.body.toLowerCase().includes(keyword),
    )
  })

  /** Total pages derived from filtered posts count */
  const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage))

  /** Slice filtered posts into pages for client-side pagination */
  const paginatedPosts = computed<Post[]>(() => {
    const all = filteredPosts.value
    const start = (currentPage.value - 1) * itemsPerPage
    return all.slice(start, start + itemsPerPage)
  })

  // ─── Actions ────────────────────────────────────────────────────────

  /**
   * Fetch all posts, compute total pages.
   * Uses AbortController to cancel previous requests.
   */
  async function fetchPosts() {
    // Cancel any previous in-flight request
    abortController?.abort()
    abortController = new AbortController()

    loading.value = true
    error.value = null

    try {
      const result = await PostsService.getAll({
        _limit: 100, // fetch enough to enable client-side search + pagination
        _sort: 'id',
        _order: 'desc',
      }, abortController.signal)

      // Filter out optimistically deleted posts
      posts.value = result.data.filter((p) => !deletedIds.value.has(p.id))
      currentPage.value = 1
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
    } finally {
      loading.value = false
    }
  }

  /** Fetch a single post by ID */
  async function fetchPost(id: number) {
    // Cancel previous request
    abortController?.abort()
    abortController = new AbortController()

    loading.value = true
    error.value = null

    try {
      currentPost.value = await PostsService.getById(id, abortController.signal)
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      error.value = err instanceof Error ? err.message : 'Failed to fetch post'
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new post.
   * JSONPlaceholder doesn't persist, so we prepend the response to local state.
   */
  async function createPost(payload: CreatePostPayload) {
    loading.value = true
    error.value = null

    try {
      const newPost = await PostsService.create(payload)
      posts.value.unshift(newPost)
      return newPost
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to create post'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing post (PUT).
   * Updates local state optimistically.
   */
  async function updatePost(id: number, payload: UpdatePostPayload) {
    loading.value = true
    error.value = null

    // Optimistically update
    const index = posts.value.findIndex((p) => p.id === id)
    const previousPost = index !== -1 ? { ...posts.value[index]! } : null
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index]!, ...payload }
    }
    if (currentPost.value?.id === id) {
      currentPost.value = { ...currentPost.value, ...payload }
    }

    try {
      const updated = await PostsService.update(id, payload)
      // Replace with server response
      if (index !== -1) {
        posts.value[index] = updated
      }
      currentPost.value = updated
      return updated
    } catch (err: unknown) {
      // Rollback optimistic update
      if (index !== -1 && previousPost) {
        posts.value[index] = previousPost
      }
      if (currentPost.value?.id === id && previousPost) {
        currentPost.value = previousPost
      }
      error.value = err instanceof Error ? err.message : 'Failed to update post'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Optimistic delete: remove from UI immediately, rollback if API fails.
   */
  async function deletePost(id: number) {
    error.value = null

    // Save for rollback
    const deletedPost = posts.value.find((p) => p.id === id)
    if (!deletedPost) return

    // Optimistic: remove from visible list immediately
    posts.value = posts.value.filter((p) => p.id !== id)
    deletedIds.value.add(id)

    try {
      await PostsService.remove(id)
    } catch (err: unknown) {
      // Rollback: restore the post
      posts.value.push(deletedPost)
      posts.value.sort((a, b) => b.id - a.id)
      deletedIds.value.delete(id)
      error.value = err instanceof Error ? err.message : 'Failed to delete post'
    }
  }

  /** Set search keyword and reset to page 1 */
  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
    currentPage.value = 1
  }

  /** Set the current page */
  function setPage(page: number) {
    currentPage.value = page
  }

  /** Clear any error state */
  function clearError() {
    error.value = null
  }

  return {
    // State
    posts,
    currentPost,
    loading,
    error,
    currentPage,
    totalPages,
    searchKeyword,
    // Getters
    filteredPosts,
    paginatedPosts,
    // Actions
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setSearchKeyword,
    setPage,
    clearError,
  }
})
