<template>
  <div class="authentication-bg min-vh-100">
    <div class="bg-overlay bg-light"></div>
    <div class="container">
      <div class="d-flex flex-column min-vh-100 px-3 pt-4">
        <div class="row justify-content-center my-auto">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="mb-4 pb-2">
              <router-link to="/" class="d-block auth-logo">
                <img
                  src="@/assets/images/logo1.png"
                  alt=""
                  class="auth-logo-dark me-start h-16"
                />
              </router-link>
            </div>

            <div class="card" style="width:500px">
              <div class="card-body p-4 center" id="profile">
                <div class="p-2 mt-4">
                  <form @submit.prevent="handleLogin">
                    <div class="avatar">
                      <div
                        class="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2 cursor-pointer"
                        @click="triggerFileInput"
                      >
                        <img :src="image" alt="Avatar" class="object-cover" />
                      </div>
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        @change="handleImageChange"
                        class="hidden"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="username">Username</label>
                      <div class="position-relative input-custom-icon">
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Enter username"
                          v-model="username"
                        />
                        <span class="bx bx-user"></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="email">Email</label>
                      <div class="position-relative input-custom-icon">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Enter Email"
                          v-model="email"
                        />
                        <span class="bx bx-envelope"></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link
                          to="/forgot-password"
                          class="text-muted text-decoration-underline"
                          >Forgot password?</router-link
                        >
                      </div>
                      <label class="form-label" for="password-input"
                        >Password</label
                      >
                      <div class="position-relative auth-pass-inputgroup input-custom-icon">
                        <span class="bx bx-lock-alt"></span>
                        <input
                          type="password"
                          class="form-control"
                          id="password-input"
                          placeholder="Enter password"
                          v-model="password"
                        />
                        <button
                          type="button"
                          class="btn btn-link position-absolute h-100 end-0 top-0"
                          id="password-addon"
                          @click="togglePasswordVisibility"
                        >
                          <i
                            :class="
                              passwordVisible
                                ? 'mdi mdi-eye-off-outline'
                                : 'mdi mdi-eye-outline'
                            "
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div class="mt-3">
                      <button
                        class="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Do you have account yet?
                        <router-link to="/" class="fw-medium text-primary"
                          >Sign in here</router-link
                        >
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      <AuthFooter />
      </div>
    </div>
  </div>
</template>

<script>

import defaultImage from "@/assets/images/users/avatar-6.jpg";
import AuthFooter from '@/components/AuthFooter.vue';


export default {
  components: {
    AuthFooter
  },
  name: "RegisterComponent",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      passwordVisible: false,
      image: defaultImage,
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    handleRegister() {
      console.log("Login attempted:", {
        username: this.username,
        password: this.password,
        email: this.email,
      });
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      const passwordInput = document.getElementById("password-input");
      passwordInput.type = this.passwordVisible ? "text" : "password";
    },
    triggerFileInput() {
      // Trigger the file input click event
      this.$refs.fileInput.click();
    },
    handleImageChange(event) {
      // Handle image change when a new image is selected
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result; // Set the image as the selected file
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 80px; /* You can adjust the width as needed */
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  background-color: #f0f0f0; /* Light background color */
  border: 2px solid #ddd; /* Optional border around the image */
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hidden {
  display: none;
}
</style>
