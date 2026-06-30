<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import PostCard from '@/components/PostCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import Pagination from '@/components/Pagination.vue'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'
import Empty from '@/components/Empty.vue'
import { useAuthStore } from '@/stores/auth'

const postsStore = usePostsStore()
const authStore = useAuthStore()

onMounted(() => {
  postsStore.fetchPosts()
})

function handleDelete(id: number) {
  postsStore.deletePost(id)
}
</script>

<template>
  <div class="home">
    <div class="home__hero">
      <h1 class="home__title">Blog Posts</h1>
      <p class="home__subtitle">Browse articles from the community</p>
      <div v-if="authStore.isAuthenticated" class="home__cta">
        <router-link to="/posts/create" class="btn btn--create">+ New Post</router-link>
      </div>
    </div>

    <div class="home__controls">
      <SearchBar
        :model-value="postsStore.searchKeyword"
        @update:model-value="postsStore.setSearchKeyword"
      />
    </div>

    <!-- Loading State -->
    <Loading v-if="postsStore.loading" message="Loading posts…" />

    <!-- Error State -->
    <Error
      v-else-if="postsStore.error"
      :message="postsStore.error"
      @retry="postsStore.fetchPosts"
    />

    <!-- Empty State -->
    <Empty
      v-else-if="postsStore.paginatedPosts.length === 0"
      message="No posts found."
    />

    <!-- Posts Grid -->
    <div v-else class="posts-grid">
      <PostCard
        v-for="post in postsStore.paginatedPosts"
        :key="post.id"
        :post="post"
        @delete="handleDelete"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="postsStore.currentPage"
      :total-pages="postsStore.totalPages"
      @page-change="postsStore.setPage"
    />
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.home__hero {
  text-align: center;
  margin-bottom: 2rem;
}

.home__title {
  font-size: 2rem;
  color: #222;
  margin: 0;
}

.home__subtitle {
  color: #777;
  margin: 0.5rem 0 1rem;
}

.home__cta {
  margin-top: 0.75rem;
}

.btn--create {
  display: inline-block;
  padding: 0.6rem 1.75rem;
  border: none;
  border-radius: 6px;
  background: #4a90d9;
  color: #fff;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn--create:hover {
  background: #357abd;
}

.home__controls {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.posts-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .posts-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
