import Vue from 'vue'
import Vuex from 'vuex'
import { signup } from '../service/fetch.js'
Vue.use(Vuex)


const store = () => new Vuex.Store({
  state: {
    status: false,
    jwt: '',
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
  },
 
  actions: {
   async signup({commit}, user){
     console.log(user, "action signup")
      let response = await signup(user.name, user.password)
      commit('signup',response.data.data)
    }
  }
})

export default store
