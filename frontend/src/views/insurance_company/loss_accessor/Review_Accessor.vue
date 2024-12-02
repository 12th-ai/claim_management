<template>
  <div class="page">
    <!-- Title and Subtitle -->
    <div class="mb-4" style="margin-top:100px">
      <h1 style="font-size:22px;margin-top:20px">Loss  Accessor Management</h1>
      <p style="margin-bottom:20px">Manage Loss_Accessor details</p>
    </div>
    <div class="table_body">
    <!-- Search and Add Loss_Accessor Button -->
    <div class="d-flex justify-content-between mb-4">
      <div class="d-flex">
        <input v-model="searchName" type="text" class="form-control me-3" placeholder="Search by name,email ..." :disabled="isFormDisabled"/>
        <input v-model="searchDate" type="date" class="form-control" style="text-transform:capitalize" placeholder="Search by date" :disabled="isFormDisabled"/>
      </div>

      <!-- Clear Search Button -->
      <button @click="clearSearch" class="btn btn-secondary ms-3" v-if="searchName || searchDate">
        Clear Search
      </button>

      <!-- Add New Loss_Accessor Button -->
      <button @click="showModal('add')" class="btn btn-primary" :disabled="isFormDisabled">
        <i class="ri-add-line"></i> Add New Loss_Accessor
      </button>
    </div>

    <!-- Table -->
    <table class="table align-middle table-nowrap mt-10">
      <thead style="text-align:center;background-color:#e8e9e5;margin-top:30px">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Avatar</th>
          <th scope="col">Loss_Accessor Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Contract Code</th>
          <th scope="col">Addresses</th>
          <th scope="col">Joining Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="accessor in currentLossAccessors" :key="accessor.id" style="text-align:center">
          <th scope="row">{{ accessor.id }}</th>
          <img
          :src="accessor.lossAccessorLogo 
            ? `http://localhost/Mua_Insurance/backend/uploads/${accessor.lossAccessorLogo}` 
            : require('../../../assets/images/users/avatar-1.jpg')"
          alt="Loss Accessor Logo"
          style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;"
        />
          <td>{{ accessor.lossAccessorName }}</td>
          <td>{{ accessor.email }}</td>
          <td>{{ accessor.phoneNumber }}</td>
          <td>
            {{ accessor.contactCode}}
          </td>
          <td>
            {{ accessor.address}}
          </td>
          <td>{{ new Date(accessor.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') }}</td>
          <td style="display:flex">
            <div class="hstack gap-3 fs-15" style="text-align:center;margin:auto">
              <a href="javascript:void(0);" @click="showModal('update', accessor)" class="link-primary" title="Update Loss_Accessor"   style="height:30px;width:30px;border-radius:5px;background-color:#75a9ee31;padding-top:5px"
              >
                <i class="ri-pencil-line"></i> 
              </a>
           
              <a href="javascript:void(0);" @click="confirmDelete(accessor.id)" class="link-danger" title="Delete Loss_Accessor" style="height:30px;width:30px;border-radius:5px;background-color:#c06d7852;padding-top:5px" >
                <i class="ri-delete-bin-5-line"></i> 
              </a>
            
            </div>
          </td>
        </tr>
      </tbody>
    
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <span>Showing {{ page * itemsPerPage + 1 }} - {{ Math.min((page + 1) * itemsPerPage, filteredLossAccessors.length) }} of {{ filteredLossAccessors.length }} results</span>

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

    <!-- Loss_Accessor Modal -->
    <div id="accessorModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content" style="width:800px">
          <div class="modal-header">
            <h5 class="modal-title">{{ isUpdating ? 'Update Loss_Accessor' : 'Add Loss_Accessor' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Modal Content Goes Here -->


            <form @submit.prevent="submitForm" enctype="multipart/form-data">
  <!-- Logo Section -->
  <div class="mb-3 text-center">
    <div class="avatar-wrapper">
      <img 
  :src="previewImage
    ? previewImage  
    : formData.lossAccessorLogo
    ? `http://localhost/Mua_Insurance/backend/uploads/${formData.lossAccessorLogo}` 
    : require('../../../assets/images/users/avatar-1.jpg')"
  alt="Loss_Accessor Logo"
  class="rounded-circle"
  style="width: 100px; height: 100px; object-fit: cover; cursor: pointer;"
  @click="triggerLogoInput"
/>
      <input 
        type="file" 
        ref="logoInput" 
        id="lossAccessorLogo" 
        style="display: none;" 
        @change="handleFileChange"
      />
    </div>
  </div>

  <!-- Loss_Accessor Details -->
  <div class="d-flex justify-content-between">
    <div class="left-section" style="flex: 1; padding-right: 10px;">
      <!-- Loss_Accessor Name -->
      <div class="mb-3">
        <label for="lossAccessorName" class="form-label">Loss_Accessor Name</label>
        <input
          type="text"
          id="lossAccessorName"
          class="form-control"
          v-model="formData.lossAccessorName"
          placeholder="Enter Loss_Accessor name"
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

      <!-- Contact Code -->
      <div class="mb-3">
        <label for="contactCode" class="form-label">Contract Code</label>
        <input
          type="text"
          id="contactCode"
          class="form-control"
          v-model="formData.contactCode"
          placeholder="Enter Contact Code"
          :disabled="isFormDisabled"
        />
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

      <!-- Address -->
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input
          type="text"
          id="address"
          class="form-control"
          v-model="formData.address"
          placeholder="Enter Address"
          :disabled="isFormDisabled"
        />
      </div>
    </div>
  </div>
</form>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- Action Button -->
        <button @click="handleSubmit" type="button" class="btn btn-primary">
          {{ isUpdating ? 'Update Loss Accessor' : 'Add New Loss Accessor' }}
        </button>
      </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>





<script>
import { LossAccessorService } from '../../../services/Company/Loss_accessor'; // Updated service
import Swal from 'sweetalert2'; // SweetAlert for notifications

export default {
  data() {
    return {
      lossAccessors: [], // All loss accessors for display
      formData: {
        lossAccessorName: '',
        email: '',
        phoneNumber: '',
        password: '',
        contactCode: '',
        address: '',
        lossAccessorLogo: null,
      },
      isUpdating: false, // Flag for update mode
      isFormDisabled: false, // Flag to disable form elements
      searchName: '', // Search by name
      searchDate: '', // Search by date
      page: 0, // Current page
      itemsPerPage: 5, // Items per page
      pageButtons: [], // Pagination buttons
      previewImage: null, // Image preview URL
      selectedLossAccessorId: null, // Selected ID for update/delete
    };
  },
  computed: {
    filteredLossAccessors() {
  const searchTerm = this.searchName.toLowerCase();

  return this.lossAccessors
    .filter(accessor =>
      accessor.lossAccessorName.toLowerCase().includes(searchTerm) ||
      accessor.email.toLowerCase().includes(searchTerm) ||
      accessor.phoneNumber.toLowerCase().includes(searchTerm) ||
      accessor.password.toLowerCase().includes(searchTerm) ||
      accessor.contactCode.toLowerCase().includes(searchTerm) ||
      accessor.address.toLowerCase().includes(searchTerm)
    )
    .filter(accessor => {
      if (!this.searchDate) return true;
      return (
        new Date(accessor.createdAt).toLocaleDateString() ===
        new Date(this.searchDate).toLocaleDateString()
      );
    });
}
,
    currentLossAccessors() {
      const startIndex = this.page * this.itemsPerPage;
      return this.filteredLossAccessors.slice(startIndex, startIndex + this.itemsPerPage);
    },
    maxPage() {
      return Math.ceil(this.filteredLossAccessors.length / this.itemsPerPage) - 1;
    },
  },
  methods: {
    async fetchLossAccessors() {
      try {
        // Fetch single object response and wrap it in an array for consistency
        const response = await LossAccessorService.fetchLossAccessor();
        if (response.data) {
          // Ensure consistency by converting to array
          this.lossAccessors = Array.isArray(response.data)
            ? response.data
            : [response.data];
        } else {
          this.lossAccessors = []; // Reset if no data is returned
        }
        this.setPagination();
      } catch (error) {
        console.error('Error fetching loss accessors:', error);
        this.lossAccessors = [];
      }
    },

    setPagination() {
      const totalPages = Math.ceil(this.filteredLossAccessors.length / this.itemsPerPage);
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

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.lossAccessorLogo = file; // Store the file
        this.previewImage = URL.createObjectURL(file); // Create a preview
      } else {
        this.formData.lossAccessorLogo = null;
        this.previewImage = null;
      }
    },

    showModal(action, lossAccessor = null) {
      this.resetForm();

      if (action === 'update' && lossAccessor) {
        this.selectedLossAccessorId = lossAccessor.id;
        this.isUpdating = true;
        this.formData = {
          lossAccessorName: lossAccessor.lossAccessorName || '',
          email: lossAccessor.email || '',
          phoneNumber: lossAccessor.phoneNumber || '',
          password: lossAccessor.password || '',
          contactCode: lossAccessor.contactCode || '',
          address: lossAccessor.address || '',
          lossAccessorLogo: lossAccessor.lossAccessorLogo || null,
        };
        this.previewImage = null;
      } else {
        this.selectedLossAccessorId = null;
        this.isUpdating = false;
        this.previewImage = null;
        this.formData = {
          lossAccessorName: '',
          email: '',
          phoneNumber: '',
          password: '',
          contactCode: '',
          address: '',
          lossAccessorLogo: null,
        };
      }

      const modal = new bootstrap.Modal(document.getElementById('accessorModal'), {
        backdrop: 'static',
      });
      modal.show();
    },

    resetForm() {
      this.formData = {
        lossAccessorName: '',
        email: '',
        phoneNumber: '',
        password: '',
        contactCode: '',
        address: '',
        lossAccessorLogo: null,
      };
      this.previewImage = null;
      this.selectedLossAccessorId = null;
    },

    async handleSubmit() {
      try {
        const formDataToSubmit = new FormData();
        for (const key in this.formData) {
          if (key === 'lossAccessorLogo' && this.formData.lossAccessorLogo) {
            formDataToSubmit.append('lossAccessorLogo', this.formData.lossAccessorLogo);
          } else if (this.formData[key] && this.formData[key].trim() !== '') {
            formDataToSubmit.append(key, this.formData[key]);
          }
        }

        if (this.isUpdating) {
          await LossAccessorService.updateLossAccessor(
            this.selectedLossAccessorId,
            formDataToSubmit
          );
          Swal.fire('Updated!', 'Loss Accessor has been updated successfully', 'success');
        } else {
          await LossAccessorService.createLossAccessor(formDataToSubmit);
          Swal.fire('Added!', 'Loss Accessor has been added successfully', 'success');
        }

        this.fetchLossAccessors();
        const modalElement = document.getElementById('accessorModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
      } catch (error) {
        Swal.fire('Error', 'Something went wrong, please try again later.', 'error');
      }
    },

    confirmDelete(lossAccessorId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await LossAccessorService.deleteLossAccessor(lossAccessorId);
            Swal.fire('Deleted!', 'Loss Accessor has been deleted successfully', 'success');
            this.fetchLossAccessors();
          } catch (error) {
            Swal.fire('Error', 'Something went wrong, please try again later.', 'error');
          }
        }
      });
    },

    triggerLogoInput() {
      this.$refs.logoInput.click();
    },
  },
  mounted() {
    this.fetchLossAccessors(); // Fetch loss accessors on mount
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