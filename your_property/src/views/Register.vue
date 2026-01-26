<template>
  <div>
    <h2>Register</h2>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />

    <select v-model="role">
      <option disabled value="">Select role</option>
      <option value="buyer">Buyer</option>
      <option value="seller">Seller</option>
    </select>

    <button @click="register">Register</button>

    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api";

const email = ref("");
const password = ref("");
const role = ref("");

const router = useRouter();

const register = async () => {
  if (!email.value || !password.value || !role.value) {
    alert("Please fill in all fields");
    return;
  }

  try {
    await api.post("http://localhost:8002/users/register", {
      email: email.value,
      password: password.value,
      role: role.value,
    });

    alert("Registration successful! Please login.");
    router.push("/login");
  } catch (err) {
    alert("Registration failed");
  }
};
</script>
