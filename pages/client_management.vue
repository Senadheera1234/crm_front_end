<template>
  <v-container class="container-fluid">
    <v-row>
      <!-- Add new customer section -->
      <v-col cols="12" md="3" style="padding-left: 0; margin-left: 0">
        <v-card class="custom-card" flat style="margin-left: 0">
          <v-card-title>
            <v-row>
              <v-col class="custom-field" style="padding-bottom: 10px">
                <h3 class="custom-title">
                  {{ isEditing ? 'Edit Client' : 'Add New Client' }}
                </h3>
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
                label="Birth Day"
                :rules="[rules.required]"
                v-model="localForm.birthDay"
                outlined
                dense
                readonly
                class="custom-field"
              ></v-text-field>
              <v-spacer class="custom-field"></v-spacer>

              <v-row>
                <v-btn
                  color="warning"
                  @click="cancelEdit"
                  v-if="isEditing"
                  style="
                    height: 30px;
                    width: 80px;
                    margin: 0 !important;
                    justify-self: start;
                  "
                >
                  CANCEL
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  v-if="!isEditing"
                  color="primary"
                  type="submit"
                  style="height: 30px; padding: 0 20px 0 20; margin: 0 0 0 0"
                >
                  CREATE
                </v-btn>
                <v-btn
                  v-else
                  color="primary"
                  @click="handleUpdate"
                  style="height: 30px; padding: 0 20px 0 20; margin: 0 0 0 0"
                >
                  UPDATE
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9" style="padding-right: 0; margin-right: 0">
        <v-card dense flat>
          <v-card-title>
            <h3 class="custom-title">Client List</h3>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredClients"
            item-key="name"
            class="elevation-1"
            dense
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon style="color: brown" small @click="editCustomer(item)"
                >mdi-pencil</v-icon
              >
            </template>
          </v-data-table>

          ''
        </v-card>
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
      search: '',
      isEditing: false,
      currentClientId: null,
      headers: [
        { text: 'Name', align: 'start', sortable: false, value: 'fullName' },
        { text: 'Address', value: 'address' },
        { text: 'Phone', value: 'mobileNumber' },
        { text: 'Email', value: 'email' },
        { text: 'NIC', value: 'nic' },
        { text: 'Birth Day', value: 'birthDay' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],

      localForm: {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthDay: '',
      },
      rules: {
        required: (value) => {
          console.log('Validating required:', value)
          return !!value || 'Required.'
        },
        email: (value) => {
          console.log('Validating email:', value)
          return /.+@.+\..+/.test(value) || 'Invalid email.'
        },
        nic: (value) => {
          console.log('Validating NIC:', value)
          return (
            /^\d{9}[VvXx]$/.test(value) ||
            /^\d{12}$/.test(value) ||
            'Invalid NIC format.'
          )
        },
        phone: (value) => {
          console.log('Validating phone:', value)
          return /^\d{10}$/.test(value) || 'Invalid phone number.'
        },
      },
    }
  },

  mounted() {
    this.fetchClients()
  },
  methods: {
    updateForm(field, value) {
      this.localForm[field] = value
      //   this.$emit('update:form', { ...this.localForm })
    },
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          if (this.isEditing) {
            // Update existing client
            await axios.put(
              `http://127.0.0.1:8000/api/clients/${this.currentClientId}`,
              this.localForm
            )
            alert('Client updated successfully!')
          } else {
            // Create new client
            await axios.post(
              'http://127.0.0.1:8000/api/clients',
              this.localForm
            )
            alert('Client added successfully!')
          }
          this.clearForm()
          this.fetchClients()
        } catch (error) {
          alert(
            `Error ${this.isEditing ? 'updating' : 'adding'} client: ${
              error.message
            }`
          )
        }
      }
    },
    async handleUpdate() {
      // This method is called when updating an existing client directly via the UPDATE button
      if (this.$refs.form.validate()) {
        try {
          await axios.put(
            `http://127.0.0.1:8000/api/clients/${this.currentClientId}`,
            this.localForm
          )
          alert('Client updated successfully!')
          this.clearForm()
          this.fetchClients()
          this.isEditing = false // Reset editing mode
        } catch (error) {
          alert(`Error updating client: ${error.message}`)
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

    async fetchClients() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clients')
        this.clients = response.data.data
      } catch (error) {
        alert(`Error fetching Clients: ${error.message}`)
      }
    },
    editCustomer(item) {
      this.localForm = { ...item }
      this.currentClientId = item.id
      this.isEditing = true
      window.scrollTo(0, 0) // Scroll to top to see the form
    },

    getItemClass() {
      // from here we have methods for clients show table
      return 'small-font'
    },
    cancelEdit() {
      this.clearForm();
      this.isEditing = false;
   
    },
  },
  computed: {
    filteredClients() {
      return this.clients.filter((client) =>
        client.fullName.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  },
}
</script>


<style scoped>
.container-fluid {
  padding: 0 15px; /* Adjust the padding if needed */
}

.row {
  margin: 0;
}

.col-md-3,
.col-md-9 {
  padding: 15px; /* Adjust the padding if needed */
}

.table {
  width: 100%;
}
.small-font {
  font-size: 2px; /* Adjust as needed */
}
.small-font th,
.small-font td {
  padding: 0px 0px; /* Adjust padding as needed */
}
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
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.v-data-table th,
.v-data-table td {
  padding: 2px !important; /* Adjust padding as needed */
}

::v-deep .v-data-table {
  font-size: 10px !important;
}

::v-deep .v-data-table th,
::v-deep .v-data-table td {
  padding: 10px !important; /* Adjust padding as needed */
  font-size: 9.2px !important;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
