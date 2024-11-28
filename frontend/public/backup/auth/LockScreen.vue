
vue
Copy code
<script setup lang="ts">
import { ref } from 'vue';
import AuthFooter from '@/components/AuthFooter.vue';

// Reactive password input
const password = ref('');

// Handle unlock functionality
const unlockScreen = () => {
  if (!password.value) {
    alert('Please enter your password.');
    return;
  }
  // Redirect logic here (e.g., to dashboard)
  console.log('Unlocking screen...');
};
</script>

<template>
  <div class="authentication-bg min-vh-100">
    <div class="bg-overlay bg-light"></div>
    <div class="container">
      <div class="d-flex flex-column min-vh-100 px-3 pt-4">
        <!-- Lock Screen Content -->
        <div class="row justify-content-center my-auto">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <!-- Logo -->
            <div class="mb-4 pb-2">
              <router-link to="/" class="d-block auth-logo">
                <img src="../../assets/images/logo1.png" alt="Logo Dark" height="16" class="auth-logo-dark me-start">
                <!-- <img src="../../assets/images/logo-light.png" alt="Logo Light" height="30" class="auth-logo-light me-start"> -->
              </router-link>
            </div>

            <!-- Card -->
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5>Lock Screen</h5>
                  <p class="text-muted">Enter your password to unlock the screen!</p>
                </div>

                <div class="p-2 mt-4">
                  <!-- User Thumbnail -->
                  <div class="user-thumb text-center mb-4">
                    <img src="../../assets/images/users/avatar-3.jpg" class="rounded-circle img-thumbnail avatar-lg" alt="User Avatar">
                    <h5 class="font-size-15 mt-3">Martin Gurley</h5>
                  </div>

                  <!-- Form -->
                  <form @submit.prevent="unlockScreen">
                    <div class="mb-3">
                      <label class="form-label" for="userpassword">Password</label>
                      <div class="position-relative auth-pass-inputgroup input-custom-icon">
                        <span class="bx bx-lock-alt"></span>
                        <input
                          type="password"
                          class="form-control"
                          id="password-input"
                          placeholder="Enter password"
                          v-model="password"
                        >
                      </div>
                    </div>

                    <div class="mt-4">
                      <button class="btn btn-primary w-100 waves-effect waves-light" type="submit">
                        Unlock
                      </button>
                    </div>

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Not you? Return
                        <router-link to="/" class="fw-medium text-primary"> Sign In </router-link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <AuthFooter />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles for this component here */
.auth-logo img {
  display: block;
}

.avatar-lg {
  width: 80px;
  height: 80px;
}

.auth-pass-inputgroup {
  position: relative;
}

.input-custom-icon span {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6c757d;
}

.input-custom-icon input {
  padding-left: 35px;
}
</style>
