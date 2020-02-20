import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false
  },
  getters: {
    authenticated: state => state.authenticated
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.authenticated = true
    }
  },
  actions: {
    login ({ commit }) {
      //fetch user from api
      commit('login', { ok: true })
    }
  }
})
