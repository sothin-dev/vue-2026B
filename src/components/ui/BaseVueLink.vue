<template>
  <div>
    <router-link
      :class="[
        'px-4 py-2 rounded-md  text-blue-600 font-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-110 ease-in-out',
        props.isActive ? 'bg-blue-600 text-white' : '',
        props.optionalStyle,
      ]"
      :to="{ name: props.pathName }"
    >
      {{ props.label }}
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  pathName: {
    required: true,
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  optionalStyle: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
