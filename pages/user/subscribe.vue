<template>
  <div><p>>默认订阅地址</p>
  <p>http://test.taolu.cloud:3001/allnodes/{{links}}</p></div>
</template>


<script>
  export default {
    data(){
      return {
        link: ''
      }
    },
    computed:{
      links() {
        return this.$store.state.user.id
      }
    }
  }
</script>