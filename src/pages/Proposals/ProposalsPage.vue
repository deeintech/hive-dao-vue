<template>
  <div>
    <section class="slice bg-section-secondary">
      <div class="container px-1">
        <!-- Stats -->
        <AppStats />
        <SkeletonLoading v-if="!totalProposals > 0" class="ml-3" />
        <div class="mb-5 mx-2" v-if="totalProposals > 0">
          <ProposalsToolbar
            @onProposalSearch="proposalSearch($event)"
            @onStatusChange="status = $event"
            :filterProp="filter"
          />

          <!-- PASSING PROPOSALS -->
          <ProposalsList
            :filterProp="filter"
            :statusProp="status"
            :votesStatusProp="'passing'"
          />

          <!-- RETURN PROPOSAL -->
          <div class="text-center text-warning text-uppercase mb-2">
            {{ $t("proposals.insufficientVotes") }} ({{returnProposal[0].total_votes | numeric3}} SP)
          </div>

          <!-- PROPOSALS WITH INSUFFICIENT VOTES -->
          <ProposalsList
            :filterProp="filter"
            :statusProp="status"
            :votesStatusProp="'insufficient'"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AppStats from "@/components/AppStats.vue";
import { mapState, mapGetters } from "vuex";
import ProposalsToolbar from "@/pages/Proposals/ProposalsToolbar";
import ProposalsList from "@/pages/Proposals/ProposalsList";
import SkeletonLoading from "@/components/SkeletonLoading";

export default {
  name: "Proposals",
  components: {
    AppStats,
    SkeletonLoading,
    ProposalsToolbar,
    ProposalsList
  },
  computed: {
    ...mapState([
      "voters",
      "accounts",
      "dailyBudget",
      "globalProperties",
      "language",
      "proposalVoters",
      "returnProposal",
      "post"
    ]),
    ...mapGetters({
      proposals: "proposalsByVotesStatus",
      totalProposalsByVotesStatus: "totalProposalsByVotesStatus",
      totalProposals: "totalProposals"
    })
  },
  methods: {
    proposalSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.filter = event;
      }, 300);
    }
  },
  data() {
    return {
      filter: null,
      votesStatus: "passing",
      status: "all",
      voteStatus: true,
      user: "",
      proposalId: 0,
      proposalSubject: ""
    };
  }
};
</script>
