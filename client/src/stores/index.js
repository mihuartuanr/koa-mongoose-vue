import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const InitState = {
  loginer: {},
}
export default new Vuex.Store({
  state: {
    ...InitState
  },
  mutations: {
    putLoginer (state, loginer) {
      state.loginer = Object.assign(
        {},
        state.loginer,
        loginer
      )
    },
    resetVuex (state) {
      Object.assign(state, InitState)
    }
  },
  plugins: [vuexLocal.plugin]
})
