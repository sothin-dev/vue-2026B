<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')

function addTodo() {
  const title = newTodo.value.trim()
  if (title) {
    todoStore.addTodo(title)
    newTodo.value = ''
  }
}
</script>

<template>
  <div class="exercise-card">
    <h2>📋 Exercise 3: Todo List</h2>

    <div class="todo-stats">
      <span class="stat">Total: <strong>{{ todoStore.totalTodos }}</strong></span>
      <span class="stat completed">Completed: <strong>{{ todoStore.completedTodos.length }}</strong></span>
      <span class="stat pending">Pending: <strong>{{ todoStore.pendingTodos.length }}</strong></span>
    </div>

    <form class="todo-form" @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a new todo..." />
      <button class="btn btn-primary" type="submit" :disabled="!newTodo.trim()">Add</button>
    </form>

    <ul class="todo-list" v-if="todoStore.todos.length > 0">
      <li v-for="todo in todoStore.todos" :key="todo.id" :class="{ completed: todo.completed }">
        <label class="todo-label">
          <input type="checkbox" :checked="todo.completed" @change="todoStore.toggleTodo(todo.id)" />
          <span>{{ todo.title }}</span>
        </label>
        <button class="btn btn-small btn-danger" @click="todoStore.deleteTodo(todo.id)">✕</button>
      </li>
    </ul>
    <p v-else class="empty-state">No todos yet. Add one above!</p>
  </div>
</template>

<style scoped>
.todo-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.stat {
  padding: 0.35rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 0.9rem;
}

.stat.completed strong {
  color: var(--success);
}

.stat.pending strong {
  color: var(--warning);
}

.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-form input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--input-bg);
  color: var(--text);
}

.todo-form input:focus {
  outline: none;
  border-color: var(--accent);
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  transition: background 0.2s;
}

.todo-list li.completed .todo-label span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1;
}

.todo-label input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
}
</style>
