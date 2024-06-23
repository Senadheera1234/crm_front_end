<template>
  <div>
    <h1>List of People</h1>
    <ul>
      <li v-for="(client, index) in clients" :key="index">
        {{ client.fullName }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "client",
  data() {
    return {
      clients: [],
    };
  }, 
  mounted() {
    this.getClients();
  },
  methods: {
    getClients() {
      axios.get('http://127.0.0.1:8000/api/clients').then(res => {
        this.clients = res.data.data; // assuming `data` array is where clients are nested
      });
    }
  }
};
</script>

<style scoped>
h1 {
  color: #333;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f0f0f0;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
