<template>
  <div class="col-xxl-4 col-lg-6" style="width:900px;">
    <div class="card card-height-100" style="padding:30px">
<!-- SVG Bar Chart -->
<div class="chart-container" style="width: 100%; ">
  <svg height="300" style="width: 100%">
    <!-- Bar chart bars -->
    <g v-for="(metric, index) in metrics" :key="index">
      <!-- Bar -->
      <rect
        :x="index * (barWidth + barSpacing)"
        :y="chartHeight - metric.count"
        :width="barWidth"
        :height="metric.count"
        :fill="metric.color"
      />
      
      <!-- Count text on top of bars -->
      <text
        :x="index * (barWidth + barSpacing) + barWidth / 2"
        :y="chartHeight - metric.count - 5"
        text-anchor="middle"
        :fill="'#333'"
      >
        {{ metric.count }}
      </text>
      
      <!-- Label text below bars -->
      <text
        :x="index * (barWidth + barSpacing) + barWidth / 2"
        :y="chartHeight + 20"
        text-anchor="middle"
        :fill="'#333'"
      >
        {{ metric.label }}
      </text>
    </g>
  </svg>
</div>


      <!-- Card Header -->
      <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">System Analytics</h4>
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
          <h2 class="me-3 ff-secondary mb-0">{{ totalCount }}</h2>
          <div>
            <p class="text-muted mb-0">Total Analytics</p>
            <p class="text-success fw-medium mb-0">
              <span class="badge bg-success-subtle text-success p-1 rounded-circle">
                <i class="ri-arrow-right-up-line"></i>
              </span>
              +{{ newCount }} New
            </p>
          </div>
        </div>

        <div
          v-for="(metric, index) in metrics"
          :key="index"
          class="d-flex justify-content-between border-bottom border-bottom-dashed py-2"
        >
          <p class="fw-medium mb-0">
            <i
              :class="`ri-checkbox-blank-circle-fill text-${metric.color} align-middle me-2`"
            ></i>
            {{ metric.label }}
          </p>
          <div>
            <span class="text-muted pe-5">{{ metric.count }} Items</span>
            <span class="text-success fw-medium fs-12">{{ metric.value }} Value</span>
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
      totalCount: 0,
      newCount: 0,
      metrics: [],
      chartHeight: 300, // Height for the SVG chart
      barWidth: 80, // Width of each bar
      barSpacing: 110, // Spacing between bars
    };
  },
  methods: {
    fetchAnalytics(period) {
      const analyticsData = {
        all: {
          total: 500,
          new: 30,
          metrics: [
      
            { label: "Loss Accessor", count: 150, value: 800, color: "#79dbc6" },
            { label: "Claim", count: 100, value: 1500, color: "green" },
            { label: "Accident", count: 50, value: 700, color: "red" },
            { label: "Application", count: 250, value: 1000, color: "purple" },
          ],
        },
        "7days": {
          total: 80,
          new: 5,
          metrics: [
    
            { label: "Loss Accessor", count: 25, value: 80, color: "orange" },
            { label: "Claim", count: 15, value: 200, color: "green" },
            { label: "Accident", count: 5, value: 40, color: "red" },
            { label: "Application", count: 20, value: 150, color: "purple" },
          ],
          
          barWidth: 40, // Width of each bar
    barSpacing: 20, // Space between bars
    chartHeight: 300 // Height of the chart
  
        },
        "30days": {
          total: 200,
          new: 10,
          metrics: [
   
            { label: "Loss Accessor", count: 60, value: 200, color: "orange" },
            { label: "Claim", count: 50, value: 600, color: "green" },
            { label: "Accident", count: 30, value: 300, color: "red" },
            { label: "Application", count: 70, value: 400, color: "purple" },
          ],
        },
        "90days": {
          total: 350,
          new: 15,
          metrics: [
            { label: "Company", count: 100, value: 500, color: "blue" },
            { label: "Loss Accessor", count: 90, value: 400, color: "orange" },
            { label: "Claim", count: 70, value: 1000, color: "green" },
            { label: "Accident", count: 40, value: 500, color: "red" },
            { label: "Application", count: 120, value: 800, color: "purple" },
          ],
        },
      };

      const data = analyticsData[period];
      this.totalCount = data.total;
      this.newCount = data.new;
      this.metrics = data.metrics;
    },
  },
  mounted() {
    this.fetchAnalytics('all');
  },
};
</script>

<style scoped>
.card-height-100 {
  height: 100%;
}

.chart-container {
  width: 100%;
  overflow: hidden;
}

.venn-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  /* width:200px */
}
</style>
