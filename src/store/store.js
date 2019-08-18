import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proposals: [],
    workers: [],
    totalBudget: 0,
    dailyBudget: 0,
    accounts: [],
    account: {}
  },
  mutations: mutations,
  actions: actions,
  getters: getters
})
