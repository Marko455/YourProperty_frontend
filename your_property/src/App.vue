<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = () => !!localStorage.getItem("token");

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
  <nav>
    <router-link to="/properties">Properties</router-link> |
    <router-link v-if="isLoggedIn()" to="/create-property">Create Property</router-link> |
    <router-link v-if="isLoggedIn()" to="/my-inquiries">My Inquiries</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/login">Login</router-link>
    <button @click="logout">Logout</button>
  </nav>

  <router-view />
</template>
