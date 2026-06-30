<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="app-container">
    <!-- Navigation Header -->
    <header class="app-header">
      <div class="app-header__inner">
        <router-link to="/" class="app-logo">📝 BlogApp</router-link>

        <nav class="app-nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            Posts
          </router-link>
          <router-link to="/users" class="nav-link" :class="{ active: $route.path.startsWith('/users') }">
            Users
          </router-link>
        </nav>

        <div class="app-actions">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/posts/create" class="btn btn--small btn--primary">+ New Post</router-link>
            <span class="user-badge">{{ authStore.user?.username }}</span>
            <button class="btn btn--small btn--outline" @click="authStore.logout">Logout</button>
          </template>
          <template v-else>
            <button class="btn btn--small btn--outline" @click="authStore.login('demo', 'demo')">
              Demo Login
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style>
/* ─── Global Reset & Base Styles ──────────────────────────────────── */

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  background: #f5f7fa;
  color: #333;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ─── Header ──────────────────────────────────────────────────────── */

.app-header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header__inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.app-logo {
  font-weight: 700;
  font-size: 1.1rem;
  color: #4a90d9;
  white-space: nowrap;
}

.app-nav {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #666;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background: #f0f4ff;
  color: #4a90d9;
}

.nav-link.active {
  background: #e8f0fe;
  color: #4a90d9;
  font-weight: 600;
}

.app-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.user-badge {
  font-size: 0.85rem;
  color: #666;
  background: #f0f0f0;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

/* ─── Shared Button Styles ────────────────────────────────────────── */

.btn {
  font-family: inherit;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: background 0.2s, opacity 0.2s;
}

.btn--small {
  padding: 0.35rem 0.85rem;
  border-radius: 5px;
  font-size: 0.82rem;
}

.btn--primary {
  background: #4a90d9;
  color: #fff;
}

.btn--primary:hover {
  background: #357abd;
}

.btn--outline {
  background: transparent;
  border: 1px solid #ccc;
  color: #555;
}

.btn--outline:hover {
  background: #f0f0f0;
  border-color: #999;
}

/* ─── Main ────────────────────────────────────────────────────────── */

.app-main {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
