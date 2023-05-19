import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import VueLazyload from 'vue-lazyload'

const loadimage = require('./assets/images/loading/loading.gif')
const errorimage = require('./assets/images/loading/error.gif')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
  listenEvents: [ 'scroll' ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
