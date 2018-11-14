<template>
 <div class="one">
   <el-header>一个订阅</el-header>
      <div class="aside"> 
      <el-menu
      :router = true
      default-active="1"
      text-color="#3b8070"
      class="el-menu-vertical-demo">
      <el-menu-item index="1" route="/user/node">
        <i class="el-icon-menu"></i>
        <span slot="title">>节点管理</span>
      </el-menu-item>
      <el-menu-item index="2" route="/user/subscribe">
        <i class="el-icon-star-on"></i>
        <span slot="title">>订阅管理</span>
      </el-menu-item>
      <el-menu-item index="3" route="/user/share">
        <i class="el-icon-sort" ></i>
        <span slot="title">>共享订阅</span>
      </el-menu-item>
      <el-menu-item index="4" route="/user/about">
        <i class="el-icon-setting"></i>
        <span slot="title">>be me</span>
      </el-menu-item>
    </el-menu>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
      <div class="nothing">
        </div>     
 </div>
</template>

<script>
export default {
  data() {
    return {
      userpage: 'userPage'
    }
  }
}
</script>

<style>
.one{
  position: relative;
  text-align: center;
}
.el-header {
  background-color:mediumaquamarine;
  text-align: center;
  line-height: 60px
}
.view{
  float: left;
  width: 80%;
}
.aside {
  position: relative;
  float: left;
  width: 10%;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.nothing{
  width: 10%;
  height: 1px;
}

</style>
