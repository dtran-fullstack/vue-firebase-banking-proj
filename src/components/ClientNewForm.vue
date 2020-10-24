<template>
  <v-row justify="center">
    <v-dialog
      v-model="newFormDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-form ref="form">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.firstName"
                    label="Legal first name*"
                    :rules="[rules.required, rules.counter]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.lastName"
                    label="Legal last name*"
                    :rules="[rules.required, rules.counter]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.email"
                    label="Email*"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.phone"
                    label="Phone*"
                    hint="xxx-xxx-xxxx"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.password"
                    label="Password*"
                    type="password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password*"
                    type="password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="formData.type"
                    :items="['individual', 'business']"
                    label="Account Type*"
                    :rules="[rules.required]"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeForm"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="handleSubmit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from '@/main'

export default {
  props: {
    newFormDialog: Boolean
  },
  data: () => ({
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      password: '',
      phone: '',
      balance: 0
    },
    confirmPassword:'',
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
      },
      password: value => value == confirmPassword || "Confirm password doesn't match"
    },
  }),
  methods: {
    async handleSubmit() {   
      const existEmail = await db.collection('customer').where('email', '==', this.formData.email).get()
      if (this.$refs.form.validate()  && this.formData.password == this.confirmPassword && existEmail.empty){
        await db.collection('customer').add(this.formData)
        this.formData= {
          firstName: '',
          lastName: '',
          email: '',
          type: '',
          password: '',
          phone: '',
          balance: 0
        },
        this.$emit('submit-newform')
      }
    },
    closeForm() {
      this.$emit('close-newform')
    }
  }
}
</script>