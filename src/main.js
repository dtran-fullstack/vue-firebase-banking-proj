import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/firestore'
// import './registerServiceWorker'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyDd_xZ-C95MpLgYzC_fNo4MGozw8i5FODw',
  authDomain: 'vue-banking-a70a6.firebaseapp.com',
  databaseURL: 'https://vue-banking-a70a6.firebaseio.com',
  projectId: 'vue-banking-a70a6',
  storageBucket: 'vue-banking-a70a6.appspot.com',
  messagingSenderId: '461919822793',
  appId: '1:461919822793:web:c241c3e3b3bb62d5063e18',
  measurementId: 'G-2HXZ7ZRKH6'
})

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdiSvg'
  },
  render: h => h(App)
}).$mount('#app')
