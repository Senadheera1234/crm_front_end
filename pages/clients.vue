<template>
  <v-row class="backgroundCol">
    <v-col cols="12" md="3" class="left-content backgroundRow 3colSection">
      <v-container class="login-container">
        <ClientsList v-if="!showForm" :clients="clients" @clients-fetched="handleClientsFetched"/>
        <NewClientForm
          v-else
          :form.sync="form"
          :rules="rules"
          @submit="handleFormSubmit"
          @back="handleBack"
        />
      </v-container>
    </v-col>
    <v-col cols="12" md="9" class="9colSection">
      <div class="d-flex justify-end">
        <div class="my-2">
          <v-btn v-if="!showForm" color="#09a347" dark @click="toggleShowForm">
            Add New Client
          </v-btn>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="mx-auto my-5" max-width="700">
            <v-card-title class="headline grey lighten-2 justify-center"  >John Doe</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Field</th>
                      <th class="text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Address</td>
                      <td>123 Main St, Springfield</td>
                    </tr>
                    <tr>
                      <td>Mobile Number</td>
                      <td>+1 555-1234</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>john.doe@example.com</td>
                    </tr>
                    <tr>
                      <td>NIC</td>
                      <td>123456789V</td>
                    </tr>
                    <tr>
                      <td>Birthday</td>
                      <td>1990-01-01</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
import NewClientForm from '@/components/NewClientForm.vue'
import ClientsList from '@/components/ClientsList.vue'

export default {
  components: {
    NewClientForm,
    ClientsList,
  },
  data() {
    return {
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
      clients: [], // Add clients data here
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
    handleClientsFetched(clients) {
      this.clients = clients // set the clients data fetched from ClientsList.vue
    },
  },
}

</script>
<style scoped >
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
  
  /* Table styles */
  .headline {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    padding: 20px 0;
    width: 100%; /* Ensure the title takes the full width */
  }
  
  .v-card {
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .v-simple-table {
    border-collapse: separate;
    border-spacing: 0 10px;
    width: 100%;
  }
  
  thead {
    display: none;
  }
  
  tbody tr {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  td {
    padding: 10px 20px;
  }
  
  td:first-child {
    font-weight: bold;
    color: #333;
  }
  
  td:last-child {
    color: #555;
    padding-left: 20px;
  }
  
  .v-simple-table td:nth-child(2) {
    padding-left: 20px; /* Adjust this value as needed */
  }
  
  .v-card-text {
    padding: 0;
  }
  
  .v-card-title {
    background-color: #f5f5f5;
    text-align: center; /* Center the text */
    display: flex;
    justify-content: center; /* Center the content */
    align-items: center; /* Center vertically */
  }
  
</style>
