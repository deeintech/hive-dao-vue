export default {
  SET_ACCOUNTS: (state, accounts) => { state.accounts = accounts },
  SET_ACCOUNT: (state, account) => { state.account = account },
  SET_VOTING_THRESHHOLD: (state, threshhold) => { state.votingThreshhold = threshhold },
  SET_TOTAL_BUDGET: (state, totalBudget) => { state.totalBudget = totalBudget },
  SET_DAILY_BUDGET: (state, dailyBudget) => { state.dailyBudget = dailyBudget },
  SET_PROPOSALS: (state, proposals) => { state.proposals = proposals },
  SET_PROPOSAL: (state, proposal) => { state.proposal = proposal },
  SET_VOTERS: (state, voters) => { state.voters = voters },
  SET_GLOBAL_PROPERTIES: (state, properties) => { state.globalProperties = properties },
  SET_STEEM_PER_MVEST: (state, steemPerMVest) => { state.steemPerMVest = steemPerMVest },
  SET_LANGUAGE: (state, language) => { state.language = language },
  SET_TOTAL_PROPOSAL_VOTERS: (state, totalVoters) => { state.totalProposalVoters = totalVoters },
  SET_PROPOSAL_VOTERS: (state, voters) => { 
    if(voters!== undefined && voters.length && state.accounts !== undefined && state.accounts.length) {
      let newVoters = []
      let totalSP = 0
      let steemPerMVest = state.steemPerMVest
      let account = ''
      let proxyAccount = ''
      let proxySP = 0
      let voterSP = 0
      voters.forEach(voter => {
        account = state.accounts.find(account => account.name === voter)
        proxySP = 0
        voterSP = 0
        proxyAccount = account.proxy
        if(account !== undefined) {
          voterSP = parseFloat(account.vesting_shares)*steemPerMVest/1000
          account.proxied_vsf_votes.forEach(votes => {
            proxySP += parseFloat(votes)*steemPerMVest/1000000000
          })
          let totalAccountSP = voterSP + proxySP
          if (proxyAccount === '') {
            totalSP += voterSP + proxySP
          }
          newVoters.push({voter: voter, sp: voterSP, proxySP: proxySP, totalAccountSP: totalAccountSP, totalSP: totalSP, proxyAccount: proxyAccount})
        }
      })
    newVoters.sort((a, b) => b.totalAccountSP - a.totalAccountSP)
    state.proposalVoters = newVoters
    }
  }
}
