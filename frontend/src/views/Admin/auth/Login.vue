<template>
  <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
    <div class="bg-overlay"></div>
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row" style="width:80%;margin-left:100px">
          <div class="col-lg-12">



            <div class="card overflow-hidden m-0">
              <div class="row justify-content-center g-0">
               
<AuthLeft />


                <div class="col-lg-6">
                  <div class="p-lg-5 p-4">
                    <div>
                      <h5 class="text-primary " style="text-align:center;font-size:18px;text-transform:capitalize;">login into <br /> <span style="font-size:30px;font-weight:bold"> claim insta</span> </h5>
                    </div>

                    <div class="mt-4">
                      <form @submit.prevent="submitForm">

                    
                        <div class="mb-3">
                          <label for="useremail" class="form-label">Email <span class="text-danger">*</span></label>
                          <input type="email" class="form-control" id="useremail" v-model="email" placeholder="Enter email address" required />
                          <div class="invalid-feedback">Please enter email</div>
                        </div>


                        <div class="mb-3">
                          <label class="form-label" for="password-input">Password <span class="text-danger">*</span></label>
                          <div class="position-relative auth-pass-inputgroup">
                            <input
                              :type="passwordVisible ? 'text' : 'password'"
                              class="form-control pe-5 password-input"
                              onpaste="return false"
                              placeholder="Enter password"
                              id="password-input"
                              v-model="password"
                              required
                            />
                            <button
                              class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              @click="togglePasswordVisibility"
                            >
                              <i :class="passwordVisible ? 'ri-eye-off-fill' : 'ri-eye-fill'" class="align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div class="mt-4">
                          <button class="btn btn-info w-100" type="submit">Sign in</button>
                        </div>
                      </form>

                      <div v-if="message" class="alert" :class="messageClass">{{ message }}</div>
                    </div>

                    <div class="mt-5 text-center">
                      <p class="mb-0">
                        Don't have an account? <router-link to="/register" class="fw-semibold text-primary text-decoration-underline"> Signup</router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '../../../services/Admin/Auth';
import AuthLeft from '../../../components/admin/AuthLeft.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    AuthLeft,
  },
  data() {
    return {
      email: '',
      password: '',
      passwordVisible: false,
      message: null,
      messageClass: '',
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    async submitForm() {
      if (!this.email || !this.password) {
        Swal.fire({
          title: 'Validation Error',
          text: 'Email and password are required.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        return;
      }

      try {
        const response = await authService.LoginUser({
          email: this.email,
          password: this.password,
        });

        // Show success notification
        Swal.fire({
          title: 'Success!',
          text: response.message || 'Login successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        this.isModalOpen = false; // Example for closing modal if `isModalOpen` is the state controlling it

// Add a delay before redirecting
setTimeout(() => {
    this.$router.push('/admin/dashboard'); // Adjust the route as needed
}, 2000); // Redirect after 2 seconds
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'An error occurred during login.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });

        console.error('Login Error:', error);
      }
    },
  },
};
</script>

<style scoped>


</style>
