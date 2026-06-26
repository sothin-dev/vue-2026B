<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <div class="exercise-card">
    <h2>🎨 Exercise 5: Theme Switcher</h2>
    <p class="theme-status">
      Current mode: <strong>{{ theme.darkMode ? '🌙 Dark Mode' : '☀️ Light Mode' }}</strong>
    </p>
    <button class="btn btn-theme" @click="theme.toggleTheme()">
      {{ theme.darkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode' }}
    </button>
  </div>
</template>

<style scoped>
.theme-status {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.btn-theme {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--accent);
  color: #fff;
  transition: opacity 0.2s;
}

.btn-theme:hover {
  opacity: 0.9;
}
</style>
