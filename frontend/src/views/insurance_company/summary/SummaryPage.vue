<template>
  <div class="page">
    <div class="mb-4" style="margin-top:50px">


<div class="summarytop">

<SummaryCard />

<StaisticsCard />
<AnalyticCard />
</div>



































  </div>

  </div>


</template>

<script>

import SummaryCard from '../../../views/insurance_company/summary/summarycard.vue';
import StaisticsCard from '../../../views/insurance_company/summary/statisticCard.vue';
import AnalyticCard from '../../../views/insurance_company/summary/Analytic.vue';

export default {
components: {
    SummaryCard,
    StaisticsCard,
    AnalyticCard
  },
}
</script>

<style>

.page{
  padding: 20px;
  width: 80%;
  margin-left: 345px;

}

.summarytop{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* align-items: center */
}
</style>