<script setup lang="ts">
import { useOrderStore, type PlacedOrder } from '../stores/orderStore'
import { useMenuStore } from '../stores/menuStore'
import { ref } from 'vue'

const orderStore = useOrderStore()
const menuStore = useMenuStore()

const filterStatus = ref<string>('all')

const filteredOrders = () => {
  if (filterStatus.value === 'all') return orderStore.pastOrders
  return orderStore.pastOrders.filter((o) => o.status === filterStatus.value)
}

function statusColor(status: PlacedOrder['status']): string {
  switch (status) {
    case 'pending':
      return '#f97316'
    case 'preparing':
      return '#6366f1'
    case 'served':
      return '#10b981'
    case 'completed':
      return '#6b7280'
    case 'cancelled':
      return '#ef4444'
  }
}

function getItemName(id: string) {
  return menuStore.getItemById(id)?.name ?? 'Unknown'
}
</script>

<template>
  <div class="history-page">
    <header class="history-header">
      <h1>Order History</h1>
      <p v-if="orderStore.pastOrders.length > 0" class="history-count">
        {{ orderStore.pastOrders.length }} order{{ orderStore.pastOrders.length !== 1 ? 's' : '' }}
      </p>
    </header>

    <div class="filter-tabs">
      <button
        :class="['filter-btn', { active: filterStatus === 'all' }]"
        @click="filterStatus = 'all'"
      >
        All
      </button>
      <button
        :class="['filter-btn', { active: filterStatus === 'pending' }]"
        @click="filterStatus = 'pending'"
      >
        Pending
      </button>
      <button
        :class="['filter-btn', { active: filterStatus === 'preparing' }]"
        @click="filterStatus = 'preparing'"
      >
        Preparing
      </button>
      <button
        :class="['filter-btn', { active: filterStatus === 'served' }]"
        @click="filterStatus = 'served'"
      >
        Served
      </button>
      <button
        :class="['filter-btn', { active: filterStatus === 'completed' }]"
        @click="filterStatus = 'completed'"
      >
        Completed
      </button>
      <button
        :class="['filter-btn', { active: filterStatus === 'cancelled' }]"
        @click="filterStatus = 'cancelled'"
      >
        Cancelled
      </button>
    </div>

    <div v-if="orderStore.pastOrders.length === 0" class="empty-state">
      <div class="empty-icon">📋</div>
      <h2>No orders yet</h2>
      <p>Place your first order to see it here.</p>
      <router-link to="/" class="btn btn-primary">View Menu</router-link>
    </div>

    <div v-else class="order-list">
      <div
        v-for="order in filteredOrders()"
        :key="order.id"
        class="order-card card"
      >
        <div class="order-card-header">
          <div>
            <h3>Order {{ order.id }}</h3>
            <p class="order-time">{{ new Date(order.timestamp).toLocaleString() }}</p>
          </div>
          <div class="order-status-actions">
            <span :class="['status-badge', `status-${order.status}`]">
              {{ order.status }}
            </span>
            <select
              v-if="order.status !== 'cancelled'"
              :value="order.status"
              class="status-select"
              @change="orderStore.updateOrderStatus(order.id, ($event.target as HTMLSelectElement).value as PlacedOrder['status'])"
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="served">Served</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div class="order-items-list">
          <div
            v-for="item in order.items"
            :key="item.menuItemId"
            class="order-history-item"
          >
            <span class="item-qty">{{ item.quantity }}x</span>
            <span class="item-name">{{ getItemName(item.menuItemId) }}</span>
            <span v-if="item.specialInstructions" class="item-notes">({{ item.specialInstructions }})</span>
          </div>
        </div>

        <div class="order-card-footer">
          <span class="order-total">Total: ${{ order.total.toFixed(2) }}</span>
          <div class="order-card-actions">
            <button
              v-if="order.status !== 'cancelled' && order.status !== 'completed'"
              class="btn btn-sm btn-cancel"
              @click="orderStore.cancelOrder(order.id)"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.history-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.history-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.history-count {
  color: #f97316;
  font-weight: 600;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.4rem 0.9rem;
  border: 2px solid #e5e7eb;
  border-radius: 2rem;
  background: #fff;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.filter-btn.active {
  background: #f97316;
  color: #fff;
  border-color: #f97316;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.order-card-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.15rem;
}

.order-time {
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
}

.order-status-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-badge.status-pending {
  background: #fed7aa;
  color: #9a3412;
}

.status-badge.status-preparing {
  background: #e0e7ff;
  color: #3730a3;
}

.status-badge.status-served {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.status-completed {
  background: #f3f4f6;
  color: #4b5563;
}

.status-badge.status-cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.status-select {
  padding: 0.3rem 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.8rem;
  background: #fff;
  cursor: pointer;
}

.order-items-list {
  border-top: 1px solid #f3f4f6;
  padding-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.order-history-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.2rem 0;
  font-size: 0.9rem;
}

.item-qty {
  font-weight: 700;
  color: #f97316;
  min-width: 2rem;
}

.item-name {
  color: #1a1a2e;
}

.item-notes {
  color: #9ca3af;
  font-style: italic;
  font-size: 0.8rem;
}

.order-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #f3f4f6;
  padding-top: 0.75rem;
}

.order-total {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1a1a2e;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sm {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
}

.btn-primary {
  background: #f97316;
  color: #fff;
}

.btn-primary:hover {
  background: #ea580c;
}

.btn-cancel {
  background: #fee2e2;
  color: #dc2626;
}

.btn-cancel:hover {
  background: #fecaca;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
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

a.btn {
  text-decoration: none;
  display: inline-block;
}
</style>
