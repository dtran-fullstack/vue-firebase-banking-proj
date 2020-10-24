<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>
    <v-spacer></v-spacer>Welcome,
    <v-menu
      bottom
      open-on-hover
      offset-y
      :close-on-content-click="closeOnContentClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          v-if="currentAgentId"
          text
          v-bind="attrs"
          v-on="on"
        >
          {{currentAgentId}}
        </v-btn>
        <v-btn
          color="error"
          v-else
          text
          v-bind="attrs"
          v-on="on"
        >
          {{currentClientId}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="logOut"
          href="/"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="item. icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mdiLogout } from '@mdi/js'

export default {
  data () {
    return {
      currentUser: '',
      closeOnContentClick: true,
      items: [
        {
          title: 'Log Out',
          icon: mdiLogout
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'currentAgentId',
      'currentClientId'
    ])
  },
  methods: {
    ...mapActions(['logOut'])
  }
}
</script>
