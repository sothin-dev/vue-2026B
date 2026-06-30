/** Represents a blog post from JSONPlaceholder */
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

/** Represents a user from JSONPlaceholder */
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

/** Payload for creating a new post */
export interface CreatePostPayload {
  title: string
  body: string
  userId: number
}

/** Payload for updating an existing post */
export interface UpdatePostPayload extends CreatePostPayload {}

/** Payload for partially updating a post */
export interface PatchPostPayload {
  title?: string
  body?: string
  userId?: number
}

/** Parameters for fetching paginated posts */
export interface FetchPostsParams {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
}

/** Mock user for authentication */
export interface AuthUser {
  id: number
  username: string
  email: string
}

/** Pagination metadata */
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}
