export default {
  SET_ACCOUNTS: (state, accounts) => {
    state.accounts = accounts;
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account;
  },
  SET_POST: (state, post) => {
    state.post = post;
  },
  SET_TOTAL_BUDGET: (state, totalBudget) => {
    state.totalBudget = totalBudget;
  },
  SET_DAILY_BUDGET: (state, dailyBudget) => {
    state.dailyBudget = dailyBudget;
  },
  SET_PROPOSALS: (state, proposals) => {
    let newproposals = [];
    let dailyBudget = state.dailyBudget;
    let totalAvailableBudget = dailyBudget;
    let fundedStake = 0;
    let totalFundedStake = 0;

    newproposals = proposals
      .sort((a, b) => b.total_votes - a.total_votes)
      .map(p => {
        const container = {};
        // duration
        const dt2 = new Date(p.end_date);
        const dt1 = new Date(p.start_date);
        const oneDay = 1000 * 60 * 60 * 24;
        const duration = Math.round(
          (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            oneDay
        );

        // core properties
        container.id = p.id;
        container.proposal_id = p.proposal_id;
        container.receiver = p.receiver;
        container.creator = p.creator;
        container.daily_pay = p.daily_pay.amount / 1000;
        (container.permlink = `https://steemit.com/@${p.creator}/${p.permlink}`),
          (container.permlink_short = p.permlink);
        container.start_date = p.start_date;
        container.end_date = p.end_date;
        container.duration = duration;
        container.total_requested = (p.daily_pay.amount / 1000) * duration;
        container.status = p.status;
        container.subject = p.subject;
        container.total_votes =
          (p.total_votes * state.steemPerMVest) / 1000000000;

        // returning/ burning status
        if (p.receiver === "steem.dao") {
          container.refunding = true;
        } else {
          container.refunding = false;
        }
        if (p.receiver === "null") {
          container.burning = true;
        } else {
          container.burning = false;
        }

        // funding
        if (totalFundedStake <= 100 && totalAvailableBudget > 0) {
          // refund funding
          if (
            container.refunding &&
            container.daily_pay > totalAvailableBudget
          ) {
            fundedStake = Number(
              100 -
                ((container.daily_pay - totalAvailableBudget) * 100) /
                  container.daily_pay
            ).toFixed(4);
          } else {
            // partial funding
            if (container.daily_pay > totalAvailableBudget) {
              fundedStake = Number(
                ((container.daily_pay - totalAvailableBudget) * 100) /
                  totalAvailableBudget
              ).toFixed(2);
            }
            // full funding
            else {
              fundedStake = 100;
            }
          }
          totalAvailableBudget -= container.daily_pay;
          totalFundedStake += fundedStake;
        } else {
          fundedStake = 0;
        }

        container.funding = {
          availableBudget: totalAvailableBudget.toFixed(4),
          fundedStake: fundedStake
        };

        return container;
      });
    state.proposals = newproposals;
  },
  SET_PROPOSAL: (state, proposal) => {
    const dt2 = new Date(proposal["end_date"]);
    const dt1 = new Date(proposal["start_date"]);
    const oneDay = 1000 * 60 * 60 * 24;
    const duration = Math.round(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        oneDay
    );

    Object.keys(proposal).map(p => {
      if (p === "total_votes") {
        proposal["total_votes"] =
          (proposal["total_votes"] * state.steemPerMVest) / 1000000000;
      }
      if (p === "permlink") {
        proposal[
          "permlink"
        ] = `https://steemit.com/@${proposal["creator"]}/${proposal["permlink"]}`;
      } else {
        proposal[p] = proposal[p];
      }
      proposal["duration"] = duration;
      proposal["daily_pay"] = parseFloat(proposal["daily_pay"]);
      proposal["total_requested"] = proposal["daily_pay"] * duration;
    });
    state.proposal = proposal;
  },
  SET_RETURNING_PROPOSAL: (state, proposals) => {
    if (proposals !== undefined) {
      let proposal = state.proposals
        .filter(p => p.receiver === "steem.dao" && p.funding.fundedStake > 0)
        .sort((a, b) => a.total_votes - b.total_votes);
      state.returnProposal = proposal;
    }
  },
  SET_VOTERS: (state, voters) => {
    state.voters = voters;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_GLOBAL_PROPERTIES: (state, properties) => {
    state.globalProperties = properties;
  },
  SET_STEEM_PER_MVEST: (state, steemPerMVest) => {
    state.steemPerMVest = steemPerMVest;
  },
  SET_TOTAL_PROPOSAL_VOTERS: (state, totalVoters) => {
    state.totalProposalVoters = totalVoters;
  },
  SET_VOTER_PROPOSALS: (state, proposals) => {
    if (proposals !== undefined && proposals.length) {
      state.voterProposals = proposals;
    }
  },
  SET_PROPOSAL_VOTERS: (state, voters) => {
    if (
      voters !== undefined &&
      voters.length &&
      state.accounts !== undefined &&
      state.accounts.length
    ) {
      let newVoters = [];
      let totalSP = 0;
      let steemPerMVest = state.steemPerMVest;
      let account = "";
      let proxyAccount = "";
      let proxySP = 0;
      let voterSP = 0;
      voters.forEach(voter => {
        account = state.accounts.find(account => account.name === voter);
        proxySP = 0;
        voterSP = 0;
        proxyAccount = account.proxy;
        if (account !== undefined) {
          voterSP = (parseFloat(account.vesting_shares) * steemPerMVest) / 1000;
          account.proxied_vsf_votes.forEach(votes => {
            proxySP += (parseFloat(votes) * steemPerMVest) / 1000000000;
          });
          let totalAccountSP = voterSP + proxySP;
          if (proxyAccount === "") {
            totalSP += voterSP + proxySP;
          }
          newVoters.push({
            voter: voter,
            sp: voterSP,
            proxySP: proxySP,
            totalAccountSP: totalAccountSP,
            totalSP: totalSP,
            proxyAccount: proxyAccount
          });
        }
      });
      newVoters.sort((a, b) => b.totalAccountSP - a.totalAccountSP);
      state.proposalVoters = newVoters;
    }
  }
};
