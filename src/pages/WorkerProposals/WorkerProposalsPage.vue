<template>
  <div>
    <AppHeaderSection
      :title="`${$t('workerProposals.title')}`"
      :subtitle="`${$t('workerProposals.subtitle')}`"
    />
    <section class="pt-7 pt-lg-0 bg-section-secondary">
      <div class="container-fluid pl-lg-6 pr-lg-6">
        <div class="row">
          <!-- Worker info -->
          <WorkerProposalsInfo />
          <div class="col-lg-9 mt-lg-5">
            <div class="pipelines-w">
              <div class="row">
                <WorkerProposalsList :worker="worker" :status="'active'" />
                <WorkerProposalsList :worker="worker" :status="'inactive'" />
                <WorkerProposalsList :worker="worker" :status="'expired'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import WorkerProposalsInfo from "@/pages/WorkerProposals/WorkerProposalsInfo";
import WorkerProposalsList from "@/pages/WorkerProposals/WorkerProposalsList";
import AppHeaderSection from "@/components/AppHeaderSection";

export default {
  name: "WorkerProposals",
  props: ["worker"],
  components: {
    WorkerProposalsInfo,
    WorkerProposalsList,
    AppHeaderSection
  },
  methods: {
    fetchAccountByName(name) {
      this.$store.dispatch("fetchAccountByName", name);
    },
    avatarName(value) {
      return value.substring(0, 2);
    }
  },
  created() {
    this.fetchAccountByName(this.worker);
  }
};
</script>

<style></style>
