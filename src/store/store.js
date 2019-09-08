import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proposals: [],
    proposal: {},
    workers: [],
    totalBudget: 0,
    dailyBudget: 0,
    accounts: [],
    account: {},
    voters: [],
    globalProperties: []
  },
  mutations: mutations,
  actions: actions,
  getters: getters
})
