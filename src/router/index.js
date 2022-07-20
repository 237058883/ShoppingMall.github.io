import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("views/home/Home");
const Category = () => import("views/Category");
const Cart = () => import("views/Cart");
const User = () => import("views/User");
const Detail = () => import("views/detail/Detail");
const routes = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/detail/:type/:id/:title/:price/:collect",
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: history,
});

export default router;
