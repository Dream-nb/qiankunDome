<template>
  <div id="app">
     <a-menu :selectedKeys="[selectKey]" mode="horizontal" theme="dark">
      <a-menu-item 
        v-for="(item) in menus" 
        :key="item.key"
        @click="changeMenu(item)"
        >
        <router-link :to="item.route">{{item.title}}</router-link>
      </a-menu-item>
     </a-menu>
    <router-view :key="(new Date()).getTime()" />
  </div>
</template>

<script>
import actions from './store/action';
export default {
  name: 'App',

  data() {
    return {
      menus: [
        {
          key: "vue",
          route: "/",
          title: "主页"
        },
        {
          key: "vue-list",
          route: "/list",
          title: "列表页"
        }
      ],
      selectKey: 'vue'
    }
  },
  mounted(){
    const { path } = this.$route;
    const data = this.menus.filter(item=>item.route === path);
    this.selectKey = data && data[0].key || 'vue';
  },
  methods: {
    changeMenu(item) {
      console.log('菜单切换', item);
      const { key } = item;
      this.selectKey = key;
      actions.setGlobalState({key});
    }
  },
}
</script>

<style>
</style>
