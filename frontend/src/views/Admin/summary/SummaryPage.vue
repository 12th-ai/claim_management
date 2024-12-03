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

import SummaryCard from '../../../views/Admin/summary/summarycard.vue';
import StaisticsCard from '../../../views/Admin/summary/statisticCard.vue';
import AnalyticCard from '../../../views/Admin/summary/Analytic.vue';
import Analytic from '../../../views/Admin/summary/Analytic.vue';
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