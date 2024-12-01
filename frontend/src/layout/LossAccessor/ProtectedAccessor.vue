<template>
  <div id="layout-wrapper">
    <Sidebar />
    <main>
      <TopBar :user="user" />
      <div class="content-wrapper">
      <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../../components/LossAccessor/Sidebar.vue';
import TopBar from '../../components/LossAccessor/TopBar.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authService } from '../../services/LossAccessor/Auth'; // Import the authService

export default {
  name: 'ProtectedLayout',
  components: {
    Sidebar,
    TopBar,
  },
  data() {
    return {
      user: null,
      logoutInProgress: false, // Flag to track if logout is in progress
    };
  },
  mounted() {
    this.checkUserProfile(); // Fetch user profile data on mount
    setInterval(this.checkUserProfile, 1000); // Check profile every second
  },
  methods: {
    async checkUserProfile() {
      if (this.logoutInProgress) return; // Avoid further checks if logout is already in progress
      
      try {
        const userData = await authService.getProfile(); // Fetch profile from backend

        // If no user data found, log out
        if (!userData) {
          this.logout();
        } else {
          this.user = userData; // Set the user data in the component
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        this.logout(); // If error occurs, log out
      }
    },

    // Logout method to clear session and redirect
    logout() {
      if (this.logoutInProgress) return; // Prevent repeated logout requests

      this.logoutInProgress = true; // Set the flag to true, indicating logout is in progress

      Swal.fire({
        title: 'Session Expired',
        text: 'You are logged out.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
 
        // Add a delay before redirecting
        setTimeout(() => {
          this.$router.push('/LossAccessor'); // Redirect to the login page
        }, 1000); // Redirect after 2 seconds
      });
    },
  },
};
</script>






