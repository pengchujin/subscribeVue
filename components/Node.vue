<template >
  <li>
    <div class="Node">
    <div class="title">{{node.info.title}}</div>
    <div class="host">{{node.info.host}} </div>
    <div class="type">{{node.type}}</div>
  </div>
  </li>
</template>

<script>
  export default {
    props: {
      node: Object
    }
  }
</script>


<style>
.Node {
  position: absolute;
  text-align: center;
  padding-top: 1px;
  width: 700px;
  background-color: #F3C7CF;
  height: 100px;
  border:2px ;
  border-radius:30px;
  -moz-border-radius:30px;
  box-shadow: 8px 8px 5px #888888;
}
.title{
  margin-left: 20px;
  text-align: left;
  /* color: #3b8070; */
  font-weight: 300;
  padding: 5px;
  height: 30px;
  font-size: 30px
}
.host{
  padding: 10px;
  height: 30px;
}
.type{
  padding: 15px;
  text-align: center;
  font-size: 12px;
  color: black;
}
</style>
