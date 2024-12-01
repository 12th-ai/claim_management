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
  :to="{ name: 'review-Accessor-quotation_detail', params: { id: hashId(quotation.id) } }" 
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


  </div>
</template>

<script>
import { QuotationService } from '../../../services/LossAccessor/quotation'; // Import your quotation service
import Swal from 'sweetalert2'; // SweetAlert for notifications

export default {
  data() {
    return {
      quotations: [],
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
        console.log(response.data)
        this.setPagination();
      } catch (error) {
        console.error('Error fetching quotations:', error);
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

  },
  mounted() {
    this.fetchQuotations();

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



