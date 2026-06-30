import { ref } from 'vue'

/**
 * Reusable composable that wraps a data-fetching function.
 * Provides loading/error state and an execute method.
 *
 * @example
 * ```ts
 * const { loading, error, execute } = useFetch()
 * await execute(() => fetchData())
 * ```
 */
export function useFetch() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Execute an async function with loading/error tracking.
   * Returns the result of the function or undefined on failure.
   */
  async function execute<T>(fn: () => Promise<T>): Promise<T | undefined> {
    loading.value = true
    error.value = null

    try {
      const result = await fn()
      return result
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return undefined
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
      return undefined
    } finally {
      loading.value = false
    }
  }

  /** Clear any stored error */
  function clearError() {
    error.value = null
  }

  return {
    loading,
    error,
    execute,
    clearError,
  }
}
