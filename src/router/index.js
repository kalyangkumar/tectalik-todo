import Vue from "vue";
import VueRouter from "vue-router";
import ToDo from "../views/ToDo.vue";
// import About from "../views/About.vue";
import goTo from "vuetify/lib/services/goto";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ToDo",
    component: ToDo,
  },
  {
    path: "/about",
    name: "About",
    // component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = `${process.env.VUE_APP_TITLE}-${to.name}`;
  next();
});

router.afterEach((to, from, next) => {
  goTo(0, { duration: 0 });
});

export default router;
