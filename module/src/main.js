import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import actions from './store/action';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
let install = null;

function render(props = {}) {
  const { container, handleSubmit } = props;
  actions.handleSubmit = handleSubmit;
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/sub" : "/",
    mode: "history",
    routes
  });

  install = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount( "#root");
}

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render();
}

export async function bootstrap() {
  console.log("micro app bootstrap");
}

export async function mount(props) {
  console.log('props',props);
  render(props);
}
export async function unmount() {
  install.$destroy();
  install.$el.innerHTML = ""; // 子项目内存泄露问题
  install = null;
  console.log("micro app unmount");
}
