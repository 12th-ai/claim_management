<template>
  <div>
  
    <!-- This will display the child routes (login, register, etc.) -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style scoped>
/* Add any global styles for the Auth Layout here */
h1 {
  text-align: center;
  margin-top: 20px;
  color: #4CAF50; 
  font-family: 'poppins',;
}
</style>
