import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import datePicker from 'vue-bootstrap-datetimepicker'
import { numeric, numeric2, numeric3 } from './filters/filters'

import './assets/css/purpose.css'
import './assets/js/all.min.js'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.use(BootstrapVue)
Vue.use(datePicker)
Vue.use(require('vue-moment'))
Vue.filter('numeric', numeric)
Vue.filter('numeric2', numeric2)
Vue.filter('numeric3', numeric3)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
