<!-- ClientsList.vue -->
<template>
    <v-card class="mx-auto transparent" max-width="300" tile>
      <v-list class="transparent">
        <v-list-item-group>
          <v-card
            v-for="(client, index) in clients"
            :key="index"
            class="mb-1"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ 'mdi-account' }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ client }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list-item-group>
      </v-list>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      clients: {
        type: Array,
        required: true,
      },
    },
  };
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
  