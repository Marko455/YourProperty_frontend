<template>
  <div class="create-page">
    <div class="create-card">
      <h2>Edit Property</h2>

      <div v-if="property">

        <div class="form-group">
          <input v-model="title" placeholder="Title" />
        </div>

        <div class="form-group">
          <textarea
            v-model="description"
            placeholder="Description"
            rows="4"
          ></textarea>
        </div>

        <div class="grid">
          <input v-model.number="rooms" type="number" placeholder="Rooms" />
          <input v-model.number="bedrooms" type="number" placeholder="Bedrooms" />
          <input v-model.number="bathrooms" type="number" placeholder="Bathrooms" />
          <input v-model.number="parking_spots" type="number" placeholder="Parking spots" />
        </div>

        <div class="grid">
          <input v-model.number="price" type="number" placeholder="Price" />
          <input v-model="location" placeholder="Location" />
        </div>

        <select v-model="type">
          <option disabled value="">Select type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>

        <div v-if="property.images && property.images.length" class="image-gallery">
          <img
            v-for="img in property.images"
            :key="img"
            :src="`http://localhost:8001${img}`"
            class="property-image"
          />
        </div>

        <div class="form-group image-section">
          <label class="label">Add More Images</label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            @change="handleFileChange"
          />
        </div>

        <button @click="updateProperty">Update Property</button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api/api";

const route = useRoute();
const router = useRouter();

const property = ref(null);
const selectedFiles = ref([]);

const title = ref("");
const description = ref("");
const rooms = ref(null);
const bathrooms = ref(null);
const bedrooms = ref(null);
const parking_spots = ref(null);
const price = ref(null);
const location = ref("");
const type = ref("");

onMounted(async () => {
  const res = await api.get(
    `http://localhost:8001/properties/${route.params.id}`
  );

  property.value = res.data;

  title.value = res.data.title;
  description.value = res.data.description;
  rooms.value = res.data.rooms;
  bathrooms.value = res.data.bathrooms;
  bedrooms.value = res.data.bedrooms;
  parking_spots.value = res.data.parking_spots;
  price.value = res.data.price;
  location.value = res.data.location;
  type.value = res.data.type;
});

const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};

const updateProperty = async () => {
  try {
    await api.put(
      `http://localhost:8001/properties/${route.params.id}`,
      {
        title: title.value,
        description: description.value,
        rooms: rooms.value,
        bathrooms: bathrooms.value,
        bedrooms: bedrooms.value,
        parking_spots: parking_spots.value,
        price: price.value,
        location: location.value,
        type: type.value
      }
    );

    if (selectedFiles.value.length > 0) {
      const formData = new FormData();

      for (const file of selectedFiles.value) {
        formData.append("files", file);
      }

      await api.post(
        `http://localhost:8001/properties/${route.params.id}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
    }

    alert("Property updated!");
    router.push(`/properties/${route.params.id}`);

  } catch (err) {
    console.error(err);
    alert("Error updating property");
  }
};
</script>

<style scoped>

.create-page {
  min-height: 100vh;
  background-color: #eef1f5;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
}

.create-card {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 1.25rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.image-gallery {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.property-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>