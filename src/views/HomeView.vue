<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-blue-600">
        🎬 Movie Collection
      </h1>
      <p class="text-gray-500 mt-2">
        Browse all available movies
      </p>
    </div>

    <!-- Movie Grid -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <MovieCard
          v-for="movie in data"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :casts="movie.cast"
          :des="movie.overview"
          :genre="movie.genre"
          :year="movie.year"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard.vue";

const data = ref(movies);
</script>