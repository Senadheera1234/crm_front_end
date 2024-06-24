<template>
  <v-row class="backgroundCol">
    <v-col cols="12" md="3" class="left-content backgroundRow 3colSection">
      <v-container class="login-container">
        <ClientsList
          v-if="!showForm"
          :clients="clients"
          @clients-fetched="handleClientsFetched"
          @client-selected="handleClientSelected"
        />
        <NewClientForm
          v-else
          :form.sync="form"
          :rules="rules"
          @submit="handleFormSubmit"
          @back="handleBack"
        />
      </v-container>

    </v-col>

    <!-- Right Content -->
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
          <div v-if="!selectedClient.id && !showForm" class="instruction-title">
            Click on a client to view the details.
          </div>

          <!-- Client Details Card -->

          <v-card
            v-if="selectedClient.id && !showForm && !isEditing"
            class="mx-auto my-5"
            max-width="700"
          >
            <v-card-title class="headline grey lighten-2 justify-center">{{
              selectedClient.fullName
            }}</v-card-title>
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
                      <td>{{ selectedClient.address }}</td>
                    </tr>
                    <tr>
                      <td>Mobile Number</td>
                      <td>{{ selectedClient.mobileNumber }}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{{ selectedClient.email }}</td>
                    </tr>
                    <tr>
                      <td>NIC</td>
                      <td>{{ selectedClient.nic }}</td>
                    </tr>
                    <tr>
                      <td>Birthday</td>
                      <td>{{ form.birthday }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" small @click="deleteClient"
                >Delete Client</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="primary" small @click="editClient"
                >Edit Client</v-btn
              >
            </v-card-actions>
          </v-card>

                   


<!-- Edit Client Form -->
<v-card v-if="isEditing" class="mx-auto my-5" max-width="700">
            <v-card-title class="headline grey lighten-2 justify-center">
              Edit Client
            </v-card-title>
            <v-card-text>
              <v-form ref="editForm" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="form.fullName"
                  :rules="[rules.required]"
                  label="Full Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.address"
                  :rules="[rules.required]"
                  label="Address"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.mobileNumber"
                  :rules="[rules.phone, rules.required]"
                  label="Mobile Number"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  :rules="[rules.email, rules.required]"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.nic"
                  :rules="[rules.nic, rules.required]"
                  label="NIC"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.birthday"
                  :rules="[rules.required]"
                  label="Birthday"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="updateClient">Update</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="cancelEdit">Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
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
      isEditing: false,
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
      selectedClient: {},
    }
  },

  methods: {
    toggleShowForm() {
      this.showForm = !this.showForm
      if (this.showForm) {
        this.selectedClient = {} // Clear selected client when form is shown
      }
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
    handleClientSelected(clientId) {
      // Find the selected client from clients array
      const selectedClient = this.clients.find(
        (client) => client.id === clientId
      )
      this.selectedClient = selectedClient

      // Update the form's birthday based on the selected client's NIC
      if (selectedClient && selectedClient.nic) {
        this.updateBirthdayFromNIC(selectedClient.nic)
      }
    },

    updateBirthdayFromNIC(nic) {
      if (nic && (nic.length === 10 || nic.length === 12)) {
        let year = ''
        let dayOfYear = 0
        if (nic.length === 10) {
          year = '19' + nic.substring(0, 2)
          dayOfYear = parseInt(nic.substring(2, 5), 10)
        } else {
          year = nic.substring(0, 4)
          dayOfYear = parseInt(nic.substring(4, 7), 10)
        }
        const isFemale = dayOfYear > 500
        if (isFemale) {
          dayOfYear -= 500
        }
        const date = new Date(Number(year), 0)
        date.setDate(dayOfYear)
        this.$set(this.form, 'birthday', date.toISOString().split('T')[0]) // Use $set to ensure reactivity
      } else {
        this.form.birthday = '' // Clear birthday if NIC is invalid
      }
    },

    cancelEdit() {
      this.isEditing = false
    },
          async updateClient() {
        if (this.$refs.editForm.validate()) {
          try {
            // Send PUT request to update the client
            await axios.put(`http://127.0.0.1:8000/api/clients/${this.selectedClient.id}`, {
              fullName: this.form.fullName,
              address: this.form.address,
              mobileNumber: this.form.mobileNumber,
              email: this.form.email,
              nic: this.form.nic,
              birthday: this.form.birthday,
            });

            // Update the client details in the clients array
            const clientIndex = this.clients.findIndex((client) => client.id === this.selectedClient.id);
            if (clientIndex !== -1) {
              this.$set(this.clients, clientIndex, { ...this.selectedClient, ...this.form });
            }
            this.isEditing = false;
          } catch (error) {
            console.error('Error updating client:', error);
          }
        }
      },
    editClient() {
      this.isEditing = true
      Object.assign(this.form, this.selectedClient)
    },



    async deleteClient() {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/clients/${this.selectedClient.id}`);
      
      // Remove the deleted client from the clients array
      this.clients = this.clients.filter(client => client.id !== this.selectedClient.id);
      
      // Clear the selected client and form
      this.selectedClient = {};
      this.clearForm();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
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

.instruction-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #555;
  margin-top: 15px;
}
</style>
