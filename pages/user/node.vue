<template>
  <div class="addnode">
    <p>>添加节点</p>
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
        radio2: 1
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
.addnode{
  text-align: center;
  line-height: 50px;
  width: 500px
}
</style>
