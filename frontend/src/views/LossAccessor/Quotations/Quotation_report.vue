<template>
  <div class="page">
    <div v-if="data">
      <div class="card">
        <img :src="companyLogo" alt="Company Logo" />
        <h2>{{ company.companyName }}</h2>
        <h2>{{ company.email }}</h2>
        <h2>{{ company.phoneNumber }}</h2>


        <h1>loss accessor informaton</h1>
        <img :src="lossAccessorLogo" alt="Company Logo" />


        <h2>{{ accessor.lossAccessorName }}</h2>
        <h2>{{ accessor.email }}</h2>
        <h2>{{ accessor.phoneNumber }}</h2>
        <h2>{{ accessor.address }}</h2>
        <ul>
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
          <li v-for="(detail, key) in claimDetails" :key="key">
            <strong>{{ key }}:</strong> {{ detail }}
          </li>
        </ul>
        <div v-if="supportingDocuments.length">
  <h3>Supporting Documents</h3>
  <ul>
    <li v-for="doc in supportingDocuments" :key="doc.filename">
      <!-- File link -->
      <a :href="`http://localhost/Mua_Insurance/backend/uploads/${doc.filename}`" target="_blank">
        View Document
      </a>
      <!-- Description below the link -->
      <p>{{ doc.description }}</p>
    </li>
  </ul>
</div>


        <div v-if="supportingImages.length">
  <h3>Supporting Images</h3>
  <ul>
    <li v-for="img in supportingImages" :key="img.filename" class="supporting-image">
      <img
        :src="`http://localhost/Mua_Insurance/backend/uploads/${img.filename}`"
        alt="Supporting Image"
      />
      <p>{{ img.description }}</p>
    </li>
  </ul>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div
    v-for="(item, index) in salvageItems"
    :key="index"
    class="p-4 border rounded shadow"
  >
    <!-- Salvage Image -->
    <img
      :src="`http://localhost/Mua_Insurance/backend/uploads/${item.image}`"
      alt="Salvage Image"
      class="w-full h-32 object-cover mb-4"
    />

    <!-- Salvage Item Details -->
    <h3 class="font-bold text-lg">{{ item.name }}</h3>
    <p>Unit Price: {{ item.unitPrice }}</p>
    <p>Quantity: {{ item.quantity }}</p>
    <p class="font-bold">Total Price: {{ item.totalPrice }}</p>
    <p>Action: {{ item.action }}</p>
  </div>
</div>

<button
        @click="exportPDF"
        class="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
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
import axios from "axios";
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
      const images = JSON.parse(this.data?.salvageImages || "[]");

      // Combine into an array of objects
      return names.map((name, index) => ({
        name,
        unitPrice: unitPrices[index] || 0,
        quantity: quantities[index] || 0,
        totalPrice: (unitPrices[index] || 0) * (quantities[index] || 0),
        action: actions[index] || "N/A",
        image: images[index] || "placeholder.jpg", // Fallback image
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
  const element = document.querySelector(".page");

  // Ensure images are loaded
  const images = document.querySelectorAll("img");
  const loadImagePromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(); // Image is already loaded
      } else {
        img.onload = resolve; // Resolve once image is loaded
        img.onerror = resolve; // Resolve if there's an error loading
      }
    });
  });

  await Promise.all(loadImagePromises); // Wait for all images to be loaded

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: true,
    useCORS: true,
    onclone: (document) => {
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            // Make sure image source URLs are absolute
            if (!img.src.startsWith('http')) {
                img.src = `http://localhost/Mua_Insurance/backend/uploads/${img.src}`;
            }
        });
    }
});


  const pdf = new jsPDF("p", "mm", "a4");
  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 190; // Fit to A4 width
  const pageHeight = 297; // A4 page height
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 10;

  // Add the first page
  pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Add additional pages if content exceeds one page 
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("salvage_report.pdf");
},
    async fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/LossAccessor/quotation/report/9", 
        {
          withCredentials: true // Enables sending cookies with the request
        }
      );
      this.data = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
},
  mounted() {
    this.fetchData();
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
}
</style>
