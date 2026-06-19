<template>
  <div
    class="w-72 bg-gray-900 text-white rounded-xl shadow-xl overflow-x-hidden hover:scale-105 transition duration-300"
  >
    <!-- Banner -->
    <div
      class="h-34 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center"
    >
      <h2 class="text-3xl font-bold">🎬</h2>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex justify-between items-center mb-3">
        <span
          class="bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
        >
          {{ props.year }}
        </span>

        <span
          class="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
        >
          {{ props.genre }}
        </span>
      </div>

      <h1 class="text-2xl font-bold mb-2">{{ props.title }}</h1>

      <p class="text-gray-300 text-sm mb-4">
        {{ props.des }}
      </p>

      <!-- Cast -->
      <div class="mb-4">
        <h3 class="font-semibold text-cyan-400 mb-2">Cast</h3>

        <div class="flex gap-2 flex-wrap">
          <span class="bg-gray-800 px-3 py-1 rounded-full text-xs" v-for="cast in props.casts" :key="cast">
            {{ cast }}
          </span>
        </div>
      </div>

      <button
        class="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-2 rounded-lg font-semibold hover:opacity-90"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        casts: {
            type: Array,
            required: true,
        },
        des : {
            type: String,
        },
        genre: {
            type: String,
        },
        year: {
            type: Number,
        }
    })
</script>
