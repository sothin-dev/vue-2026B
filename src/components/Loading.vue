<script setup lang="ts">
/**
 * Loading spinner component.
 * Displays a CSS-animated spinner with an optional message.
 */
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="loading-container" role="status" aria-label="Loading">
    <div class="spinner"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #4a90d9;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-message {
  margin-top: 1rem;
  color: #666;
  font-size: 0.95rem;
}
</style>
