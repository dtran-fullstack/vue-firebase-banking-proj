<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-dialog v-model="failLogin" max-width="250">
          <v-card>
            <v-card-title> <span class="headline">Alert!</span> </v-card-title>
            <v-card-text>
              <span style="color: red">Incorrect Email or Password</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="failLogin = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-col sm="6">
          <v-card>
            <v-card-title>
              <span class="headline">User Login</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-select
                        v-model="formData.type"
                        :items="['Agent', 'Client']"
                        label="Account Type*"
                        :rules="[rules.required]"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Email*"
                        type="email"
                        v-model="formData.email"
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Password*"
                        type="password"
                        v-model="formData.password"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="onSubmit"> Login </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '@/main'

export default {
  data: () => ({
    failLogin: false,
    formData: {
      type: 'Agent',
      email: 'dwong@banker.com',
      password: '123'
    },
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  methods: {
    ...mapActions([
      'setAgentId',
      'setClientId',
      'fetchCustomerDetail'
    ]),
    async onSubmit () {
      if (this.$refs.form.validate()) {
        if (this.formData.type === 'Agent') {
          const snapShot = await db.collection('agent').where('email', '==', this.formData.email).get()
          if (snapShot.empty) {
            this.failLogin = true
          }
          snapShot.forEach(user => {
            if (user.data().password === this.formData.password) {
              this.setAgentId(user.id)
              this.$router.push(`/banker/${user.id}`)
            } else {
              this.failLogin = true
            }
          })
        } else {
          const snapShot = await db.collection('customer').where('email', '==', this.formData.email).get()
          if (snapShot.empty) {
            this.failLogin = true
          }
          snapShot.forEach(user => {
            if (user.data().password === this.formData.password) {
              this.setClientId(user.id)
              this.fetchCustomerDetail(user.id)
              this.$router.push(`/client/${user.id}`)
            } else {
              this.failLogin = true
            }
          })
        }
      }
    }
  }
}
</script>
