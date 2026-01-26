<template>
  <div>
    <h2>Properties</h2>
    <ul>
      <li v-for="p in properties" :key="p.property_id">
        <router-link :to="`/properties/${p.property_id}`">
          {{ p.title }} - {{ p.price }}$
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const properties = ref([]);

onMounted(async () => {
  const res = await api.get("http://localhost:8001/properties");
  properties.value = res.data;
});
</script>
