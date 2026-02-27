<template>
  <div class="create-page">
    <div class="create-card">
      <h2>Create Property</h2>

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

      <div class="form-group image-section">
        <label class="label">Property Images</label>
        <input type="file" multiple accept="image/*" @change="handleFileChange"/>
        <small class="hint">Pictures of your property.</small>
      </div>

      <button @click="createProperty">Create Property</button>
    </div>
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
const selectedFiles = ref([]);

const router = useRouter();

const createProperty = async () => {
  try {
    const response = await api.post("http://localhost:8001/properties", {
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

    const propertyId = response.data.property_id;

    if (selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        const formData = new FormData();
        formData.append("file", file);

        await api.post(
          `http://localhost:8001/properties/${propertyId}/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      }
    }

    alert("Property created!");
    router.push("/properties");

  } catch (err) {
    console.error(err);
    alert("Error creating property");
  }
};

const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};
</script>

<style scoped>
.create-page {
  min-height: 100vh;
  background-color: #eef1f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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

h2 {
  margin-bottom: 1.5rem;
  color: #111;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.7rem 0.75rem;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 0.95rem;
}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #4f46e5;
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

.image-section {
  margin-top: 1.5rem;
}

.label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.hint {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #777;
}

button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.85rem;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #4338ca;
}
</style>