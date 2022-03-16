import Home from "@/components/home/index.vue";
import List from '@/components/list/index.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  }
]

export default routes
