import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

let nextId = 1

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  const completedTodos = computed(() => todos.value.filter((t) => t.completed))
  const pendingTodos = computed(() => todos.value.filter((t) => !t.completed))
  const totalTodos = computed(() => todos.value.length)

  function addTodo(title: string) {
    todos.value.push({ id: nextId++, title, completed: false })
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  return { todos, completedTodos, pendingTodos, totalTodos, addTodo, deleteTodo, toggleTodo }
})
