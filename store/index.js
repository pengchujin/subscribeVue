import Vue from 'vue'
import Vuex from 'vuex'
import { signup, signin, addNode, getNodes, modifyNode, deleteNode } from '../service/fetch.js'
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
    setUser(state, data) {
      state.user = data
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
    addNode(state, data) {
      state.msg.type = data.addNode.TF
      state.msg.content = data.addNode.Message
      state.msg.count++
    },
    getNodes(state, data) {
      console.log(data)
      state.nodes = data.nodesList
    },
    modifyNode(state, data) {
      state.msg.type = data.modifyNode.TF
      state.msg.content = data.modifyNode.Message
      state.msg.count++
    },
    deleteNode(state, data) {
      state.msg.type = data.deleteNode.TF
      state.msg.content = data.deleteNode.Message
      state.msg.count++
    }
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
      if(data) {
        commit('setUser', JSON.parse(data))
      }
      console.log(data,"111111111111111111")
      commit('isLoggedIn', !!data)
    },
    async addNode({commit}, info){
      console.log(info,"ttttttttttttttttttttttttt")
      let response = await addNode(info.node, info.jwt)
      commit('addNode', response.data.data)
    },
    async getNodes({commit}, jwt) {
      let response = await getNodes(jwt)
      commit('getNodes', response.data.data)
    },
    async modifyNode({commit}, info) {
      console.log(" modifyNode action", info)
      let response = await modifyNode(info.id,info.infoNode, info.jwt)
      commit('modifyNode', response.data.data)
      // let responseNodes = await getNodes(info.jwt)
      // commit('getNodes', responseNodes.data.data)
    },
    async deleteNode({commit}, info){
      let response = await deleteNode(info.id, info.jwt)
      commit('deleteNode', response.data.data)
    }
  }
})

export default store
