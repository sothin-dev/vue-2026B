<script setup lang="ts">
/**
 * Empty state component.
 * Displays a message when there is no data to show.
 */
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="empty-container">
    <div class="empty-icon">📭</div>
    <p class="empty-message">{{ message || 'No posts found.' }}</p>
  </div>
</template>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-message {
  color: #888;
  font-size: 1rem;
  max-width: 400px;
}
</style>
