<template>
  <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
    <div class="bg-overlay"></div>
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">



            <div class="card overflow-hidden m-0">
              <div class="row justify-content-center g-0">
               
<AuthLeft />


                <div class="col-lg-6">
                  <div class="p-lg-5 p-4">
                    <div>
                      <h5 class="text-primary " style="text-align:center">Create Account</h5>
                    </div>

                    <div class="mt-4">
                      <form @submit.prevent="submitForm">

                        <div class="mb-3">
                          <div class="avatar">
                            <div class="avatar" style="cursor: pointer;" @click="triggerAvatarInput">
                              <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="rounded-circle" />
                              <img v-else src="../../../assets/images/users/avatar-1.jpg" alt="Default Avatar"  />
                            </div>
                            <input type="file" id="avatar" ref="avatarInput" class="d-none" @change="handleAvatarChange" />
                          </div>
                        </div>

                        <div class="mb-3">
                          <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                          <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username" required />
                          <div class="invalid-feedback">Please enter username</div>
                        </div>
                        <div class="mb-3">
                          <label for="useremail" class="form-label">Email <span class="text-danger">*</span></label>
                          <input type="email" class="form-control" id="useremail" v-model="email" placeholder="Enter email address" required />
                          <div class="invalid-feedback">Please enter email</div>
                        </div>

                        <div class="mb-3">
                          <label for="phoneNumber" class="form-label">PhoneNumber <span class="text-danger">*</span></label>
                          <input type="text" class="form-control" id="phoneNumber" v-model="phoneNumber" placeholder="Enter PhoneNumber" required />
                          <div class="invalid-feedback">Please enter PhoneNumber</div>
                        </div>

                        <div class="mb-3">
                          <label class="form-label" for="password-input">Password</label>
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
                          <button class="btn btn-info w-100" type="submit">Sign Up</button>
                        </div>
                      </form>

                      <div v-if="message" class="alert" :class="messageClass">{{ message }}</div>
                    </div>

                    <div class="mt-5 text-center">
                      <p class="mb-0">
                        Already have an account ? <router-link to="/" class="fw-semibold text-primary text-decoration-underline"> Signin</router-link>
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
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      avatarFile: null, // Holds the file object for upload
      avatarUrl: null,
      passwordVisible: false,
      message: null,
      messageClass: '',
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    triggerAvatarInput() {
      this.$refs.avatarInput.click();
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatarFile = file; // Save the file for FormData
        const reader = new FileReader();
        reader.onload = () => {
          this.avatarUrl = reader.result; // Update avatar preview
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('phoneNumber', this.phoneNumber);
      formData.append('password', this.password);
      if (this.avatarFile) {
        formData.append('profileImage', this.avatarFile); // Add the file
      }

      try {
        const response = await authService.registerUser(formData);

        // Show success notification
        Swal.fire({
          title: 'Success!',
          text: response.message || 'Account created successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

          // Add a delay before redirecting

    // Close the modal (assuming you have a method or data to control the modal state)
    this.isModalOpen = false; // Example for closing modal if `isModalOpen` is the state controlling it

    // Add a delay before redirecting
    setTimeout(() => {
        this.$router.push('/admin'); // Adjust the route as needed
    }, 2000); // Redirect after 2 seconds

      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'An error occurred during registration',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });

        // Log the error for debugging
        console.error('Error saving data:', error);
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  background-color: #f0f0f0;
  border: 2px solid #ddd;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rounded-circle{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rounded-circle img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
