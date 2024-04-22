import { createStore } from 'vuex'

export default createStore({
  state: {
    windowWidth: window.innerWidth,
  },
  getters: {
    windowWidth: state => state.windowWidth,
  },
  mutations: {
    setWindowWidth(state, width) {
      state.windowWidth = width
    }
  },
  actions: {
  },
  modules: {
  }
})
