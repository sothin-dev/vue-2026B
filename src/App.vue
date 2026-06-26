<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { watchEffect } from 'vue'

const theme = useThemeStore()

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.darkMode ? 'dark' : 'light')
})
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Vue.js Pinia Exercises</h1>
      <nav class="nav-tabs">
        <RouterLink to="/counter" class="nav-link">Counter</RouterLink>
        <RouterLink to="/user" class="nav-link">User</RouterLink>
        <RouterLink to="/todo" class="nav-link">Todo</RouterLink>
        <RouterLink to="/cart" class="nav-link">Cart</RouterLink>
        <RouterLink to="/theme" class="nav-link">Theme</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  --bg: #f8f9fa;
  --bg-card: #ffffff;
  --bg-secondary: #f0f2f5;
  --input-bg: #ffffff;
  --text: #1a1a2e;
  --text-secondary: #6b7280;
  --border: #dee2e6;
  --accent: #6366f1;
  --accent-dim: rgba(99, 102, 241, 0.15);
  --success: #22c55e;
  --warning: #eab308;
  --danger: #ef4444;
  --nav-bg: #ffffff;
  --nav-shadow: rgba(0, 0, 0, 0.06);
}

[data-theme='dark'] {
  --bg: #0f172a;
  --bg-card: #1e293b;
  --bg-secondary: #1e293b;
  --input-bg: #1e293b;
  --text: #e2e8f0;
  --text-secondary: #94a3b8;
  --border: #334155;
  --accent: #818cf8;
  --accent-dim: rgba(129, 140, 248, 0.2);
  --success: #4ade80;
  --warning: #facc15;
  --danger: #f87171;
  --nav-bg: #1e293b;
  --nav-shadow: rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
  min-height: 100vh;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1.2;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--border);
}

.btn-danger {
  background: var(--danger);
  color: #fff;
}

.btn-danger:hover {
  opacity: 0.9;
}

.btn-small {
  padding: 0.35rem 0.7rem;
  font-size: 0.8rem;
}

.exercise-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px var(--nav-shadow);
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent), #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-tabs {
  display: flex;
  gap: 0.25rem;
  background: var(--nav-bg);
  padding: 0.25rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px var(--nav-shadow);
  flex-wrap: wrap;
}

.nav-link {
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--text);
  background: var(--bg-secondary);
}

.nav-link.router-link-active {
  color: #fff;
  background: var(--accent);
}

main {
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
