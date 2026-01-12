<script setup>
import { ref, onMounted } from "vue";

const properties = ref([]);

onMounted(async () => {
  const response = await fetch("http://localhost:8000/properties");
  properties.value = await response.json();
});
</script>

<template>
  <div>
    <h1>Properties</h1>
    <ul>
      <li v-for="p in properties" :key="p.id">
        {{ p.title }} – {{ p.price }} €
      </li>
    </ul>
  </div>
</template>
