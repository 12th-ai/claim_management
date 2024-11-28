<template>
  <div>
    <!-- Modal for Adding/Updating Company -->
    <div class="modal fade" id="companyModal" tabindex="-1" aria-labelledby="companyModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="companyModalLabel">{{ isUpdating ? 'Update Company' : 'Add New Company' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="companyName" class="form-label">Company Name</label>
                <input type="text" class="form-control" id="companyName" v-model="formData.companyName" :disabled="isFormDisabled" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="formData.email" :disabled="isFormDisabled" required>
              </div>
              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="phoneNumber" v-model="formData.phoneNumber" :disabled="isFormDisabled" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="formData.password" :disabled="isFormDisabled" required>
              </div>
              <!-- Branches Section -->
              <div v-for="(branch, index) in formData.branches" :key="index" class="mb-3">
                <label :for="'branchAddress' + index" class="form-label">Branch Address</label>
                <input type="text" class="form-control" :id="'branchAddress' + index" v-model="branch.address" :disabled="isFormDisabled">
                <label :for="'branchMapLink' + index" class="form-label">Branch Map Link</label>
                <input type="text" class="form-control" :id="'branchMapLink' + index" v-model="branch.map_link" :disabled="isFormDisabled">
                <button type="button" class="btn btn-danger mt-2" @click="removeBranch(index)">Remove Branch</button>
              </div>
              <button type="button" class="btn btn-primary mt-2" @click="addBranch">Add Branch</button>

              <!-- Social Media Section -->
              <div v-for="(socialMedia, index) in formData.socialMedia" :key="index" class="mb-3">
                <label :for="'socialMediaName' + index" class="form-label">Social Media Name</label>
                <input type="text" class="form-control" :id="'socialMediaName' + index" v-model="socialMedia.name" :disabled="isFormDisabled">
                <label :for="'socialMediaUrl' + index" class="form-label">Social Media URL</label>
                <input type="url" class="form-control" :id="'socialMediaUrl' + index" v-model="socialMedia.url" :disabled="isFormDisabled">
                <button type="button" class="btn btn-danger mt-2" @click="removeSocialMedia(index)">Remove Social Media</button>
              </div>
              <button type="button" class="btn btn-primary mt-2" @click="addSocialMedia">Add Social Media</button>

              <!-- Company Logo Section -->
              <div class="mb-3">
                <label for="companyLogo" class="form-label">Company Logo</label>
                <input type="file" class="form-control" ref="logoInput" @change="handleFileChange" :disabled="isFormDisabled">
                <div v-if="previewImage" class="mt-2">
                  <img :src="previewImage" alt="Company Logo Preview" class="img-fluid" style="max-width: 100px;">
                </div>
              </div>

              <!-- Submit and Cancel Buttons -->
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetForm">Cancel</button>
                <button type="submit" class="btn btn-primary">{{ isUpdating ? 'Update Company' : 'Add Company' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- List of Companies -->
    <div class="container mt-4">
      <div class="row mb-3">
        <div class="col-md-6">
          <input type="text" v-model="searchName" placeholder="Search by company name" class="form-control">
        </div>
        <div class="col-md-6">
          <input type="date" v-model="searchDate" placeholder="Search by date" class="form-control">
        </div>
      </div>
      <button class="btn btn-success mb-3" @click="showModal('add')">Add New Company</button>
      <div v-if="filteredCompanies.length > 0">
        <div v-for="company in currentCompanies" :key="company.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ company.companyName }}</h5>
            <p class="card-text">{{ company.email }}</p>
            <button class="btn btn-info" @click="showModal('update', company)">Update</button>
            <button class="btn btn-danger" @click="confirmDelete(company.id)">Delete</button>
          </div>
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="{'disabled': page === 0}">
              <button class="page-link" @click="changePage(page - 1)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li v-for="button in pageButtons" :key="button" class="page-item" :class="{'active': page === button}">
              <button class="page-link" @click="changePage(button)">{{ button + 1 }}</button>
            </li>
            <li class="page-item" :class="{'disabled': page === maxPage}">
              <button class="page-link" @click="changePage(page + 1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else>
        <p>No companies found.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      formData: {
        companyName: '',
        email: '',
        phoneNumber: '',
        password: '',
        branches: [{ address: '', map_link: '' }],
        socialMedia: [{ name: '', url: '' }],
        companyLogo: null,
      },
      isUpdating: false,
      isFormDisabled: false,
      searchName: '',
      searchDate: '',
      page: 0,
      itemsPerPage: 5,
      pageButtons: [],
      previewImage: null,
      selectedCompanyId: null,
    };
  },
  computed: {
    filteredCompanies() {
      return this.companies
        .filter(company => company.companyName.toLowerCase().includes(this.searchName.toLowerCase()))
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
    async fetchCompanies() {
      try {
        const response = await CompanyService.fetchCompany();
        if (Array.isArray(response.data)) {
          this.companies = response.data.map(company => ({
            ...company,
            branches: company.branches ? JSON.parse(company.branches) : [],
            socialMedia: company.socialMedia ? JSON.parse(company.socialMedia) : [],
          }));
        }
        this.setPagination();
      } catch (error) {
        console.error('Error fetching companies:', error);
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

    showModal(mode, company = null) {
      if (mode === 'add') {
        this.resetForm();
        this.isUpdating = false;
      } else if (mode === 'update' && company) {
        this.formData = { ...company, branches: [...company.branches], socialMedia: [...company.socialMedia] };
        this.previewImage = company.companyLogo ? `/uploads/${company.companyLogo}` : null;
        this.isUpdating = true;
        this.selectedCompanyId = company.id;
      }
      const modal = new bootstrap.Modal(document.getElementById('companyModal'));
      modal.show();
    },

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

    handleSubmit() {
      if (this.isUpdating) {
        this.updateCompany();
      } else {
        this.addCompany();
      }
    },

    async addCompany() {
      try {
        const response = await CompanyService.createCompany(this.formData);
        this.fetchCompanies(); // Refresh the list
        this.resetForm();
        alert('Company added successfully');
      } catch (error) {
        console.error('Error adding company:', error);
      }
    },

    async updateCompany() {
      try {
        const response = await CompanyService.updateCompany(this.selectedCompanyId, this.formData);
        this.fetchCompanies(); // Refresh the list
        this.resetForm();
        alert('Company updated successfully');
      } catch (error) {
        console.error('Error updating company:', error);
      }
    },

    confirmDelete(id) {
      if (confirm('Are you sure you want to delete this company?')) {
        this.deleteCompany(id);
      }
    },

    async deleteCompany(id) {
      try {
        const response = await CompanyService.deleteCompany(id);
        this.fetchCompanies(); // Refresh the list
        alert('Company deleted successfully');
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    },

    addBranch() {
      this.formData.branches.push({ address: '', map_link: '' });
    },

    removeBranch(index) {
      this.formData.branches.splice(index, 1);
    },

    addSocialMedia() {
      this.formData.socialMedia.push({ name: '', url: '' });
    },

    removeSocialMedia(index) {
      this.formData.socialMedia.splice(index, 1);
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.previewImage = URL.createObjectURL(file);
        this.formData.companyLogo = file;
      }
    },
  },

  mounted() {
    this.fetchCompanies();
  },
};
</script>

<style scoped>
/* Add custom styling if needed */
</style>
