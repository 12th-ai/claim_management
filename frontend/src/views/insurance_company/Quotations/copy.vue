<template>
  <div class="page">

    <div class="mb-4" style="margin-top:80px">
    <h1 class="text-center mb-4">Quotation Detail</h1>

    <!-- Two-Column Grid -->
    <div class="grid-container">
      <!-- Customer Information Card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Customer Information</h5>
          <p><strong>Claim Number:</strong> {{ quotation.claimNumber }}</p>
          <p><strong>Customer Name:</strong> {{ quotation.customerName }}</p>
          <p><strong>Phone Number:</strong> {{ quotation.phoneNumber }}</p>
          <p><strong>Vehicle Plate:</strong> {{ quotation.vehiclePlate }}</p>
        </div>
      </div>

       <!-- Loss Accessor Information Card -->
       <div class="card">
        <div class="card-body">
          <h5 class="card-title">Loss Accessor Information</h5>
          <p><strong>Name:</strong> {{ quotation.lossAccessor.lossAccessorName }}</p>
          <p><strong>Email:</strong> {{ quotation.lossAccessor.email }}</p>
          <p><strong>Phone:</strong> {{ quotation.lossAccessor.phoneNumber }}</p>
          <p><strong>Address:</strong> {{ quotation.lossAccessor.address }}</p>
        </div>
      </div>

      <!-- Damage & Inspection Card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Damage & Inspection</h5>
          <p><strong>Damage Description:</strong> {{ quotation.damageDescription }}</p>
          <p><strong>Inspection Address:</strong> {{ quotation.inspectionAddress }}</p>
          <p><strong>Deadline Date:</strong> {{ formatDate(quotation.deadlineDate) }}</p>
          <p><strong>Quotation Value:</strong> ${{ quotation.quotationValue }}</p>
        </div>
      </div>

      <!-- Quotation Details Card -->
      <div class="card">
        <div class="card-body">
       
          <p><strong>Description:</strong> {{ quotation.quotationDescription }}</p>
     
        </div>
      </div>

      <!-- Supporting Documents Card -->
      <div class="card">
        <div class="card-body">
          <button
            class="btn btn-primary mb-4"
            @click="openModal(quotation.quotationFile)"
          >
            View Quotation File
          </button>
          <h5 class="card-title">Supporting Documents</h5>
          <ul class="list-unstyled">
            <li
              v-for="(doc, index) in parsedSupportingDocuments"
              :key="index"
              class="mb-2"
            >
              <button
                class="btn btn-link text-decoration-none"
                @click="openModal(doc)"
              >
                {{ doc }}
              </button>
            </li>
          </ul>
        </div>
      </div>

     

      <!-- Countdown Timer Card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Time Left Until Deadline</h5>
          <div class="countdown" v-if="countdownPassed">
            <span>Deadline has passed!</span>
          </div>
          <div class="countdown" v-else>
            <span>{{ countdown.days }}d</span>
            <span>{{ countdown.hours }}h</span>
            <span>{{ countdown.minutes }}m</span>
            <span>{{ countdown.seconds }}s</span>
          </div>
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
