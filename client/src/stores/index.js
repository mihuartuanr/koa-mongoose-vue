import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    loginer: null
  },
  mutations: {
    putLoginer (state, loginer) {
      state.loginer = Object.assign(
        {},
        state.loginer,
        loginer
      )
    }
  },
  plugins: [vuexLocal.plugin]
})
