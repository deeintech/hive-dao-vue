import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import { numeric, numeric2 } from './filters/numeric'

import './assets/css/purpose.css'
import './assets/js/all.min.js'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'))
Vue.filter('numeric', numeric)
Vue.filter('numeric2', numeric2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
