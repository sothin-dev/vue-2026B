<script setup lang="ts">
import { useShoppingCartStore } from '@/stores/shoppingCart'

const cartStore = useShoppingCartStore()
</script>

<template>
  <div class="exercise-card">
    <h2>🛒 Exercise 4: Shopping Cart</h2>

    <div class="cart-summary">
      <span class="stat">Items: <strong>{{ cartStore.totalItems }}</strong></span>
      <span class="stat price">Total: <strong>${{ cartStore.totalPrice.toFixed(2) }}</strong></span>
      <button
        v-if="cartStore.cart.length > 0"
        class="btn btn-danger btn-small"
        @click="cartStore.clearCart()"
      >
        Clear Cart
      </button>
    </div>

    <div class="cart-layout">
      <div class="products-section">
        <h3>Products</h3>
        <div class="product-grid">
          <div v-for="product in cartStore.products" :key="product.id" class="product-card">
            <h4>{{ product.name }}</h4>
            <p class="price">${{ product.price.toFixed(2) }}</p>
            <button class="btn btn-primary btn-small" @click="cartStore.addToCart(product)">
              + Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div class="cart-section">
        <h3>Cart</h3>
        <div v-if="cartStore.cart.length > 0" class="cart-items">
          <div v-for="item in cartStore.cart" :key="item.product.id" class="cart-item">
            <div class="cart-item-info">
              <span class="cart-item-name">{{ item.product.name }}</span>
              <span class="cart-item-qty">x{{ item.quantity }}</span>
              <span class="cart-item-price">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
            <button
              class="btn btn-small btn-danger"
              @click="cartStore.removeFromCart(item.product.id)"
            >
              ✕
            </button>
          </div>
        </div>
        <p v-else class="empty-state">Cart is empty</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-summary {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.stat {
  padding: 0.35rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 0.9rem;
}

.stat.price strong {
  color: var(--accent);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

.cart-layout h3 {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.product-card {
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  text-align: center;
}

.product-card h4 {
  margin: 0 0 0.25rem;
  font-size: 0.95rem;
}

.product-card .price {
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 0.5rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.cart-item-info {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.cart-item-name {
  font-weight: 600;
}

.cart-item-qty {
  color: var(--text-secondary);
}

.cart-item-price {
  font-weight: 700;
  color: var(--accent);
}

.empty-state {
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
}
</style>
