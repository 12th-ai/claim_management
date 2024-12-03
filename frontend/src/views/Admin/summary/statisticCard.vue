<template>
  <div class="col-xxl-4 col-lg-6">
    <div class="card card-height-100">
      <!-- Venn Diagram at the Top -->
      <div class="venn-diagram">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Circle 1 -->
          <circle cx="70" cy="50" r="40" fill="rgba(66, 133, 244, 0.5)" />
          <!-- Circle 2 -->
          <circle cx="130" cy="50" r="40" fill="rgba(219, 68, 55, 0.5)" />
          <!-- Intersection -->
          <text x="100" y="55" text-anchor="middle" font-size="10" fill="#333">
            Intersection
          </text>
        </svg>
      </div>

      <!-- Card Header -->
      <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">Projects Status</h4>
        <div class="flex-shrink-0">
          <div class="dropdown card-header-dropdown">
            <a
              class="dropdown-btn text-muted"
              href="#"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Time <i class="mdi mdi-chevron-down ms-1"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" @click="fetchAnalytics('all')">All Time</a>
              <a class="dropdown-item" @click="fetchAnalytics('7days')">Last 7 Days</a>
              <a class="dropdown-item" @click="fetchAnalytics('30days')">Last 30 Days</a>
              <a class="dropdown-item" @click="fetchAnalytics('90days')">Last 90 Days</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <div class="d-flex justify-content-center align-items-center mb-4">
          <h2 class="me-3 ff-secondary mb-0">{{ totalProjects }}</h2>
          <div>
            <p class="text-muted mb-0">Total Projects</p>
            <p class="text-success fw-medium mb-0">
              <span class="badge bg-success-subtle text-success p-1 rounded-circle">
                <i class="ri-arrow-right-up-line"></i>
              </span>
              +{{ newProjects }} New
            </p>
          </div>
        </div>

        <div
          v-for="(status, index) in projectStatus"
          :key="index"
          class="d-flex justify-content-between border-bottom border-bottom-dashed py-2"
        >
          <p class="fw-medium mb-0">
            <i
              :class="`ri-checkbox-blank-circle-fill text-${status.color} align-middle me-2`"
            ></i>
            {{ status.label }}
          </p>
          <div>
            <span class="text-muted pe-5">{{ status.count }} Projects</span>
            <span class="text-success fw-medium fs-12">{{ status.hours }}hrs</span>
          </div>
        </div>
      </div>
      <!-- End Card Body -->
    </div>
    <!-- End Card -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalProjects: 0,
      newProjects: 0,
      projectStatus: [],
    };
  },
  methods: {
    fetchAnalytics(period) {
      const analyticsData = {
        all: {
          total: 258,
          new: 3,
          statuses: [
            { label: "Completed", count: 125, hours: 15870, color: "success" },
            { label: "In Progress", count: 42, hours: 243, color: "primary" },
            { label: "Yet to Start", count: 58, hours: 2050, color: "warning" },
            { label: "Cancelled", count: 89, hours: 900, color: "danger" },
          ],
        },
        "7days": { /* ...other data... */ },
        "30days": { /* ...other data... */ },
        "90days": { /* ...other data... */ },
      };

      const data = analyticsData[period];
      this.totalProjects = data.total;
      this.newProjects = data.new;
      this.projectStatus = data.statuses;
    },
  },
  mounted() {
    this.fetchAnalytics("all");
  },
};
</script>

<style scoped>
.card-height-100 {
  height: 100%;
}

.venn-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
