<script setup lang="ts">
import { useTableStore, type TableStatus } from '../stores/tableStore'
import { useOrderStore } from '../stores/orderStore'
import { ref, onMounted } from 'vue'

const tableStore = useTableStore()
const orderStore = useOrderStore()

const showAssignModal = ref(false)
const selectedTableId = ref<string | null>(null)
const serverNameInput = ref('')

const showReserveModal = ref(false)
const reserveTableId = ref<string | null>(null)
const customerName = ref('')
const guestCount = ref(2)
const reserveTime = ref('')
const reservePhone = ref('')

onMounted(() => {
  if (tableStore.tables.length === 0) {
    tableStore.initializeTables([
      { capacity: 2, count: 4 },
      { capacity: 4, count: 4 },
      { capacity: 6, count: 2 },
    ])
  }
})

function statusColor(status: TableStatus): string {
  switch (status) {
    case 'available':
      return '#10b981'
    case 'occupied':
      return '#f97316'
    case 'reserved':
      return '#6366f1'
  }
}

function statusLabel(status: TableStatus): string {
  switch (status) {
    case 'available':
      return 'Available'
    case 'occupied':
      return 'Occupied'
    case 'reserved':
      return 'Reserved'
  }
}

function openAssign(tableId: string) {
  selectedTableId.value = tableId
  serverNameInput.value = ''
  showAssignModal.value = true
}

function confirmAssign() {
  if (selectedTableId.value) {
    tableStore.assignTable(selectedTableId.value, serverNameInput.value || undefined)
    showAssignModal.value = false
  }
}

function openReserve(tableId: string) {
  reserveTableId.value = tableId
  customerName.value = ''
  guestCount.value = tableStore.getTableById(tableId)?.capacity ?? 2
  reserveTime.value = new Date(Date.now() + 3600000).toISOString().slice(0, 16)
  reservePhone.value = ''
  showReserveModal.value = true
}

function confirmReserve() {
  if (reserveTableId.value && customerName.value && reserveTime.value) {
    tableStore.addReservation(
      reserveTableId.value,
      customerName.value,
      guestCount.value,
      new Date(reserveTime.value),
      reservePhone.value || undefined,
    )
    showReserveModal.value = false
  }
}
</script>

<template>
  <div class="table-page">
    <header class="table-header">
      <h1>Tables</h1>
      <div class="legend">
        <span class="legend-item"><span class="dot" style="background: #10b981" /> Available</span>
        <span class="legend-item"><span class="dot" style="background: #f97316" /> Occupied</span>
        <span class="legend-item"><span class="dot" style="background: #6366f1" /> Reserved</span>
      </div>
    </header>

    <div class="table-grid">
      <div
        v-for="table in tableStore.tables"
        :key="table.id"
        :class="['table-card', `status-${table.status}`]"
      >
        <div class="table-number">Table {{ table.number }}</div>
        <div class="table-capacity">Seats {{ table.capacity }}</div>
        <div :class="['status-badge', `status-${table.status}`]">
          {{ statusLabel(table.status) }}
        </div>
        <div v-if="table.serverName" class="server-name">Server: {{ table.serverName }}</div>
        <div class="table-actions">
          <button
            v-if="table.status === 'available'"
            class="btn btn-sm btn-assign"
            @click="openAssign(table.id)"
          >
            Assign
          </button>
          <button
            v-if="table.status === 'available'"
            class="btn btn-sm btn-reserve"
            @click="openReserve(table.id)"
          >
            Reserve
          </button>
          <button
            v-if="table.status === 'occupied'"
            class="btn btn-sm btn-free"
            @click="tableStore.freeTable(table.id)"
          >
            Free
          </button>
          <button
            v-if="table.status === 'reserved'"
            class="btn btn-sm btn-cancel"
            @click="tableStore.toggleTableStatus(table.id, 'available')"
          >
            Release
          </button>
        </div>
      </div>
    </div>

    <!-- Assign Modal -->
    <Teleport to="body">
      <div v-if="showAssignModal" class="modal-overlay" @click.self="showAssignModal = false">
        <div class="modal">
          <h2>Assign Table {{ tableStore.getTableById(selectedTableId ?? '')?.number }}</h2>
          <div class="form-group">
            <label for="serverName">Server Name (optional)</label>
            <input
              id="serverName"
              v-model="serverNameInput"
              type="text"
              placeholder="Enter server name"
            />
          </div>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="showAssignModal = false">Cancel</button>
            <button class="btn btn-primary" @click="confirmAssign">Assign Table</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Reserve Modal -->
    <Teleport to="body">
      <div v-if="showReserveModal" class="modal-overlay" @click.self="showReserveModal = false">
        <div class="modal">
          <h2>Reserve Table {{ tableStore.getTableById(reserveTableId ?? '')?.number }}</h2>
          <div class="form-group">
            <label for="customerName">Customer Name *</label>
            <input id="customerName" v-model="customerName" type="text" placeholder="Full name" />
          </div>
          <div class="form-group">
            <label for="guestCount">Number of Guests</label>
            <input id="guestCount" v-model.number="guestCount" type="number" min="1" max="10" />
          </div>
          <div class="form-group">
            <label for="reserveTime">Reservation Time *</label>
            <input id="reserveTime" v-model="reserveTime" type="datetime-local" />
          </div>
          <div class="form-group">
            <label for="reservePhone">Phone (optional)</label>
            <input id="reservePhone" v-model="reservePhone" type="tel" placeholder="Phone number" />
          </div>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="showReserveModal = false">Cancel</button>
            <button class="btn btn-primary" @click="confirmReserve">Confirm Reservation</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Upcoming Reservations -->
    <div v-if="tableStore.upcomingReservations.length > 0" class="reservations-section">
      <h2>Upcoming Reservations</h2>
      <div class="reservation-list">
        <div
          v-for="res in tableStore.upcomingReservations"
          :key="res.id"
          class="reservation-card card"
        >
          <div class="res-info">
            <strong>{{ res.customerName }}</strong>
            <span class="res-detail">Table {{ tableStore.getTableById(res.tableId)?.number }}</span>
            <span class="res-detail">{{ res.guestCount }} guest{{ res.guestCount !== 1 ? 's' : '' }}</span>
            <span class="res-detail">{{ new Date(res.time).toLocaleString() }}</span>
          </div>
          <button
            class="btn btn-sm btn-cancel"
            @click="tableStore.cancelReservation(res.id)"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.table-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
  text-align: center;
  border: 3px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}

.table-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.table-card.status-available {
  border-color: #10b981;
}

.table-card.status-occupied {
  border-color: #f97316;
}

.table-card.status-reserved {
  border-color: #6366f1;
}

.table-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.table-capacity {
  font-size: 0.85rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.status-badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
}

.status-badge.status-available {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.status-occupied {
  background: #fed7aa;
  color: #9a3412;
}

.status-badge.status-reserved {
  background: #e0e7ff;
  color: #3730a3;
}

.server-name {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.table-actions {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  flex-wrap: wrap;
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

.btn-secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-assign {
  background: #10b981;
  color: #fff;
}

.btn-assign:hover {
  background: #059669;
}

.btn-reserve {
  background: #6366f1;
  color: #fff;
}

.btn-reserve:hover {
  background: #4f46e5;
}

.btn-free {
  background: #f97316;
  color: #fff;
}

.btn-free:hover {
  background: #ea580c;
}

.btn-cancel {
  background: #fee2e2;
  color: #dc2626;
}

.btn-cancel:hover {
  background: #fecaca;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.modal h2 {
  margin: 0 0 1.25rem;
  font-size: 1.3rem;
  color: #1a1a2e;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.3rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #f97316;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.modal-actions .btn {
  flex: 1;
}

/* Reservations */
.reservations-section {
  margin-top: 2rem;
}

.reservations-section h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 1rem;
}

.reservation-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reservation-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
}

.res-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
}

.res-info strong {
  color: #1a1a2e;
}

.res-detail {
  color: #6b7280;
  font-size: 0.9rem;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
</style>
