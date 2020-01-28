<template>
  <div>
    <!-- Voting modal -->
    <b-modal
      ref="modal-voting"
      :title="`${$t('vote.supportingProposal')}`"
      centered
      hide-footer
    >
      <VotingModal
        :proposalIdProp="parseInt(id)"
        :userProp="user.name"
        :voteStatusProp="user.loggedIn ? isApproved(id) : voteStatus"
        :loggedInProp="user.loggedIn"
        :steemconnect="false"
        :shareonsocial="false"
      />
    </b-modal>

    <!-- Voters modal -->
    <b-modal
      size="md"
      scrollable
      ref="modal-voters"
      :title="`${$t('proposals.proposalVoters')} (#${id})`"
      centered
      hide-footer
    >
      <SkeletonLoading v-if="!accounts.length" />
      <VotersModal :accounts="accounts" :proposalVoters="proposalVoters" />
    </b-modal>

    <!-- Main content -->
    <div v-if="proposal">
      <section class="slice bg-gradient-primary vh-100 pt-5">
        <div class="container py-5 position-relative zindex-100">
          <div class="row row-grid justify-content-around align-items-center">
            <div class="col-lg-5">
              <div class="text-center text-lg-left">
                <span class="badge badge-soft-primary badge-pill">{{
                  $t("vote.steemOn")
                }}</span>
                <h1 class="text-white mt-4 mb-3">
                  {{ $t("vote.steemProposalsTitle") }}
                </h1>
                <!-- Buttons -->
                <div class="mt-6">
                  <a
                    class="btn btn-app-store hover-translate-y-n3 mr-lg-4 mb-4 text-left"
                    @click="showVotingModal()"
                  >
                    <i
                      ><img
                        class="icon-small ml-1"
                        src="@/assets/img/random/keychain.png"
                    /></i>
                    <span class="btn-inner--text">{{
                      $t("vote.supportWith")
                    }}</span>
                    <span class="btn-inner--brand">Keychain</span>
                  </a>
                  <a
                    class="btn btn-app-store hover-translate-y-n3 mb-4 text-left"
                    @click="steemconnectVote(true)"
                  >
                    <i
                      ><img
                        class="icon-small ml-1"
                        src="@/assets/img/random/steemconnect.png"
                    /></i>
                    <span class="btn-inner--text">{{
                      $t("vote.supportWith")
                    }}</span>
                    <span class="btn-inner--brand">Steemconnect</span>
                  </a>
                </div>
                <div class="text-white">
                  <a
                    href="https://signup.steemit.com"
                    target="_blank"
                    class="text-white"
                    ><small>{{ $t("vote.steemAccount") }}</small></a
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div
                class="card bg-section-secondary mt-6 mb-0 py-3 px-4 shadow-lg"
              >
                <div class="card-body">
                  <h5 class="heading h5 mb-3">{{ proposal.subject }}</h5>
                  <div
                    class="mb-3"
                    style="cursor:pointer"
                    @click="loadVoters()"
                  >
                    <strong class="h3">{{ totalProposalVoters || 0 }}</strong
                    ><span> {{ $t("vote.supportersLabel") }}</span>
                  </div>
                  <b-progress
                    id="tooltip1"
                    height="2rem"
                    variant="primary"
                    :max="100"
                  >
                    <b-progress-bar
                      :class="
                        totalValue() < 10 ? 'text-dark pl-2' : 'text-white pl-2'
                      "
                      :value="totalValue() || 0"
                      :label="`${totalValue() || 0}%`"
                    ></b-progress-bar>
                  </b-progress>
                  <b-tooltip target="tooltip1" triggers="hover">
                    <p v-if="returnProposal">
                      {{ $t("vote.totalVotesValue") }}
                      {{ totalProposalSP() | numeric3 }} SP
                    </p>
                  </b-tooltip>
                  <ul class="list-unstyled mt-4">
                    <li class="py-2">
                      <div class="d-flex align-items-center">
                        <a
                          :href="`https://steemit.com/@${proposal.creator}`"
                          target="_blank"
                          class="avatar avatar-sm rounded-circle mr-3"
                        >
                          <img
                            alt="Image placeholder"
                            :src="
                              `https://steemitimages.com/u/${proposal.creator}/avatar`
                            "
                          />
                        </a>
                        <span class="h6 mb-0"
                          ><strong>{{ $t("vote.createdBy") }}</strong> @<a
                            target="_blank"
                            :href="`https://steemit.com/@${proposal.creator}`"
                            >{{ proposal.creator }}</a
                          ></span
                        >
                      </div>
                    </li>
                    <li class="py-2">
                      <div class="d-flex align-items-center">
                        <div
                          class="icon icon-shape icon-warning icon-sm rounded-circle mr-3"
                        >
                          <i class="fas fa-wallet"></i>
                        </div>
                        <span class="h6 mb-0"
                          ><strong>{{ $t("vote.requestedFunding") }}: </strong>
                          {{ proposal.total_requested | numeric3 }} SBD</span
                        >
                      </div>
                    </li>
                    <li class="py-2">
                      <div class="d-flex align-items-center">
                        <div
                          class="icon icon-shape icon-primary icon-sm rounded-circle mr-3"
                        >
                          <i class="fas fa-calendar"></i>
                        </div>
                        <span class="h6 mb-0"
                          ><strong
                            >{{ proposal.duration || 0 }}
                            {{ $t("common.days") }}</strong
                          >
                          ({{ proposal.start_date | dateFilter }} -
                          {{ proposal.end_date | dateFilter }})</span
                        >
                      </div>
                    </li>

                    <li class="py-2">
                      <div class="d-flex align-items-center">
                        <div
                          class="icon icon-shape icon-success icon-sm rounded-circle mr-3"
                        >
                          <i class="fas fa-book"></i>
                        </div>
                        <span class="h6 mb-0"
                          ><a href="#proposalBody"
                            >{{$t('proposals.detailsLabel')}}</a
                          ></span
                        >
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container my-4" id="proposalBody">
        <!-- Post details -->
        <SkeletonLoading v-if="!post.body" />
        <div v-if="post.body">
          <vue-markdown :source="post.body" class="postImage"></vue-markdown>
          <h3>{{ $t("common.originalPostTitle") }}</h3>
          <div>
            {{ $t("common.originalPostDescription") }}
            <a :href="`${proposal.permlink}`" target="_blank">Steemit</a>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SkeletonLoading from "@/components/SkeletonLoading";
import VotersModal from "@/components/VotersModal";
import VotingModal from "@/components/VotingModal";
import VueMarkdown from "vue-markdown";
import { DefaultRenderer } from "steem-content-renderer";

export default {
  name: "ProposalVote",
  props: ["id"],
  computed: {
    ...mapState([
      "proposal",
      "voters",
      "accounts",
      "totalProposalVoters",
      "proposalVoters",
      "returnProposal",
      "user",
      "post",
      "voterProposals"
    ])
  },
  components: {
    SkeletonLoading,
    VotersModal,
    VotingModal,
    VueMarkdown,
    DefaultRenderer
  },
  data() {
    return {
      voteStatus: false
    };
  },
  methods: {
    steemconnectVote(approve) {
      window.open(
        `https://beta.steemconnect.com/sign/update-proposal-votes?proposal_ids=[${this.id}]&approve=${approve}`
      );
    },
    fetchProposalById() {
      this.$store.dispatch("fetchProposalById", Number(this.id)).then(() => {
        if (this.proposal !== undefined) {
          this.showPostDetails();
        }
      });
    },
    totalValue() {
      if (this.proposal && this.returnProposal[0]) {
        let proposalSP = this.proposal.total_votes;
        let returningSP = this.returnProposal[0].total_votes;
        let value = 0;
        value = Number((proposalSP / returningSP) * 100).toFixed(2);
        return Number(value);
      }
    },
    totalProposalSP() {
      let totalSP = 0;
      totalSP = Math.max(...this.proposalVoters.map(v => v.totalSP), 0);
      return totalSP;
    },
    loadVoters() {
      this.$refs["modal-voters"].show();
    },
    showVotingModal() {
      this.$refs["modal-voting"].show();
    },
    setProposalVoters() {
      this.$store.dispatch("setProposalVoters", Number(this.id));
    },
    isApproved(id) {
      if (this.voterProposals.includes(id)) {
        return true;
      } else {
        return false;
      }
    },
    showPostDetails() {
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
      if (this.proposal) {
        let permlinkShort = this.proposal.permlink.replace(/^.*\/(.*)$/, "$1");
        this.$store
          .dispatch("fetchPost", [
            `${this.proposal.creator}`,
            `${permlinkShort}`
          ])
          .then(() => {
            this.post.body = renderer.render(this.post.body);
          });
      }
    }
  },
  created() {
    this.fetchProposalById();
    this.setProposalVoters();
  }
};
</script>
