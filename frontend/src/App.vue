<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

// Define state variables to store the response data and error message
const apiData = ref(null);
const errorMessage = ref('');
let intervalId = null;

// Function to fetch data from the backend
const fetchData = async () => {
  try {
    // Send GET request to your '/api' endpoint
    const response = await axios.get('http://localhost:3000/api'); // Adjust the URL if necessary
    apiData.value = response.data; // Store the response data in apiData
  } catch (error) {
    console.error('Error fetching data:', error);
    errorMessage.value = 'Failed to fetch data';
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchData(); // Fetch initial data
  // Set up polling (fetch data every 5 seconds)
  intervalId = setInterval(fetchData, 100);
});

// Clean up polling when the component is destroyed
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId); // Stop polling when the component is destroyed
  }
});
</script>

<template>
  <div>
    <h1>API Response</h1>

    <!-- Display data from the GET request -->
    <div v-if="apiData">
      <h2>Message</h2>
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

