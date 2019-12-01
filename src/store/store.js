import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import items from "@/shared/constants/localStorage";

Vue.use(Vuex);

const initLang = (() => {
  let lang = "";
  if (!localStorage.language) {
    localStorage.setItem(items.LANGUAGE, "en");
  } else {
    lang = localStorage.language;
  }
  return lang;
})();

const initUser = (() => {
  let user = {
    name: "",
    loggedIn: false,
    token: "",
    proposals: []
  };
  if (localStorage.user) {
    user = {
      name: localStorage.user,
      loggedIn: Boolean(localStorage.loggedIn),
      token: localStorage.tk,
      proposals: JSON.parse(JSON.stringify(localStorage.proposals))
    };
  } else {
  }
  return user;
})();

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
    proposalVoters: [],
    voterProposals: [],
    globalProperties: [],
    totalBudget: 0,
    dailyBudget: 0,
    steemPerMVest: 0,
    totalProposalVoters: 0,
    language: initLang,
    user: initUser
  },
  mutations: mutations,
  actions: actions,
  getters: getters
});
