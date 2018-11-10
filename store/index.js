import Vue from 'vue'
import Vuex from 'vuex'
import { signup, signin } from '../service/fetch.js'
Vue.use(Vuex)


const store = () => new Vuex.Store({
  state: {
    isLoggedIn: false,
    nodes: [],
    subscribe: [],
    msg: {type: "success", content:"", showClose: true, count: 0},
    user: {}
  },

  mutations: {
    signup(state, data) {
      console.log("signup mutation ", data)
      state.msg.type = data.signup.TF
      state.msg.content = data.signup.Message
      state.msg.count++
    },
    signin(state, data) {
     if(!data.data){
      console.log("signup mutation ", data)
      state.msg.type = 'error'
      state.msg.content = data.errors[0].extensions.errorFields.LoginError[0]
      state.msg.count++
     } else {
      console.log("signup mutation ", data)
      state.msg.type = 'success'
      state.msg.content = '正在登录'
      state.msg.count++
      if(data.data.signin.jwt) {
      state.user = {
        jwt: data.data.signin.jwt,
        id: data.data.signin.id,
        name: data.data.signin.username
      }
    }
      localStorage.setItem('user', JSON.stringify(state.user))
     }
    },
    isLoggedIn(state, data) {
        state.isLoggedIn = data
  },
},
  actions: {
    async signup({commit}, user){
      console.log(user, "action signup")
      let response = await signup(user.name, user.password)
      commit('signup',response.data.data)
    },
    async signin({commit}, user) {
      let response = await signin(user.name, user.password)
      commit('signin', response.data)
    },
    async isLoggedIn({commit}){
      let data = false
      console.log(process.browser, "process.browser")
      if (process.browser) {
         data =  window.localStorage.getItem('user')
      }
      // console.log(localStorage)
      // let data =  localStorage.getItem('user')
      console.log(data,"111111111111111111")
      commit('isLoggedIn', !!data)
    }
  }
})

export default store
