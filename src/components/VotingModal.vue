<template>
  <div>
    <div v-if="proposalId === 0" class="mb-5">
      <p>
        {{ $t("proposals.returnProposalInfo1") }}
        {{ $t("proposals.returnProposalInfo2") }}
      </p>
      <p>{{ $t("proposals.returnProposalInfo5") }}</p>
    </div>
    <div class="timeline timeline-one-side" data-timeline-content="axis">
      <b-form @submit.prevent="keychainVote(user, !voteStatus)">
        <div class="timeline-block">
          <span class="timeline-step timeline-step-sm border-dark"></span>
          <div class="timeline-content pt-1">
            <h6>{{ $t("keychain.inputLabel") }}</h6>
            <b-form-group>
              <b-form-input
                id="user"
                :disabled="loggedIn ? true : false"
                :value="user ? user : ''"
                @input="updateModel('user', $event)"
                type="text"
                size="sm"
                required
                :placeholder="`${$t('keychain.placeholder')}`"
              >
              </b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="timeline-block">
          <span class="timeline-step timeline-step-sm border-dark"></span>
          <div class="timeline-content pt-2">
            <h6>{{ $t("keychain.voteLabel1") }}</h6>
            <b-form-group>
              <b-form-checkbox
                @change="updateModel('voteStatus', !voteStatus)"
                name="vote-button"
                switch
                :disabled="loggedIn ? true : false"
                :checked="voteStatus ? false : true"
              >
                <b>{{
                  voteStatus
                    ? $t("keychain.voteUnsupport")
                    : $t("keychain.voteSupport")
                }}</b>
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
        <div class="timeline-block">
          <span class="timeline-step timeline-step-sm border-dark"></span>
          <div class="timeline-content pt-2">
            <h6>{{ $t("keychain.voteLabel3") }}</h6>
            <b-form-group>
              <button
                class="btn btn-light btn-sm"
                type="submit"
                variant="light"
              >
                {{ $t("keychain.voteWithLabel") }}
                <img
                  class="icon-small ml-1"
                  src="@/assets/img/random/keychain.png"
                />
              </button>
              <button
                @click="steemconnectVote(!voteStatus)"
                class="btn btn-light btn-sm"
                type="button"
                variant="light"
                v-if="steemconnect"
              >
                {{ $t("keychain.voteWithLabel") }}
                <img
                  class="icon-small ml-1"
                  src="@/assets/img/random/steemconnect.png"
                />
              </button>
            </b-form-group>
          </div>
        </div>
      </b-form>
    </div>
    <hr class="mb-3" />
    <div class="d-flex justify-content-between">
      <div v-if="shareonsocial">
        <router-link
          class="text-dark"
          :to="`proposal/${proposalId}`"
          target="_blank"
          >{{ $t("common.shareOnSocial") }} <i class="far fa-share-square"></i
        ></router-link>
      </div>

      <div
        style="cursor:pointer"
        v-b-tooltip.hover
        :title="`${$t('keychain.devSupport1')} ${$t('keychain.devSupport2')}`"
        class="text-dark"
        @click="witnessVoteKeychain(user)"
      >
        {{ $t("keychain.witnessVote2") }}
        <i class="fas fa-laptop-code"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proposalIdProp: Number,
    userProp: String,
    voteStatusProp: Boolean,
    loggedInProp: Boolean,
    steemconnect: Boolean,
    shareonsocial: Boolean
  },
  data() {
    return {
      proposalId: this.proposalIdProp,
      user: this.userProp,
      loggedIn: this.loggedInProp,
      voteStatus: this.voteStatusProp
    };
  },
  methods: {
    witnessVoteKeychain(user) {
      if (window.steem_keychain && user !== "") {
        steem_keychain.requestWitnessVote(user, "dmitrydao", true, function(
          response
        ) {
          if (response.success) {
            return response;
          } else {
            return response.success;
          }
        });
      } else {
        return [];
      }
    },
    steemconnectVote(voteStatus) {
      if (this.user !== "") {
        window.open(
          `https://beta.steemconnect.com/sign/update-proposal-votes?proposal_ids=[${this.proposalId}]&approve=${voteStatus}`
        );
      }
    },
    keychainVote(user, voteStatus) {
      if (window.steem_keychain && user !== "") {
        steem_keychain.requestBroadcast(
          user,
          [
            [
              "update_proposal_votes",
              {
                voter: user,
                proposal_ids: [`${this.proposalId}`],
                approve: `${voteStatus}`
              }
            ]
          ],
          "Active",
          function(response) {
            if (response.success) {
              return response;
            } else {
              return response.success;
            }
          }
        );
      } else {
        return [];
      }
    },
    witnessVoteKeychain(user) {
      if (window.steem_keychain && user !== "") {
        steem_keychain.requestWitnessVote(user, "dmitrydao", true, function(
          response
        ) {
          if (response.success) {
            return response;
          } else {
            return response.success;
          }
        });
      } else {
        return [];
      }
    },
    updateModel(model, value) {
      if (model === "user") {
        this.user = value;
      }
      if (model === "voteStatus") {
        this.voteStatus = value;
      }
    }
  }
};
</script>

<style></style>
