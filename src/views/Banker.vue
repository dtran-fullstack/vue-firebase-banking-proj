<template>
  <div v-if="currentAgentId">
    <HeaderBar />
    <v-container >
      <v-row justify="center" v-if="!clientDetail.accountNumber">
        <v-col sm="4">
          <SearchBar
            v-on:select-account = 'selectAccount'
          />
        </v-col>
      </v-row>
      <v-row justify="center" v-if="!clientDetail.accountNumber">
        <v-col sm="4">
          <v-btn color="primary" @click="newFormDialog = true" block>
              Open New Account
          </v-btn>
          <NewClientForm
              :newFormDialog="newFormDialog"
              v-on:close-newform="newFormDialog = false"
              v-on:submit-newform="submitNewForm"
            />
        </v-col>
      </v-row>

      <!-- Open Dialog to Confirm Client When is Selected -->
      <v-row justify="center">
        <v-dialog
          v-model="loginDialog"
          max-width="290"
          persistent
        >
          <v-card>
            <v-card-title> Please Enter password </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="submitedPassword"
                label="Password"
                filled
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="loginDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="submitPassword"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Open dialog when password is incorrect -->
      <v-row justify="center">
        <v-dialog
          v-model="incorrect"
          max-width="290"
          persistent
        >
          <v-card>
            <v-card-title>
              Incorrect Password
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="incorrect = false"
                color="blue darken-1"
                text
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>

    <v-container v-if="clientDetail.accountNumber">
      <v-row>
        <v-col cols="12" sm="4">
          <v-sheet min-height="30vh" rounded="lg">
            <ClientTransaction />
          </v-sheet>
        </v-col>
        <v-col col="12" sm="8">
          <v-sheet min-height="70vh" rounded="lg">
            <ClientDetail
              v-on:clear-client-session="clearSession"
            />
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12" sm="8" offset-sm="4">
          <v-sheet min-height="70vh" rounded="lg">
            <ClientActivity />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/main'
import { mapActions, mapState } from 'vuex'
import SearchBar from '@/components/SearchBar'
import ClientTransaction from '@/components/ClientTransaction'
import ClientDetail from '@/components/ClientDetail'
import HeaderBar from '@/components/HeaderBar'
import ClientActivity from '@/components/ClientActivity'
import NewClientForm from '@/components/NewClientForm'

export default {
  data () {
    return {
      selectedAccount: '',
      incorrect: false,
      loginDialog: false,
      submitedPassword: '',
      newFormDialog: false
    }
  },
  components: {
    SearchBar,
    ClientTransaction,
    ClientDetail,
    HeaderBar,
    ClientActivity,
    NewClientForm
  },
  computed: {
    ...mapState([
      'currentAgentId',
      'clientDetail'
    ])
  },
  methods: {
    ...mapActions([
      'fetchClientAccounts',
      'fetchCustomerDetail',
      'clearClientSession'
    ]),
    selectAccount (uid) {
      this.selectedAccount = uid
      this.loginDialog = true
    },
    clearSession () {
      if (this.clientDetail.accountNumber) {
        this.clearClientSession()
      }
    },
    submitNewForm () {
      this.newFormDialog = false
      this.fetchClientAccounts()
    },
    async submitPassword () {
      const snapShot = await db.collection('customer').doc(this.selectedAccount).get()
      if (snapShot.data().password === this.submitedPassword) {
        this.fetchCustomerDetail(this.selectedAccount)
      } else {
        this.incorrect = true
      }
      this.loginDialog = false
      this.submitedPassword = ''
      this.selectedAccount = ''
    }
  },
  mounted () {
    if (this.currentAgentId) {
      this.fetchClientAccounts()
    }
  }
}
</script>
