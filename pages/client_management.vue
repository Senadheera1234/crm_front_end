<template>
  <v-container>
    <v-row>
      <!-- Add new customer section -->
      <v-col cols="12" md="4" style="padding-left: 0; margin-left: 0">
        <v-card class="custom-card" flat style="margin-left: 0">
          <v-card-title>
            <v-row>
              <v-col class="custom-field" style="padding-bottom: 10px">
                <h3 class="custom-title">Add New Customer</h3>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="custom-card-text">
            <v-form
              class="custom-form"
              ref="form"
              @submit.prevent="handleSubmit"
            >
              <v-text-field
                label="Full Name"
                v-model="localForm.fullName"
                outlined
                dense
                :rules="[rules.required]"
                @input="updateForm('fullName', $event)"
                class="custom-field"
              ></v-text-field>
              <v-text-field
                label="Address"
                v-model="localForm.address"
                outlined
                dense
                :rules="[rules.required]"
                @input="updateForm('address', $event)"
                class="custom-field"
                style="margin-bottom: 5px"
              ></v-text-field>
              <v-text-field
                label="Phone"
                v-model="localForm.mobileNumber"
                outlined
                dense
                :rules="[rules.required, rules.phone]"
                @input="updateForm('mobileNumber', $event)"
                class="custom-field"
                style="margin-bottom: 5px"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="localForm.email"
                outlined
                dense
                :rules="[rules.required, rules.email]"
                @input="updateForm('email', $event)"
                class="custom-field"
                style="margin-bottom: 5px"
              ></v-text-field>
              <v-text-field
                label="NIC"
                v-model="localForm.nic"
                outlined
                dense
                :rules="[rules.required, rules.nic]"
                @input="updateBirthdayFromNIC"
                class="custom-field"
                style="margin-bottom: 5px"
              ></v-text-field>
              <v-text-field
                label="birthDay"
                :rules="[rules.required]"
                v-model="localForm.birthDay"
                outlined
                dense
                readonly
                class="custom-field"
              ></v-text-field>
              <v-card-actions class="custom-actions">
                <v-spacer class="custom-field"></v-spacer>
                <v-btn
                  color="primary"
                  type="submit"
                  style="height: 30px; padding: 0 20px 0 20; margin: 0 0 0 0"
                  >CREATE</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- customer list section -->
      <v-col cols="12" md="8">
        <v-text> Hi there </v-text>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
import axios from 'axios'
export default {
  props: {
    form: Object,
  },
  data() {
    return {
      localForm: { ...this.form },
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'Invalid email.',
        nic: (value) =>
          /^\d{9}[VvXx]$/.test(value) ||
          /^\d{12}$/.test(value) ||
          'Invalid NIC format.',
        phone: (value) => /^\d{10}$/.test(value) || 'Invalid phone number.',
      },
    }
  },
  methods: {
    updateForm(field, value) {
      this.localForm[field] = value
      //   this.$emit('update:form', { ...this.localForm })
    },
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          await axios.post('http://127.0.0.1:8000/api/clients', this.localForm) // Removed 'response' assignment
          alert('Client added successfully!')
          this.clearForm() // Clear the form after successful submission
        } catch (error) {
         
         console.error('Error adding client:', error.response ? error.response.data : error.message)
        }
      }
    },
    clearForm() {
      this.localForm = {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthDay: '',
      }
    },
    updateBirthdayFromNIC() {
      if (
        this.localForm.nic.length === 10 ||
        this.localForm.nic.length === 12
      ) {
        let year = ''
        let dayOfYear = 0
        if (this.localForm.nic.length === 10) {
          year = '19' + this.localForm.nic.substring(0, 2)
          dayOfYear = parseInt(this.localForm.nic.substring(2, 5), 10)
        } else {
          year = this.localForm.nic.substring(0, 4)
          dayOfYear = parseInt(this.localForm.nic.substring(4, 7), 10)
        }
        const isFemale = dayOfYear > 500
        if (isFemale) {
          dayOfYear -= 500
        }
        const date = new Date(Number(year), 0)
        date.setDate(dayOfYear)
        this.localForm.birthDay = date.toISOString().split('T')[0]
        this.$emit('update:form', { ...this.localForm })
      }
    },
  },
}
</script>


<style scoped>
.custom-card {
  padding: 8px; /* Adjust as needed */
  margin: 0 0 0 0;
}

.custom-title {
  font-size: 18px;
  margin: 0;
  padding-left: 8px;
  border-left: 4px solid red;
}

.custom-card-text {
  padding: 0 0 0 0;
  /* padding-bottom: 0; */
}

.custom-form {
  padding: 5px 0 0 0;
  /* padding-bottom: 0; */
}

.custom-field {
  margin: 0 4px 0 4px; /* top right bottom left */
  padding: 0 0 0 0;
  margin-bottom: 0;
}

.custom-actions {
  padding: 0;
  margin: 0;
}
</style>