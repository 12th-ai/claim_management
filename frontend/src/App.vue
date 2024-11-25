<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define state variables to store the response data and error message
const apiData = ref(null);
const errorMessage = ref('');

// Make the GET request when the component is mounted
onMounted(async () => {
  try {
    // Send GET request to your '/api' endpoint
    const response = await axios.get('/api'); // Adjust the URL if necessary
    apiData.value = response.data; // Store the response data in apiData
  } catch (error) {
    console.error('Error fetching data:', error);
    errorMessage.value = 'Failed to fetch data';
  }
});
</script>

<template>
  <div>
    <h1>welcome to my insurance application</h1>

    <!-- Display data from the GET request -->
    <div v-if="apiData">
      <h2>Message from backend </h2>
      <p>{{ apiData.message }}</p> <!-- Display the message received from the API -->
    </div>

    <!-- Display an error message if the request failed -->
    <div v-if="errorMessage" style="color: red;">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styling here */
</style>