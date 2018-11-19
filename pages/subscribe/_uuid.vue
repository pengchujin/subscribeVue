<template>
   <div v-html="subscribes"></div>
</template>


<script>
import { getSubscribes } from '../../service/fetch.js'
export default {
  data(){
    return {
      subscribes: ''
    }
  },
 async created() {
    console.log(this.$route.params)
    let response = await getSubscribes(this.$route.params.uuid)
    this.subscribes = response.data.data.getAllNodes
    console.log(this.subscribes)
  },
}
</script>
