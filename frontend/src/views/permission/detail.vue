<template>
  <!-- ============================================================== -->
  <div class="main-content">
    <div class="page-content" id="main-content">
      <div class="container-fluid" style="margin-top: 20px; border-radius: 20px">
        <div class="profile-foreground position-relative mx-n4 mt-n4">
          <div class="profile-wid-bg"  style="border-radius: 20px;z-index:-10">
          </div>
        </div>

        <div class="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
          <div class="row g-4">
            <div class="col-auto">
              <div class="avatar-wrapper">
                <img :src="imageUrl" alt="Loss Logo" class="img-thumbnail rounded-circle" />
              </div>
            </div>
            <div class="col">
              <div class="p-2">
                <h3 class="text-white mb-1">{{ loss.lossName }}</h3>
           
                <div class="hstack text-white-50 gap-1">
                  <div>
                    <i class="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                    {{ loss.lossName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="d-flex profile-wrapper">
              <ul class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                <li class="nav-item">
                  <a class="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab">
                    <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span class="d-none d-md-inline-block">Overview</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="tab-content pt-4 text-muted">
              <div class="tab-pane active" id="overview-tab" role="tabpanel">
                <div class="row">
                  <div class="col-xxl-3">
                     <!-- Card -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2">Permission control</h5>
       
        <!-- Button to open Modal -->
        <button class="btn btn-primary mt-4" @click="openModal">Enable More Permissions</button>

      </div>
    </div>

                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title mb-3">Info</h5>
                        <div class="table-responsive">
                          <table class="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th class="ps-0" scope="row">Full Name :</th>
                                <td class="text-muted">{{ loss.lossName }}</td>
                              </tr>
                              <tr>
                                <th class="ps-0" scope="row">Mobile :</th>
                                <td class="text-muted">{{ loss.phoneNumber }}</td>
                              </tr>
                              <tr>
                                <th class="ps-0" scope="row">E-mail :</th>
                                <td class="text-muted">{{ loss.email }}</td>
                              </tr>

                              <tr>
                                <th class="ps-0" scope="row">Joining Date</th>
                                <td class="text-muted">{{ new Date(loss.createdAt).toLocaleDateString() }}</td>
                              </tr>
                              <!-- Go Back Button -->
                              <button class="btn btn-primary mt-2 w-100 pl-2 pt-0 pb-0 pr-2 d-flex align-items-center  justify-content-between text-white" @click="goBack">
                                <i class="ri-arrow-left-line mb-3" style="fill:white;color:white;height:10px;margin-right:-30px"></i> 
                                Go Back
                              </button>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xxl-9">
                    <div class="card-body">
                      <!-- Grid layout for modules -->
                      <div class="d-grid gap-3" style="grid-template-columns: repeat(3, 1fr);">
                        <!-- Loop through the Modules array -->
                        <div v-for="module in loss.Modules" :key="module.id" class="module-item">
                          <!-- Module Card -->
                          <div :class="['card p-3', { 'bg-light': !module.isActive }]" :disabled="!module.isActive">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                              <h6 class="card-title">{{ module.module_name }}</h6>
                              <div v-if="module.isActive" class="text-success">
                                <!-- Enabled Icon for active module -->
                                <i class="ri-check-fill"></i> 
                                <span>Enabled</span>
                              </div>
                              <div v-else class="text-danger">
                                <!-- Disabled Icon for inactive module -->
                                <i class="ri-close-fill"></i>
                                <span>Disabled</span>
                              </div>
                              <a href="javascript:void(0);" @click="toggleStatus(module)" class="link-warning" title="Deny Access" :disabled="isFormDisabled">
                                <i class="ri-lock-line"> </i> 
                                <span>Deny Access</span>
                              </a>
                            </div>
                            
                            <!-- Accordion for Module Description (Enabled Modules) -->
                            <div v-if="module.isActive" class="accordion mt-3">
                              <div class="accordion-item">
                                <h2 class="accordion-header" :id="'headingEnabled' + module.id">
                                  <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                          :data-bs-target="'#collapseEnabled' + module.id" 
                                          aria-expanded="false" 
                                          :aria-controls="'collapseEnabled' + module.id">
                                    Module Description
                                  </button>
                                </h2>
                                <div :id="'collapseEnabled' + module.id" class="accordion-collapse collapse" 
                                     aria-labelledby="'headingEnabled' + module.id" 
                                     data-bs-parent="#accordionExample">
                                  <div class="accordion-body">
                                    <p>{{ module.description }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Accordion for Disabled Modules -->
                            <div v-else class="accordion mt-3">
                              <div class="accordion-item">
                                <h2 class="accordion-header" :id="'headingDisabled' + module.id">
                                  <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                          :data-bs-target="'#collapseDisabled' + module.id" 
                                          aria-expanded="false" 
                                          :aria-controls="'collapseDisabled' + module.id">
                                    Why This Module Is Disabled
                                  </button>
                                </h2>
                                <div :id="'collapseDisabled' + module.id" class="accordion-collapse collapse" 
                                     aria-labelledby="'headingDisabled' + module.id" 
                                     data-bs-parent="#accordionExample">
                                  <div class="accordion-body">
                                    <p>This module is currently disabled. It may require admin permissions or is not fully activated yet.</p>
                                    <p>For further assistance, contact support.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title mb-3">Social Media</h5>
                        <div class="d-flex flex-wrap gap-3">
                          <div v-for="social in loss.socialMedia" :key="social.url" class="d-flex align-items-center">
                            <i :class="getSocialIconClass(social.name)" class="fs-18 me-2"></i>
                            <a :href="social.url" target="_blank" class="text-muted">{{ social.name }}</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title mb-3">Location</h5>
                        <!-- In the template -->
                        <div class="me-2">
                          <i class="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                          {{ getFirstBranchAddress(loss.branches) || 'Location unavailable' }}
                        </div>

                        <!-- If you want to show the map link as a clickable URL -->
                        <div v-if="getFirstBranchMapLink(loss.branches)">
                          <a :href="getFirstBranchMapLink(loss.branches)" target="_blank" class="text-muted">
                            View on Map
                          </a>
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
    </div>
  </div>

  <div class="modal fade" id="moduleModal" tabindex="-1" aria-labelledby="moduleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="moduleModalLabel">Module Permissions</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Modal content for permissions -->
          Add more permissions here if needed
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loss: {},  // Holds loss details
      isFormDisabled: false
    };
  },
  computed: {
    imageUrl() {
      return this.loss.logo || '/path/to/placeholder.png';  // Provide fallback image
    }
  },
  methods: {
    openModal() {
      // Handle opening the modal here
    },
    toggleStatus(module) {
      // Toggle the status of the module
    },
    getSocialIconClass(name) {
      switch (name.toLowerCase()) {
        case 'facebook':
          return 'ri-facebook-fill';
        case 'twitter':
          return 'ri-twitter-fill';
        default:
          return 'ri-link';
      }
    },
    getFirstBranchAddress(branches) {
      return branches && branches.length > 0 ? branches[0].address : null;
    },
    getFirstBranchMapLink(branches) {
      return branches && branches.length > 0 ? branches[0].mapLink : null;
    }
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
