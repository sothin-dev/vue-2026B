<script setup lang="ts">
import { useOrderStore } from './stores/orderStore'
import { useRoute } from 'vue-router'

const orderStore = useOrderStore()
const route = useRoute()

const navItems = [
  { path: '/', label: 'Menu', icon: '🍔' },
  { path: '/order', label: 'Order', icon: '🛒' },
  { path: '/tables', label: 'Tables', icon: '🪑' },
  { path: '/history', label: 'History', icon: '📋' },
]
</script>

<template>
  <div class="app-shell">
    <nav class="navbar">
      <div class="nav-brand">
        <span class="brand-icon">🍽️</span>
        <span class="brand-name">Savory Bites</span>
      </div>
      <div class="nav-links">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['nav-link', { active: route.path === item.path }]"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.path === '/order' && orderStore.itemCount > 0" class="nav-badge">
            {{ orderStore.itemCount }}
          </span>
        </router-link>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>Savory Bites Restaurant Management System &copy; 2026</p>
    </footer>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f9fafb;
  color: #1a1a2e;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #1a1a2e;
}

.nav-link.active {
  background: #fff7ed;
  color: #f97316;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #f97316;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.main-content {
  flex: 1;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  color: #9ca3af;
  font-size: 0.85rem;
  border-top: 1px solid #e5e7eb;
  background: #fff;
}

.footer p {
  margin: 0;
}
</style>
