<template>
  <v-form>
    <v-container>
      <v-row v-if="currentAgentId">
        <v-col>
          <v-btn
            color="error"
            @click="$emit('clear-client-session')"
            justify = "center"
          >
            Clear Session
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Balance: $ {{ clientDetail.balance }}</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="clientDetail.firstName"
            label="First Name"
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="clientDetail.lastName"
            label="Last Name"
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="clientDetail.email"
            label="Email"
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="clientDetail.phone"
            label="Phone"
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="clientDetail.type"
            label="Type"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // clientDetail: {}
    }
  },
  computed: {
    ...mapState([
      'clientDetail',
      'currentAgentId'
    ])
  }
}
</script>
