<!-- ClientsList.vue -->
<template>
  <v-card class="mx-auto transparent" max-width="300" tile>
    <v-list class="transparent">
      <v-list-item-group>
        <v-card v v-for="client in clients" :key="client.id" class="mb-1">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ 'mdi-account' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ client.fullName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
  
  <script>
import axios from 'axios'

export default {
  name: 'ClientsList',
  data() {
    return {
      clients: [],
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    getClients() {
      axios.get('http://127.0.0.1:8000/api/clients').then((res) => {
        this.clients = res.data.data // assuming `data` array is where clients are nested
        this.$emit('clients-fetched', this.clients) // emit clients data to parent
      })
    },
  },
}
</script>
  
  <style scoped>
.transparent {
  background-color: transparent !important; /* Set background to transparent */
  box-shadow: none !important; /* Optionally remove box shadow */
}

.mb-1 {
  margin-bottom: 8px; /* Adjust spacing between items as needed */
}
</style>
  