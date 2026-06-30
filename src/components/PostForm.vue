<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Post } from '@/types'

/**
 * Reusable form component for creating or editing a post.
 * Emits submit with title, body, and userId when the form is submitted.
 */
const props = defineProps<{
  post?: Post | null
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [{ title: string; body: string; userId: number }]
}>()

const title = ref('')
const body = ref('')

/** Sync form fields when editing an existing post */
watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      title.value = newPost.title
      body.value = newPost.body
    } else {
      title.value = ''
      body.value = ''
    }
  },
  { immediate: true },
)

function handleSubmit() {
  if (!title.value.trim() || !body.value.trim()) return
  emit('submit', {
    title: title.value.trim(),
    body: body.value.trim(),
    userId: 1, // Default user for JSONPlaceholder
  })
}
</script>

<template>
  <form class="post-form" @submit.prevent="handleSubmit">
    <div class="form-field">
      <label class="form-label" for="post-title">Title</label>
      <input
        id="post-title"
        v-model="title"
        type="text"
        class="form-input"
        placeholder="Enter post title"
        required
        :disabled="loading"
      />
    </div>

    <div class="form-field">
      <label class="form-label" for="post-body">Body</label>
      <textarea
        id="post-body"
        v-model="body"
        class="form-textarea"
        placeholder="Write your post content here…"
        rows="8"
        required
        :disabled="loading"
      ></textarea>
    </div>

    <div class="form-actions">
      <router-link to="/" class="btn btn--cancel">Cancel</router-link>
      <button type="submit" class="btn btn--submit" :disabled="loading || !title.trim() || !body.trim()">
        {{ loading ? 'Saving…' : post ? 'Update Post' : 'Create Post' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.post-form {
  max-width: 700px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #333;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4a90d9;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.12);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.55rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, opacity 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--submit {
  background: #4a90d9;
  color: #fff;
}

.btn--submit:hover:not(:disabled) {
  background: #357abd;
}

.btn--cancel {
  background: #e0e0e0;
  color: #555;
  display: inline-flex;
  align-items: center;
}

.btn--cancel:hover {
  background: #ccc;
}
</style>
