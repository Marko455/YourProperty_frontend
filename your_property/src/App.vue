<script setup>
</script>

<template>
  <nav>
    <router-link to="/properties">Properties</router-link> |
    <router-link to="/create-property">Create Property</router-link> |
    <router-link to="/my-inquiries">My Inquiries</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/login">Login</router-link>
  </nav>

  <router-view />
</template>
