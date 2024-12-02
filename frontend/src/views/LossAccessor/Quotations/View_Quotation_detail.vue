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
    <h5 class="card-title mb-3">Company  Information</h5>
    <div class="table-card">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td class="fw-semibold">Name</td>
            <td>{{ quotation.company.companyName }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Email</td>
            <td>{{ quotation.company.email }}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Phone</td>
            <td>{{ quotation.company.phoneNumber }}</td>
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


  </div>
</div>
    </div>

    <!-- Buttons -->
    <button class="btn btn-secondary mb-3" @click="goBack">
      <i class="ri-arrow-left-line align-middle me-1"></i> Go Back
    </button>
    <button class="btn btn-primary" style="margin-top:-12px;margin-left:20px" @click="openEditModal">
          Modify Quotation
        </button>





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


  <div
        class="modal fade"
        id="editQuotationModal"
        tabindex="-1"
        aria-labelledby="editQuotationModalLabel"
        aria-hidden="true"
      >
        
      <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content" >
      <div class="modal-header">
        <h5 class="modal-title">{{ isUpdating ? 'Update Quotation' : 'Add Quotation' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
  <form @submit.prevent="saveData">
    <div class="d-flex">
      <!-- Left Side -->
      <div class="flex-1 pr-4" style="width:345px; margin:10px;">
        <!-- Accident Description -->
        <div class="mb-3">
          <label for="accidentDescription" class="form-label">Accident Description</label>
          <textarea v-model="form.accidentDescription" class="form-control" style="height:120px"></textarea>
        </div>

        <!-- Course of Accident -->
        <div class="mb-3">
          <label for="courseOfAccident" class="form-label">Course of Accident</label>
          <textarea v-model="form.courseOfAccident" class="form-control" style="height:120px"></textarea>
        </div>

        <!-- Policy Investigation -->
        <div class="mb-3">
          <label for="policyInvestigation" class="form-label">Policy Investigation</label>
          <textarea v-model="form.policyInvestigation" class="form-control" style="height:120px"></textarea>
        </div>

        <!-- Third Party Aspect -->
        <div class="mb-3">
          <label for="thirdPartyAspect" class="form-label">Third Party Aspect</label>
          <textarea v-model="form.thirdPartyAspect" class="form-control" style="height:120px"></textarea>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex-1 pl-4" style="width:345px; margin:10px;">
        <!-- Policy Liability -->
        <div class="mb-3">
          <label for="policyLiability" class="form-label">Policy Liability</label>
          <textarea v-model="form.policyLiability" class="form-control" style="height:120px"></textarea>
        </div>

        <!-- Survey -->
        <div class="mb-3">
          <label for="survey" class="form-label">Survey</label>
          <textarea v-model="form.survey" class="form-control" style="height:120px"></textarea>
        </div>

        <!-- Adequacy of Sum Insured -->
        <div class="mb-3">
          <label for="adequacySumInsured" class="form-label">Adequacy of Sum Insured</label>
          <textarea v-model="form.adequacySumInsured" class="form-control" style="height:120px"></textarea>
        </div>

        <!-- Conclusion -->
        <div class="mb-3">
          <label for="conclusion" class="form-label">Conclusion</label>
          <textarea v-model="form.conclusion" class="form-control" style="height:120px"></textarea>
        </div>
      </div>
      <div class="flex-1 pl-4" style="width:345px; margin:10px;">
          <!-- Incident Details -->
  <div class="mb-3">
    <label for="incidentDetails" class="form-label">Incident Details</label>
    <textarea v-model="form.incidentDetails" class="form-control" style="height:120px"></textarea>
  </div>
   <!-- Driver Witness Information -->
   <div class="mb-3">
    <label for="driverWitnessInfo" class="form-label">Driver Witness Information</label>
    <textarea v-model="form.driverWitnessInfo" class="form-control" style="height:120px"></textarea>
  </div>
   <!-- Regulatory Compliance -->
   <div class="mb-3">
    <label for="regulatoryCompliance" class="form-label">Regulatory Compliance</label>
    <textarea v-model="form.regulatoryCompliance" class="form-control" style="height:120px"></textarea>
  </div>
       <!-- Recommendation -->
  <div class="mb-3">
    <label for="recommendation" class="form-label">Recommendation</label>
    <textarea v-model="form.recommendation" class="form-control" style="height:120px"></textarea>
  </div>



 

 
      </div>
    </div>

    <!-- Supporting Documents -->
    <div class="mb-3">
      <label for="supportingDocuments" class="form-label">Supporting Documents</label>
      <div v-for="(document, index) in form.supportingDocuments" :key="index" class="d-flex mb-2">
        <input
      type="file"
      name="supportingDocuments"  
      :id="'supportingDocuments' + index"
      class="form-control mr-2"
      @change="handleFileChange($event, index, 'document')"
    />
        <textarea
          v-model="document.description"
          class="form-control"
          style="height:5px"
          placeholder="Description of document"
          rows="2"
        ></textarea>
        <button
          type="button"
          class="btn btn-sm btn-danger ml-2 p-2"
          @click="removeRow('document', index)"
        >
          <i class="ri-delete-bin-5-line"></i> 
        </button>
      </div>
      <button
        type="button"
        class="btn btn-sm btn-primary mt-2"
        @click="addRow('document')"
      >
        <i class="ri-add-line"></i> Add More Document
      </button>
    </div>

    <!-- Supporting Images -->
    <div class="mb-3">
      <label for="supportingImages" class="form-label">Supporting Images</label>
      <div v-for="(image, index) in form.supportingImages" :key="index" class="d-flex mb-2">
        <input
      type="file"
      name="supportingImages"
      :id="'supportingImages' + index"
      class="form-control mr-2"
      @change="handleFileChange($event, index, 'image')"
    />

        <textarea
          v-model="image.description"
          class="form-control"
          placeholder="Description of image"
          rows="2"
          style="height:5px"
        ></textarea>
        <button
          type="button"
          class="btn btn-sm btn-danger ml-2 p-2"
          @click="removeRow('image', index)"
        >
          <i class="ri-delete-bin-5-line"></i> 
        </button>
      </div>
      <button
        type="button"
        class="btn btn-sm btn-primary mt-2"
        @click="addRow('image')"
      >
        <i class="ri-add-line"></i> Add More Image
      </button>
    </div>


<div class="salvage-details mb-3">
  <label class="form-label">Salvage Details</label>
  <table class="table">
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th>Action</th>
        <th v-if="form.salvageRows.some(row => row.action === 'replace')">
          Image
        </th>
        <th v-if="form.salvageRows.some(row => row.action === 'replace')">
          Salvage Amount
        </th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in form.salvageRows" :key="index">
        <td><input type="text" class="form-control" placeholder="item name" v-model="row.itemName"></td>
        <td><input type="number" class="form-control" placeholder="unit price" v-model="row.unitPrice"></td>
        <td><input type="number" class="form-control" placeholder="quantity" v-model="row.quantity"></td>
        <td>
          <select class="form-control" v-model="row.action">
            <option value="replace">Replace</option>
            <option value="repair">Repair</option>
            <option value="remove">Remove</option>
          </select>
        </td>
        <td v-if="row.action === 'replace'">
          <input type="file" class="form-control" @change="handleFileUpload($event, index)">
        </td>
        <td v-if="row.action === 'replace'">
          <input type="number" class="form-control" v-model="row.salvageAmount" placeholder="Salvage Amount">
        </td>
        <td>
        <button type="button" class="btn btn-danger" @click="removeSalvageRow(index)">
            <i class="ri ri-delete-bin-7-line"></i>
          </button>
      </td>
      </tr>
    
     
    
    </tbody>
  </table>

  <!-- Button to Add More Row -->
  <button type="button" class="btn btn-success" @click="addSalvageRow">
    <i class="ri ri-add-line"></i> Add More Row
  </button>
</div>



    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary">Save Quotation</button>
  </form>
      </div>
    
</div>

    </div>
  </div> 


</template>

<script>
import { QuotationService } from "../../../services/LossAccessor/quotation";
import Swal from 'sweetalert2'; // SweetAlert for notifications

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
      form: {
        accidentDescription: '',
        courseOfAccident: '',
        policyInvestigation: '',
        thirdPartyAspect: '',
        policyLiability: '',
        survey: '',
        adequacySumInsured: '',
        conclusion: '',
        recommendation: '',
        incidentDetails: '',
        driverWitnessInfo: '',
        regulatoryCompliance: '',

        supportingDocuments: [
          { file: null, description: '' },  // Starting row for supporting documents
        ],
        supportingImages: [
          { file: null, description: '' },  // Starting row for supporting images
        ],
        salvageRows: [{
          itemName: '',
          unitPrice: '',
          quantity: '',
          action: 'replace',
          image: null,
          salvageAmount: null
        }]
      },
      countdownPassed: false, // To track if the deadline has passed
      intervalId: null,
    };
  },
  computed: {
  parsedSupportingDocuments() {
    try {
      // Check if supportingDocuments is a string or an array/object
      return typeof this.quotation.supportingDocuments === 'string' 
        ? JSON.parse(this.quotation.supportingDocuments) 
        : this.quotation.supportingDocuments || [];
    } catch (error) {
      console.error("Error parsing supporting documents:", error);
      return [];
    }
  },
  },
  methods: {
    addRow(type) {
      if (type === 'document') {
        this.form.supportingDocuments.push({ file: null, description: '' });
      } else if (type === 'image') {
        this.form.supportingImages.push({ file: null, description: '' });
      }
    },

    removeRow(type, index) {
      if (type === 'document') {
        this.form.supportingDocuments.splice(index, 1);
      } else if (type === 'image') {
        this.form.supportingImages.splice(index, 1);
      }
    },

    handleFileChange(event, index, type) {
      const file = event.target.files[0];
      if (type === 'document') {
        this.form.supportingDocuments[index].file = file;
      } else if (type === 'image') {
        this.form.supportingImages[index].file = file;
      }
    },

    handleFileUpload(event, index) {
      const file = event.target.files[0];
      this.form.salvageRows[index].image = file;
    },

    addSalvageRow() {
      this.form.salvageRows.push({
        itemName: '',
        unitPrice: '',
        quantity: '',
        action: 'replace',
        image: null,
        salvageAmount: null
      });
    },

    removeSalvageRow(index) {
      this.form.salvageRows.splice(index, 1);
    },

    goBack() {
      this.$router.go(-1); // Navigate to the previous page
    },

    async saveData() {
      const formData = new FormData();

// Supporting Documents
const supportingDocs = this.form.supportingDocuments.map(doc => ({
    file: doc.file, // Keep the File object here
    description: doc.description,
}));

supportingDocs.forEach(doc => {
    if (doc.file instanceof File) { // Ensure it's a File object
        formData.append('supportingDocuments', doc.file); // Correct field name, no []
    }
    formData.append('supportingDocumentDescriptions', doc.description); // Keep descriptions
});

// Supporting Images
const supportingImgs = this.form.supportingImages.map(img => ({
    file: img.file, // Keep the File object here
    description: img.description,
}));

supportingImgs.forEach(img => {
    if (img.file instanceof File) { // Ensure it's a File object
        formData.append('supportingImages', img.file); // Correct field name, no []
    }
    formData.append('supportingImageDescriptions', img.description); // Keep descriptions
});

// Salvage Rows
const salvageData = this.form.salvageRows.map(row => ({
    itemName: row.itemName,
    unitPrice: row.unitPrice,
    quantity: row.quantity,
    action: row.action,
    image: row.image, // Keep the File object here
    salvageAmount: row.salvageAmount,
}));

salvageData.forEach((row, index) => {
    // Append salvage row JSON as a string
    formData.append(`salvageRows[${index}]`, JSON.stringify({
        itemName: row.itemName,
        unitPrice: row.unitPrice,
        quantity: row.quantity,
        action: row.action,
        salvageAmount: row.salvageAmount,
    }));
    // Append salvage images
    if (row.image instanceof File) { // Ensure it's a File object
        formData.append('salvageImages', row.image); // Correct field name, no []
    }
});

// Log structured data for debugging
console.log({
    supportingDocs,
    supportingImgs,
    salvageData,
});

// Include missing text fields
const textFields = {
    accidentDescription: this.form.accidentDescription,
    courseOfAccident: this.form.courseOfAccident,
    policyInvestigation: this.form.policyInvestigation,
    thirdPartyAspect: this.form.thirdPartyAspect,
    policyLiability: this.form.policyLiability,
    survey: this.form.survey,
    adequacySumInsured: this.form.adequacySumInsured,
    conclusion: this.form.conclusion,
    recommendation: this.form.recommendation,
    incidentDetails: this.form.incidentDetails,
    driverWitnessInfo: this.form.driverWitnessInfo,
    regulatoryCompliance: this.form.regulatoryCompliance,
};

// Append text fields to FormData
Object.keys(textFields).forEach(key => {
    formData.append(key, textFields[key]);
});

// Include the quotation ID
formData.append('quotationId', this.quotation.id);


  // Sending the formData with the files and other data to the backend
  try {
    await QuotationService.createQuotation(formData);
    Swal.fire('Success', 'Quotation added successfully!', 'success');
 
  } catch (error) {
    console.error('Error adding quotation:', error);
    Swal.fire('Error', 'Failed to add quotation.', 'error');
  }
}
,

    openEditModal() {
      const modal = new bootstrap.Modal(document.getElementById("editQuotationModal"));
      modal.show();
    },

    formatDateInput(dateString) {
      // Format date for input field (YYYY-MM-DD)
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
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
          this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
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
.d-flex {
  display: flex;
  align-items: center;
}

.mr-2 {
  margin-right: 8px;
}

.ml-2 {
  margin-left: 8px;
}

.mt-2 {
  margin-top: 10px;
}
</style>
