<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useFetch } from '@/composables/useFetch'
import PostForm from '@/components/PostForm.vue'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'
import type { UpdatePostPayload } from '@/types'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const postsStore = usePostsStore()
const { loading: saving, error: saveError, execute } = useFetch()

const postId = computed(() => Number(props.id))

onMounted(() => {
  if (postId.value) {
    postsStore.fetchPost(postId.value)
  }
})

async function handleSubmit(payload: UpdatePostPayload) {
  const result = await execute(() => postsStore.updatePost(postId.value, payload))
  if (result) {
    router.push(`/posts/${result.id}`)
  }
}
</script>

<template>
  <div class="edit-post">
    <h1 class="page-title">Edit Post</h1>

    <!-- Loading the existing post -->
    <Loading v-if="postsStore.loading" message="Loading post…" />

    <!-- Error loading post -->
    <Error
      v-else-if="postsStore.error"
      :message="postsStore.error"
      @retry="postsStore.fetchPost(postId)"
    />

    <!-- Save error banner -->
    <div v-else-if="saveError" class="error-banner">{{ saveError }}</div>

    <!-- Edit Form -->
    <PostForm
      v-else-if="postsStore.currentPost"
      :post="postsStore.currentPost"
      :loading="saving"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.edit-post {
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
