import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getMe } from "../auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/books',
    name: 'books',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BooksView.vue')
  },
  {
    path: "/books/:seekID",
    name: "book",
    component: () => import("../views/SingleBookView.vue"),
    props: route => {return {seekID: String(route.params.seekID)}}
  },
  {
    path: "/books/:BookID/edit",
    name: "book-edit",
    component: () => import("../views/UpdateBookView.vue"),
    props: true
  },
  {
    path: "/books/:seekID/delete",
    name: "delete-book",
    component: () => import("../views/DeleteBookView.vue"),
    props: true
  },
  {
    path: "/books/create",
    name: "book-create",
    component: () => import("../views/CreateBookView.vue")
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/RegisterView.vue')
  },
    {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }, 
  {
    path: '/reading-book-list',
    name: 'reading',
    component: () => import('../views/ReadingBookList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true;

  const me = await getMe();

  if (!me) return { name: "home" };

  if (me.IsAdmin !== true) {
    alert("You are not admin!");
    return { name: "home" };
  }

  return true;
});

export default router;
