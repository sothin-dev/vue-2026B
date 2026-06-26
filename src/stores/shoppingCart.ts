import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: string
  price: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const products = ref<Product[]>([
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 19.99 },
    { id: 3, name: 'Keyboard', price: 49.99 },
    { id: 4, name: 'Monitor', price: 299.99 },
    { id: 5, name: 'Headphones', price: 89.99 },
  ])

  const cart = ref<CartItem[]>([])

  const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  function addToCart(product: Product) {
    const existing = cart.value.find((item) => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
    cart.value = cart.value.filter((item) => item.product.id !== productId)
  }

  function clearCart() {
    cart.value = []
  }

  return { products, cart, totalItems, totalPrice, addToCart, removeFromCart, clearCart }
})
