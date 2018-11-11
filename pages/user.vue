<template>
 <el-container>
  <el-header>一个订阅</el-header>
  <el-container>
    <el-aside width="200px">
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
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

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
.tac {
  width: 200px;
}
.el-header {
  background-color:mediumaquamarine;
  text-align: center;
  line-height: 60px
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 1300px;
}
.nuxt-link{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
  }
body > .el-container {
  margin-bottom: 40px;
}
</style>
