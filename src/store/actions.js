import axios from 'axios'

export default {
  async fetchProposals ({ commit }, limit) {
    const url = process.env.VUE_APP_STEEMIT_MAINNET
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      jsonrpc: '2.0',
      method: 'database_api.list_proposals',
      id: 2,
      params: {
        start: [],
        limit: limit,
        order: 'by_total_votes',
        order_direction: 'ascending',
        status: 'all'
      }
    }
    await axios.post(url, body, headers)
      .then(response => {
        let proposals = response.data.result.proposals
        commit('SET_PROPOSALS', proposals)
        return proposals
      })
      .catch(() => {
        return []
      })
  },
  async fetchProposalById ({ commit, dispatch }, id) {
    commit('SET_PROPOSAL', {})
    const url = process.env.VUE_APP_STEEMIT_MAINNET
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      jsonrpc: '2.0',
      method: 'call',
      id: 2,
      params: [
        'condenser_api','find_proposals', [[`${id}`]]
      ]
    }
    await axios.post(url, body, headers)
      .then(response => {
        let proposal = response.data.result[0]
        commit('SET_PROPOSAL', proposal)
        dispatch('fetchProposalVoters', id)
        return proposal
      })
      .catch(() => {
        return {}
      })
  },
  async fetchProposalVoters ({ commit, dispatch }, proposalId) {
    commit('SET_VOTERS', [])
    commit('SET_ACCOUNTS', [])
    const url = process.env.VUE_APP_STEEMIT_MAINNET
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      jsonrpc: '2.0',
      method: 'call',
      id: 0,
      params:[
        'condenser_api','list_proposal_votes',[[proposalId, ''],1000,'by_proposal_voter']
      ]
    }
    await axios.post(url, body, headers)
      .then(response => {
        if (response.data.result.length) {
          let voters = response.data.result
          let accounts = voters.map(voter => voter['voter'])
          commit('SET_VOTERS', voters)
          dispatch('fetchAccounts', accounts)
          return voters
        }
      })
      .catch(() => {
        return []
      })
  },
  async fetchAccounts ({ commit }, voters) {
    const url = process.env.VUE_APP_STEEMIT_MAINNET
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      jsonrpc: '2.0',
      method: 'call',
      id: 0,
      params:[
        'condenser_api','get_accounts', [voters]
      ]
    }
    await axios.post(url, body, headers)
      .then(response => {
        let accounts = response.data.result
        commit('SET_ACCOUNTS', accounts)
        return accounts
      })
      .catch(() => {
        return []
      })
  },
  async fetchAccountByName ({ commit }, accountName) {
    commit('SET_ACCOUNT', '')
    const baseUrl = process.env.VUE_APP_HIVEMIND_API
    await axios.get(`${baseUrl}/accounts/${accountName}`)
      .then(response => {
        let account = response.data
        commit('SET_ACCOUNT', account)
        return account
      })
      .catch(() => {
        return []
      })
  },
  async setBudget ({ commit }, totalBudget) {
    const url = process.env.VUE_APP_STEEMIT_MAINNET
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      jsonrpc: '2.0',
      method: 'condenser_api.get_accounts',
      id: 1,
      params: [['steem.dao']]
    }
    await axios.post(url, body, headers)
      .then(response => {
        totalBudget = parseFloat(response.data.result[0].sbd_balance)
        commit('SET_TOTAL_BUDGET', totalBudget)
        commit('SET_DAILY_BUDGET', totalBudget / 100)
        return totalBudget
      })
      .catch(() => {
        return []
      })
  },
  async fetchSteemGlobalPropoerties ({ commit }, globalProperties) {
    const url = process.env.VUE_APP_STEEMIT_MAINNET
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      jsonrpc: '2.0',
      method: 'database_api.get_dynamic_global_properties',
      id: 2
    }
    await axios.post(url, body, headers)
      .then(response => {
        globalProperties = response.data.result
        commit('SET_GLOBAL_PROPERTIES', globalProperties)
        return globalProperties
      })
      .catch(() => {
        return []
      })
  },
  setWorkers ({ commit }, workers) {
    commit('SET_WORKERS', workers)
  },
  setLanguage({ commit }, language) {
    if (typeof language === 'string') {
      commit('SET_LANGUAGE', language)
    }
  }
}
