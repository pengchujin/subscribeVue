<template>
  <div>
    <div class="header"><p>>SSR默认订阅地址</p>
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
        api: 'https://api.sebs.club/allnodes/',
        link: '',
        msg: ''
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
    async created() {
      let url = await this.api + this.$store.state.user.id
      this.msg = 'sub://' + Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '') + '#'
    },
    computed:{
      links() {
        return this.api + this.$store.state.user.id
      }
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
