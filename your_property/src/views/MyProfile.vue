<template>
  <div class="profile-page">
    <div v-if="profile" class="profile-panel">
      <div class="profile-header">
        <div class="avatar">
          {{ profile.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2>{{ profile.name }}</h2>
          <p class="email">{{ profile.email }}</p>
        </div>
      </div>

      <div class="profile-details">
        <div class="detail-row">
          <span>Role</span>
          <p>{{ profile.role }}</p>
        </div>

        <div class="detail-row">
          <span>Phone</span>
          <p>{{ profile.phone_number }}</p>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      Loading profile...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const profile = ref(null);

onMounted(async () => {
  try {
    const res = await api.get(
      "http://localhost:8002/users/me/profile"
    );
    profile.value = res.data;
  } catch (err) {
    alert("Failed to load profile");
  }
});
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 3rem 1rem;
  background-color: #eef1f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.profile-panel {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}


.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4f46e5;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #111;
}

.email {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  color: #666;
}


.profile-details {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.detail-row span {
  font-size: 0.85rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-row p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #111;
}


.loading {
  margin-top: 4rem;
  font-size: 0.95rem;
  color: #555;
}
</style>
