export default {
  // proposals
  proposalsByVotesStatus: (state) => (votesStatus, status) => {
    let returning = state.proposals.filter(p => p.receiver === 'steem.dao')
    if (returning.length && returning[0].total_votes !== 0) {
      let votes = returning[0].total_votes
      let newproposals = []
      if (votesStatus === 'passing') {
        if (status !== 'all' && status !== 'dmitrydao') {
          newproposals = state.proposals.filter(p => Number(p.total_votes) > Number(votes) && p.status === status)
        }
        if (status === 'all') {
          newproposals = state.proposals.filter(p => Number(p.total_votes) > Number(votes))
        }
        if (status === 'dmitrydao') {
          newproposals = state.proposals.filter(p => Number(p.total_votes) > Number(votes) && p.creator === 'dmitrydao')
        }
        return newproposals
      }
      if (votesStatus === 'insufficient') {
        if (status !== 'all' && status !== 'dmitrydao') {
          newproposals = state.proposals.filter(p => Number(p.total_votes) < Number(votes) && p.status === status)
        }
        if (status === 'all') {
          newproposals = state.proposals.filter(p => Number(p.total_votes) < Number(votes))
        }
        if (status === 'dmitrydao') {
          newproposals = state.proposals.filter(p => Number(p.total_votes) < Number(votes) && p.creator === 'dmitrydao')
        }
        return newproposals
      }
    }
  },
  vestsToSP: (state, getters) => (votes) => {
    return votes * getters.steemPerMVest / 1000000000
  },
  totalProposalSP: (state, getters) => (id) => {
    let voters = getters.votersByProposalId(id)
    let totalSP = 0
    if (voters && voters !== undefined) {
      totalSP = Math.max(...voters.map(v => v.totalSP), 0)
    }
    return totalSP
  },
  totalRequested: (state, getters) => (proposal) => {
    return proposal.daily_pay.amount/1000*getters.totalProposalDuration(proposal)
  },
  totalRequested2: (state, getters) => (proposal) => {
    let requested = parseFloat(proposal.daily_pay)*getters.totalProposalDuration(proposal)
    return requested
  },
  totalProposals: (state) => state.proposals.length,
  returningProposal: (state) => {
    let returning = state.proposals.filter(p => p.receiver === 'steem.dao')
    if (returning.length && returning[0]) {
      return returning[0]
    }
  },
  totalProposalsByVotesStatus: (state, getters) => (status) => {
    if (getters.proposalsByVotesStatus(status)) {
      return getters.proposalsByVotesStatus(status).length
    }
  },
  proposalsByStatus: (state) => (status) => {
    return state.proposals.filter(p => p.status === status)
  },
  totalProposalsByStatus: (state) => (status) => {
    return state.proposals.filter(p => p.status === status).length
  },
  totalProposalDuration: (state) => (proposal) => {
    const dt2 = new Date(proposal.end_date)
    const dt1 = new Date(proposal.start_date)
    const oneDay = 1000 * 60 * 60 * 24
    const days = Math.round((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / oneDay)
    return days || 0
  },
  workerProposals: (state) => (worker) => {
    return state.proposals.filter(proposal => proposal.creator === worker)
  },
  workerProposalsByStatus: (state) => (worker, status) => {
    return state.proposals.filter(proposal => proposal.creator === worker && proposal.status === status)
  },
  totalWorkerProposalsByStatus: (state) => (worker, status) => {
    return state.proposals.filter(proposal => proposal.creator === worker && proposal.status === status).length
  },
  accountSP: (state, getters) => (name) => {
    let account = state.accounts.find(account => account.name === name)
    let steemPerMVest = getters.steemPerMVest
    let totalSP, voterSP, proxySP = 0
    if(account !== undefined) {
      voterSP = parseFloat(account.vesting_shares)*steemPerMVest/1000
      proxySP = parseFloat(account.proxied_vsf_votes[0])*steemPerMVest/1000000000
      totalSP = voterSP + proxySP
      return totalSP
    }
  },
  // voters
  votersByProposalId: (state, getters) => (proposalId) => {
    if(state.voters !== undefined && state.voters.length && state.accounts !== undefined && state.accounts.length) {
      let newVoters = []
      let totalSP = 0
      let steemPerMVest = getters.steemPerMVest
      let voters = state.voters.filter(item => item.proposal.id === proposalId)
      voters.forEach(v => {
        let account = state.accounts.find(account => account.name === v.voter)
        if(account !== undefined) {
          let voterSP = parseFloat(account.vesting_shares)*steemPerMVest/1000
          let proxySP = parseFloat(account.proxied_vsf_votes[0])*steemPerMVest/1000000000
          let totalAccountSP = voterSP + proxySP
          totalSP += voterSP + proxySP
          newVoters.push({voter: v.voter, sp: voterSP, proxySP: proxySP, totalAccountSP: totalAccountSP, totalSP: totalSP})
        }
      })
      return newVoters.sort((a, b) => b.totalAccountSP - a.totalAccountSP)
    }
  },
  totalVotersByProposalId: (state, getters) => (id) => {
    if (getters.votersByProposalId(id) !== undefined) {
      return getters.votersByProposalId(id).length
    }
  },
  // workers
  workers: (state) => {
    state.workers = [...new Set(state.proposals.map(p => p.creator))]
    return state.workers
  },
  // high level data
  totalProposals: (state) => state.proposals.length,
  totalWorkers: (state) => state.workers.length,
  steemPerMVest: (state) => {
    if (state.globalProperties && state.globalProperties.total_vesting_fund_steem != undefined && state.globalProperties.total_vesting_shares != undefined) {
      let  total_vesting_fund_steem = parseFloat(state.globalProperties.total_vesting_fund_steem.amount)
      let  total_vesting_shares = parseFloat(state.globalProperties.total_vesting_shares.amount)
      let  mveststeem = total_vesting_fund_steem / (total_vesting_shares / 1000000)
      return mveststeem
    }
  }
}
