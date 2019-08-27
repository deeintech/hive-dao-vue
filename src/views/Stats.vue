<template>
  <div class="row">
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
              <span class="d-block h5 text-white mr-2 mb-1">{{totalBudget | numeric}} SBD</span>
              <span class="text-white">Total budget</span>
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
              <span class="d-block h5 text-white mr-2 mb-1">{{dailyBudget | numeric}} SBD</span>
              <span class="text-white">Daily budget</span>
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
              <span class="d-block h5 text-white mr-2 mb-1">{{totalProposals | numeric}}</span>
              <span class="text-white">Total proposals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Stats',
  computed: {
    totalProposals () {
      return this.$store.getters.totalProposals
    },
    totalBudget () {
      return this.$store.getters.totalBudget
    },
    dailyBudget () {
      return this.$store.getters.dailyBudget
    }
  }
}
</script>
<style scoped>
</style>
