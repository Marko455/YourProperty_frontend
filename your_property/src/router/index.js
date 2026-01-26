import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Properties from "../views/Properties.vue";
import PropertyDetails from "../views/PropertyDetails.vue";
import MyInquiries from "../views/MyInquiries.vue";
import CreateProperty from "../views/CreateProperty.vue";

const routes = [
  { path: "/", redirect: "/properties" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/properties", component: Properties },
  { path: "/properties/:id", component: PropertyDetails },
  { path: "/my-inquiries", component: MyInquiries },
  { path: "/create-property", component: CreateProperty },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
