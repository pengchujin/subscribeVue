<template>
  <section class="container">
      <div>
      <div id="msg-dependencies" v-if="msgCount == 0"></div>
      <logo/>
      <p>>请输入邮箱</p>
      <el-input v-model="user.name"></el-input>
      <p>>请输入密码</p>
      <el-input v-model="user.password" type="password"></el-input>
      <div class="button">
      <el-row>
        <el-button  @click="signin" type="primary">>登录</el-button>
        <el-button @click="signup" type="success">>注册</el-button>
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
      user: {
        name: '',
        password: ''
      }
    }
  },
  async created() {
    let status = await this.isLoggedIn()
    if(status){
      console.log("if go to user", status )
      this.$router.push("/user/node")
    }
  },
  computed: {
    msgCount() {
      let type = this.$store.state.msg.type
      let msg = this.$store.state.msg.content
      let showClose = this.$store.state.msg.showClose
      if (msg !== '') {
        let param = { type: type, message: msg, showClose: showClose }
        console.log('message param:', param)
        this.$message(param)
      }
      return this.$store.state.msg.count
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', this.user)
    },
    async signin() {
      await this.$store.dispatch('signin', this.user)
      let status = await this.isLoggedIn()
      if(status){
        this.$router.push({path: "/user"})
      }
    },
    async isLoggedIn() {
      await this.$store.dispatch('isLoggedIn')
      console.log(this.$store.state.isLoggedIn, "loginStatus")
      return this.$store.state.isLoggedIn
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
  padding: 13px;
}
p {
  text-align: start;
  font-weight: 580;
  font-family: arial, helvetica, sans-serif;
  padding: 8px;
}
</style>
