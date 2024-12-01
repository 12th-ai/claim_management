<template>
  <div class="page">
    <!-- Title and Subtitle -->
    <div class="mb-4" style="margin-top:100px">
      <h1 style="font-size:22px;margin-top:20px">Quotation Management</h1>
      <p style="margin-bottom:20px">Manage quotation details</p>
    </div>

<div class="table_body">
    <!-- Search and Add Quotation Button -->
    <div class="d-flex justify-content-between mb-4" style="">
      <div class="d-flex">
        <input v-model="searchName" type="text" class="form-control me-3" placeholder="Search by customer..." :disabled="isFormDisabled"/>
        <input v-model="searchDate" type="date" class="form-control" placeholder="Search by date" :disabled="isFormDisabled"/>
      </div>

      <!-- Clear Search Button -->
      <button @click="clearSearch" class="btn btn-secondary ms-3" v-if="searchName || searchDate">
        Clear Search
      </button>

      <!-- Add New Quotation Button -->
      <button @click="showModal('add')" class="btn btn-primary" :disabled="isFormDisabled">
        <i class="ri-add-line"></i> Add New Quotation
      </button>
    </div>

    <!-- Table -->
    <table class="table align-middle table-nowrap mt-10">
      <thead style="text-align:center;background-color:#e8e9e5;margin-top:30px">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Claim number</th>
          <th scope="col">Car Plate Nmber</th>
          
          
          <th scope="col">Client Name</th>
          <th scope="col">Quotation Amount</th>

          <th scope="col">Due Date</th>
          <th scope="col">DeadLine Date</th>
          
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quotation in currentQuotations" :key="quotation.id" style="text-align:center">
          <th scope="row">{{ quotation.id }}</th>
          <td>{{ quotation.claimNumber }}</td>
          <td>{{ quotation.vehiclePlate}}</td>
          <td>{{ quotation.customerName }}</td>
          <td>{{ quotation.quotationValue || currency }}</td>
      
          <td>{{ new Date(quotation.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') }}</td>
          <td>{{ new Date(quotation.deadlineDate).toLocaleDateString('en-GB').replace(/\//g, '-') }}</td>
         
          <td >
      
<router-link 
  :to="{ name: 'review-quotation_detail', params: { id: hashId(quotation.id) } }" 
  class="view-more-button" 
  title="View More">
  <i class="ri-eye-line"></i>

</router-link>



             
           
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div>
        <span>Showing {{ page * itemsPerPage + 1 }} - {{ Math.min((page + 1) * itemsPerPage, filteredQuotations.length) }} of {{ filteredQuotations.length }} results</span>
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
    </div>


    <div id="quotationModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content" >
      <div class="modal-header">
        <h5 class="modal-title">{{ isUpdating ? 'Update Quotation' : 'Add Quotation' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="d-flex">
            <!-- Left Side -->
            <div class="flex-1 pr-4 " style="width:360px;margin:10px">
              <!-- Claim Number -->
              <div class="mb-3">
                <label for="claimNumber" class="form-label">Claim Number</label>
                <input
                  type="text"
                  id="claimNumber"
                  class="form-control"
                  v-model="formData.claimNumber"
                  placeholder="Enter claim number"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Customer Name -->
              <div class="mb-3">
                <label for="customerName" class="form-label">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  class="form-control"
                  v-model="formData.customerName"
                  placeholder="Enter customer name"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Phone Number -->
              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  class="form-control"
                  v-model="formData.phoneNumber"
                  placeholder="Enter phone number"
                  :disabled="isFormDisabled"
                />
              </div>

              <!-- Vehicle Plate -->
              <div class="mb-3">
                <label for="vehiclePlate" class="form-label">Vehicle Plate</label>
                <input
                  type="text"
                  id="vehiclePlate"
                  class="form-control"
                  v-model="formData.vehiclePlate"
                  placeholder="Enter vehicle plate"
                  :disabled="isFormDisabled"
                />
              </div>


            

                  <!-- Loss Accessor -->
                  <div class="mb-3">
                <label for="lossAccessor" class="form-label">Loss Accessor</label>
                <select
                  id="lossAccessor"
                  class="form-control"
                  v-model="formData.lossAccessorId"
                  :disabled="isFormDisabled"
                  placeholder="Select a loss accessor"
                >
                  <option v-for="accessor in lossAccessors" :key="accessor.id" :value="accessor.id">
                    {{ accessor.lossAccessorName }}
                  </option>
                </select>
              </div>
                <!-- Damage Description -->
                <div class="mb-3">
                <label for="damageDescription" class="form-label">Damage Description</label>
                <textarea
                  id="damageDescription"
                  class="form-control"
                  v-model="formData.damageDescription"
                  placeholder="Enter damage description"
                  :disabled="isFormDisabled"
                  style="height:100px"
                ></textarea>
              </div>
            </div>

            <!-- Right Side -->
            <div class="flex-1 pl-4" style="width:360px;margin:10px">
              <!-- Quotation File -->
             

              <!-- Inspection Address -->
              <div class="mb-3">
                <label for="inspectionAddress" class="form-label">Inspection Address</label>
                <input
                  type="text"
                  id="inspectionAddress"
                  class="form-control"
                  v-model="formData.inspectionAddress"
                  placeholder="Enter inspection address"
                  :disabled="isFormDisabled"
                />
              </div>

              <div class="mb-3">
                <label for="quotationFile" class="form-label">Quotation File (PDF)</label>
                <input
                  type="file"
                  id="quotationFile"
                  class="form-control"
                  @change="handleQuotationFileChange"
                  accept=".pdf"
                  :disabled="isFormDisabled"
                />
              </div>
              <!-- Quotation Value -->
              <div class="mb-3">
                <label for="quotationValue" class="form-label">Quotation Value</label>
                <input
                  type="number"
                  id="quotationValue"
                  class="form-control"
                  v-model="formData.quotationValue"
                  placeholder="Enter quotation value"
                  :disabled="isFormDisabled"
                />
              </div>

             

              <!-- Supporting Documents (multiple files) -->
              <div class="mb-3">
                <label for="supportingDocuments" class="form-label">Supporting Documents (PDFs only)</label>
            <input
              type="file"
              id="supportingDocuments"
              class="form-control"
              multiple
              @change="handleSupportingDocumentsChange"
              accept=".pdf"
              :disabled="isFormDisabled"
            />
            <div v-if="formData.supportingDocuments.length">
              <ul>
                <li v-for="(document, index) in formData.supportingDocuments" :key="index">
                  {{ document.name }}
                  <button type="button" @click="removeSupportingDocument(index)">❌</button>
                </li>
              </ul>
            </div>
              </div>

              <!-- Loss Accessor -->
              <!-- Deadline Date -->
              <div class="mb-3">
                <label for="deadlineDate" class="form-label">Deadline Date</label>
      
                <input
      type="date"
      id="deadlineDate"
      class="form-control"
      v-model="formData.deadlineDate"
      :disabled="isFormDisabled"
      placeholder="Select a date"
    />
  

              </div>
               <!-- Quotation Description -->
               <div class="mb-3">
                <label for="quotationDescription" class="form-label">Quotation Description</label>
                <textarea
                  id="quotationDescription"
                  class="form-control"
                  v-model="formData.quotationDescription"
                  placeholder="Enter quotation description"
                  :disabled="isFormDisabled"
                  style="height:100px;"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Save Quotation</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import { QuotationService } from '../../../services/Company/quotation'; // Import your quotation service
import Swal from 'sweetalert2'; // SweetAlert for notifications
import { LossAccessorService } from '../../../services/Company/Loss_accessor'; // Loss Accessor service

export default {
  data() {
    return {
      quotations: [],
      formData: {
        claimNumber: '',
        customerName: '',
        phoneNumber: '',
        emailAddress: '',
        vehiclePlate: '',
        damageDescription: '',
        deadlineDate: '',
        inspectionAddress: '',
        quotationValue: null,
        quotationDescription: '',
        quotationFile: null,
        supportingDocuments: [], // Array to hold multiple supporting documents
        lossAccessorId: null,
        notes: ''
      },
      lossAccessors: [], // Array for loss accessors
      isFormDisabled: false,
      searchName: '',
      searchDate: '',
      page: 0,
      itemsPerPage: 5,
      pageButtons: [],
    };
  },
  computed: {
    filteredQuotations() {
    const searchTerm = this.searchName.toLowerCase();

    return this.quotations.filter(q =>
      q.claimNumber.toLowerCase().includes(searchTerm) ||
      q.customerName.toLowerCase().includes(searchTerm) ||
      q.phoneNumber.toLowerCase().includes(searchTerm) ||
      q.vehiclePlate.toLowerCase().includes(searchTerm) ||
      q.damageDescription.toLowerCase().includes(searchTerm)
    );
  },

  currentQuotations() {
    const startIndex = this.page * this.itemsPerPage;
    return this.filteredQuotations.slice(startIndex, startIndex + this.itemsPerPage);
  },

  maxPage() {
    return Math.ceil(this.filteredQuotations.length / this.itemsPerPage) - 1;
  }
},
  methods: {
    hashId(id) {
    return btoa(id); // Encodes the ID to a Base64 string
  },
    async fetchQuotations() {
      try {
        const response = await QuotationService.fetchQuotations();
        this.quotations = response.data;
        this.setPagination();
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    },
    async fetchLossAccessors() {
      try {
        const response = await LossAccessorService.fetchLossAccessor();
        this.lossAccessors = response.data;
        console.log(this.lossAccessors); // Debugging loss accessors fetched
      } catch (error) {
        console.error('Error fetching loss accessors:', error);
      }
    },
    // Handle the change event for the Quotation File (PDF)
    handleQuotationFileChange(event) {
      const file = event.target.files[0]; // Get the first selected file
      if (file && file.type === 'application/pdf') {
        this.formData.quotationFile = file; // Save the selected file
      } else {
        alert('Only PDF files are allowed for the quotation file.');
      }
    },

    // Handle the change event for supporting documents (multiple files)
    handleSupportingDocumentsChange(event) {
      const files = Array.from(event.target.files); // Get all selected files
      this.formData.supportingDocuments.push(...files.filter(file => file.type === 'application/pdf')); // Only store PDF files
    },

    // Remove a selected supporting document
    removeSupportingDocument(index) {
      this.formData.supportingDocuments.splice(index, 1); // Remove document by index
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

    handleSubmit() {
      this.addQuotation();
    },

    async addQuotation() {
      try {
          // Assuming the backend expects a FormData object for file uploads
          const formDataToSend = new FormData();

// Append all form fields to FormData
for (const key in this.formData) {
  if (Array.isArray(this.formData[key])) {
    this.formData[key].forEach(file => formDataToSend.append(key, file)); // Append multiple files
  } else {
    formDataToSend.append(key, this.formData[key]);
  }
}
      // Sending the formData with the files and other data to the backend
      await QuotationService.createQuotation(formDataToSend);
        Swal.fire('Success', 'Quotation added successfully!', 'success');
        this.fetchQuotations();
        this.resetForm();
      } catch (error) {
        console.error('Error adding quotation:', error);
        Swal.fire('Error', 'Failed to add quotation.', 'error');
      }
    },

    showModal(action, quotation = null) {
      if (action === 'add') {
        this.resetForm(); // Reset the form for adding a new quotation
      }
      const modal = new bootstrap.Modal(document.getElementById('quotationModal'));
      modal.show();
    },

    resetForm() {
      this.formData = {
        claimNumber: '',
        customerName: '',
        phoneNumber: '',
        emailAddress: '',
        vehiclePlate: '',
        damageDescription: '',
        deadlineDate: '',
        inspectionAddress: '',
        quotationValue: null,
        quotationDescription: '',
        quotationFile: null,
        supportingDocuments: [],
        lossAccessorId: null,
        notes: ''
      };
    },
  },
  mounted() {
    this.fetchQuotations();
    this.fetchLossAccessors(); // Fetch loss accessors when component mounts
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
.view-more-button {
 
    gap: 10px;
    padding: 8px 10px;
    background-color: #f77428ab; /* Orange background */
    color: white;
    width: 30px;
    /* margin-right:-100px; */
    border-radius: 8px;
    text-decoration: none; /* Remove default link styles */
    font-size: 13px;
    font-weight: 500;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.view-more-button:hover {
    background-color: #FF8C00; /* Darker orange on hover */
    transform: scale(1.05); /* Slight scaling effect on hover */
}



.view-more-button i {
    font-size: 14px; /* Icon size */
}

.view-more-button span {
    font-size: 12px; /* Text size */
}

.table_body{
/* border:2px solid red; */
padding:30px;
padding-top:50px;
border-radius: 10px;
background-color: #ffffff;
}

</style>



