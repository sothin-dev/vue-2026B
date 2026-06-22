<template>
  <div class="flex items-center gap-2">
    <input type="radio" :id="id" :name="name" :value="value" v-model="model" />

    <label :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";

const model = defineModel();
const props = defineProps({
  label: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
