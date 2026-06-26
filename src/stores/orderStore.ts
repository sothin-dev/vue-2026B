import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useMenuStore } from './menuStore'

export interface OrderItem {
  menuItemId: string
  quantity: number
  specialInstructions?: string
}

export interface PlacedOrder {
  id: string
  items: OrderItem[]
  tableId: string | null
  total: number
  timestamp: Date
  status: 'pending' | 'preparing' | 'served' | 'completed' | 'cancelled'
}

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref<OrderItem[]>([])
  const pastOrders = ref<PlacedOrder[]>([])
  let orderCounter = 0

  // --- Getters ---

  const orderTotal = computed(() => {
    const menuStore = useMenuStore()
    return currentOrder.value.reduce((total, orderItem) => {
      const menuItem = menuStore.getItemById(orderItem.menuItemId)
      return total + (menuItem ? menuItem.price * orderItem.quantity : 0)
    }, 0)
  })

  const itemCount = computed(() => {
    return currentOrder.value.reduce((count, item) => count + item.quantity, 0)
  })

  const activeOrders = computed(() => {
    return pastOrders.value.filter((o) => o.status !== 'completed' && o.status !== 'cancelled')
  })

  const orderSummary = computed(() => {
    const menuStore = useMenuStore()
    return currentOrder.value.map((orderItem) => {
      const menuItem = menuStore.getItemById(orderItem.menuItemId)
      return {
        ...orderItem,
        name: menuItem?.name ?? 'Unknown Item',
        unitPrice: menuItem?.price ?? 0,
        subtotal: (menuItem?.price ?? 0) * orderItem.quantity,
      }
    })
  })

  // --- Actions ---

  function addToOrder(menuItemId: string, quantity = 1) {
    const existing = currentOrder.value.find((item) => item.menuItemId === menuItemId)
    if (existing) {
      existing.quantity += quantity
    } else {
      currentOrder.value.push({ menuItemId, quantity })
    }
  }

  function removeFromOrder(menuItemId: string) {
    const idx = currentOrder.value.findIndex((item) => item.menuItemId === menuItemId)
    if (idx !== -1) {
      currentOrder.value.splice(idx, 1)
    }
  }

  function updateQuantity(menuItemId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromOrder(menuItemId)
      return
    }
    const existing = currentOrder.value.find((item) => item.menuItemId === menuItemId)
    if (existing) {
      existing.quantity = quantity
    }
  }

  function clearOrder() {
    currentOrder.value = []
  }

  function placeOrder(tableId: string | null = null) {
    if (currentOrder.value.length === 0) return null

    orderCounter++
    const order: PlacedOrder = {
      id: `ORD-${String(orderCounter).padStart(3, '0')}`,
      items: JSON.parse(JSON.stringify(currentOrder.value)),
      tableId,
      total: orderTotal.value,
      timestamp: new Date(),
      status: 'pending',
    }
    pastOrders.value.push(order)
    currentOrder.value = []
    return order
  }

  function cancelOrder(orderId: string) {
    const order = pastOrders.value.find((o) => o.id === orderId)
    if (order) {
      order.status = 'cancelled'
    }
  }

  function updateOrderStatus(orderId: string, status: PlacedOrder['status']) {
    const order = pastOrders.value.find((o) => o.id === orderId)
    if (order) {
      order.status = status
    }
  }

  return {
    currentOrder,
    pastOrders,
    orderTotal,
    itemCount,
    activeOrders,
    orderSummary,
    addToOrder,
    removeFromOrder,
    updateQuantity,
    clearOrder,
    placeOrder,
    cancelOrder,
    updateOrderStatus,
  }
})
