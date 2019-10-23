import Vue from 'vue'
import App from './App'
import './mixins/install'
import store from './store'
import './util/rem'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
