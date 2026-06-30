<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '@/types'

const props = defineProps<{
  post: Post
  loading?: boolean
}>()

const emit = defineEmits<{
  delete: [id: number]
}>()

/**
 * Truncate the body text to show a preview.
 */
const preview = computed(() => {
  if (props.post.body.length > 120) {
    return props.post.body.slice(0, 120) + '…'
  }
  return props.post.body
})
</script>

<template>
  <article class="post-card" :class="{ 'is-deleting': loading }">
    <div class="post-card__header">
      <h3 class="post-card__title">{{ post.title }}</h3>
      <span class="post-card__user-id">User #{{ post.userId }}</span>
    </div>
    <p class="post-card__body">{{ preview }}</p>
    <div class="post-card__actions">
      <router-link :to="`/posts/${post.id}`" class="btn btn--view">View</router-link>
      <button
        class="btn btn--delete"
        :disabled="loading"
        @click="emit('delete', post.id)"
      >
        {{ loading ? 'Deleting…' : 'Delete' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.post-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.25rem;
  transition: box-shadow 0.2s, opacity 0.2s;
}

.post-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.post-card.is-deleting {
  opacity: 0.5;
  pointer-events: none;
}

.post-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.post-card__title {
  margin: 0;
  font-size: 1.05rem;
  color: #333;
  line-height: 1.4;
  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__user-id {
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
}

.post-card__body {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0.5rem 0 1rem;
}

.post-card__actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, opacity 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--view {
  background: #4a90d9;
  color: #fff;
}

.btn--view:hover {
  background: #357abd;
}

.btn--delete {
  background: #e53935;
  color: #fff;
}

.btn--delete:hover:not(:disabled) {
  background: #c62828;
}
</style>
