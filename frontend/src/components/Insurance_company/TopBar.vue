<template>
  <header id="page-topbar" style="z-index: 0; width: 84%; margin-left: 50px">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- Welcome message with fallback for user.username -->
          <h1 style="font-size:20px; text-transform:capitalize">
            Welcome Back {{ user?.username || 'Guest' }}
          </h1>
       
        </div>

        <div class="d-flex align-items-center">
          <div class="clock">
      <i class="mdi mdi-clock-outline fs-24 me-2"></i> <!-- Clock icon -->
      <p>{{ currentHour }} : {{ currentMinute }} : {{ currentSecond }}</p>
    </div>
          <div class="dropdown ms-sm-3 header-item topbar-user" >
            <button
              type="button"
              class="btn"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="d-flex align-items-center">
                <!-- Check if user profile image exists, else show default image -->
                 <!-- Profile Image -->
                 <img
                  v-if="user && user.profileImage"
                  class="rounded-circle header-profile-user"
                  :src="profileImageUrl"
                  alt="Header Avatar"
                />
                <img
                  v-else
                  class="rounded-circle header-profile-user"
                  src="../../assets/images/users/avatar-1.jpg"
                  alt="Default Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">
                    {{ user?.username || 'Admin' }}
                  </span>
                  <span class="d-none d-xl-block ms-1 fs-13 user-name-sub-text">
                    {{ user?.email || '' }}
                  </span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end" style="z-index:12px" >
              <!-- Welcome message in dropdown with fallback -->
              <h6 class="dropdown-header">
                Welcome {{ user?.username || 'Guest' }}!
              </h6>
              <!-- Profile link -->
              <router-link class="dropdown-item" to="comingsoon">
                <i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profile</span>
              </router-link>

              <!-- Logout button -->
              <button class="dropdown-item" @click="logout">
                <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" style="z-index:4" data-key="t-logout">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { authService } from "../../services/Company/Auth";

export default {
  props: {
    user: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_IMAGE_URL, // Store base URL here
      errorMessage: null,
      currentHour: new Date().getHours(),
      currentMinute: new Date().getMinutes(),
      currentSecond: new Date().getSeconds(),
    };
  },
  computed: {
    profileImageUrl() {
      return `${this.baseUrl}${this.user?.profileImage || ''}`;
    },
  },
  mounted() {
    setInterval(() => {
      const now = new Date();
      this.currentHour = now.getHours();
      this.currentMinute = now.getMinutes();
      this.currentSecond = now.getSeconds();
    }, 1000); // Update every second
  },
  methods: {
    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Logout failed:', error);
        this.errorMessage = 'Logout failed. Please try again.';
      }
    },
  },
};
</script>
<style scoped>

.clock {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
}

.clock p {
  margin: 0;
}

.clock i {
  color: #1c3b8c; /* Green color for the clock icon */
}
</style>
