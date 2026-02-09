<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>

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

      <button @click="login">Login</button>

      <p class="register-text">
        Don’t have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import api from "../api/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  const res = await api.post("http://localhost:8002/users/login", {
    email: email.value,
    password: password.value,
  });

  localStorage.setItem("token", res.data.access_token);
  router.push("/properties");
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f8;
}

.login-card {
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

input {
  width: 100%;
  padding: 0.7rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 0.95rem;
}

input:focus {
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

.register-text {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.register-text a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>
