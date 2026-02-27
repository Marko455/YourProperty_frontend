<template>
  <div class="property-page">
    <div v-if="property" class="property-card">

      <div 
        v-if="property.images && property.images.length"
        class="image-gallery"
      >
        <img
          v-for="img in property.images"
          :key="img"
          :src="`http://localhost:8001${img}`"
          class="property-image"
        />
      </div>

      <div class="header">
        <h2>{{ property.title }}</h2>
        <span class="type">{{ property.type }}</span>
      </div>

      <div class="price">
        ${{ property.price }}
      </div>

      <p class="description">
        {{ property.description }}
      </p>

      <div class="features">
        <div class="feature">
          <span>Rooms</span>
          <p>{{ property.rooms }}</p>
        </div>
        <div class="feature">
          <span>Bedrooms</span>
          <p>{{ property.bedrooms }}</p>
        </div>
        <div class="feature">
          <span>Bathrooms</span>
          <p>{{ property.bathrooms }}</p>
        </div>
        <div class="feature">
          <span>Parking</span>
          <p>{{ property.parking_spots }}</p>
        </div>
      </div>

      <div class="inquiry">
        <h3>Contact Seller</h3>
        <textarea
          v-model="message"
          placeholder="Write a message to the seller..."
          rows="3"
        ></textarea>
        <button @click="sendInquiry">Send Inquiry</button>
      </div>

    </div>
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

<style scoped>
.property-page {
  min-height: 100vh;
  background-color: #eef1f5;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
}

.property-card {
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}


.image-gallery {
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.property-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  margin: 0;
  font-size: 1.6rem;
  color: #111;
}

.type {
  padding: 0.25rem 0.6rem;
  background-color: #eef2ff;
  color: #4f46e5;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}


.price {
  margin: 1rem 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #16a34a;
}


.description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
}


.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.feature span {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.feature p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
}


.inquiry {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.inquiry h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  font-size: 0.9rem;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #4f46e5;
}

button {
  margin-top: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
}

button:hover {
  background-color: #4338ca;
}
</style>