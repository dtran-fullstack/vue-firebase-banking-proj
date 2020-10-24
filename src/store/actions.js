import { db } from '@/main'
import firebase from 'firebase/app'

export default {
  setAgentId ({ commit }, uid) {
    commit('setAgentId', uid)
  },

  setClientId ({ commit }, uid) {
    commit('setClientId', uid)
  },

  clearClientSession ({ commit }) {
    commit('clearClientSession')
  },

  logOut ({ commit }) {
    commit('logOut')
  },

  async fetchClientAccounts ({ commit }) {
    const accountsList = []
    const query = await db.collection('customer')
    query.onSnapshot(querySnapshot => {
      querySnapshot.forEach(client => {
        accountsList.push(client.id)
      })
    })
    commit('setAccountsList', accountsList)
  },

  async processTransaction ({ commit }, { type, amount, clientId, agentId }) {
    // console.log(type, '=>', amount, ' for ', clientId, ' by ', agentId)
    const query = db.collection('customer').doc(clientId)
    const currentClient = await query.get()
    let currentBalance = Number(currentClient.data().balance)
    // console.log(currentClient.data())
    // console.log('current balance: ', currentBalance, typeof currentBalance)
    if (type === 'Deposit') {
      currentBalance += Number(amount)
      await db.collection('customer').doc(clientId).update({
        balance: currentBalance,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    } else {
      currentBalance -= Number(amount)
      await db.collection('customer').doc(clientId).update({
        balance: currentBalance,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
    await db.collection('activity').add({
      accountNumber: clientId,
      agentId: agentId,
      amount: amount,
      type: type,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    commit('updateStateClientDetail', currentBalance)
  },

  async fetchCustomerDetail ({ commit }, { clientId, password }) {
    const client = {}
    const query = db.collection('customer').doc(clientId)
    const customer = await query.get()
    if (customer.data().password === password) {
      client.accountNumber = customer.id
      client.firstName = customer.data().firstName
      client.lastName = customer.data().lastName
      client.email = customer.data().email
      client.phone = customer.data().phone
      client.type = customer.data().type
      client.balance = customer.data().balance
    }
    commit('setClientDetail', client)
  }
}
