import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mobileCommon from './modules/mobileCommon'
import mobileUser from './modules/mobileUser'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    mobileCommon,
		mobileUser
  },
  getters
})
export default store
