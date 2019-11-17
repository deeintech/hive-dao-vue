<template>
  <div>
    <section class="slice bg-section-secondary">
      <div class="container px-0">
        <!-- Stats -->
        <AppStats />
        <SkeletonLoading v-if="!totalProposals > 0" class="ml-3" />
        <div class="mb-5" v-if="totalProposals > 0">
          <!-- WEB -->
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

          <!-- RETURNING PROPOSAL -->
          <div class="text-center text-warning text-uppercase mb-2">
            {{ $t("proposals.insufficientVotes") }}
          </div>

          <!-- PROPOSALS WITH INSUFFICIENT VOTES -->
          <ProposalsList
            :filterProp="filter"
            :statusProp="status"
            :votesStatusProp="'insufficient'"
          />

          <!-- MOBILE-->
          <!-- <div class="px-3 d-block d-md-none mt-3">
            <div class="support-index mb-3">
              <div class="support-tickets">
                <div
                  class="support-ticket"
                  v-for="p in proposals('passing', status)"
                  :key="p.key"
                >
                  <div class="st-meta">
                    <div
                      class="badge badge-success-inverted"
                      @click="loadVoters(p.id)"
                    >
                      {{ p.total_votes | numeric3 }} SP
                    </div>
                    <span class="badge badge-dot">
                      <i :class="`bg-${p.status}`"></i>
                    </span>
                  </div>
                  <div class="st-body">
                    <div class="avatar">
                      <router-link
                        class="text-muted"
                        :to="'/proposals/' + p.creator"
                      >
                        <img
                          :src="
                            `https://steemitimages.com/u/${p.creator}/avatar`
                          "
                        />
                      </router-link>
                    </div>
                    <div class="ticket-content">
                      <router-link
                        class="text-muted"
                        :to="'/proposals/' + p.creator"
                      >
                        <h6 class="ticket-title">{{ p.creator }}</h6>
                      </router-link>
                      <div
                        class="text-wrap text-dark"
                        @click="
                          showPostModal(
                            p.id,
                            p.creator,
                            p.permlink_short,
                            p.subject
                          )
                        "
                      >
                        {{ p.subject }}
                      </div>
                    </div>
                  </div>
                  <div class="st-foot">
                    <span class="label">{{ $t("common.requested") }}:</span>
                    <span class="value"
                      >{{ p.total_requested | numeric }} SBD</span
                    >
                    <span v-if="p.status === 'active'" class="value float-right"
                      >({{ $t("common.ends") }}
                      {{ p.end_date | daysLeft }})</span
                    >
                    <span
                      v-if="p.status === 'inactive'"
                      class="value float-right"
                      >({{ $t("common.starts") }}
                      {{ p.start_date | daysLeft }})</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="text-warning text-center text-uppercase mb-2">
              {{ $t("proposals.insufficientVotes") }}
            </div>
            <div class="support-index mt-3">
              <div class="support-tickets">
                <div
                  class="support-ticket"
                  v-for="p in proposals('insufficient', status)"
                  :key="p.key"
                >
                  <div class="st-meta">
                    <div
                      class="badge badge-success-inverted"
                      @click="loadVoters(p.id)"
                    >
                      {{ p.total_votes | numeric3 }} SP
                    </div>
                    <span class="badge badge-dot">
                      <i :class="`bg-${p.status}`"></i>
                    </span>
                  </div>
                  <div class="st-body">
                    <div class="avatar">
                      <router-link
                        class="text-muted"
                        :to="'/proposals/' + p.creator"
                      >
                        <img
                          :src="
                            `https://steemitimages.com/u/${p.creator}/avatar`
                          "
                        />
                      </router-link>
                    </div>
                    <div class="ticket-content">
                      <router-link
                        class="text-muted"
                        :to="'/proposals/' + p.creator"
                      >
                        <h6 class="ticket-title">{{ p.creator }}</h6>
                      </router-link>
                      <div
                        class="text-wrap text-dark"
                        @click="
                          showPostModal(
                            p.id,
                            p.creator,
                            p.permlink_short,
                            p.subject
                          )
                        "
                      >
                        {{ p.subject }}
                      </div>
                    </div>
                  </div>
                  <div class="st-foot">
                    <span class="label">{{ $t("common.requested") }}:</span>
                    <span class="value"
                      >{{ p.total_requested | numeric }} SBD</span
                    >
                    <span v-if="p.status === 'active'" class="value float-right"
                      >({{ $t("common.ends") }}
                      {{ p.end_date | daysLeft }})</span
                    >
                    <span
                      v-if="p.status === 'inactive'"
                      class="value float-right"
                      >({{ $t("common.starts") }}
                      {{ p.start_date | daysLeft }})</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div> -->
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
      "returningProposal",
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
