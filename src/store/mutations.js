export default {
  SET_ACCOUNTS: (state, accounts) => { state.accounts = accounts },
  SET_ACCOUNT: (state, account) => { state.account = account },
  SET_VOTING_THRESHHOLD: (state, threshhold) => { state.votingThreshhold = threshhold },
  SET_TOTAL_BUDGET: (state, totalBudget) => { state.totalBudget = totalBudget },
  SET_DAILY_BUDGET: (state, dailyBudget) => { state.dailyBudget = dailyBudget },
  SET_PROPOSALS: (state, proposals) => { state.proposals = proposals },
  SET_VOTERS: (state, voters) => { state.voters = voters },
  SET_GLOBAL_PROPERTIES: (state, properties) => { state.globalProperties = properties }
}
