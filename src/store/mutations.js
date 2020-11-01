export default {
  setAgentId: (state, uid) => {
    state.currentAgentId = uid
  },
  setClientId: (state, uid) => {
    state.currentClientId = uid
  },
  setAccountsList: (state, accountsList) => {
    state.accountsList = accountsList
  },
  setClientDetail (state, clientDetail) {
    if (clientDetail) {
      // state.clientId = clientDetail.accountNumber
      state.clientDetail = clientDetail
    } else {
      state.currentClientId = ''
    }
  },
  updateStateClientDetail: (state, newBalance) => {
    state.clientDetail.balance = newBalance
  },
  clearClientSession: (state) => {
    state.clientDetail = {}
    state.currentClientId = ''
    state.clientActivities = []
  },
  logOut: (state) => {
    state.clientDetail = {}
    state.currentClientId = ''
    state.accountsList = []
    state.currentAgentId = ''
    state.clientActivities = []
  }
}
