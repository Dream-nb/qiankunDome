<template>
  <div class="micro-app-inpage-container">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import actions from '../store/action';
export default {
  name: "HelloWorld",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: { name: "", region: "", type: "" },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("values", this.formLabelAlign);
      actions.handleSubmit(this.formLabelAlign);
    },
  },
};
</script>

<style scoped>
.micro-app-inpage-container {
  width: 100%;
}
</style>
