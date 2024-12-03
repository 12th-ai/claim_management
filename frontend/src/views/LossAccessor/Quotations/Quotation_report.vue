<template>
  <div class="page">
    <div v-if="data" class="mb-4" style="margin-top:100px">



      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="company-info">
    <div class="logo-container">
      <img :src="companyLogo" alt="Company Logo" class="company-logo" />
    </div>
    <div class="company-details">
      <h2> <strong style="text-transform:capitalize">Name : </strong>{{ company.companyName }}</h2>
      <h2><strong style="text-transform:capitalize">email : </strong>{{ company.email }}</h2>
      <h2> <strong style="text-transform:capitalize">Phone number : </strong> {{ company.phoneNumber }}</h2>
    </div>
    </div>

    <div class="accessor-info">
    <div class="logo-container">
      <img :src="lossAccessorLogo" alt="Accessor Logo" class="accessor-logo" />
    </div>
    <div class="accessor-details">
      <h2> <strong style="text-transform:capitalize">Name : </strong>{{ accessor.lossAccessorName }}</h2>
      <h2><strong style="text-transform:capitalize">email : </strong>{{ accessor.email }}</h2>
      <h2><strong style="text-transform:capitalize">phone number : </strong>{{ accessor.phoneNumber }}</h2>

    </div>
  </div>
  </div>
        <div>
       </div>
       <div>
         



            
    <h1>Claim Details</h1>
    <div v-if="claimData">
      <p><strong>Claim Number:</strong> {{ claimData.claimNumber }}</p>
      <p><strong>Customer Name:</strong> {{ claimData.customerName }}</p>
      <p><strong>Phone Number:</strong> {{ claimData.phoneNumber }}</p>
      <p><strong>Vehicle Plate:</strong> {{ claimData.vehiclePlate }}</p>
      <p><strong>Damage Description:</strong> {{ claimData.damageDescription }}</p>
      <p><strong>Deadline Date:</strong> {{ new Date(claimData.deadlineDate).toLocaleDateString() }}</p>
      <p><strong>Inspection Address:</strong> {{ claimData.inspectionAddress }}</p>
      <p><strong>Quotation Value:</strong> {{ claimData.quotationValue }}</p>
      <p><strong>Quotation Description:</strong> {{ claimData.quotationDescription }}</p>
      <p><strong>Notes:</strong> {{ claimData.notes || 'No notes available' }}</p>
    </div>
    <div v-else>
      <p>Loading claim details...</p>
    </div>
  </div>
  <ul>
    <div class="details-container">
  <div v-for="(detail, key) in claimDetails" :key="key" class="detail-card">
    <div class="card-header">
      <h3>{{ key }}</h3> <!-- Title (key) -->
    </div>
    <div class="card-body">
      <p>{{ detail }}</p> <!-- Detail (value) -->
    </div>
  </div>
</div>

        </ul>

<div v-if="supportingDocuments.length">
  <h3>Supporting Documents</h3>
  <div class="grid-container">
    <div v-for="doc in supportingDocuments" :key="doc.filename" class="document-card">
      <!-- File link -->
      <a :href="`http://localhost/Mua_Insurance/backend/uploads/${doc.filename}`" target="_blank" class="document-link">
        View Document
      </a>
      <!-- Description below the link -->
      <p class="document-description">{{ doc.description }}</p>
    </div>
  </div>
</div>


<div v-if="supportingImages.length">
  <h3>Supporting Images</h3>
  <div class="grid-containers">
    <div v-for="img in supportingImages" :key="img.filename" class="image-card">
      <!-- Image -->
      <img
        :src="`http://localhost/Mua_Insurance/backend/uploads/${img.filename}`"
        alt="Supporting Image"
        class="image-card-img"
      />
      <!-- Description below the image -->
      <p class="image-card-description">{{ img.description }}</p>
    </div>
    <div v-for="img in supportingImages" :key="img.filename" class="image-card">
      <!-- Image -->
      <img
        :src="`http://localhost/Mua_Insurance/backend/uploads/${img.filename}`"
        alt="Supporting Image"
        class="image-card-img"
      />
      <!-- Description below the image -->
      <p class="image-card-description">{{ img.description }}</p>
    </div>
  </div>
</div>

<div class="grid-containers" >
  <div v-for="(item, index) in salvageItems" :key="index" class="cards" >
    <!-- Check if item.image exists, if not show fallback text -->
    <div class="image-container">
      <img
        v-if="item.image && item.image !== ''"
        :src="`http://localhost/Mua_Insurance/backend/uploads/${item.image}`"
        alt="Salvage Image"
        class="card-image"
      />
      <p v-else class="no-image">No Salvage Image</p>
    </div>

    <!-- Salvage Item Details -->
    <h3 class="card-title">{{ item.name }}</h3>
    <p class="card-detail">Unit Price: ${{ item.unitPrice }}</p>
    <p class="card-detail">Quantity: {{ item.quantity }}</p>
    <p class="font-bold">Total Price: ${{ item.totalPrice }}</p>
    <p class="card-detail">Action: {{ item.action }}</p>
    <p v-if="item.amount > 0" class="card-detail">Salvage Amount: {{ item.amount }}</p>

  </div>
</div>



<button
        @click="exportPDF"
        class="px-6 py-3 bg-blue-500 " style="background-color:#6259ca;border:none;color:white;border-radius:5px"
      >
        Export Report as PDF
      </button>
      </div>
    </div>

    
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { QuotationService } from "../../../services/LossAccessor/quotation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      data: null, // This will store the fetched data
    };
  },
  computed: {
    company() {
      return this.data?.company || {};
    },
    accessor() {
      return this.data?.accessor || {};
    },
    claimData() {
      return this.data?.claim_data || {};
    },
    claimDetails() {
      return {
        "Accident Description": this.data?.accidentDescription,
        "Course of Accident": this.data?.courseOfAccident,
        "Policy Investigation": this.data?.policyInvestigation,
        "Third Party Aspect": this.data?.thirdPartyAspect,
        "Policy Liability": this.data?.policyLiability,
        Survey: this.data?.survey,
        "Adequacy Sum Insured": this.data?.adequacySumInsured,
        Conclusion: this.data?.conclusion,
        Recommendation: this.data?.recommendation,
        "Incident Details": this.data?.incidentDetails,
        "Driver Witness Info": this.data?.driverWitnessInfo,
        "Regulatory Compliance": this.data?.regulatoryCompliance,
      };
    },
    salvageItems() {
      // Parse and structure the data
      const names = JSON.parse(this.data?.salvageItemNames || "[]");
      const unitPrices = JSON.parse(this.data?.salvageUnitPrices || "[]");
      const quantities = JSON.parse(this.data?.salvageQuantities || "[]");
      const actions = JSON.parse(this.data?.salvageActions || "[]");
      const amount = JSON.parse(this.data?.salvageAmounts || "[]");
      const images = JSON.parse(this.data?.salvageImages || "[]");


      // Combine into an array of objects
      return names.map((name, index) => ({
        name,
        unitPrice: unitPrices[index] || 0,
        quantity: quantities[index] || 0,
        amount : amount[index] || 0,
        totalPrice: (unitPrices[index] || 0) * (quantities[index] || 0),
        action: actions[index] || "N/A",
        image: images[index] && images[index] !== "no image found" ? images[index] : null, // Set to null if no image is found

      }));
    },
    supportingDocuments() {
      return JSON.parse(this.data?.supportingDocuments || "[]");
    },
    supportingImages() {
      return JSON.parse(this.data?.supportingImages || "[]");
    },
    companyLogo() {
      return this.data?.company?.companyLogo
        ? `http://localhost/Mua_Insurance/backend/uploads/${this.data.company.companyLogo}`
        : "";
    },
    lossAccessorLogo() {
      return this.data?.accessor?.lossAccessorLogo
        ? `http://localhost/Mua_Insurance/backend/uploads/${this.data.accessor.lossAccessorLogo}`
        : "";
    },
  },
  methods: {
   async exportPDF() {
      const doc = new jsPDF();
      
      // Title and header
      doc.setFontSize(22);
      doc.text(this.company.name, 20, 20);

      // Add company logo
      const logo = this.companyLogo;
      if (logo) {
        doc.addImage(logo, 'JPEG', 150, 10, 50, 20); // Adjust position and size as needed
      }

      // Claim Information
      doc.setFontSize(16);
      doc.text("Claim Information", 20, 40);
      doc.setFontSize(12);
      doc.text(`Accident Description: ${this.claimData.accidentDescription}`, 20, 50);
      doc.text(`Course of Accident: ${this.claimData.courseOfAccident}`, 20, 60);
      // Add other claim details here...

      // Salvage Items
      doc.setFontSize(16);
      doc.text("Salvage Items", 20, 80);
      const startY = 90;
      let currentY = startY;

      // Table headers
      doc.setFontSize(12);
      doc.text("Name", 20, currentY);
      doc.text("Unit Price", 80, currentY);
      doc.text("Quantity", 140, currentY);
      doc.text("Total Price", 180, currentY);
      currentY += 10;

      // Table data
      this.salvageItems.forEach(item => {
        doc.text(item.name, 20, currentY);
        doc.text(item.unitPrice.toString(), 80, currentY);
        doc.text(item.quantity.toString(), 140, currentY);
        doc.text(item.totalPrice.toString(), 180, currentY);
        currentY += 10;
      });

      // Save the PDF
      doc.save("salvage_report.pdf");
    },

async fetchData() {
      try {
        const hashedId = this.$route.params.id; // Get the id from route params
        const id = atob(hashedId); // Decode the id if necessary
      
        const data = await QuotationService.fetchQuotationReport(id);
        this.data = data; // Set the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
};
</script>


<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card img {
  max-width: 100px;
  margin-bottom: 10px;
}
.page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width:1500px;
}
.card {
width: 100%;
  padding: 60px;

  border-radius: 8px;
  margin-left:150px
  /* background-color: #f9f9f9; */
  /* border:2px solid red; */
}
.cards {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


/* .logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
} */

.company-logo,
.accessor-logo {
  width: 80px;
  height: 80px;
  border-radius:10%;
  object-fit: cover;
}

h2 {
  margin: 5px 0;
  font-size: 16px;
  color: #333;
}

h1 {
  margin-top: 20px;
  font-size: 20px;
  color: #555;
}
.details-container {
  display: flex;
  flex-direction: column; /* Stack the cards vertically */
  gap: 20px; /* Space between the cards */
  align-items: center; /* Center the cards horizontally */
}

.detail-card {
  width: 100%; /* Make the cards full-width */
margin-right:80px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  transition: transform 0.3s ease-in-out;
}

.detail-card:hover {
  transform: translateY(-5px); /* Elevate card on hover */
}

.card-header h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.card-body p {
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .detail-card {
    width: 90%; /* Adjust width on smaller screens */
  }
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid columns */
  gap: 20px; /* Space between cards */
  padding: 20px;
}

.document-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.document-card:hover {
  transform: translateY(-5px); /* Elevate card on hover */
}

.document-link {
  display: block;
  font-size: 16px;
  color: #0066cc;
  text-decoration: none;
  margin-bottom: 15px;
}

.document-link:hover {
  text-decoration: underline;
}

.document-description {
  font-size: 14px;
  color: #555;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Stack cards on smaller screens */
  }
}

.grid-containers {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid columns */
  gap: 20px; /* Space between cards */
  padding: 20px;
}

.image-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden; /* Ensures images are contained within the card */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-card:hover {
  transform: translateY(-5px); /* Elevate card on hover */
}

.image-card img {
  width: 100%; /* Ensures image fills the full width of the card */
  height: 80%; /* Takes up 80% of the card's height */
  object-fit: cover; /* Ensures the image covers the area without distortion */

  
}

.image-card-description {
  font-size: 14px;
  color: #555;
  padding: 10px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Stack cards on smaller screens */
  }
}



</style>
