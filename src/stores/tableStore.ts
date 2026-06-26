import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type TableStatus = 'available' | 'occupied' | 'reserved'

export interface Table {
  id: string
  number: number
  capacity: number
  status: TableStatus
  serverName?: string
}

export interface Reservation {
  id: string
  tableId: string
  customerName: string
  guestCount: number
  time: Date
  phone?: string
}

export const useTableStore = defineStore('table', () => {
  const tables = ref<Table[]>([])
  const reservations = ref<Reservation[]>([])
  let reservationCounter = 0

  // --- Getters ---

  const availableTables = computed(() =>
    tables.value.filter((t) => t.status === 'available'),
  )

  const occupiedTables = computed(() =>
    tables.value.filter((t) => t.status === 'occupied'),
  )

  const reservedTables = computed(() =>
    tables.value.filter((t) => t.status === 'reserved'),
  )

  const getTableById = computed(() => {
    return (id: string): Table | undefined => tables.value.find((t) => t.id === id)
  })

  const upcomingReservations = computed(() => {
    const now = new Date()
    return reservations.value
      .filter((r) => r.time > now)
      .sort((a, b) => a.time.getTime() - b.time.getTime())
  })

  // --- Actions ---

  function initializeTables(tableLayout: { capacity: number; count: number }[]) {
    let num = 1
    const newTables: Table[] = []
    for (const group of tableLayout) {
      for (let i = 0; i < group.count; i++) {
        newTables.push({
          id: `table-${num}`,
          number: num,
          capacity: group.capacity,
          status: 'available',
        })
        num++
      }
    }
    tables.value = newTables
  }

  function assignTable(tableId: string, serverName?: string) {
    const table = tables.value.find((t) => t.id === tableId)
    if (table && table.status === 'available') {
      table.status = 'occupied'
      table.serverName = serverName
    }
  }

  function freeTable(tableId: string) {
    const table = tables.value.find((t) => t.id === tableId)
    if (table) {
      table.status = 'available'
      table.serverName = undefined
    }
  }

  function toggleTableStatus(tableId: string, status: TableStatus) {
    const table = tables.value.find((t) => t.id === tableId)
    if (table) {
      table.status = status
      if (status === 'available') {
        table.serverName = undefined
      }
    }
  }

  function addReservation(
    tableId: string,
    customerName: string,
    guestCount: number,
    time: Date,
    phone?: string,
  ) {
    const table = tables.value.find((t) => t.id === tableId)
    if (!table) return null
    if (table.capacity < guestCount) return null

    reservationCounter++
    const reservation: Reservation = {
      id: `RES-${String(reservationCounter).padStart(3, '0')}`,
      tableId,
      customerName,
      guestCount,
      time,
      phone,
    }
    reservations.value.push(reservation)
    table.status = 'reserved'
    return reservation
  }

  function cancelReservation(reservationId: string) {
    const idx = reservations.value.findIndex((r) => r.id === reservationId)
    if (idx !== -1) {
      const reservation = reservations.value[idx]!
      reservations.value.splice(idx, 1)
      // Reset table status only if it was set by this reservation
      const table = tables.value.find((t) => t.id === reservation.tableId)
      if (table && table.status === 'reserved') {
        table.status = 'available'
      }
    }
  }

  return {
    tables,
    reservations,
    availableTables,
    occupiedTables,
    reservedTables,
    getTableById,
    upcomingReservations,
    initializeTables,
    assignTable,
    freeTable,
    toggleTableStatus,
    addReservation,
    cancelReservation,
  }
})
