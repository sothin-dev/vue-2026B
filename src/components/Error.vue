<script setup lang="ts">
/**
 * Error display component.
 * Shows a friendly error message with an optional retry button.
 */
defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="error-container" role="alert">
    <div class="error-icon">⚠</div>
    <p class="error-message">{{ message || 'Something went wrong. Please try again.' }}</p>
    <button class="retry-button" @click="emit('retry')">Retry</button>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
}

.error-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #d32f2f;
  font-size: 1rem;
  margin: 0.5rem 0 1rem;
  max-width: 400px;
}

.retry-button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #4a90d9;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-button:hover {
  background: #357abd;
}
</style>
