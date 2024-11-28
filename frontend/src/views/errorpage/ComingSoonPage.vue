<template>
  <div class="coming-soon min-vh-100" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Home Button -->
    <div class="home-btn d-none d-sm-block">
      <router-link to="/dashboard" class="text-white">
        <i class="bx bx-left-arrow h3 text-primary"></i>
      </router-link>
    </div>

    <!-- Authentication Background -->
    <div class="bg-overlay bg-light"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center">
            <!-- Logo -->
            <router-link to="/" class="d-block auth-logo">
              <img src="@/assets/images/logo1.png" style="margin-top:30px" alt="Logo Dark" height="16" class="auth-logo-dark mx-auto">
         
            </router-link>

            <!-- Coming Soon Image -->
            <div class="row justify-content-center mt-5">
              <div class="col-sm-6">
                <div class="maintenance-img">
                  <img src="@/assets/images/coming-soon.png" alt="Coming Soon" class="img-fluid mx-auto d-block">
                </div>
              </div>
            </div>

            <!-- Text Section -->
            <h4 class="mt-5">Let's get started with abytech</h4>
            <p class="text-muted">It will be as simple as Occidental in fact it will be Occidental.</p>

            <!-- Countdown -->
            <div class="row justify-content-center mt-5">
              <div class="col-md-9">
                <div id="countdown" class="countdownlist"></div>
              </div>
            </div>

            <!-- Email Subscription -->
            <div class="input-group countdown-input-group mx-auto my-5">
              <input
                type="email"
                class="form-control border-light shadow"
                placeholder="Enter your email address"
                aria-label="search result"
                aria-describedby="button-email"
              />
              <button class="btn btn-primary" type="button" id="button-email">
                Send <i class="bx bx-paper-plane ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgImage from "@/assets/images/bg-1.png";

export default {
  name: "ComingSoon",
  data() {
    return {
      bgImage,
    };
  },
};
</script>

<style scoped>
.coming-soon {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.home-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.auth-logo img {
  display: block;
}

.countdown-input-group {
  max-width: 500px;
}
</style>
