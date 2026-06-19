<template>
  <div class="flex items-center justify-between w-full sticky top-0">
    <div class="">
      <router-link :to="{name: 'Home'}"
      class="text-blue-600 pointer font-semibold text-2xl">
        Sothin-Dev
      </router-link>
    </div>
    <nav class="flex items-center -justify-center gap-4">
      <BaseVueLink pathName="Home" label="Home" :isActive="isActive('Home')" />
      <BaseVueLink pathName="About" label="About" :isActive="isActive('About')" />
      <BaseVueLink pathName="Project" label="Project" :isActive="isActive('Project')" />
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import BaseVueLink from "./ui/BaseVueLink.vue";

const route = useRoute();

const isActive = (routeName) => route.name === routeName;
</script>

<style lang="scss" scoped></style>
