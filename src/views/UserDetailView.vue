<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'

const props = defineProps<{
  id: string
}>()

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()

const userId = computed(() => Number(props.id))

onMounted(() => {
  if (userId.value) {
    usersStore.fetchUser(userId.value)
  }
})

function goBack() {
  router.push('/users')
}
</script>

<template>
  <div class="user-detail">
    <button class="back-link" @click="goBack">← Back to Users</button>

    <!-- Loading State -->
    <Loading v-if="usersStore.loading" message="Loading user details…" />

    <!-- Error State -->
    <Error
      v-else-if="usersStore.error"
      :message="usersStore.error"
      @retry="usersStore.fetchUser(userId)"
    />

    <!-- User Details -->
    <div v-else-if="usersStore.currentUser" class="user-content">
      <div class="user-header">
        <div class="user-header__avatar">
          {{ usersStore.currentUser.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h1 class="user-header__name">{{ usersStore.currentUser.name }}</h1>
          <p class="user-header__username">@{{ usersStore.currentUser.username }}</p>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="user-section">
        <h2 class="section-title">Contact</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Email</span>
            <span class="info-value">{{ usersStore.currentUser.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Phone</span>
            <span class="info-value">{{ usersStore.currentUser.phone }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Website</span>
            <span class="info-value">{{ usersStore.currentUser.website }}</span>
          </div>
        </div>
      </div>

      <!-- Address -->
      <div class="user-section">
        <h2 class="section-title">Address</h2>
        <p class="address-text">
          {{ usersStore.currentUser.address.street }}, {{ usersStore.currentUser.address.suite }}
          <br />
          {{ usersStore.currentUser.address.city }}, {{ usersStore.currentUser.address.zipcode }}
        </p>
      </div>

      <!-- Company -->
      <div class="user-section">
        <h2 class="section-title">Company</h2>
        <p class="company-name">{{ usersStore.currentUser.company.name }}</p>
        <p class="company-tagline">"{{ usersStore.currentUser.company.catchPhrase }}"</p>
      </div>

      <!-- User's Posts -->
      <div class="user-section">
        <h2 class="section-title">Posts ({{ usersStore.userPosts.length }})</h2>
        <div class="user-posts">
          <router-link
            v-for="post in usersStore.userPosts"
            :key="post.id"
            :to="`/posts/${post.id}`"
            class="user-post-card"
          >
            <h3 class="user-post-card__title">{{ post.title }}</h3>
            <p class="user-post-card__preview">{{ post.body.slice(0, 100) }}…</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-detail {
  max-width: 750px;
  margin: 0 auto;
}

.back-link {
  background: none;
  border: none;
  color: #4a90d9;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #357abd;
}

.user-content {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.user-header__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #4a90d9;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  flex-shrink: 0;
}

.user-header__name {
  margin: 0;
  font-size: 1.5rem;
  color: #222;
}

.user-header__username {
  margin: 0.2rem 0 0;
  color: #888;
  font-size: 0.95rem;
}

.user-section {
  margin-bottom: 1.75rem;
}

.section-title {
  font-size: 1rem;
  color: #555;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 500px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.2rem;
}

.info-value {
  font-size: 0.95rem;
  color: #444;
}

.address-text {
  color: #444;
  line-height: 1.6;
  margin: 0;
}

.company-name {
  color: #444;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.company-tagline {
  color: #888;
  font-style: italic;
  margin: 0;
}

.user-posts {
  display: grid;
  gap: 0.75rem;
}

.user-post-card {
  display: block;
  background: #f9f9f9;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 0.85rem 1rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.user-post-card:hover {
  background: #f0f4ff;
  border-color: #c0d8f0;
}

.user-post-card__title {
  margin: 0 0 0.25rem;
  font-size: 0.95rem;
  color: #333;
}

.user-post-card__preview {
  margin: 0;
  font-size: 0.85rem;
  color: #888;
  line-height: 1.4;
}
</style>
