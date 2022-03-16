
import Home from "../components/HelloWorld.vue";
import About from "../components/About.vue";
const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
  },
  {
    path: `/about`,
    name: "about",
    component: About
  }
];

export default routes;
