<template>
<div class="addnode">
<div class="head">
  <el-button type="primary" @click="dialogVisible = true">添加节点</el-button>
</div>
<el-dialog
  title="添加节点"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-radio-group v-model="radio2">
    <el-radio :label="1">SSR</el-radio>
    <el-radio :label="2">SS</el-radio>
    <el-radio :label="3" disabled>v2ray</el-radio>
  </el-radio-group>
  <el-form ref="form" :model="node" label-width="120px" label-position="left">
  <el-form-item label="节点名称">
    <el-input v-model="node.name"></el-input>
  </el-form-item>
   <el-form-item label="服务器地址">
    <el-input v-model="node.host"></el-input>
  </el-form-item>
  <el-form-item label="算法">
    <el-input v-model="node.method"></el-input>
  </el-form-item>
  <el-form-item label="端口号">
    <el-input v-model="node.port"></el-input>
  </el-form-item> 
  <el-form-item label="密码">
      <el-input v-model="node.password"></el-input>
  </el-form-item> 
   <el-form-item label="混淆插件">
    <el-input v-model="node.obfs"></el-input>
  </el-form-item>
   <el-form-item label="混淆插件参数">
    <el-input v-model="node.obfsParam"></el-input>
  </el-form-item>
   <el-form-item label="协议插件">
    <el-input v-model="node.proto"></el-input>
  </el-form-item>
   <el-form-item label="协议插件参数">
    <el-input v-model="node.protoParam"></el-input>
  </el-form-item>
  <el-form-item>        
    <el-button type="primary" @click="onSubmit">添加</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</div>
</template>
<script>
   export default {
    data() {
      return {
        node: {
          title: '',
          host: '',
          method: '',
          // flag: '',
          obfs: '',
          obfsParam: '',
          proto: '',
          protoParam: '',
          port: '',
          password: ''
        },
        radio2: 1,
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      }
    }
  }
</script>

<style>
.head{
    position:absolute;
    margin: auto;
    left: 40%;
    width: 20%;
}


.addnode{
  text-align: center
}
</style>
