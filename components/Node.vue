<template >
  <li>
    
    <div class="Node">
    <div class="image"> 
      <img src="~/static/ssr_logo.png" alt="ssrIcon" height="60" width="60">
      <div class="type">{{node.type}}</div>
    </div>
    <div class="title">{{node.info.title}}</div>
    <div class="host">{{node.info.host}} </div>
   
    <!-- <el-button type="success" plain v-on:click="showID">成功按钮</el-button> -->
    
  </div>
  </li>
</template>

<script>
  export default {
     methods: {
      showID() {
        console.log(this.node.id)
      },
     },
    props: {
      node: Object
    }
  }
</script>


<style>
.image {
  float: left;
  padding-top: 17px;
  padding-left: 30px;
}
.Node {
  position: absolute;
  text-align: center;
  padding-top: 1px;
  width: 700px;
  background-color:azure;
  height: 100px;
  border:2px ;
  border-radius:60px;
  -moz-border-radius:60px;
  box-shadow: 8px 8px 5px #888888;
}
.title{
  position: absolute; left: 0; top: 0; right: 0; bottom: 0;
  padding-top: 30px;
  font-weight: 300;
  height: 30px;
  font-size: 30px
}
.host{
  position: absolute; left: 0; top: 0; right: 0; bottom: 0;
  padding-top: 70px;
  height: 30px;
}
.type{
  font-size: 12px;
  color: black;
}
</style>


