<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Register</h2>

      <input
        v-model="name"
        type="text"
        placeholder="Name"
      />

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

      <input
        v-model="phone_number"
        type="tel"
        placeholder="Phone number"
      />

      <button @click="register">Register</button>

      <p class="login-text">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const phone_number = ref("");

const router = useRouter();

const register = async () => {
  if (!email.value || !password.value || !role.value) {
    alert("Please fill in all fields");
    return;
  }

  try {
    await api.post("http://localhost:8002/users/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
      phone_number: phone_number.value
    });

    alert("Registration successful! Please login.");
    router.push("/login");
  } catch (err) {
    alert("Registration failed");
  }
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f8;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 0.7rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 0.95rem;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4f46e5;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #4338ca;
}

.login-text {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.login-text a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.login-text a:hover {
  text-decoration: underline;
}
</style>
