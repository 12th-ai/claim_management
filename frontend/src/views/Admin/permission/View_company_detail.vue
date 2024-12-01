<template>

  <div class="main-content">
    <div class="page-content" id="main-content">
      <div class="container-fluid" style="margin-top: 20px; border-radius: 20px">
        <div class="profile-foreground position-relative mx-n4 mt-n4">
          <div class="profile-wid-bg"  style="border-radius: 20px;">
          
          </div>
        </div>

        <div class="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
          <div class="row g-4">
            <div class="col-auto">
              <div class="avatar-wrapper">
                <img :src="imageUrl" alt="Company Logo" class="img-thumbnail rounded-circle" />
              </div>
            </div>
            <div class="col">
              <div class="p-2">
                <h3 class="text-white mb-1">{{ company.companyName }}</h3>
           
                <div class="hstack text-white-50 gap-1">

                  <div>
                    <i class="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>
                    {{ company.companyName }}
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
        <h5 class="card-title mb-2">Permission controll</h5>
       
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
                                <td class="text-muted">{{ company.companyName }}</td>
                              </tr>
                              <tr>
                                <th class="ps-0" scope="row">Mobile :</th>
                                <td class="text-muted">{{ company.phoneNumber }}</td>
                              </tr>
                              <tr>
                                <th class="ps-0" scope="row">E-mail :</th>
                                <td class="text-muted">{{ company.email }}</td>
                              </tr>


                              <tr>
                                <th class="ps-0" scope="row">Joining Date</th>
                                <td class="text-muted">{{ new Date(company.createdAt).toLocaleDateString() }}</td>
                              </tr>
                              <!-- Go Back Button -->
                              <button class="btn btn-primary mt-2 w-100 pl-2 pt-0 pb-0 pr-2 d-flex align-items-center  justify-content-between text-white" @click="goBack">
    <i class="ri-arrow-left-line mb-3" style="fill:white;color:white;height:10px;margin-right:-30px" ></i> 
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
    <div v-for="module in company.Modules" :key="module.id" class="module-item">
      <!-- Module Card -->
      <div :class="['card p-3', { 'bg-light': !module.isActive }]" :disabled="!module.isActive" >
        <div  style="display: flex; justify-content: space-between; align-items: center;">
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
  <span>Deny Access</span><!-- Always show the close icon, as the action is to deny access -->
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
                <!-- Module Description from database -->
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
                          <div v-for="social in company.socialMedia" :key="social.url" class="d-flex align-items-center">
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
  {{ getFirstBranchAddress(company.branches) || 'Location unavailable' }}
</div>

<!-- If you want to show the map link as a clickable URL -->
<div v-if="getFirstBranchMapLink(company.branches)">
  <a :href="getFirstBranchMapLink(company.branches)" target="_blank" class="text-muted">
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
  <div class="modal-dialog modal-dialog-centered modal-md" >
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="moduleModalLabel">Add Permissions</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-for="module in modules" :key="module.id" class="form-check"  style="line-height:2">
          <input 
            type="checkbox" 
            class="form-check-input" 
            :id="'moduleCheckbox' + module.id" 
            :value="module.id" 
            v-model="selectedModuleIds"
          />
          <label class="form-check-label" :for="'moduleCheckbox' + module.id">
            {{ module.module_name }}
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="assignModules">Save</button>
      </div>
    </div>
  </div>
</div>


</template>

<script>
import { CompanyService } from '../../../services/Admin/Company';
import { PermissionService } from '../../../services/Admin/Permission';
import Swal from 'sweetalert2';
import { ModuleService } from '../../../services/Admin/module'; // Assuming you have ModuleService for fetching modules

export default {
  data() {
    return {
      company: {},
      isLoading: true, 
      isFormDisabled: false,
      intervalId: null, // To store the interval ID
      selectedModuleIds: [],  // Stores selected module IDs
      modules: []  // Store fetched modules
    };
  },
  mounted() {
    const hashedId = this.$route.params.id;
    const companyId = atob(hashedId);
    this.fetchCompanyById(companyId);
    this.fetchModules();

    // Set up a polling mechanism that fetches data every 5 seconds (5000 ms)
    this.intervalId = setInterval(() => {
      this.fetchCompanyById(companyId);
    }, 5000);
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  computed: {
    // Computed property to handle company logo
    imageUrl() {
      if (this.company.companyLogo) {
        return `${import.meta.env.VITE_API_URL}${this.company.companyLogo}`;
      }
      return require('../../../assets/images/users/avatar-1.jpg'); // Fallback image if logo is not available
    }
  },
  methods: {
    goBack() {
        this.$router.go(-1); // Navigates to the previous page
    },
    // Fetch modules from the API
    async fetchModules() {
      try {
        const response = await ModuleService.fetchModules();
        this.modules = response; // Assuming response has the modules in `data`

        console.log(response);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    },
    // Open the modal using Bootstrap's modal API
    openModal() {
      this.$nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById('moduleModal'));
        modal.show();
      });
    },
    
    // Submit selected modules to assign permissions
    async assignModules() {
      if (this.selectedModuleIds.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No Modules Selected',
            text: 'Please select at least one module.',
            confirmButtonText: 'OK',
        });
        return;
    }


      const companyId = this.company.id;  // Use actual company ID
      try {
        const response = await PermissionService.assignModulesToCompany(companyId, this.selectedModuleIds);
        console.log('Modules assigned:', response);

        const modal = bootstrap.Modal.getInstance(document.getElementById('moduleModal'));
        modal.hide(); // Hide the modal after successful submission
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Modules assigned successfully!',
            confirmButtonText: 'Great!',
        });
      } catch (error) {
        // console.error('Error assigning modules:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to assign modules. Please try again.',
            confirmButtonText: 'OK',
        });
      }
    },

    // Toggle module access status
    async toggleStatus(module) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to deny access to the "${module.module_name}" module? This action will revoke access.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Deny Access',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        this.denyAccess(module);
      }
    },

    // Deny access to a module
    async denyAccess(module) {
      this.isFormDisabled = true;
      try {
        const requestPayload = {
          companyId: this.company.id,
          moduleId: module.id
        };
        console.log("Request Payload:", requestPayload);
        const response = await PermissionService.denyAccess(requestPayload);
        if (response.status === 200) {
          module.isActive = false; 
          Swal.fire('Access Denied!', `${module.module_name} access has been denied.`, 'success');
        }
      } catch (error) {
        Swal.fire('Error', 'There was a problem denying access to the module.', 'error');
      } finally {
        this.isFormDisabled = false;
      }
    },

    // Fetch company data by ID
    async fetchCompanyById(id) {
      try {
        const response = await CompanyService.fetchCompanyById(id);
        // console.log(response.data); // Log the fetched data
        const companyData = response.data;

        try {
          companyData.branches = JSON.parse(companyData.branches || '[]');
        } catch (error) {
          console.error('Error parsing branches:', error);
          companyData.branches = [];
        }

        try {
          companyData.socialMedia = JSON.parse(companyData.socialMedia || '[]');
        } catch (error) {
          console.error('Error parsing social media:', error);
          companyData.socialMedia = [];
        }

        this.company = companyData;
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        this.isLoading = false;
      }
    },

 // Get the address of the first branch (if exists)
getFirstBranchAddress(branches) {
  if (Array.isArray(branches) && branches.length > 0) {
    const firstBranch = branches[0];
    return firstBranch.address || 'Address unavailable';
  }
  return 'Location unavailable';
}
,
// Get the map link of the first branch (if exists)
getFirstBranchMapLink(branches) {
  if (Array.isArray(branches) && branches.length > 0) {
    const firstBranch = branches[0];
    return firstBranch.map_link || '';
  }
  return '';
},

    // Get social media icon class based on social name
    getSocialIconClass(socialName) {
      const iconMap = {
        'facebook': 'ri-facebook-fill',
        'twitter': 'ri-twitter-fill',
        'linkedin': 'ri-linkedin-fill',
        'instagram': 'ri-instagram-fill',
        'youtube': 'ri-youtube-fill',
      };
      
      return iconMap[socialName.toLowerCase()] || 'ri-global-line';
    }
  }
};
</script>



<style scoped>
#main-content {
  width: 95%;
  margin-left: 70px;
}

/* Add custom styles here */
.avatar-wrapper {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
  margin-bottom: 10px;
}
.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.module-item {
  opacity: 1;
  transition: opacity 0.3s;
}
.module-item[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
.card-title {
  font-weight: bold;
  margin-bottom: 10px;
}

</style>
