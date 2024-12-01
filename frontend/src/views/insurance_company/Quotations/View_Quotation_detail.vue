<template>
  <div class="page">

    <div class="mb-4" style="margin-top:80px">
    <h1 class="text-center mb-4">Quotation Detail</h1>

    <!-- Two-Column Grid -->
    <div class="grid-container">
      <!-- Customer Information Card -->
    <!-- Customer Information Card -->
<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title mb-3">Customer Information</h5>
    <div class="table-card">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td class="fw-semibold">Claim Number</td>
            <td>{{ quotation.claimNumber }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Customer Name</td>
            <td>{{ quotation.customerName }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Phone Number</td>
            <td>{{ quotation.phoneNumber }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Vehicle Plate</td>
            <td>{{ quotation.vehiclePlate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Loss Accessor Information Card -->
<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title mb-3">Loss Accessor Information</h5>
    <div class="table-card">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td class="fw-semibold">Name</td>
            <td>{{ quotation.lossAccessor.lossAccessorName }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Email</td>
            <td>{{ quotation.lossAccessor.email }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Phone</td>
            <td>{{ quotation.lossAccessor.phoneNumber }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Address</td>
            <td>{{ quotation.lossAccessor.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>




      <!-- Damage & Inspection Card -->
<div class="card mb-3">
  <div class="card-body">
    <!-- Dropdown (Optional) -->
    <div class="mb-4">
    
    </div>
    <!-- Table -->
    <div class="table-card">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td class="fw-semibold">Damage Description</td>
            <td>{{ quotation.damageDescription }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Inspection Address</td>
            <td>{{ quotation.inspectionAddress }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Deadline Date</td>
            <td>{{ formatDate(quotation.deadlineDate) }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Quotation Value</td>
            <td>${{ quotation.quotationValue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


   <!-- Quotation Details Card -->
<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title mb-3">Quotation Details description</h5>
    <p class="mb-0">{{ quotation.quotationDescription }}</p>
  </div>
</div>



      <!-- Supporting Documents and Quotation File Card -->
<div class="card">
  <div class="card-body">
    <!-- Quotation File Section -->
    <h5 class="card-title mb-3">Quotation File</h5>
    <div class="border rounded border-dashed p-2 mb-4">
      <div class="d-flex align-items-center">
        <!-- Quotation File Icon -->
        <div class="flex-shrink-0 me-3">
          <div class="avatar-sm">
            <div class="avatar-title bg-light text-secondary rounded fs-24">
              <i class="ri-file-pdf-line"></i>
            </div>
          </div>
        </div>
        <!-- Quotation File Info -->
        <div class="flex-grow-1 overflow-hidden">
          <h5 class="fs-14 mb-1">
            <button
              class="btn btn-link text-body text-truncate d-block text-decoration-none"
              @click="openModal(quotation.quotationFile)"
            >
              Quotation.pdf
            </button>
          </h5>
          <div class="text-muted">PDF Document</div>
        </div>
        <!-- Actions -->
        <div class="flex-shrink-0 ms-2">
          <div class="d-flex gap-1">
            <!-- Download Button -->
            <button
              type="button"
              class="btn btn-icon text-muted btn-sm fs-18"
              @click="downloadDocument(quotation.quotationFile)"
            >
              <i class="ri-download-2-line"></i>
            </button>
            <!-- Preview Button -->
            <button
              type="button"
              class="btn btn-icon text-muted btn-sm fs-18"
              @click="openModal(quotation.quotationFile)"
            >
              <i class="ri-eye-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Supporting Documents Section -->
    <h5 class="card-title mb-3">Supporting Documents</h5>
    <div class="vstack gap-2">
      <div
        v-for="(doc, index) in parsedSupportingDocuments"
        :key="index"
        class="border rounded border-dashed p-2"
      >
        <div class="d-flex align-items-center">
          <!-- Document Icon -->
          <div class="flex-shrink-0 me-3">
            <div class="avatar-sm">
              <div class="avatar-title bg-light text-secondary rounded fs-24">
                <i class="ri-file-pdf-line"></i>
              </div>
            </div>
          </div>
          <!-- Document Name and Info -->
          <div class="flex-grow-1 overflow-hidden">
            <h5 class="fs-14 mb-1">
              <button
                class="btn btn-link text-body text-truncate d-block text-decoration-none"
                @click="openModal(doc)"
              >
                {{ doc }}
              </button>
            </h5>
            <div class="text-muted">PDF Document</div>
          </div>
          <!-- Actions -->
          <div class="flex-shrink-0 ms-2">
            <div class="d-flex gap-1">
              <!-- Download Button -->
              <button
                type="button"
                class="btn btn-icon text-muted btn-sm fs-18"
                @click="downloadDocument(doc)"
              >
                <i class="ri-download-2-line"></i>
              </button>
              <!-- Preview Button -->
              <button
                type="button"
                class="btn btn-icon text-muted btn-sm fs-18"
                @click="openModal(doc)"
              >
                <i class="ri-eye-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>






     
<!-- Countdown Timer Card -->
<div class="card">
  <div class="card-body text-center">
    <!-- Title -->
    <h6 class="card-title mb-3 flex-grow-1 text-start">Time Left Until Deadline</h6>

    <!-- Icon (only visible when countdown is still active) -->
    <div v-if="!countdownPassed" class="mb-2">
      <lord-icon 
        :src="countdownPassed ? '' : 'https://cdn.lordicon.com/kbtmbyzy.json'" 
        :trigger="countdownPassed ? '' : 'loop'" 
        colors="primary:#405189,secondary:#02a8b5" 
        style="width:90px;height:90px">
      </lord-icon>
    </div>

    <!-- Countdown Timer -->
    <div v-if="countdownPassed" class="text-danger mb-2">
      <h5>Deadline has passed!</h5>
    </div>
    <div v-else class="mb-3">
      <h3 class="mb-1">{{ countdown.days }}d {{ countdown.hours }}h {{ countdown.minutes }}m {{ countdown.seconds }}s</h3>
      <h5 class="fs-15 text-muted">Time Remaining</h5>
    </div>

    <!-- Buttons -->
    <button class="btn btn-secondary mb-3" @click="goBack">
      <i class="ri-arrow-left-line align-middle me-1"></i> Go Back
    </button>
  </div>
</div>
    </div>





    <!-- PDF Modal -->
    <div
      class="modal fade"
      id="pdfModal"
      tabindex="-1"
      aria-labelledby="pdfModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered  modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pdfModalLabel">File Preview</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <iframe
              v-if="selectedFile"
              :src="fileUrl(selectedFile)"
              width="100%"
              height="500px"
              title="PDF Preview"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { QuotationService } from "../../../services/Company/quotation";

export default {
  name: "QuotationDetail",
  data() {
    return {
      quotation: {}, // Fetched data
      selectedFile: null, // File for preview
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      countdownPassed: false, // To track if the deadline has passed
      intervalId: null,
    };
  },
  computed: {
    parsedSupportingDocuments() {
      return JSON.parse(this.quotation.supportingDocuments || "[]");
    },
  },
  methods: {
    goBack() {
    this.$router.go(-1); // Navigate to the previous page
  },
    async fetchQuotationById(id) {
      try {
        const response = await QuotationService.fetchQuotationById(id);
        this.quotation = response.data;
        this.startCountdown();
      } catch (error) {
        console.error("Failed to fetch quotation details:", error);
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    fileUrl(filename) {
      const baseURL = "http://localhost/Mua_Insurance/backend/uploads";
      return `${baseURL}/${filename}`;
    },
    openModal(file) {
      this.selectedFile = file;
      const modal = new bootstrap.Modal(document.getElementById("pdfModal"));
      modal.show();
    },

    downloadDocument(doc) {
    // Implementation to trigger file download
    const link = document.createElement('a');
    link.href = `/path/to/files/${doc}`; // Update with your file path
    link.download = doc;
    link.click();
  },
    startCountdown() {
      const deadline = new Date(this.quotation.deadlineDate).getTime();
      this.intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance < 0) {
          this.countdownPassed = true; // Set flag when deadline has passed
          clearInterval(this.intervalId);
        } else {
          this.countdownPassed = false; // Reset flag when deadline has not passed
          this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.countdown.hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          this.countdown.minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }
      }, 1000);
    },
  },
  async created() {
    const hashedId = this.$route.params.id;
    const id = atob(hashedId);
    await this.fetchQuotationById(id);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  width:1500px
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.countdown span {
  font-size: 1.5rem;
  margin-right: 10px;
}
</style>
