<template>
  <v-app>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row justify="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    //
  }),
  methods: {

  }
}
</script>
