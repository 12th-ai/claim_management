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
                  alt="logo-dark"
                  height="16"
                  class="auth-logo-dark me-start"
                />
               
              </router-link>
            </div>

            <!-- Card Section -->
            <div class="card">
              <div class="card-body p-4">
                <div class="p-2 my-2">
                  <!-- Avatar Section -->
                  <div class="avatar-lg mx-auto">
                    <div class="avatar-title rounded-circle bg-light">
                      <i class="bx bxs-envelope h2 mb-0 text-primary"></i>
                    </div>
                  </div>

                  <div class="text-center mt-4">
                    <h4>Verify your email</h4>
                    <p class="mb-5">
                      Please enter the 4 digit we have sent to your email
                      <span class="fw-bold">{{ email }}</span>
                    </p>
                  </div>

                  <!-- Form Section -->
                  <form @submit.prevent="confirmCode">
                    <div class="row">
                      <div
                        v-for="(digit, index) in code"
                        :key="index"
                        class="col-3"
                      >
                        <div class="mb-3">
                          <label
                            :for="'digit' + (index + 1) + '-input'"
                            class="visually-hidden"
                          >
                            Digit {{ index + 1 }}
                          </label>
                          <input
                            type="text"
                            class="form-control form-control-lg text-center two-step"
                            maxlength="1"
                            v-model="code[index]"
                            :id="'digit' + (index + 1) + '-input'"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-3">
                      <button
                        class="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                      >
                        Confirm
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


                  <div class="mt-4 text-center">
                
                  </div>
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
import AuthFooter from '@/components/AuthFooter.vue';


export default {
  components: {
    AuthFooter
  },
  name: "Verify-otp",
  data() {
    return {
      email: "", // Replace with dynamic email as needed
      code: ["", "", "", ""], // 4-digit code
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    confirmCode() {
      const enteredCode = this.code.join("");
      console.log("Entered Code:", enteredCode);
      // Add logic to verify the code here
    },
    resendEmail() {
      console.log("Resend email clicked!");
      // Add logic to resend email here
    },
  },
};
</script>

<style scoped>

</style>
