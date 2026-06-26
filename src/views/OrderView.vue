<script setup lang="ts">
import { useOrderStore, type PlacedOrder } from '../stores/orderStore'
import { useMenuStore } from '../stores/menuStore'
import { ref, computed } from 'vue'

const orderStore = useOrderStore()
const menuStore = useMenuStore()

const selectedTable = ref<string | null>(null)
const showTables = ref(false)

const orderPlaced = ref<PlacedOrder | null>(null)

function increaseQty(itemId: string) {
  const item = orderStore.currentOrder.find((i) => i.menuItemId === itemId)
  if (item) orderStore.updateQuantity(itemId, item.quantity + 1)
}

function decreaseQty(itemId: string) {
  const item = orderStore.currentOrder.find((i) => i.menuItemId === itemId)
  if (item) orderStore.updateQuantity(itemId, item.quantity - 1)
}

function placeOrder() {
  const order = orderStore.placeOrder(null)
  if (order) {
    orderPlaced.value = order
  }
}

function getItemName(id: string) {
  return menuStore.getItemById(id)?.name ?? 'Unknown Item'
}

function getItemPrice(id: string) {
  return menuStore.getItemById(id)?.price ?? 0
}
</script>

<template>
  <div class="order-page">
    <header class="order-header">
      <h1>Your Order</h1>
      <p v-if="orderStore.itemCount > 0" class="item-count">
        {{ orderStore.itemCount }} item{{ orderStore.itemCount !== 1 ? 's' : '' }}
      </p>
    </header>

    <!-- Placed order confirmation -->
    <div v-if="orderPlaced" class="order-confirmation card">
      <div class="confetti-icon">🎉</div>
      <h2>Order Placed!</h2>
      <p class="order-id">Order #{{ orderPlaced.id }}</p>
      <p class="order-total">Total: ${{ orderPlaced.total.toFixed(2) }}</p>
      <button class="btn btn-secondary" @click="orderPlaced = null; showTables = false">
        Place Another Order
      </button>
    </div>

    <!-- Current order items -->
    <div v-else-if="orderStore.currentOrder.length > 0" class="order-items">
      <div
        v-for="item in orderStore.orderSummary"
        :key="item.menuItemId"
        class="order-item card"
      >
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p class="item-price">${{ item.unitPrice.toFixed(2) }} each</p>
        </div>
        <div class="item-controls">
          <button class="qty-btn" @click="decreaseQty(item.menuItemId)">−</button>
          <span class="qty-value">{{ item.quantity }}</span>
          <button class="qty-btn" @click="increaseQty(item.menuItemId)">+</button>
        </div>
        <div class="item-subtotal">
          <span>${{ item.subtotal.toFixed(2) }}</span>
        </div>
        <button
          class="remove-btn"
          @click="orderStore.removeFromOrder(item.menuItemId)"
          title="Remove item"
        >
          ✕
        </button>
      </div>

      <div class="order-summary card">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ orderStore.orderTotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%)</span>
          <span>${{ (orderStore.orderTotal * 0.08).toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ (orderStore.orderTotal * 1.08).toFixed(2) }}</span>
        </div>
        <div class="order-actions">
          <button class="btn btn-secondary" @click="orderStore.clearOrder()">
            Clear All
          </button>
          <button class="btn btn-primary" @click="placeOrder">
            Place Order
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state card">
      <div class="empty-icon">🍽️</div>
      <h2>Your order is empty</h2>
      <p>Browse the menu and add items to get started.</p>
      <router-link to="/" class="btn btn-primary">View Menu</router-link>
    </div>
  </div>
</template>

<style scoped>
.order-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.order-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.order-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.item-count {
  color: #f97316;
  font-weight: 600;
  font-size: 0.95rem;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-info h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-size: 0.85rem;
  color: #9ca3af;
  margin: 0;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.qty-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.qty-value {
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 1.5rem;
  text-align: center;
  color: #1a1a2e;
}

.item-subtotal {
  font-weight: 700;
  color: #1a1a2e;
  min-width: 4rem;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #d1d5db;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.15s;
}

.remove-btn:hover {
  color: #ef4444;
}

.order-summary {
  margin-top: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  color: #4b5563;
  font-size: 0.95rem;
}

.summary-row.total {
  border-top: 2px solid #e5e7eb;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a2e;
}

.order-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

.btn-primary {
  background: #f97316;
  color: #fff;
}

.btn-primary:hover {
  background: #ea580c;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-state h2 {
  font-size: 1.4rem;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
}

.empty-state p {
  color: #9ca3af;
  margin: 0 0 1.5rem;
}

.order-confirmation {
  text-align: center;
  padding: 3rem 2rem;
}

.confetti-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.order-confirmation h2 {
  font-size: 1.5rem;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
}

.order-id {
  font-weight: 700;
  color: #f97316;
  font-size: 1.1rem;
  margin: 0 0 0.25rem;
}

.order-total {
  font-size: 1.2rem;
  color: #1a1a2e;
  margin: 0 0 1.5rem;
}
</style>
