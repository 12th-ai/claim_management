<template>
  

    <!-- <body data-layout="horizontal"> -->

    <div class="authentication-bg min-vh-100">
        <div class="bg-overlay bg-light"></div>
        <div class="container">
            <div class="d-flex flex-column min-vh-100 px-3 pt-4">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-8 col-lg-6 col-xl-5">

                        <div class="mb-4 pb-2">
                            <a href="index-2.html" class="d-block auth-logo">
                                <img src="../../assets/images/logo1.png" alt="" height="16" class="auth-logo-dark me-start">
                           
                            </a>
                        </div>

                        <div class="card">
                            <div class="card-body p-4"> 
                                <div class="p-2 my-2 text-center">
                                    <div class="avatar-lg mx-auto">
                                        <div class="avatar-title bg-light text-primary h2 rounded-circle">
                                            <i class="bx bxs-user"></i>
                                        </div>
                                    </div>

                                    <div class="mt-4 pt-2">
                                        <h5>You are Logged Out</h5>
                                        <p class="text-muted font-size-15">Thank you for using <span class="fw-semibold text-body">abyride</span></p>
                                        <div class="mt-4">
                                            <router-link to="/" class="btn btn-primary w-100 waves-effect waves-light">Sign In</router-link>
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        </div>

                    </div><!-- end col -->
                </div><!-- end row -->

                <AuthFooter />

            </div>
        </div><!-- end container -->
    </div>


</template>

<script>
import AuthFooter from '@/components/AuthFooter.vue';


export default {
  components: {
    AuthFooter
  },
      name: "LogoutComponent",

  };
</script>
