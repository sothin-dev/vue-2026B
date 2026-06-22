<template>
  <label :for="id" class="flex items-center gap-2 cursor-pointer">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="value"
      v-model="model"
    />

    <span>{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  value: String,
  label: String,
});

const model = defineModel();
</script>

<style lang="scss" scoped></style>
