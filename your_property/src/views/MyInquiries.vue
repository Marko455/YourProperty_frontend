<template>
  <div>
    <h2>My Inquiries</h2>
    <ul>
      <li v-for="i in inquiries" :key="i.inquiry_id">
        {{ i.message }} - {{ i.status }}
      </li>
    </ul>
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
