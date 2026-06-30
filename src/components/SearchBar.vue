<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchInput = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Debounce search input by 300ms.
 */
watch(searchInput, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit('update:modelValue', newValue)
    debounceTimer = null
  }, 300)
})

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchInput"
      type="text"
      class="search-input"
      placeholder="Search posts by title or content…"
      aria-label="Search posts"
    />
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #333;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #4a90d9;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.12);
}

.search-input::placeholder {
  color: #aaa;
}
</style>
