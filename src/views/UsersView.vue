<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'

const usersStore = useUsersStore()

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<template>
  <div class="users-page">
    <h1 class="page-title">Users</h1>
    <p class="page-subtitle">Meet the authors</p>

    <!-- Loading State -->
    <Loading v-if="usersStore.loading" message="Loading users…" />

    <!-- Error State -->
    <Error
      v-else-if="usersStore.error"
      :message="usersStore.error"
      @retry="usersStore.fetchUsers"
    />

    <!-- Users List -->
    <div v-else class="users-grid">
      <router-link
        v-for="user in usersStore.users"
        :key="user.id"
        :to="`/users/${user.id}`"
        class="user-card"
      >
        <div class="user-card__avatar">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="user-card__info">
          <h3 class="user-card__name">{{ user.name }}</h3>
          <p class="user-card__username">@{{ user.username }}</p>
          <p class="user-card__email">{{ user.email }}</p>
        </div>
        <span class="user-card__arrow">→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.users-page {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  color: #222;
  text-align: center;
  margin: 0;
}

.page-subtitle {
  text-align: center;
  color: #777;
  margin: 0.5rem 0 2rem;
}

.users-grid {
  display: grid;
  gap: 0.75rem;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.15s;
}

.user-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.user-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #4a90d9;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  flex-shrink: 0;
}

.user-card__info {
  flex: 1;
  min-width: 0;
}

.user-card__name {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.user-card__username {
  margin: 0.15rem 0;
  font-size: 0.85rem;
  color: #888;
}

.user-card__email {
  margin: 0;
  font-size: 0.85rem;
  color: #aaa;
}

.user-card__arrow {
  font-size: 1.2rem;
  color: #ccc;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.user-card:hover .user-card__arrow {
  transform: translateX(3px);
  color: #4a90d9;
}
</style>
