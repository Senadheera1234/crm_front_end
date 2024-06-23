<template>
  <v-form ref="form" @submit.prevent="handleSubmit" class="form-wrapper">
    <v-text-field
      v-model="localForm.fullName"
      label="Full Name"
      outlined
      :rules="[rules.required]"
      @input="updateForm('fullName', $event)"
    ></v-text-field>
    <v-text-field
      v-model="localForm.address"
      label="Address"
      outlined
      :rules="[rules.required]"
      @input="updateForm('address', $event)"
    ></v-text-field>
    <v-text-field
      v-model="localForm.mobileNumber"
      label="Mobile Number"
      outlined
      :rules="[rules.required, rules.phone]"
      @input="updateForm('mobileNumber', $event)"
    ></v-text-field>
    <v-text-field
      v-model="localForm.email"
      label="Email"
      outlined
      :rules="[rules.required, rules.email]"
      @input="updateForm('email', $event)"
    ></v-text-field>
    <v-text-field
      v-model="localForm.nic"
      label="NIC"
      outlined
      :rules="[rules.required, rules.nic]"
      @input="updateBirthdayFromNIC"
    ></v-text-field>
    <v-text-field
      v-model="localForm.birthday"
      label="Birthday"
      outlined
      readonly
    ></v-text-field>
    <div class="button-container">
      <v-btn color="grey" dark @click="handleBack" class="longer-button">
        Back
      </v-btn>
      <v-btn color="#09a347" dark class="longer-button" type="submit">
        Save Button
      </v-btn>
    </div>
  </v-form>
</template>
  
  <script>
import axios from 'axios'
export default {
  props: {
    form: Object,
    rules: Object,
  },
  data() {
    return {
      localForm: { ...this.form },
    }
  },
  methods: {
    updateForm(field, value) {
      this.localForm[field] = value
      this.$emit('update:form', { ...this.localForm })
    },
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          await axios.post('http://127.0.0.1:8000/api/clients', this.localForm); // Removed 'response' assignment
          alert('Client added successfully!');
          this.clearForm(); // Clear the form after successful submission
        } catch (error) {
          console.error('Error adding client:', error);
          alert('There was an error adding the client.');
        }
      }
  },
    handleBack() {
      this.$emit('back')
    },
    clearForm() {
      this.localForm = {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthday: '',
      }
      this.$emit('update:form', { ...this.localForm })
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
        this.localForm.birthday = date.toISOString().split('T')[0]
        this.$emit('update:form', { ...this.localForm })
      }
    },
  },
}
</script>
  
  <style scoped>
.form-wrapper {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.longer-button {
  width: 120px;
  height: 48px;
}
</style>
  