import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";
import Form from "../views/Form.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "list",
    component: List
  },
  {
    path: "/form",
    name: "form",
    component: Form
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    !localStorage.getItem("authUser")
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
