import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Single Axios instance for the entire application.
 * Configured with baseURL from environment, timeout, and interceptors.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Request interceptor:
 * - Attaches the Authorization token from localStorage if available.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor:
 * - Automatically retries once on 503 Service Unavailable.
 * - Handles 401 → logout + redirect to login.
 * - Handles 403 → redirect to home.
 * - Logs 500+ errors globally.
 */
let isRetrying = false

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status

    // Automatically retry once on 503
    if (status === 503 && !isRetrying) {
      isRetrying = true
      try {
        const config = error.config
        if (config) {
          return await apiClient(config)
        }
      } finally {
        isRetrying = false
      }
    }

    // Handle 401 - unauthorized
    if (status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/'
    }

    // Handle 403 - forbidden
    if (status === 403) {
      window.location.href = '/'
    }

    // Log 500+ errors
    if (status && status >= 500) {
      console.error(`Server error (${status}):`, error.message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
