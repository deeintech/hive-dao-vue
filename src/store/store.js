import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {},
    proposal: {},
    returnProposal: {},
    proposals: [],
    accounts: [],
    workers: [],
    voters: [],
    post: {},
    user: {},
    proposalVoters: [],
    globalProperties: [],
    totalBudget: 0,
    dailyBudget: 0,
    steemPerMVest: 0,
    totalProposalVoters: 0,
    language: "en"
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});
