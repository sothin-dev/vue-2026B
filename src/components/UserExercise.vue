<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>

<template>
  <div class="exercise-card">
    <h2>👤 Exercise 2: User Profile</h2>
    <div class="user-info">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <form class="user-form" @submit.prevent>
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" :value="user.name" @input="user.updateName(($event.target as HTMLInputElement).value)" placeholder="Enter name" />
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input id="age" type="number" :value="user.age" @input="user.updateAge(Number(($event.target as HTMLInputElement).value))" placeholder="Enter age" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" :value="user.email" @input="user.updateEmail(($event.target as HTMLInputElement).value)" placeholder="Enter email" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.user-info {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.user-info p {
  margin: 0.25rem 0;
  font-size: 1.05rem;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.form-group input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--input-bg);
  color: var(--text);
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-dim);
}
</style>
