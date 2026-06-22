<template>
  <div class="flex flex-col gap-2 w-full">
    <label :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <input
      v-model="model"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    />
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";

const model = defineModel();
const props = defineProps({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
    defualt: "text",
  },
  placeholder: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
