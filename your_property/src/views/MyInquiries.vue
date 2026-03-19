<template>
  <div class="inquiries-page">
    <div class="inquiries-container">
      <h2>My Inquiries</h2>

      <div v-if="inquiries.length" class="inquiries-list">
        <div
          v-for="i in inquiries"
          :key="i.inquiry_id"
          class="inquiry-card"
        >
          <p class="message">
            {{ i.message }}
          </p>

          <span class="status" :class="i.status">
            {{ i.status }}
          </span>
        </div>
      </div>

      <p v-else class="empty">
        You haven't sent any inquiries yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const inquiries = ref([]);

onMounted(async () => {
  const res = await api.get("http://localhost:8003/inquiries/me");
  inquiries.value = res.data;
});
</script>

<style scoped>
.inquiries-page {
  background-color: #eef1f5;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.inquiries-container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  color: #111;
}


.inquiries-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.inquiry-card {
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.18s ease;
}

.inquiry-card:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}


.message {
  margin: 0;
  color: #374151;
  font-size: 0.95rem;
}


.status {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  color: green
}


.status.pending {
  background: #32b810;
  color: #92400e;
}

.status.accepted {
  background: #d1fae5;
  color: #065f46;
}

.status.rejected {
  background: #fee2e2;
  color: #991b1b;
}


.empty {
  text-align: center;
  color: #6b7280;
  margin-top: 2rem;
}
</style>