import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    parent: [],
    children: [],
    isAdmin: [],
  },
  mutations: {
    setProfile(state, data) {
      state.profile = data
    },
    signOut(state) {
      state.profile = null
    },
    setState(state, [stateName, data]) {
      state[stateName].push(data)
    },
    del(state, [index, stateName]) {
      state[stateName].splice(index, 1)
    },
  },
  getters: {},
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
})
