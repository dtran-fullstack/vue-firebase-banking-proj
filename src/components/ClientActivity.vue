<template>
  <div>
    <v-row justify="center">
      <h3>Transaction History</h3>
    </v-row>
    <v-divider></v-divider>
    <v-list color="transparent">
      <v-list-item v-for="(activity,i) in activities" :key="i" link>
        <v-list-item-content>
          <v-list-item-title >
            {{ activity.type }}: ${{ activity.amount }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ activity.createdAt.toDate() }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { db } from '@/main'
import { mapState } from 'vuex'

export default {
  data: () => ({
    activities: []
  }),
  computed: {
    ...mapState([
      'clientDetail'
    ])
  },
  methods: {
    async getActivities () {
      await db.collection('activity').where('accountNumber', '==', this.clientDetail.accountNumber).orderBy('createdAt').onSnapshot(querySnapshot => {
        this.activities = []
        querySnapshot.forEach(activity => {
          this.activities.push(activity.data())
        })
      })
    }
  },
  mounted () {
    this.getActivities()
  }
}
</script>
