<template>
  <div v-if='currentClientId'>
    <HeaderBar />
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-sheet min-height="30vh" rounded="lg">
            <ClientTransaction />
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="8">
          <v-sheet min-height="70vh" rounded="lg">
            <ClientDetail
              v-on:clear-client-session="clearSession"
            />
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" sm="8" offset-sm="4">
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
import ClientTransaction from '@/components/ClientTransaction'
import ClientDetail from '@/components/ClientDetail'
import HeaderBar from '@/components/HeaderBar'
import ClientActivity from '@/components/ClientActivity'

export default {
  components: {
    ClientTransaction,
    ClientDetail,
    HeaderBar,
    ClientActivity
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
      'clearClientSession'
    ]),
    selectAccount (uid) {
      this.setClientId(uid)
    },
    clearSession () {
      if (this.currentClientId) {
        this.clearClientSession()
      }
    }
  }
}
</script>
