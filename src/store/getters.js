export default {
  // proposals
  proposals: (state) => state.proposals.sort((a, b) => b.total_votes - a.total_votes),
  proposalsByStatus: (state) => (status) => {
    if(status != 'all'){
      return state.proposals.filter(p => p.status === status).sort((a, b) => b.total_votes - a.total_votes)
    } else {
      return state.proposals
    }
  },
  totalProposalDuration: (state) => (proposal) => {
    const dt2 = new Date(proposal.end_date)
    const dt1 = new Date(proposal.start_date)
    const oneDay = 1000 * 60 * 60 * 24
    const days = Math.round((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / oneDay)
    return days
  },
  totalProposals: (state) => state.proposals.length,
  totalProposalsByStatus: (state) => (status) => state.proposals.filter(proposal => proposal.status === status).length,
  workerProposals: (state) => (worker) => {
    return state.proposals.filter(proposal => proposal.creator === worker)
  },
  workerProposalsByStatus: (state) => (worker, status) => {
    return state.proposals.filter(proposal => proposal.creator === worker && proposal.status === status)
  },
  totalWorkerProposalsByStatus: (state) => (worker, status) => {
    return state.proposals.filter(proposal => proposal.creator === worker && proposal.status === status).length
  },
  // accounts and workers
  accounts: (state) => state.accounts,
  account: (state) => state.account,
  workers: (state) => {
    state.workers = [...new Set(state.proposals.map(p => p.creator))]
    return state.workers
  },
  // high level data
  votingThreshhold: (state) => state.votingThreshhold,
  totalBudget: (state) => state.totalBudget,
  dailyBudget: (state) => state.dailyBudget,
  dailyBudgetLimit: (state) => state.dailyBudgetLimit,
  totalWorkers: (state) => state.workers.length
}
