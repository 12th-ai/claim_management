<template>
  <div class="authentication-bg min-vh-100">
    <div class="bg-overlay bg-light"></div>
    <div class="container">
      <div class="d-flex flex-column min-vh-100 px-3 pt-4">
        <div class="row justify-content-center my-auto">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <!-- Logo Section -->
            <div class="mb-4 pb-2">
              <router-link to="/" class="d-block auth-logo">
                <img
                  src="@/assets/images/logo1.png"
                  alt=""
                  height="16"
                  class="auth-logo-dark me-start"
                />
             
              </router-link>
            </div>

            <!-- Card Section -->
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5>Reset Password</h5>
                  <p class="text-muted">Reset Password with abyride.</p>
                </div>
                <div class="p-2 mt-4">
                  <!-- Alert -->
                  <div
                    class="alert alert-success text-center small mb-4"
                    role="alert"
                  >
                    Enter your Email and instructions will be sent to you!
                  </div>

                  <!-- Form -->
                  <form @submit.prevent="handleReset">
                    <div class="mb-3">
                      <label class="form-label" for="email">Email</label>
                      <div class="position-relative input-custom-icon">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Enter email"
                          v-model="email"
                          @input="console.log(email)"
                          required
                        />
                        <span class="bx bx-envelope"></span>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button
                        class="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                      >
                        Reset
                      </button>
                    </div>

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Remember It?
                        <router-link to="/" class="fw-medium text-primary">
                          Sign in
                        </router-link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Section -->
        <AuthFooter />
      </div>
    </div>
  </div>
</template>

<script>
import AuthFooter from '@/components/AuthFooter.vue';


export default {
  components: {
    AuthFooter
  },
  name: "forgot-password",
  data() {
    return {
      email: "",
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    handleReset() {
       console.log("otp sent attempted:", {
        // email: this.email,
      });
    },
  },
};
</script>

<style scoped>

</style>
