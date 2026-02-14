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
  <header class="app-header">
    <nav class="nav">
      <div class="nav-left">
        <router-link class="logo" to="/properties">
          PropertyApp
        </router-link>

        <router-link to="/properties">Properties</router-link>

        <router-link
          v-if="isLoggedIn()"
          to="/create-property"
        >
          Create Property
        </router-link>

        <router-link
          v-if="isLoggedIn()"
          to="/my-inquiries"
        >
          My Inquiries
        </router-link>
      </div>

      <div class="nav-right">
        <router-link to="/profile">My Profile</router-link>

        <router-link v-if="!isLoggedIn()" to="/register">
          Register
        </router-link>

        <router-link v-if="!isLoggedIn()" to="/login">
          Login
        </router-link>

        <button
          v-if="isLoggedIn()"
          @click="logout"
          class="logout"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>

  <main class="app-content">
    <router-view />
  </main>
</template>

<style scoped>

.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}


a {
  text-decoration: none;
  font-size: 0.9rem;
  color: #374151;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
}

a:hover {
  background-color: #f3f4f6;
}


.router-link-active {
  color: #4f46e5;
  font-weight: 500;
}


.logo {
  font-weight: 600;
  font-size: 1rem;
  color: #111;
}


.logout {
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.logout:hover {
  background-color: #dc2626;
}


.app-content {
  min-height: calc(100vh - 56px);
}
</style>
