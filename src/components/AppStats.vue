<template>
  <div class="row mx-auto">
    <div class="col-lg-4">
      <div
        class="card card-stats bg-gradient-primary border-0 hover-shadow-lg hover-translate-y-n3 mb-4 ml-lg-0"
      >
        <div class="card-body">
          <div class="d-flex">
            <div>
              <div class="icon text-white icon-sm">
                <i class="fas fa-battery-full"></i>
              </div>
            </div>
            <div class="pl-4">
              <span class="d-block h5 text-white mr-2 mb-1"
                >{{ totalBudget | numeric3 }} SBD</span
              >
              <span class="text-white">{{ $t("common.totalBudget") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div
        class="card card-stats bg-gradient-info border-0 hover-shadow-lg hover-translate-y-n3 mb-4 ml-lg-0"
      >
        <div class="card-body">
          <div class="d-flex">
            <div>
              <div class="icon text-white icon-sm">
                <i class="fas fa-battery-half"></i>
              </div>
            </div>
            <div class="pl-4">
              <span class="d-block h5 text-white mr-2 mb-1"
                >{{ dailyBudget | numeric3 }} SBD</span
              >
              <span class="text-white">{{ $t("common.dailyBudget") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div
        class="card card-stats bg-gradient-dark border-0 hover-shadow-lg hover-translate-y-n3 mb-4 ml-lg-0"
      >
        <div class="card-body">
          <div class="d-flex">
            <div>
              <div class="icon text-white icon-sm">
                <i class="fas fa-bullseye"></i>
              </div>
            </div>
            <div class="pl-4">
              <span class="d-block h5 text-white mr-2 mb-1">{{
                totalProposals | numeric
              }}</span>
              <span class="text-white">{{ $t("common.totalProposals") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "AppStats",
  computed: {
    ...mapState(['dailyBudget', 'totalBudget']),
    ...mapGetters({
      totalProposals: 'totalProposals'
    })
  }
};
</script>
<style scoped></style>
