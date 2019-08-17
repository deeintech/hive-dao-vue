export default {
  SET_ACCOUNTS: (state, accounts) => { state.accounts = accounts },
  SET_ACCOUNT: (state, account) => { state.account = account },
  SET_VOTING_THRESHHOLD: (state, threshhold) => { state.votingThreshhold = threshhold },
  SET_TOTAL_BUDGET: (state, totalBudget) => { state.totalBudget = totalBudget },
  SET_DAILY_BUDGET: (state, dailyBudget) => { state.dailyBudget = dailyBudget },
  SET_TESTNET_PROPOSALS: (state, proposals) => { state.proposals = proposals }
}
