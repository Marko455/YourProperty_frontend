<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
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
