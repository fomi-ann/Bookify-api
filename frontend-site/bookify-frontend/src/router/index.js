import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/books",
    name: "Books",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BooksView.vue"),
  },
  {
    path: "/books/:seekID",
    name: "book",
    component: () => import("../views/SingleBookView.vue"),
    props: route => {return {seekID: String(route.params.seekID)}}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

//change to fix Lite tracker integration for details view