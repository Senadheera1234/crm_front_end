<template>
  <v-row class="backgroundCol">
    <v-col
      cols="12"
      md="3"
      class="left-content backgroundRow 3colSection"
    >
      <v-container class="login-container">
        <ClientsList v-if="!showForm" :clients="clients" />
        <NewClientForm
          v-else
          :form.sync="form"
          :rules="rules"
          @submit="handleFormSubmit"
          @back="handleBack"
        />
      </v-container>
    </v-col>
    <v-col
      cols="12"
      md="9"
      class="9colSection"
    >
      <div class="d-flex justify-end">
        <div class="my-2">
          <v-btn
            v-if="!showForm"
            color="#09a347"
            dark
            @click="toggleShowForm"
          >
            Add New Client
          </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import NewClientForm from '@/components/NewClientForm.vue'
import ClientsList from '@/components/ClientsList.vue' // Assuming you have a ClientsList component

export default {
  components: {
    NewClientForm,
    ClientsList,
  },
  data() {
    return {
      clients: [
        'John Doe',
        'Jane Smith',
        'Alice Johnson',
        'Bob Brown',
        'Charlie Davis',
      ],
      showForm: false,
      form: {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthday: '',
      },
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
    toggleShowForm() {
      this.showForm = !this.showForm
    },
    handleFormSubmit(form) {
      console.log('Form submitted:', form)
      this.clearForm()
      this.showForm = false
    },
    handleBack() {
      this.showForm = false
    },
    clearForm() {
      this.form = {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthday: '',
      }
    },
  },
}
</script>

<style scoped>
.transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}

.backgroundRow {
  background-color: #d9d9d9;
}

.backgroundCol {
  background-color: #ffffff;
}

.login-container {
  height: 100vh;
  padding: 20px;
}

.white-bg {
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
}

.mb-2 {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}

.headline {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.form-wrapper {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
}
.longer-button {
  width: 120px;
  height: 48px;
}
</style>
