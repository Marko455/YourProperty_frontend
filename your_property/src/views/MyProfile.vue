<template>
  <div v-if="profile">
    <h2>My Profile</h2>

    <p><strong>Name:</strong> {{ profile.name }}</p>
    <p><strong>Email:</strong> {{ profile.email }}</p>
    <p><strong>Role:</strong> {{ profile.role }}</p>
    <p><strong>Phone:</strong> {{ profile.phone_number }}</p>
    <p><strong>Joined:</strong> {{ profile.created_at }}</p>
  </div>

  <div v-else>
    <p>Loading profile...</p>
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
