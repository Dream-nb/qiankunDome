<template>
  <section>
    <a-card title="Vue 微应用列表页">
      <a-table rowKey="key" :dataSource="data" >
        <a-table-column title="名称" dataIndex="name" />
        <a-table-column title="价格" dataIndex="price" :customRender="(text) => `￥ ${text}`" />
      </a-table>
    </a-card>
  </section>
</template>

<script>
export default {
  name: "List",

  data() {
    return {
      data: [],
      pageInfo: {
        onChange: page => this.fetchVegetable(page, 10)
      },
    }
  },
  
  methods: {
    fetchVegetable(num) {
      const arr = [];
      for(let i = 0; i < num; i++){
        arr.push({key: i,name: `Edward King ${i}`,price: `${i}`})
      }
      this.data = arr;
    }
  },

  created() {
    this.fetchVegetable(20);
  }
}
</script>

<style lang="less" scoped>
.old-title {
  font-size: 26px;
  color: #fb4487;
}
</style>
