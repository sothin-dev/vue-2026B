<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useAuthStore } from '@/stores/auth'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'

const props = defineProps<{
  id: string
}>()

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const authStore = useAuthStore()

const postId = computed(() => Number(props.id))

onMounted(() => {
  if (postId.value) {
    postsStore.fetchPost(postId.value)
  }
})

async function handleDelete() {
  if (!confirm('Are you sure you want to delete this post?')) return
  await postsStore.deletePost(postId.value)
  router.push('/')
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="post-detail">
    <button class="back-link" @click="goBack">← Back to Posts</button>

    <!-- Loading State -->
    <Loading v-if="postsStore.loading" message="Loading post…" />

    <!-- Error State -->
    <Error
      v-else-if="postsStore.error"
      :message="postsStore.error"
      @retry="postsStore.fetchPost(postId)"
    />

    <!-- Post Content -->
    <article v-else-if="postsStore.currentPost" class="post-content">
      <h1 class="post-content__title">{{ postsStore.currentPost.title }}</h1>

      <div class="post-content__meta">
        <span class="post-content__user">User #{{ postsStore.currentPost.userId }}</span>
        <span class="post-content__id">Post #{{ postsStore.currentPost.id }}</span>
      </div>

      <p class="post-content__body">{{ postsStore.currentPost.body }}</p>

      <!-- Actions (only for authenticated users) -->
      <div v-if="authStore.isAuthenticated" class="post-content__actions">
        <router-link
          :to="`/posts/${postsStore.currentPost.id}/edit`"
          class="btn btn--edit"
        >
          Edit
        </router-link>
        <button class="btn btn--delete" @click="handleDelete">Delete</button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.post-detail {
  max-width: 700px;
  margin: 0 auto;
}

.back-link {
  background: none;
  border: none;
  color: #4a90d9;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #357abd;
}

.post-content {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
}

.post-content__title {
  font-size: 1.6rem;
  color: #222;
  margin: 0 0 0.75rem;
  line-height: 1.3;
}

.post-content__meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: #888;
}

.post-content__body {
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
  margin: 0 0 1.5rem;
  white-space: pre-wrap;
}

.post-content__actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eee;
}

.btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}

.btn--edit {
  background: #4a90d9;
  color: #fff;
}

.btn--edit:hover {
  background: #357abd;
}

.btn--delete {
  background: #e53935;
  color: #fff;
}

.btn--delete:hover {
  background: #c62828;
}
</style>
