<template>
  <div><p>默认订阅地址</p>
  <p>http://127.0.0.1:3000/subscribe/{{links}}</p></div>
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