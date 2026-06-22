<template>
  <div>
    <h1>Home Page</h1>
    <base-input
      label="username"
      id="username"
      type="text"
      placeholder="username"
      v-model="username"
    />

    <base-input
      label="age"
      id="age"
      type="number"
      placeholder="age"
      v-model="age"
    />

    <base-radio
      id="female"
      name="gender"
      label="Female"
      value="female"
      v-model="gender"
    />
    <base-radio
      id="male"
      name="gender"
      label="Male"
      value="male"
      v-model="gender"
    />

    <base-checkbox
      id="football"
      name="interest"
      value="football"
      label="Football"
      v-model="interests"
    />

    <base-checkbox
      id="volleyball"
      name="interest"
      value="volleyball"
      label="Volleyball"
      v-model="interests"
    />

    <p>{{ interests }}</p>

    <h1>
      {{ username }}
    </h1>
    <h1>
      {{ age }}
    </h1>
    <h1>Gender: {{ gender }}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const age = ref(0);
const gender = ref("");
const interests = ref([]);
</script>

<style lang="scss" scoped></style>
