<template>
  <section class="home-container">
    Home
    <a-button @click="hadnleClick" type="primary">主要按钮</a-button>
  </section>
</template>

<script>
import action from '../../share/actions';
export default {
  name: 'home',
  methods: {
    hadnleClick(){
      console.log('sss');
      action.setGlobalState({name: '数据'})
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 30px;
}
</style>
