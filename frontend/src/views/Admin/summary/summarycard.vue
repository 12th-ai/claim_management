<template>
  <div>
    <div class="row project-wrapper" style="width:200%">
      <div class="col-xxl-8">
        <div class="row">
          <!-- Dynamic Cards -->
          <div class="col-xl-4 col-md-6" v-for="(card, index) in cards" :key="index">
            <div class="card card-animate">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="avatar-sm flex-shrink-0">
                    <span :class="'avatar-title ' + card.iconBg + ' rounded-2 fs-2'">
                      <i :class="card.icon"></i>
                    </span>
                  </div>
                  <div class="flex-grow-1 overflow-hidden ms-3">
                    <p class="text-uppercase fw-medium text-muted text-truncate mb-3">
                      {{ card.title }}
                    </p>
                    <div class="d-flex align-items-center mb-3">
                      <h4 class="fs-4 flex-grow-1 mb-0">{{ card.value }}</h4>
                      <span
                        :class="'badge ' + card.badgeBg + ' fs-12'"
                      >
                        <i :class="'ri-arrow-' + card.trend + '-s-line fs-13 align-middle me-1'"></i>
                        {{ card.percentage }}
                      </span>
                    </div>
                    <p class="text-muted text-truncate mb-0">
                      {{ card.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Card -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "Total Applications",
          value: "1205",
          trend: "up",
          percentage: "2.5%",
          description: "Applications this month",
          icon: "ri-file-list-3-line text-primary",
          iconBg: "bg-primary-subtle text-primary",
          badgeBg: "bg-success-subtle text-success",
        },
        {
          title: "Total Accidents",
          value: "321",
          trend: "down",
          percentage: "4.8%",
          description: "Accidents reported",
          icon: "ri-car-wreck-line text-danger",
          iconBg: "bg-danger-subtle text-danger",
          badgeBg: "bg-danger-subtle text-danger",
        },
        {
          title: "Total Companies",
          value: "78",
          trend: "up",
          percentage: "1.1%",
          description: "Registered companies",
          icon: "ri-building-line text-info",
          iconBg: "bg-info-subtle text-info",
          badgeBg: "bg-success-subtle text-success",
        },
        {
          title: "Total Loss Accessors",
          value: "45",
          trend: "down",
          percentage: "3.2%",
          description: "Loss accessor reviews",
          icon: "ri-user-search-line text-warning",
          iconBg: "bg-warning-subtle text-warning",
          badgeBg: "bg-danger-subtle text-danger",
        },
        {
          title: "Total Claims",
          value: "560",
          trend: "up",
          percentage: "5.6%",
          description: "Claims processed",
          icon: "ri-money-dollar-circle-line text-success",
          iconBg: "bg-success-subtle text-success",
          badgeBg: "bg-success-subtle text-success",
        },
      ],
    };
  },
};
</script>

<style scoped>
.card-animate {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-animate:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}
.avatar-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
}
</style>
