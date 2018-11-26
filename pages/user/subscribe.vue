<template>
  <div>
    <div class="header"><p>>SSR默认订阅地址</p>
    </div>
   <div class="content">
      <div><p>{{links}}</p></div>
      <div class="copy"><el-button v-clipboard:copy="links"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError" type="primary" round>复制链接</el-button></div>
   </div>
  </div>
</template>


<script>

  export default {
    data(){
      return {
        link: ''
      }
    },
    methods: {
      onCopy: function (e) {
      this.$message('复制成功');
    },
    onError: function (e) {
      this.$message('复制失败 = = ');
    }
    },
    computed:{
      links() {
        return 'http://test.taolu.cloud:3001/allnodes/' + this.$store.state.user.id
      }
    }
  }
</script>

<style>
  .header {
    font-size: 30px;
    padding: 30px;
  }
  .content {
    font-size: 20px;
    display:inline;
  }
  .copy{
    padding-top: 16px;
  }
</style>
