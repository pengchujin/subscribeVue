<template>
  <div>
    <div class="header">
       <el-radio-group v-model="radio" size="medium">
        <el-radio :label="0">混合订阅(ssr + v2ray)</el-radio>
        <el-radio :label="1">v2ray 订阅</el-radio>
        <el-radio :label="2">ssr 订阅</el-radio>
      </el-radio-group>
    </div>
   <div class="content">
      <div><p>{{links}}</p></div>
      <div class="copy"><el-button v-clipboard:copy="links"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError" type="primary" round>复制链接</el-button>
      <el-button @click="iOS" type="primary" round>
        iOS快捷键</el-button></div>
   </div>
   <br>
   <p>shadowRocket 二维码</p>
   <qrcode class="qrcode" :value="msg" :options="{ size: 350 }"></qrcode>
  </div>
 
</template>


<script>
import VueQrcode from '@xkeshi/vue-qrcode';
  export default {
    data(){
      return {
        radio: 0,
        api: 'https://api.sebs.club/',
        // api: 'http://192.168.50.216:3001/',
        type: ''
      }
    },
    methods: {
      onCopy: function (e) {
      this.$message('复制成功');
    },
    onError: function (e) {
      this.$message('复制失败 = = ');
    },
     iOS() {
       window.location.href = this.msg
     }
    },
    computed:{
      links() {
        let typeArray = ['allnodes/', 'v2ray/', 'ssr/']
        this.type = typeArray[this.radio]
        return this.api + this.type + this.$store.state.user.id
      },
      msg() {
         let url =  this.api + this.type + this.$store.state.user.id
         return 'sub://' + Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '') + '#'
      }
    },
    mounted() {
      
    },
    comments: {
  
    }
  }
</script>

<style>
  .header {
    font-size: 30px;
    padding: 30px;
  }
  .content {
    text-decoration: none;
    font-size: 20px;
    display:inline;
  }
  .copy{
    padding-top: 16px;
  }
  .el-button{
    text-decoration: none;
  }
  .a{
    text-decoration: none;
  }
  .qrcode {
    padding-top: 8px;
  }
</style>
