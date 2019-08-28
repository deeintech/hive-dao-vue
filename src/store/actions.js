import axios from 'axios'

export default {
  async fetchProposals ({ commit }, proposals) {
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
        limit: 20,
        order: 'by_creator',
        order_direction: 'ascending',
        status: 'all'
      }
    }
    await axios.post(url, body, headers)
      .then(response => {
        proposals = response.data.result.proposals
        commit('SET_PROPOSALS', proposals)
        console.log(proposals)
        return proposals
      })
      .catch(() => {
        return []
      })
  },
  async fetchAccountByName ({ commit }, account) {
    const baseUrl = process.env.VUE_APP_HIVEMIND_API
    await axios.get(`${baseUrl}/accounts/${account}`)
      .then(response => {
        commit('SET_ACCOUNT', response.data)
        return response
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
  setWorkers ({ commit }, workers) {
    commit('SET_WORKERS', workers)
  }
}
