export default {
  // proposals
  proposalsByVotesStatus: state => (votesStatus, status) => {
    let returning = state.proposals
      .filter(p => p.receiver === "steem.dao")
      .sort((a, b) => a.total_votes - b.total_votes);
    if (returning.length && returning[0].total_votes !== 0) {
      let votes = returning[0].total_votes;
      let newproposals = [];
      if (votesStatus === "passing") {
        if (status !== "all" && status !== "dmitrydao") {
          newproposals = state.proposals.filter(
            p => Number(p.total_votes) >= Number(votes) && p.status === status
          );
        }
        if (status === "all") {
          newproposals = state.proposals.filter(
            p =>
              Number(p.total_votes) >= Number(votes) && p.status !== "expired"
          );
        }
        if (status === "dmitrydao") {
          newproposals = state.proposals.filter(
            p =>
              Number(p.total_votes) > Number(votes) && p.creator === "dmitrydao"
          );
        }
        return newproposals;
      }
      if (votesStatus === "insufficient") {
        if (status !== "all" && status !== "dmitrydao") {
          newproposals = state.proposals.filter(
            p => Number(p.total_votes) < Number(votes) && p.status === status
          );
        }
        if (status === "all") {
          newproposals = state.proposals.filter(
            p => Number(p.total_votes) < Number(votes) && p.status !== "expired"
          );
        }
        if (status === "dmitrydao") {
          newproposals = state.proposals.filter(
            p =>
              Number(p.total_votes) < Number(votes) && p.creator === "dmitrydao"
          );
        }
        return newproposals;
      }
    }
  },
  totalProposals: state => state.proposals.length,
  totalProposalsByVotesStatus: (state, getters) => status => {
    if (getters.proposalsByVotesStatus(status)) {
      return getters.proposalsByVotesStatus(status).length;
    }
  },
  proposalsByStatus: state => status => {
    return state.proposals.filter(p => p.status === status);
  },
  totalProposalsByStatus: state => status => {
    return state.proposals.filter(p => p.status === status).length;
  },
  workerProposals: state => worker => {
    return state.proposals.filter(proposal => proposal.creator === worker);
  },
  workerProposalsByStatus: state => (worker, status) => {
    return state.proposals.filter(
      proposal => proposal.creator === worker && proposal.status === status
    );
  },
  totalWorkerProposalsByStatus: state => (worker, status) => {
    return state.proposals.filter(
      proposal => proposal.creator === worker && proposal.status === status
    ).length;
  },
  accountSP: state => name => {
    let account = state.accounts.find(account => account.name === name);
    let steemPerMVest = state.steemPerMVest;
    let totalSP,
      voterSP,
      proxySP = 0;
    if (account !== undefined) {
      voterSP = (parseFloat(account.vesting_shares) * steemPerMVest) / 1000;
      proxySP =
        (parseFloat(account.proxied_vsf_votes[0]) * steemPerMVest) / 1000000000;
      totalSP = voterSP + proxySP;
      return totalSP;
    }
  },
  // workers
  workers: state => {
    state.workers = [...new Set(state.proposals.map(p => p.creator))];
    return state.workers;
  },
  // high level data
  totalProposals: state => state.proposals.length,
  totalWorkers: state => state.workers.length
};
