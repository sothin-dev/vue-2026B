import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  description: string
  available: boolean
}

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([
    {
      id: 'm1',
      name: 'Classic Cheeseburger',
      category: 'Burgers',
      price: 12.99,
      description: 'Beef patty with cheddar, lettuce, tomato, and special sauce',
      available: true,
    },
    {
      id: 'm2',
      name: 'Bacon BBQ Burger',
      category: 'Burgers',
      price: 15.99,
      description: 'Beef patty with bacon, BBQ sauce, onion rings, and smoked gouda',
      available: true,
    },
    {
      id: 'm3',
      name: 'Margherita Pizza',
      category: 'Pizza',
      price: 14.99,
      description: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
      available: true,
    },
    {
      id: 'm4',
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      price: 16.99,
      description: 'Classic pepperoni with mozzarella and marinara',
      available: true,
    },
    {
      id: 'm5',
      name: 'Caesar Salad',
      category: 'Salads',
      price: 10.99,
      description: 'Romaine, parmesan, croutons, and house-made Caesar dressing',
      available: true,
    },
    {
      id: 'm6',
      name: 'Greek Salad',
      category: 'Salads',
      price: 11.99,
      description: 'Feta, olives, cucumber, tomato, red onion, and vinaigrette',
      available: true,
    },
    {
      id: 'm7',
      name: 'French Fries',
      category: 'Sides',
      price: 5.99,
      description: 'Crispy golden fries with sea salt',
      available: true,
    },
    {
      id: 'm8',
      name: 'Onion Rings',
      category: 'Sides',
      price: 6.99,
      description: 'Beer-battered onion rings with ranch dip',
      available: true,
    },
    {
      id: 'm9',
      name: 'Chocolate Milkshake',
      category: 'Drinks',
      price: 7.99,
      description: 'Rich chocolate ice cream blended with milk and chocolate syrup',
      available: true,
    },
    {
      id: 'm10',
      name: 'Lemonade',
      category: 'Drinks',
      price: 3.99,
      description: 'Fresh-squeezed lemonade with a hint of mint',
      available: true,
    },
  ])

  // --- Getters ---

  const availableItems = computed(() => menuItems.value.filter((item) => item.available))

  const itemsByCategory = computed(() => {
    const grouped: Record<string, MenuItem[]> = {}
    for (const item of availableItems.value) {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category]!.push(item)
    }
    return grouped
  })

  const getItemById = computed(() => {
    return (id: string): MenuItem | undefined => menuItems.value.find((item) => item.id === id)
  })

  const categories = computed(() => {
    const cats = new Set(menuItems.value.map((item) => item.category))
    return Array.from(cats)
  })

  // --- Actions ---

  function addItem(item: Omit<MenuItem, 'id'>) {
    const id = `m${Date.now()}`
    menuItems.value.push({ ...item, id })
  }

  function removeItem(id: string) {
    const idx = menuItems.value.findIndex((item) => item.id === id)
    if (idx !== -1) {
      menuItems.value.splice(idx, 1)
    }
  }

  function toggleAvailability(id: string) {
    const item = menuItems.value.find((item) => item.id === id)
    if (item) {
      item.available = !item.available
    }
  }

  function updateItem(id: string, updates: Partial<Omit<MenuItem, 'id'>>) {
    const item = menuItems.value.find((item) => item.id === id)
    if (item) {
      Object.assign(item, updates)
    }
  }

  return {
    menuItems,
    availableItems,
    itemsByCategory,
    getItemById,
    categories,
    addItem,
    removeItem,
    toggleAvailability,
    updateItem,
  }
})
