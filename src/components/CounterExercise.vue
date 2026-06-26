<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="exercise-card">
    <h2>🔢 Exercise 1: Counter</h2>
    <div class="count-display">
      <p><strong>Count:</strong> {{ counter.count }}</p>
      <p><strong>Double Count:</strong> {{ counter.doubleCount }}</p>
    </div>
    <div class="button-group">
      <button class="btn btn-primary" @click="counter.increment()">+ Increment</button>
      <button class="btn btn-secondary" @click="counter.decrement()">− Decrement</button>
      <button class="btn btn-danger" @click="counter.reset()">↺ Reset</button>
    </div>
  </div>
</template>

<style scoped>
.count-display {
  margin-bottom: 1rem;
}

.count-display p {
  margin: 0.25rem 0;
  font-size: 1.1rem;
}
</style>
