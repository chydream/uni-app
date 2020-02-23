import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import home from './modules/home'
import live from './modules/live'
import record from './modules/record'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
		home,
    user,
		live,
		record
  },
  getters
})
export default store
