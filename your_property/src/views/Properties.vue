<template>
  <div class="properties-page">
    <div class="properties-container">
      <h2>Properties</h2>

      <div class="search-container">
        <input
          v-model="search"
          type="text"
          placeholder="Search by title or location..."
          class="search-input"
        />
      </div>

      <div class="grid">
        <router-link
          v-for="p in filteredProperties"
          :key="p.property_id"
          :to="`/properties/${p.property_id}`"
          class="card"
        >
          <div class="card-body">
            <h3>{{ p.title }}</h3>

            <p class="price">
              ${{ p.price }}
            </p>

            <p class="location">
              {{ p.location }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../api/api";

const properties = ref([]);
const search = ref("");

onMounted(async () => {
  const res = await api.get("http://localhost:8001/properties");
  properties.value = res.data;
});

const filteredProperties = computed(() => {
  if (!search.value) return properties.value;

  const term = search.value.toLowerCase();

  return properties.value.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.location.toLowerCase().includes(term)
  );
});
</script>

<style scoped>
.properties-page {
  background-color: #eef1f5;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.properties-container {
  max-width: 1100px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1rem;
  color: #111;
}


.search-container {
  margin-bottom: 1.8rem;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 420px;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
  border-color: #4f46e5;
}


.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}


.card {
  display: block;
  text-decoration: none;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.4rem;
  border: 1px solid #e5e7eb;
  transition: all 0.18s ease;
  color: inherit;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  border-color: #d4d7dd;
}

.card-body h3 {
  margin: 0 0 0.6rem;
  font-size: 1.05rem;
  color: #111;
}


.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #16a34a;
  margin-bottom: 0.3rem;
}


.location {
  font-size: 0.9rem;
  color: #6b7280;
}
</style>