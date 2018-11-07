<template>
  <section class="container">
    <div>
      <logo/>
      <p>>请输入邮箱</p>
      <el-input v-model="input"></el-input>
      <p>>请输入密码</p>
      <el-input v-model="input" type="password"></el-input>
      <div class="button">
      <el-row>
        <el-button type="primary">>登录</el-button>
        <el-button type="success">>注册</el-button>
      </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      test: "Keep Vue"
    }
  }, 
  components: {
    Logo
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  padding-bottom: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  text-align: center;
  padding: 10px
}
p {
  text-align: start;
  font-weight: 580;
  font-family: arial,helvetica,sans-serif;
  padding: 8px
}
</style>
