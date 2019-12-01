<template>
  <div>
    <!-- PROPOSALS MODALS -->
    <b-modal
      ref="modal-voting"
      :title="`${$t('vote.supportingProposal')}`"
      centered
      hide-footer
    >
      <VotingModal
        :proposalIdProp="proposalId"
        :userProp="user.name"
        :voteStatusProp="voteStatus"
        :loggedInProp="user.loggedIn"
        :steemconnect="true"
        :shareonsocial="true"
      />
    </b-modal>

    <b-modal
      size="md"
      scrollable
      ref="modal-voters2"
      :title="`${$t('proposals.proposalVoters')} (#${proposalId})`"
      centered
      hide-footer
    >
      <SkeletonLoading v-if="!accounts.length" />
      <VotersModal :accounts="accounts" :proposalVoters="proposalVoters" />
    </b-modal>

    <b-modal
      size="lg"
      scrollable
      ref="modal-post"
      :title="`${proposalSubject} (#${proposalId})`"
      centered
      hide-footer
    >
      <SkeletonLoading v-if="!post.body" />
      <div v-if="post.body">
        <vue-markdown :source="post.body" class="postImage"></vue-markdown>
      </div>
    </b-modal>
    <!-- PROPOSALS TABLE -->
    <div class="row mt-2">
      <!-- <div class="row mt-2 d-none d-md-block"> -->
      <div class="col-md-12">
        <b-table
          :class="
            `table table-padded table-${votesStatusProp} align-items-center`
          "
          :show-empty="true"
          :items="proposals(votesStatusProp, `${statusProp}`)"
          :fields="fieldsProposals"
          :filter="filterProp"
          responsive="sm"
          :sort-by.sync="proposalsSortBy"
          :sort-desc.sync="proposalsSortDesc"
          :sort-direction="proposalsSortDirection"
        >
          <template v-slot:empty>
            <div class="d-flex justify-content-center">
              <span class="text-center mt-1">{{
                $t("proposals.emptyState")
              }}</span>
            </div>
          </template>
          
          <!-- Votes -->
          <template v-slot:cell(total_votes)="data">
            <span style="cursor:pointer" @click="loadVoters(data.item.id)"
              >{{ data.item.total_votes | numeric }} SP</span
            >
          </template>
          <!-- Status -->
          <template v-slot:cell(status)="data">
            <span class="badge badge-dot">
              <i :class="`bg-${votesStatusProp}`"></i>
            </span>
            <span v-if="data.item.status === 'expired'"
              >{{ $t("common.completedProposalsLabel") }}:<br />
              ({{ data.item.end_date | dateFilter }})</span
            >
            <span v-if="data.item.status !== 'expired'">{{
              data.item.status === "active"
                ? $t("common.activeProposalsLabel")
                : $t("common.inactiveProposalsLabel")
            }}</span
            ><br />
            <span v-if="data.item.status !== 'expired'"
              >({{ $t("common.ends") }}
              {{ data.item.end_date | daysLeft }})</span
            >
          </template>
          <!-- Description -->
          <template v-slot:cell(description)="data">
            <div class="row">
              <div
                class="media align-items-center col-md-2 d-none d-md-block mr-3"
              >
                <div class="avatar rounded-circle">
                  <router-link :to="'/proposals/' + data.item.creator">
                    <img
                      :src="
                        `https://steemitimages.com/u/${data.item.creator}/avatar`
                      "
                    />
                  </router-link>
                </div>
              </div>
              <div class="col-md-9">
                <div class="text-wrap">
                  <span
                    class="text-dark h6"
                    style="cursor:pointer"
                    @click="
                      showPostModal(
                        data.item.id,
                        data.item.creator,
                        data.item.permlink_short,
                        data.item.subject
                      )
                    "
                    >{{ data.item.subject }}</span
                  >
                  <span
                    class="badge badge-success"
                    v-if="data.item.refunding === true"
                    style="cursor:pointer"
                    v-b-tooltip.hover
                    :title="`${$t('proposals.returnProposalInfo1')}`"
                  >
                    {{ $t("proposals.returnProposal") }}</span
                  >
                  <span
                    class="badge badge-warning"
                    v-if="data.item.burning === true"
                    style="cursor:pointer"
                    v-b-tooltip.hover
                    :title="`${$t('proposals.burnProposalInfo')}`"
                    >{{ $t("proposals.burnProposal") }}</span
                  >
                </div>
                <div>
                  {{ $t("common.by") }}
                  <router-link
                    class="text-uppercase text-muted"
                    :to="'/proposals/' + data.item.creator"
                    >@{{ data.item.creator }}</router-link
                  >
                  <span v-if="data.item.creator !== data.item.receiver">
                    {{ $t("common.for") }}
                    <router-link
                      class="text-uppercase text-muted"
                      :to="'/proposals/' + data.item.receiver"
                      >@{{ data.item.receiver }}</router-link
                    >
                  </span>
                </div>
              </div>
            </div>
          </template>
          <!-- Duration -->
          <template v-slot:cell(duration)="data">
            {{ data.item.duration | numeric3 }} {{ $t("common.days") }}
          </template>
          <!-- Requested -->
          <template v-slot:cell(requested)="data">
            <div>{{ data.item.total_requested | numeric }} SBD</div>
            <div>
              {{ data.item.daily_pay | numeric }} SBD /
              {{ $t("common.day") }}
            </div>
          </template>
          <template v-slot:cell(funding)="data">
            <div
              v-b-tooltip.hover
              :title="
                `${Number(
                  data.item.funding.availableBudget
                ).toLocaleString()} SBD ${$t('common.availableBudget')}`
              "
            >
              {{ data.item.funding.fundedStake}}%
            </div>
          </template>
          <!-- Voting -->
          <template v-slot:cell(vote)="data">
            <button
              class="btn btn-sm btn-light text-dark"
              @click="showVotingModal(data.item.id)"
            >
              <i :class="`far fa-thumbs-up`"></i>
            </button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { i18n } from "@/utils/plugins/i18n.js";
import VueMarkdown from "vue-markdown";
import { DefaultRenderer } from "steem-content-renderer";
import VotingModal from "@/components/VotingModal";
import SkeletonLoading from "@/components/SkeletonLoading";
import VotersModal from "@/components/VotersModal";

export default {
  components: {
    VueMarkdown,
    DefaultRenderer,
    VotingModal,
    SkeletonLoading,
    VotersModal
  },
  computed: {
    ...mapState([
      "voters",
      "accounts",
      "dailyBudget",
      "globalProperties",
      "language",
      "proposalVoters",
      "post",
      "user"
    ]),
    ...mapGetters({
      proposals: "proposalsByVotesStatus",
      totalProposalsByVotesStatus: "totalProposalsByVotesStatus",
      totalProposals: "totalProposals"
    })
  },
  props: {
    filterProp: String,
    votesStatusProp: String,
    statusProp: String
  },
  methods: {
    loadVoters(id) {
      this.proposalId = id;
      this.$refs["modal-voters2"].show();
      this.$store.dispatch("fetchProposalVoters", id);
    },
    showVotingModal(id) {
      this.proposalId = id;
      this.$refs["modal-voting"].show();
    },
    showPostModal(id, creator, permlink, subject) {
      this.proposalSubject = subject;
      this.proposalId = id;
      const renderer = new DefaultRenderer({
        baseUrl: "https://steemit.com/",
        breaks: true,
        skipSanitization: false,
        allowInsecureScriptTags: false,
        addNofollowToLinks: true,
        doNotShowImages: false,
        ipfsPrefix: "",
        assetsWidth: 640,
        assetsHeight: 480,
        imageProxyFn: url => url,
        usertagUrlFn: account => "/@" + account,
        hashtagUrlFn: hashtag => "/trending/" + hashtag,
        isLinkSafeFn: url => true
      });
      this.$refs["modal-post"].show();
      this.$store.dispatch("fetchPost", [creator, permlink]).then(() => {
        this.post.body = renderer.render(this.post.body);
      });
    },
     fetchVoterProposals() {
      this.$store.dispatch("fetchVoterProposals", this.user.name);
    }
  },
  data() {
    return {
      fieldsProposals: [
        {
          key: "total_votes",
          label: i18n.t("common.totalVotes")
        },
        {
          key: "description",
          label: i18n.t("common.description")
        },
        {
          key: "status",
          label: i18n.t("common.status")
        },
        {
          key: "duration",
          label: i18n.t("common.duration")
        },
        {
          key: "requested",
          label: i18n.t("common.requested")
        },
        {
          key: "funding",
          label: i18n.t("common.funding")
        },
        {
          key: "vote",
          label: i18n.t("common.vote")
        }
      ],
      proposalsSortBy: "total_votes",
      proposalsSortDesc: true,
      proposalsSortDirection: "asc",
      voteStatus: true,
      proposalId: 0,
      proposalSubject: ""
    };
  },
  created() {
    this.fetchVoterProposals();
  }
};
</script>

<style></style>
