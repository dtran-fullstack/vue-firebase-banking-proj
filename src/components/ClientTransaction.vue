<template>
  <v-form>
    <v-container>
      <v-select
        :items="transactionType"
        label="Type"
        solo
        v-model="formData.type"
      >
      </v-select>
      <v-text-field
        label="Amount"
        filled
        v-model="formData.amount"
        :rules="[rules.amount, rules.balance]"
        prefix="$"
      >
      </v-text-field>
      <v-btn
        color="primary"
        @click="handleSubmit"
      >
        Submit
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      transactionType: ['Deposit', 'Withdraw'],
      formData: {
        type: '',
        amount: 0
      },
      rules: {
        amount: value => value >= 0 || 'Insuficient Amount',
        balance: value => {
          if (this.formData.type !== 'Deposit') {
            return (this.clientDetail.balance > this.formData.amount) || 'Insuficient Amount'
          }
        }
      }
    }
  },
  computed: {
    ...mapState([
      'currentAgentId',
      'clientDetail'
    ])
  },
  methods: {
    ...mapActions([
      'processTransaction'
    ]),
    handleSubmit () {
      const payload = {
        type: this.formData.type,
        amount: this.formData.amount,
        clientId: this.clientDetail.accountNumber,
        agentId: (this.currentAgentId) ? this.currentAgentId : this.clientDetail.accountNumber
      }
      this.processTransaction(payload)
      this.formData = {
        type: '',
        amount: 0
      }
    }
  }
}
</script>
