<template>
  <div class="page" >
    <!-- Title and Subtitle -->
    <div class="mb-4" style="margin-top:100px">
      <h1 style="font-size:22px;margin-top:20px">Company Management</h1>
      <p style="margin-bottom:20px">Manage company details</p>
    </div>
  <!-- Search and Add Module Button -->
  <div class="table_body">
    <!-- Search and Add Company Button -->
    <div class="d-flex justify-content-between mb-4">
      <div class="d-flex">
        <input v-model="searchName" type="text" class="form-control me-3" placeholder="Search by name,email...." :disabled="isFormDisabled"/>
        <input v-model="searchDate" type="date" class="form-control" placeholder="Search by date" :disabled="isFormDisabled"/>
      </div>

      <!-- Clear Search Button -->
      <button @click="clearSearch" class="btn btn-secondary ms-3" v-if="searchName || searchDate">
        Clear Search
      </button>

      <!-- Add New Company Button -->
      <button @click="showModal('add')" class="btn btn-primary" :disabled="isFormDisabled">
        <i class="ri-add-line"></i> Add New Company
      </button>
    </div>

    <!-- Table -->
    <table class="table align-middle table-nowrap mt-10">
      <thead style="text-align:center;background-color:#e8e9e5;margin-top:30px">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Company Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col"> Number of social media</th>
          <th scope="col"> Number of branches</th>
          <th scope="col">Joining Date</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in currentCompanies" :key="company.id" style="text-align:center">
          <th scope="row">{{ company.id }}</th>
          <td>{{ company.companyName }}</td>
          <td>{{ company.email }}</td>
          <td>{{ company.phoneNumber }}</td>

          <td>
  {{ company.socialMedia && company.socialMedia.length > 0 ? company.socialMedia.length + ' Social Media Used' : 'No Social Media Used' }}
</td>

<td>
  {{ company.branches && company.branches.length > 0 ? company.branches.length + ' Branches Used' : 'No Branches Used' }}
</td>



<td>{{ new Date(company.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') }}</td>

 <td style="display:flex">
            <div class="hstack gap-3 fs-15" style="text-align:center;margin:auto">
                <!-- View More Button -->
                <router-link
  :to="{ name: 'review-company_detail', params: { id: hashId(company.id) } }"
  class="link-primary"
  title="View More"
  style="height:30px;width:30px;border-radius:5px;background-color:#75a9ee31;padding-top:5px"
>
  <i class="ri-eye-line"></i>
</router-link>

<a href="javascript:void(0);" @click="confirmDelete(company.id)" class="link-danger"  style="height:30px;width:30px;border-radius:5px;background-color:#c06d7852;padding-top:5px" title="Delete Company">
                <i class="ri-delete-bin-5-line"></i> 
              </a>
              <a href="javascript:void(0);" @click="showModal('update', company)" class="link-primary" style="height:30px;width:30px;border-radius:5px;background-color:#9292ff88;padding-top:5px" title="Update Company">
                <i class="ri-pencil-line"></i> 
              </a>
            


            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div>
        <span>Showing {{ page * itemsPerPage + 1 }} - {{ Math.min((page + 1) * itemsPerPage, filteredCompanies.length) }} of {{ filteredCompanies.length }} results</span>
      </div>
      <div id="pagination-container">
        <button @click="changePage(page - 1)" :disabled="page === 0 || isFormDisabled" class="btn btn-sm btn-secondary">
          Previous
        </button>
        <button style="width:30px" v-for="(buttonPage, index) in pageButtons" :key="index"
                :class="['btn btn-sm', { 'btn-primary': page === index }]"
                @click="changePage(index)" :disabled="isFormDisabled">
          {{ index + 1 }}
        </button>
        <button @click="changePage(page + 1)" :disabled="page === maxPage || isFormDisabled" class="btn btn-sm btn-secondary">
          Next
        </button>
      </div>
    </div>

    <!-- Company Modal -->
<div id="companyModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" style="margin-right:120px">
    <div class="modal-content" style="width:800px">
      <div class="modal-header">
        <h5 class="modal-title">{{ isUpdating ? 'Update Company' : 'Add Company' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          
          <!-- Logo Section -->
          <div class="mb-3 text-center">
            
            <div class="avatar-wrapper">
              <img 
              :src="previewImage 
        ? previewImage 
        : formData.companyLogo 
            ? `http://localhost/Mua_Insurance/backend/uploads/${formData.companyLogo}` 
            : require('../../../assets/images/users/avatar-1.jpg')"
              alt="Company Logo"
                    class="rounded-circle"
                    style="width: 100px; height: 100px; object-fit: cover; cursor: pointer;"
                    @click="triggerLogoInput"
                  />
                  <input 
                    type="file" 
                    ref="logoInput" 
                    id="companyLogo" 
                    style="display: none;" 
                    @change="handleFileChange"
                  />
            </div>
          </div>

          <!-- Company Details -->
          <div class="d-flex justify-content-between">
            <div class="left-section" style="flex: 1; padding-right: 10px;">
              <!-- Company Name -->
              <div class="mb-3">
                <label for="companyName" class="form-label">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  class="form-control"
                  v-model="formData.companyName"
                  placeholder="Enter company name"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="formData.email"
                  placeholder="Enter email"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Social Media Links -->
              <div class="mb-3">
                <label for="socialMedia" class="form-label">Social Media Links</label>
                <div v-for="(social, index) in formData.socialMedia" :key="index" class="d-flex gap-2 mb-2">
                  <input type="text" v-model="social.name" placeholder="Social Media Name" class="form-control" :disabled="isFormDisabled"/>
                  <input type="url" v-model="social.url" placeholder="URL" class="form-control" :disabled="isFormDisabled"/>
                  <button @click="removeSocialMedia(index)" type="button" class="btn btn-danger btn-sm" :disabled="isFormDisabled">
                    <i class="ri-delete-bin-5-line"></i>
                  </button>
                </div>
                <button @click="addSocialMedia" type="button" class="btn btn-secondary" :disabled="isFormDisabled">
                  Add Social Media
                </button>
              </div>
            </div>

            <div class="right-section" style="flex: 1; padding-left: 10px;">
              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="formData.password"
                  placeholder="Enter password"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Phone Number -->
              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  class="form-control"
                  v-model="formData.phoneNumber"
                  placeholder="Enter phone number"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Branches -->
              <div class="mb-3">
                <label for="branches" class="form-label">Branches</label>
                <div v-for="(branch, index) in formData.branches" :key="index" class="d-flex gap-2 mb-2">
                  <input type="text" v-model="branch.address" placeholder="Branch Address" class="form-control" :disabled="isFormDisabled"/>
                  <input type="url" v-model="branch.map_link" placeholder="Google Map Link" class="form-control" :disabled="isFormDisabled"/>
                  <button @click="removeBranch(index)" type="button" class="btn btn-danger btn-sm" :disabled="isFormDisabled">
                    <i class="ri-delete-bin-5-line"></i>
                  </button>
                </div>
                <button @click="addBranch" type="button" class="btn btn-secondary" :disabled="isFormDisabled">
                  Add Branch
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- Action Button -->
        <button @click="handleSubmit" type="button" class="btn btn-primary">
          {{ isUpdating ? 'Update Company' : 'Add Company' }}
        </button>
      </div>
    </div>
  </div>
</div>  

</div>
  </div>



</template>

<script>
import { CompanyService } from '../../../services/Admin/Company'; // Import your company service
import Swal from 'sweetalert2'; // SweetAlert for notifications

export default {
  data() {
    return {
      companies: [], // All companies
      formData: {
        companyName: '', // Matches companyName in backend
        email: '', // Matches email in backend
        phoneNumber: '', // Matches phoneNumber in backend
        password: '', // Matches password in backend
        branches: [{ address: '', map_link: '' }], // Start with one empty branch
        socialMedia: [{ name: '', url: '' }], // Start with one empty social media link
        companyLogo: null, // Will store logo file
      },
      isUpdating: false, // Flag to check if we're updating an existing company
      isFormDisabled: false, // Flag to disable form elements
      searchName: '', // Search by name
      searchDate: '', // Search by date
      page: 0, // Current page
      itemsPerPage: 5, // Items per page
      pageButtons: [], // Pagination buttons
      previewImage: null, // Image preview URL
      selectedCompanyId: null, // Store selected company id for update/delete actions
    };
  },
  computed: {

    filteredCompanies() {
  const searchTerm = this.searchName.toLowerCase();

  return this.companies
    .filter(company =>
      company.companyName.toLowerCase().includes(searchTerm) ||
      company.email.toLowerCase().includes(searchTerm) ||
      company.phoneNumber.toLowerCase().includes(searchTerm)
    )
    .filter(company => {
      if (!this.searchDate) return true;
      return new Date(company.createdAt).toLocaleDateString() === new Date(this.searchDate).toLocaleDateString();
    });
},

    currentCompanies() {
      const startIndex = this.page * this.itemsPerPage;
      return this.filteredCompanies.slice(startIndex, startIndex + this.itemsPerPage);
    },
    maxPage() {
      return Math.ceil(this.filteredCompanies.length / this.itemsPerPage) - 1;
    },
  },
  methods: {
    hashId(id) {
    return btoa(id); // Encodes the ID as Base64
  },
  async fetchCompanies() {
   try {
     const response = await CompanyService.fetchCompany();
     if (Array.isArray(response.data)) {
       this.companies = response.data.map(company => {
         return {
           ...company,
           // Parse stringified arrays into actual arrays
           branches: company.branches ? JSON.parse(company.branches) : [],
           socialMedia: company.socialMedia ? JSON.parse(company.socialMedia) : [],
         };
       });
     } else {
       console.error("Unexpected response format:", response);
       this.companies = [];
     }
     this.setPagination();
   } catch (error) {
     console.error('Error fetching companies:', error);
     this.companies = [];
   }
},


    setPagination() {
      const totalPages = Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
      this.pageButtons = Array.from({ length: totalPages }, (_, index) => index);
    },

    changePage(page) {
      if (page >= 0 && page <= this.maxPage) {
        this.page = page;
      }
    },

    clearSearch() {
      this.searchName = '';
      this.searchDate = '';
    },

    // Handle file selection and set preview
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.companyLogo = file; // Store the file
        this.previewImage = URL.createObjectURL(file); // Create a preview
      }
    },

    showModal(action, company = null) {
  this.resetForm(); // Reset form before opening modal

  if (action === 'update' && company) {
    this.selectedCompanyId = company.id; // Set the company ID
    this.isUpdating = true; // Flag for updating
    
    // Set formData with existing company data
    this.formData = {
      companyName: company.companyName || '',
      email: company.email || '',
      phoneNumber: company.phoneNumber || '',
      password: '',  // Don't set password while updating (security concern)
      branches: company.branches ? (typeof company.branches === 'string' ? JSON.parse(company.branches) : company.branches) : [{ address: '', map_link: '' }],
      socialMedia: company.socialMedia ? (typeof company.socialMedia === 'string' ? JSON.parse(company.socialMedia) : company.socialMedia) : [{ name: '', url: '' }],
      companyLogo: company.companyLogo || null, // If company logo exists, set it
    };

    this.previewImage = null; // Clear preview image to prioritize companyLogo
  } else {
    this.selectedCompanyId = null; // Reset ID for new creation
    this.isUpdating = false;
    this.previewImage = null;
    this.formData = { // Reset for new creation
      companyName: '',
      email: '',
      phoneNumber: '',
      website: '',
      branches: [{ address: '', map_link: '' }],
      socialMedia: [{ name: '', url: '' }],
      companyLogo: null,
    };
  }

  const modal = new bootstrap.Modal(document.getElementById('companyModal'), { backdrop: 'static' });
  modal.show();
}
,
    resetForm() {
      this.formData = {
        companyName: '',
        email: '',
        phoneNumber: '',
        password: '',
        branches: [{ address: '', map_link: '' }],
        socialMedia: [{ name: '', url: '' }],
        companyLogo: null,
      };
      this.previewImage = null;
      this.selectedCompanyId = null;
    },

    async handleSubmit() {
      try {
        const formDataToSubmit = new FormData();
        
        // Append fields to FormData
        for (const key in this.formData) {
          if (Array.isArray(this.formData[key])) {
            const filteredArray = this.formData[key].filter(item => {
              if (item && typeof item === 'object') {
                return Object.values(item).some(val => val.trim() !== ""); 
              }
              return false; 
            });
            if (filteredArray.length > 0) {
              formDataToSubmit.append(key, JSON.stringify(filteredArray)); 
            }
          } else if (key === 'companyLogo' && this.formData.companyLogo) {
            formDataToSubmit.append('companyLogo', this.formData.companyLogo);
          } else if (this.formData[key] && this.formData[key].trim() !== "") {
            formDataToSubmit.append(key, this.formData[key]);
          }
        }

        if (this.isUpdating) {
          await CompanyService.updateCompany(this.selectedCompanyId, formDataToSubmit);
          Swal.fire('Updated!', 'Company has been updated successfully', 'success');
          this.resetForm();
        } else {
          await CompanyService.createCompany(formDataToSubmit);
          Swal.fire('Added!', 'Company has been added successfully', 'success');
          this.resetForm();
        }

        this.fetchCompanies(); // Fetch updated company list

        const modal = bootstrap.Modal.getInstance(document.getElementById('companyModal'));
        modal.hide(); // Hide modal after submission
      } catch (error) {
        Swal.fire('Error', 'Something went wrong, please try again later.', 'error');
      }
    },

    confirmDelete(companyId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await CompanyService.deleteCompany(companyId);
            Swal.fire('Deleted!', 'Company has been deleted successfully', 'success');
            this.fetchCompanies();
          } catch (error) {
            Swal.fire('Error', 'Something went wrong, please try again later.', 'error');
          }
        }
      });
    },

    addSocialMedia() {
      this.formData.socialMedia.push({ name: '', url: '' });
    },

    removeSocialMedia(index) {
      this.formData.socialMedia.splice(index, 1);
    },

    addBranch() {
      this.formData.branches.push({ address: '', map_link: '' });
    },

    removeBranch(index) {
      this.formData.branches.splice(index, 1);
    },

    triggerLogoInput() {
      this.$refs.logoInput.click();
    },
  },
  mounted() {
    this.fetchCompanies(); // Fetch companies on component mount
  },
};
</script>


<style scoped>

.page{
  padding: 20px;
  width: 80%;
  margin-left: 345px;

}

#pagination-container button {
  margin-right: 10px;
}

.pagination .btn-primary {
  background-color: #6259ca;
  border-color: #007bff;
}


.table tbody tr:nth-child(odd) {
  background-color:#f3f6f6; 
}

.table_body{
/* border:2px solid red; */
padding:30px;
padding-top:50px;
border-radius: 10px;
background-color: #ffffff;
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
</style>