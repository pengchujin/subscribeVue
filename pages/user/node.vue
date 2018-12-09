<template>
<div class="addnode">
<div class="head">
  <el-button type="primary" @click="dialogVisible = true; ifEdit = false
        ;dialogTitle = '添加节点'; ">添加节点</el-button>
</div>
<div class="dia">
  <el-dialog
  :before-close="handleClose"
  :title= dialogTitle
  :visible.sync="dialogVisible"
  width="600px"
  >
  <el-radio-group v-model="radio2">
    <el-radio :label="1">SSR</el-radio>
    <el-radio :label="2">SS</el-radio>
    <el-radio :label="3">v2ray</el-radio>
  </el-radio-group>
  <br><br>
  <!-- V2ray -->
  <el-form v-if="radio2 == 3" ref="form" :model="node" label-width="120px" label-position="left">
  <el-form-item label="节点名称">
    <el-input v-model="v2rayNode.ps"></el-input>
  </el-form-item>
   <el-form-item label="服务器地址">
    <el-input v-model="v2rayNode.add"></el-input>
  </el-form-item>
  <el-form-item label="端口号">
    <el-input v-model="v2rayNode.port" value="number"></el-input>
  </el-form-item> 
  <el-form-item label="UUID">
      <el-input v-model="v2rayNode.id"></el-input>
  </el-form-item>
  <el-form-item label="默认算法" >
      <el-autocomplete
      class="inline-input"
      placeholder="可以不填 默认优先为 chacha20-poly1305" v-model="v2rayNode.method"
      :fetch-suggestions="v2rayMethodsSearch"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="alterId" >
      <el-input placeholder="不知道 则不用填 默认为0" v-model="v2rayNode.aid"></el-input>
  </el-form-item>
   <el-form-item label="TLS">
     <el-autocomplete
      class="inline-input"
      placeholder="不知道 则不用填 默认为关闭"  v-model="v2rayNode.tls"
      :fetch-suggestions="v2rayTLSSearch"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="网络模式">
      <el-autocomplete
      class="inline-input"
      placeholder="不知道 则不用填 默认为tcp"  v-model="v2rayNode.net"
      :fetch-suggestions="v2rayNetSearch"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="Host">
      <el-input placeholder="不知道 则不用填 默认为空" v-model="v2rayNode.host"></el-input>
  </el-form-item>
  <el-form-item label="head type">
      <el-autocomplete
      class="inline-input"
      placeholder="不知道 则不用填 默认为空" v-model="v2rayNode.type"
      :fetch-suggestions="v2rayTypeSearch"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="path HTTP 路径">
      <el-input placeholder="不知道 则不用填 默认为空" v-model="v2rayNode.path"></el-input>
  </el-form-item>
    <el-button v-show=!ifEdit  type="primary" @click="addnode">添加</el-button>
    <el-button v-show=ifEdit  type="primary" @click="modify">修改</el-button>
</el-form>

  <el-form v-if="radio2 != 3" ref="form" :model="node" label-width="120px" label-position="left">
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
    <el-button v-show=!ifEdit  type="primary" @click="addnode">添加</el-button>
    <el-button v-show=ifEdit  type="primary" @click="modify">修改</el-button>
</el-form>
</el-dialog>
</div>
<div class="nodes">
    <Node v-for="node in nodes" v-bind:node="node" v-bind:key="node.id"
    @modifyNode="modifyParentNode" @deleteNode="deleteNode">
       </Node>
</div>
</div>
</template>
<script>
import Node from '~/components/Node.vue'
   export default {
    data() {
      return {
        ifEdit: false,
        dialogTitle: '添加节点',
        nodeID: -1,
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
        v2rayNode: {
          //  服务器
          add: '',
          // 节点名称
          ps: '',
          // 端口号
          port: '',
          // alter ID
          aid: '',
          // tls 域名
          host: '',
          // uuid
          id: '',
          //推荐 算法
          method: '',
          // 网络模式 iOS 混淆 obfs
          net: '',
          // tls域名路径
          path: '',
          // 是否开启tls
          tls: '',
          // head type
          type: ''

        },
        radio2: 1,
        type: '',
        methods: [],
        dialogVisible: false
      }
      
    },
    async created() {
    },
    methods: {
      async modifyParentNode(node){
        this.type = node.type
        if(this.type == 'SSR'){
          this.radio2 = 1
          this.node = node.info
        }
        if(this.type == 'V2RAY'){
           this.radio2 = 3
           this.v2rayNode = node.info
         }
        this.nodeID = node.id
        this.ifEdit = true
        this.dialogTitle = '修改节点'
        
        this. dialogVisible = true
      } ,
      showID() {
      },
      async modify() {
        
        if(this.radio2 == 1 || this.radio2 == 2) {
          let infoNode = this.node
          let id = this.nodeID
          let type = 'SSR'
          infoNode.port = Number(infoNode.port)
          let jwt = this.$store.state.user.jwt
          await this.$store.dispatch('modifyNode', {infoNode, type ,id, jwt} )
          this.dialogVisible = false
        }
        if(this.radio2 == 3) {
          let infoNode = this.v2rayNode
          let id = this.nodeID
          let type = 'V2RAY'
          infoNode.port = String(infoNode.port)
          let jwt = this.$store.state.user.jwt
          await this.$store.dispatch('modifyNode', {infoNode, type,id, jwt} )
          this.dialogVisible = false          
        }
      },
      async deleteNode(id){
        let jwt = this.$store.state.user.jwt
        await this.$store.dispatch('deleteNode', {id, jwt} )
        await this.$store.dispatch('getNodes', this.$store.state.user.jwt)
      },
      async addnode() {
        if(this.radio2 == 1 || this.radio2 == 2) {
          if(this.node.host && this.node.title){
          if(this.radio2 == 2){
            this.node.proto = 'origin'
            this.node.obfs = 'plain'
          }
        let node = this.node
        let jwt = this.$store.state.user.jwt
        let type = 'SSR'
        node.port = Number(node.port)
        await this.$store.dispatch('addNode', {node, type, jwt} )
        await this.$store.dispatch('getNodes', this.$store.state.user.jwt)
        this.node.host = this.node.title =''
        } else {
          this.$message({
          message: '请检查输入',
          type: 'warning'
        });
        }
        } 
        if(this.radio2 == 3){
            if(this.v2rayNode.add && this.v2rayNode.ps) {
              !this.v2rayNode.method ? this.v2rayNode.method = 'chacha20-poly1305' : ''
              !this.v2rayNode.aid ? this.v2rayNode.aid = '0' : ''
              !this.v2rayNode.net ? this.v2rayNode.net = 'tcp' : ''
              let node = this.v2rayNode
              let jwt = this.$store.state.user.jwt
              let type = 'V2RAY'
              await this.$store.dispatch('addNode', {node, type, jwt} )
              await this.$store.dispatch('getNodes', this.$store.state.user.jwt)
              this.v2rayNode.add = this.v2rayNode.ps =''
            } else {
              this.$message({
              message: '请检查输入',
              type: 'warning'
              });
            }
        }
      },
      async handleClose(done) {
        this.node.host = this.node.title =''
        await this.$store.dispatch('getNodes', this.$store.state.user.jwt)
        done();
       
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
          {"value": "plain"},
          {"value": "http_simple"},
          {"value": "http_post"},
          {"value": "tls1.0_session_auth"},
          {"value": "tls1.2_ticket_auth"},
          {"value": "tls1.2_ticket_fastauth"},
        ]
      },
      loadProto(){
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
      loadV2rayMethods(){
        return [
          {"value": "none"},
          {"value": "aes-128-cfb"},
          {"value": "aes-128-gcm"},
          {"value": "chacha20-poly1305"},
        ]   
      },
      loadv2rayTLS(){
        return [
          {"value": "tls"},
        ]   
      },
      loadv2rayNet(){
        return [
          {"value": "tcp"},
          {"value": "kcp"},
          {"value": "ws"},
          {"value": "h2"},
        ]   
      },
      loadv2rayType(){
        return [
          {"value": "none"},
          {"value": "http"},
          {"value": "srtp"},
          {"value": "utp"},
          {"value": "wechat-vedio"},
          {"value": "dtls"},
          {"value": "wireguard"}
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
    v2rayMethodsSearch(queryString, cb) {
      var v2rayMethods = this.v2rayMethods;
      var results = queryString ? v2rayMethods.filter(this.createFilter(queryString)) : v2rayMethods;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
     v2rayTLSSearch(queryString, cb) {
      var v2rayTLS = this.v2rayTLS;
      var results = queryString ? v2rayTLS.filter(this.createFilter(queryString)) : v2rayTLS;
      // 调用 callback 返回建议列表的数据
      cb(results);
    }, 
    v2rayNetSearch(queryString, cb) {
      var v2rayNet = this.v2rayNet;
      var results = queryString ? v2rayNet.filter(this.createFilter(queryString)) : v2rayNet;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    v2rayTypeSearch(queryString, cb) {
      var v2rayType = this.v2rayType;
      var results = queryString ? v2rayType.filter(this.createFilter(queryString)) : v2rayType;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
      handleSelect(item) {

  },
  
    },
    mounted() {
      this.methods = this.loadAll()
      this.obfs = this.loadObfs()
      this.proto = this.loadProto()
      this.v2rayMethods = this.loadV2rayMethods()
      this.v2rayTLS = this.loadv2rayTLS()
      this.v2rayNet = this.loadv2rayNet()
      this.v2rayType = this.loadv2rayType()
    },
    computed:{
      nodes() {
        return this.$store.state.nodes
      }
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
  position:relative;
  text-align: center;
  margin: 0 auto;
}

li{
  padding-bottom: 150px;
  list-style-type: none;
  margin:0px; 
}

</style>
