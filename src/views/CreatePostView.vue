<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useFetch } from '@/composables/useFetch'
import PostForm from '@/components/PostForm.vue'
import type { CreatePostPayload } from '@/types'

const router = useRouter()
const postsStore = usePostsStore()
const { loading, error, execute } = useFetch()

async function handleSubmit(payload: CreatePostPayload) {
  const result = await execute(() => postsStore.createPost(payload))
  if (result) {
    // Redirect to the new post's detail page
    router.push(`/posts/${result.id}`)
  }
}
</script>

<template>
  <div class="create-post">
    <h1 class="page-title">Create a New Post</h1>

    <div v-if="error" class="error-banner">{{ error }}</div>

    <PostForm :loading="loading" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.create-post {
  max-width: 700px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  color: #222;
  margin: 0 0 1.5rem;
  text-align: center;
}

.error-banner {
  background: #ffebee;
  color: #c62828;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>
