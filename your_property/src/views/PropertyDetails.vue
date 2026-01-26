<template>
  <div v-if="property">
    <h2>{{ property.title }}</h2>
    <p>{{ property.description }}</p>
    <p>{{ property.price }}$</p>

    <textarea v-model="message" placeholder="Message seller"></textarea>
    <button @click="sendInquiry">Send Inquiry</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/api";

const route = useRoute();
const property = ref(null);
const message = ref("");

onMounted(async () => {
  const res = await api.get(
    `http://localhost:8001/properties/${route.params.id}`
  );
  property.value = res.data;
});

const sendInquiry = async () => {
  await api.post("http://localhost:8003/inquiries", {
    property_id: property.value.property_id,
    message: message.value,
  });
  alert("Inquiry sent!");
};
</script>
