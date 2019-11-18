<template>
  <div class="col-lg-4">
    <div :class="`pipeline white lined-${status}`">
      <div class="pipeline-header">
        <h5 class="pipeline-name">
          {{ $t(`common.${status}ProposalsLabel`) }}
        </h5>
        <div class="pipeline-header-numbers">
          <div class="pipeline-value"></div>
          <div class="pipeline-count">
            {{ totalProposals(`${worker}`, status) }}
            {{ $t("common.proposalsLabel") }}
          </div>
        </div>
        <div class="pipeline-settings">
          <i class="fas fa-align-justify"></i>
        </div>
      </div>
      <div class="pipeline-body">
        <div
          class="pipeline-item"
          v-for="proposal in workerProposalsByStatus(`${worker}`, status)"
          :key="proposal.id"
        >
          <a
            class="text-dark text-dark"
            :href="proposal.permlink"
            target="_blank"
          >
            <div class="pi-controls">
              <div
                class="status status-green"
                data-placement="top"
                data-toggle="tooltip"
                title="Started Status"
              ></div>
            </div>
            <div class="pi-body">
              <div class="media align-items-center">
                <span
                  :class="`avatar bg-${status} text-uppercase text-white mr-4`"
                  >{{ avatarName(proposal.subject) }}</span
                >
              </div>
              <div class="pi-info">
                <div class="h6 pi-name text-wrap">
                  {{ proposal.creator }}
                </div>
                <div class="small text-dark text-wrap">
                  {{ proposal.subject }}
                </div>
              </div>
            </div>
            <div class="pi-foot pb-0">
              <span class="extra-info text-wrap">
                <ul>
                  <li>
                    <strong>{{ proposal.total_votes | numeric3 }} SP</strong>
                  </li>
                  <li>
                    <strong>{{ proposal.daily_pay | numeric }}</strong>
                    SBD / {{ $t("common.day") }}
                  </li>
                  <li>
                    <strong>{{ proposal.total_requested | numeric }}</strong>
                    SBD {{ $t("common.total") }}
                  </li>
                  <li>
                    <strong>{{ proposal.start_date | dateFilter }}</strong>
                    -
                    <strong>{{ proposal.end_date | dateFilter }}</strong>
                  </li>
                </ul>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    worker: String,
    status: String
  },
  computed: {
    ...mapGetters({
      workerProposalsByStatus: "workerProposalsByStatus",
      totalProposals: "totalWorkerProposalsByStatus"
    })
  },
  methods: {
    avatarName(value) {
      return value.substring(0, 2);
    }
  }
};
</script>
<style></style>
