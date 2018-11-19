<template>
  <p>Hello World</p>
</template>

<script>
  export default {
    created() {
      console.log(this.$route.params) 
    }
  }
</script>