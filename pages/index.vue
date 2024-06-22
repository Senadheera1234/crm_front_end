<template>
  <v-row class="backgroundRow">
    <v-col cols="12" md="4" class="left-content backgroundCol">
      <v-container class="d-flex align-center justify-center login-container">
        <v-card class="pa-5" max-width="500">
          <v-card-title class="justify-center">
            <h3>Login</h3>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                required
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                required
                class="mb-4"
              ></v-text-field>
              <v-btn
                type="submit"
                color="#09a347"
                block
                large
                dark
                class="font-weight-bold"
                >Login</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>









<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submitForm() {
      // Simulate login logic (replace with actual API call)
      if (
        this.email === 'madhusanka@gmail.com' &&
        this.password === 'madhusanka'
      ) {
        // Redirect to clients page
        window.location.href = '/clients' // Replace with your actual clients page URL
      } else {
        alert('Invalid credentials')
      }
    },
  },
}
</script>

<style scoped>
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

.v-card {
  width: 100%; /* Ensure card takes full width of container */
}

.leftContent {
  border: 2px solid #ccc;
  border-radius: 8px;
}

.loginTextColor {
  color: white;
}
</style>
