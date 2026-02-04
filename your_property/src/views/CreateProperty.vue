<template>
  <div>
    <h2>Create Property</h2>

    <input v-model="title" placeholder="Title" />
    <textarea v-model="description" placeholder="Description"></textarea>
    <input v-model.number="rooms" type="number" placeholder="Number of rooms" />
    <input v-model.number="bathrooms" type="number" placeholder="Number of bathrooms" />
    <input v-model.number="bedrooms" type="number" placeholder="Number of bedrooms" />
    <input v-model.number="parking_spots" type="number" placeholder="Number of parking spots" />
    <input v-model.number="price" type="number" placeholder="Price" />
    <input v-model="location" placeholder="Location" />

    <select v-model="type">
      <option disabled value="">Select type</option>
      <option value="house">House</option>
      <option value="apartment">Apartment</option>
    </select>

    <button @click="createProperty">Create</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api";

const title = ref("");
const description = ref("");
const rooms = ref(null);
const bathrooms = ref(null);
const bedrooms = ref(null);
const parking_spots = ref(null);
const price = ref(null);
const location = ref("");
const type = ref("");

const router = useRouter();

const createProperty = async () => {
  try {
    await api.post("http://localhost:8001/properties", {
      title: title.value,
      description: description.value,
      rooms: rooms.value,
      bathrooms: bathrooms.value,
      bedrooms: bedrooms.value,
      parking_spots: parking_spots.value,
      price: price.value,
      location: location.value,
      type: type.value,
      owner_id: "TEMP_SELLER_ID"
    });

    alert("Property created!");
    router.push("/properties");
  } catch (err) {
    alert("Error creating property");
  }
};
</script>
