<template>
  <div>
    <AppHeaderSection :title="`Profile title`" :subtitle="`profile subtitle`" />
    <section class="pt-7 pt-lg-0 bg-section-secondary">
      <div class="container-fluid pl-lg-6 pr-lg-6">
        <div class="row">
          <WorkerProposalsInfo />
          <div class="col-lg-9 mt-lg-5">
            <SkeletonLoading v-if="!voterProposals.length" />
            <!-- <div v-if="voterProposals.length">
              <div v-for="proposal in voterProposals" :key="proposal.key">
                {{ proposal.proposal.id }} - {{ proposal.proposal.subject }}
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppHeaderSection from "@/components/AppHeaderSection";
import SkeletonLoading from "@/components/SkeletonLoading";
import WorkerProposalsInfo from "@/pages/WorkerProposals/WorkerProposalsInfo";

export default {
  components: {
    AppHeaderSection,
    SkeletonLoading,
    WorkerProposalsInfo
  },
  computed: {
    ...mapState(["voterProposals", "user"])
  },
  methods: {
    fetchAccountByName(name) {
      this.$store.dispatch("fetchAccountByName", name);
    }
  },
  created() {
    this.fetchAccountByName(this.user.name);
  }
};
</script>

<style></style>
