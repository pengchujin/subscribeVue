<template >
  <li > 
    <div class="Node" >
    <div class="image"> 
      <img  src="~/static/ssr_logo.png" alt="ssrIcon" height="60" width="60">
      <div class="type">{{node.type}}</div>
    </div>
    <div class="title"><p>{{node.info.title}}</p></div>
    <div class="host"><p>{{node.info.host}}</p> </div>
    <div class="edit">
      <el-button @click="modify" type="primary" icon="el-icon-edit" circle></el-button>
      <div class="nodeFont"> <p>修改</p> </div>
       </div>
      <div class="delete">
        <el-button @click="deleteNode"  type="danger"  icon="el-icon-delete" circle></el-button>
        <div class="nodeFont"> <p>删除</p> </div>
      </div>
   
    <!-- <el-button type="success" plain v-on:click="showID">成功按钮</el-button> -->
    
  </div>
  </li>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
     methods: {
      showID() {
      },
      modify(){
        this.$emit('modifyNode', this.node)
      },
      deleteNode(){
        this.$emit('deleteNode', this.node.id)
      },
      },
    props: {
      node: Object
    }
  }
</script>


<style>
.nodeFont {
  padding-top: 5px;
}
.edit {
  font-size: 14px;
  float: right;
  padding-top: 26px;
  padding-right: 20px;
}
.delete {
  font-size: 14px;
  float: right;
  padding-top: 26px;
  padding-right: 10px;
}

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
  box-shadow: 4px 4px 2px #888888;
}
.title{
  position: absolute; left: 0; top: 0; right: 0; bottom: 0;
  margin: auto;
  font-weight: 300;
  width: 300px;
  height: 50px;
  font-size: 30px
}
.host{
  position: absolute; left: 0; top: 0; right: 0; bottom: 18px;
  margin: auto;
  width: 300px;
  padding-top: 60px;
  height: 30px;
}
.type{
  font-size: 12px;
  color: black;
}
</style>


