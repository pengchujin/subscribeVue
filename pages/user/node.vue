<template>
<div class="addnode">
<div class="head">
  <el-button type="primary" @click="dialogVisible = true">添加节点</el-button>
</div>
<div class="dia">
  <el-dialog
  title="添加节点"
  :visible.sync="dialogVisible"
  width="600px"
  :before-close="handleClose">
  <el-radio-group v-model="radio2">
    <el-radio :label="1">SSR</el-radio>
    <!-- <el-radio :label="2">SS</el-radio> -->
    <el-radio :label="3" disabled>v2ray</el-radio>
  </el-radio-group>
  <br><br>
  <el-form ref="form" :model="node" label-width="120px" label-position="left">
  <el-form-item label="节点名称">
    <el-input v-model="node.title"></el-input>
  </el-form-item>
   <el-form-item label="服务器地址">
    <el-input v-model="node.host"></el-input>
  </el-form-item>
  <el-form-item 
    label="算法">
    <el-autocomplete
      class="inline-input"
      v-model="node.method"
      :fetch-suggestions="querySearch"
      placeholder=""
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="端口号">
    <el-input v-model="node.port" value="number"></el-input>
  </el-form-item> 
  <el-form-item label="密码">
      <el-input v-model="node.password"></el-input>
  </el-form-item>
  <div v-if="radio2 == 1">
  <el-form-item  label="混淆插件">
    <el-autocomplete
      class="inline-input"
      v-model="node.obfs"
      :fetch-suggestions="obfsSearch"
      placeholder=""
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>

   <el-form-item label="混淆插件参数">
    <el-input v-model="node.obfsParam"></el-input>
  </el-form-item>
   <el-form-item label="协议插件">
    <el-autocomplete
      class="inline-input"
      v-model="node.proto"
      :fetch-suggestions="protoSearch"
      placeholder=""
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
   <el-form-item label="协议插件参数">
    <el-input v-model="node.protoParam"></el-input>
  </el-form-item>
   </div>

    <el-button type="primary" @click="addnode">添加</el-button>
</el-form>
</el-dialog>
</div>
<div class="nodes">
  <Node  :node = node ></Node>
</div>
</div>
</template>
<script>
import Node from '~/components/Node.vue'
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
        methods: [],
        dialogVisible: false
      }
    },
    created() {
      
    },
    methods: {
      addnode() {
        console.log(this.node);
        let node = this.node
        let jwt = this.$store.state.user.jwt
        node.port = Number(node.port)
        console.log("methods", this.$store.state.user.jwt)
        this.$store.dispatch('addNode', {node, jwt} )
      },
      handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      },
       createFilter(queryString) {
        return (method) => {
          return (method.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       loadAll() {
        return [
          { "value": "none"},
          { "value": "aes-256-cfb"},
          { "value": "chacha20"},
          { "value": "table"},
          { "value": "rc4"},
          { "value": "rc4-md5"},
          { "value": "salsa20"},
          { "value": "chacha20-ietf"},
          { "value": "aes-192-cfb"},
          { "value": "aes-128-cfb"},
          { "value": "aes-256-cfb1"},
          { "value": "aes-192-cfb1"},
          { "value": "aes-128-cfb1"},
          { "value": "aes-256-cfb8"},
          { "value": "aes-192-cfb8"},
          { "value": "aes-128-cfb8"},
          { "value": "aes-256-ctr"},
          { "value": "aes-192-ctr"},
          { "value": "aes-128-ctr"},
          { "value": "bf-cfb"},
          { "value": "camellia-128-cfb"},
          { "value": "camellia-192-cfb"},
          { "value": "camellia-256-cfb"},
          { "value": "cast5-cfb"},
          { "value": "des-cfb"},
          { "value": "idea-cfb"},
          { "value": "rc2-cfb"},
          { "value": "seed-cfb"},
          { "value": "aes-256-gcm"},
          { "value": "aes-192-gcm"},
          { "value": "aes-128-gcm"},
          { "value": "chacha20-ietf-poly1305"},
          { "value": "chacha20-poly1305"},
          { "value": "xchacha20-ietf-poly1305"},
          { "value": "sodium-aes-256-gcm"}
        ];
      },
      loadObfs(){
        return [
          {"value": "origin"},
          {"value": "verifty_simple"},
          {"value": "verfify_sha1"},
          {"value": "auth_simple"},
          {"value": "auth_sha1"},
          {"value": "auth_sha1_v2"},
          {"value": "auth_sha1_v4"},
          {"value": "auth_aes128_md5"},
          {"value": "auth_aes128_sha1"},
          {"value": "auth_chain_a"},
          {"value": "auth_chain_b"},
        ]
      },
      loadProto(){
        return [
          {"value": "plain"},
          {"value": "http_simple"},
          {"value": "http_post"},
          {"value": "tls1.0_session_auth"},
          {"value": "tls1.2_ticket_auth"},
          {"value": "tls1.2_ticket_fastauth"},
        ]   
      },
    querySearch(queryString, cb) {
        var methods = this.methods;
        var results = queryString ? methods.filter(this.createFilter(queryString)) : methods;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    obfsSearch(queryString, cb) {
      var obfs = this.obfs;
      var results = queryString ? obfs.filter(this.createFilter(queryString)) : obfs;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    protoSearch(queryString, cb) {
      var proto = this.proto;
      var results = queryString ? proto.filter(this.createFilter(queryString)) : proto;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
      handleSelect(item) {
      // console.log(item);
  },
    },
    mounted() {
      this.methods = this.loadAll();
      this.obfs = this.loadObfs();
      this.proto = this.loadProto();
    },
    components: {
    Node
  }


  }
</script>

<style>
.el-input{
  width: 400px;
}
.head{
    padding-top: 50px;
    margin: auto;
}
.addnode{
  
  text-align: center;
  align-content: center;
}
.dia{
  padding: 30px;
}
.nodes{
  width: 700px;
  height: 200px;
  position:relative;
  text-align: center;
  margin: 0 auto;
}

</style>
