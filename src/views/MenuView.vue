<script setup lang="ts">
import { useMenuStore } from '../stores/menuStore'
import { useOrderStore } from '../stores/orderStore'
import { ref } from 'vue'

const menuStore = useMenuStore()
const orderStore = useOrderStore()

const selectedCategory = ref<string | null>(null)

const filteredCategories = () => {
  const cats = Object.keys(menuStore.itemsByCategory)
  if (selectedCategory.value && cats.includes(selectedCategory.value)) {
    return { [selectedCategory.value]: menuStore.itemsByCategory[selectedCategory.value] }
  }
  return menuStore.itemsByCategory
}

function addItemToOrder(itemId: string) {
  orderStore.addToOrder(itemId)
}
</script>

<template>
  <div class="menu-page">
    <header class="menu-header">
      <h1>Our Menu</h1>
      <p class="menu-subtitle">Fresh ingredients, bold flavors — every dish made to order</p>
    </header>

    <div class="category-tabs">
      <button
        :class="['tab-btn', { active: selectedCategory === null }]"
        @click="selectedCategory = null"
      >
        All
      </button>
      <button
        v-for="cat in menuStore.categories"
        :key="cat"
        :class="['tab-btn', { active: selectedCategory === cat }]"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div class="menu-grid">
      <article
        v-for="item in menuStore.availableItems"
        :key="item.id"
        class="menu-card"
      >
        <div class="card-badge">{{ item.category }}</div>
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p class="card-desc">{{ item.description }}</p>
          <div class="card-footer">
            <span class="card-price">${{ item.price.toFixed(2) }}</span>
            <button class="add-btn" @click="addItemToOrder(item.id)">
              Add to Order
            </button>
          </div>
        </div>
      </article>
    </div>

    <div v-if="menuStore.availableItems.length === 0" class="empty-state">
      <p>No menu items available right now.</p>
    </div>
  </div>
</template>

<style scoped>
.menu-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.menu-header {
  text-align: center;
  margin-bottom: 2rem;
}

.menu-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.4rem;
}

.menu-subtitle {
  color: #6b7280;
  font-size: 1.05rem;
  margin: 0;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.5rem 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 2rem;
  background: #fff;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.tab-btn.active {
  background: #f97316;
  color: #fff;
  border-color: #f97316;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.menu-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.menu-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
}

.card-badge {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 1rem;
  align-self: flex-start;
}

.card-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
}

.card-desc {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  flex: 1;
  margin: 0 0 1rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.card-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a2e;
}

.add-btn {
  padding: 0.5rem 1.2rem;
  background: #f97316;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.add-btn:hover {
  background: #ea580c;
  transform: scale(1.05);
}

.add-btn:active {
  transform: scale(0.97);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
  font-size: 1.1rem;
}
</style>
