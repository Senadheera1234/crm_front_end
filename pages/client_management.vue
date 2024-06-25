<template>
  <v-container>
    <v-row>
      <!-- Add new customer section -->
      <v-col cols="12" md="4">
                <v-card>
            <v-card-title>
                <v-row>
                <v-col>
                    <h3 style="font-size:18px;">Add New Customer</h3>
                </v-col>
                </v-row>
            </v-card-title>
            <v-card-text style="padding-bottom: 0;">
                <v-form style="padding: 0;padding-bottom: 0;">
                <v-text-field label="Full Name" v-model="fullName" outlined dense ></v-text-field>
                <v-text-field label="Address" v-model="address" outlined dense ></v-text-field>
                <v-text-field label="Phone" v-model="mobileNumber" outlined dense></v-text-field>
                <v-text-field label="Email" v-model="email" outlined dense></v-text-field>
                <v-text-field label="NIC" v-model="nic" outlined dense></v-text-field>
                <v-text-field label="Birthday" v-model="birthDay" outlined dense></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions style="padding-top: 0;">
                <v-spacer style="padding: 0;"></v-spacer>
                <v-btn color="primary" @click="createCustomer" style="padding-top: 0;  height: 30px;" >CREATE</v-btn>
            </v-card-actions>
            </v-card>
            
      </v-col>

      <!-- customer list section -->
      <v-col cols="12" md="8">


      </v-col>
    </v-row>
  </v-container>
</template>




<script>
export default {
  data() {
    return {
      fullName: '',
      address: '',
      mobileNumber: '',
      email: '',
      nic: '',
      birthday: ''
  
    }
  },
  methods: {
    createCustomer() {
     
    }
  }
}
</script>

<style scoped>
.v-card-title h3 {
  margin: 0;
  padding-left: 8px;
  border-left: 4px solid red;
}

</style>