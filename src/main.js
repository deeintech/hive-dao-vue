import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import datePicker from 'vue-bootstrap-datetimepicker'
import { numeric, numeric3, daysLeft, dateFilter } from './filters/filters'

import './assets/css/purpose.css'
import './assets/js/all.min.js'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.use(BootstrapVue)
Vue.use(datePicker)
Vue.filter('numeric', numeric)
Vue.filter('numeric3', numeric3)
Vue.filter('daysLeft', daysLeft)
Vue.filter('dateFilter', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
