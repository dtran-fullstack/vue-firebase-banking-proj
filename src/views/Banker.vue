<template>
  <div v-if="currentAgentId">
    <HeaderBar />
    <v-container >
      <v-row justify="center" v-if="!currentClientId">
        <v-col sm="4">
          <SearchBar
            v-on:select-account = 'selectAccount'
          />
        </v-col>
      </v-row>
      <v-row v-if="!currentClientId">
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
        <v-dialog v-model="loginDialog" max-width="290">
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
                Submit
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
      'currentClientId',
      'currentAgentId',
      'clientDetail'
    ])
  },
  methods: {
    ...mapActions([
      'setClientId',
      'fetchClientAccounts',
      'fetchCustomerDetail',
      'clearClientSession'
    ]),
    selectAccount (uid) {
      this.setClientId(uid)
      this.loginDialog = true
    },
    clearSession () {
      if (this.currentClientId) {
        this.clearClientSession()
      }
    },
    submitNewForm () {
      this.newFormDialog = false
      this.fetchClientAccounts()
    }
  },
  watch: {
    loginDialog: {
      handler () {
        if (this.currentClientId && this.loginDialog === false && this.submitedPassword) {
          this.fetchCustomerDetail({ clientId: this.currentClientId, password: this.submitedPassword })
          this.submitedPassword = ''
        }
      }
    }
  },
  mounted () {
    if (this.currentAgentId) {
      this.fetchClientAccounts()
    }
  }
}
</script>
