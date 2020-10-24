<template>
    <v-autocomplete
      v-model="account"
      :items="accountsList"
      clearable
      hide-details
      hide-selected
      label="Search for an account"
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            <strong>No Data Found</strong>
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    account: ''
  }),
  computed: {
    ...mapState([
      'accountsList'
    ])
  },
  watch: {
    account: {
      handler () {
        if (this.account) {
          this.$emit('select-account', this.account)
        }
      }
    }
  }
}
</script>
