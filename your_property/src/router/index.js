import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Properties from "../views/Properties.vue";
import PropertyDetails from "../views/PropertyDetails.vue";
import MyInquiries from "../views/MyInquiries.vue";
import CreateProperty from "../views/CreateProperty.vue";
import MyProfile from "../views/MyProfile.vue";
import EditProperty from "@/views/EditProperty.vue";

const routes = [
  { path: "/", redirect: "/properties" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/properties", component: Properties },
  { path: "/properties/:id", component: PropertyDetails },
  { path: "/my-inquiries", component: MyInquiries },
  { path: "/create-property", component: CreateProperty },
  { path: "/profile", component: MyProfile},
  { path: "/properties/:id/edit", component: EditProperty}
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
