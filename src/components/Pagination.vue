<script setup lang="ts">
/**
 * Pagination component with Previous and Next buttons.
 * Emits page changes to the parent.
 */
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<template>
  <nav class="pagination" v-if="totalPages > 1" aria-label="Pagination">
    <button
      class="pagination__btn"
      :disabled="currentPage <= 1"
      @click="goToPage(currentPage - 1)"
    >
      ← Previous
    </button>

    <span class="pagination__info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
      class="pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next →
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 0;
}

.pagination__btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  color: #444;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.pagination__btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #999;
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__info {
  font-size: 0.9rem;
  color: #666;
}
</style>
