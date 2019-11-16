<template>
  <div>
    <section class="slice slice-lg bg-gradient-primary">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">{{ $t("dashboard.title") }}</h2>
            <h5 class="mb-4 text-white">{{ $t("dashboard.subtitle") }}</h5>
          </div>
        </div>
      </div>
    </section>
    <!-- Pages -->
    <div class="alert-light text-center p-2 proptabs">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <b-tabs>
              <template slot="tabs">
                <b-nav-item
                  ><router-link to="/proposals" class="text-dark">{{
                    $t("common.proposalsLabel2")
                  }}</router-link></b-nav-item
                >
                <b-nav-item
                  ><router-link to="/proposals/workers" class="text-dark">{{
                    $t("common.workersLabel")
                  }}</router-link></b-nav-item
                >
                <b-nav-item
                  ><router-link
                    to="/proposals/createproposal"
                    class="text-dark"
                    >{{ $t("common.createProposalLabel") }}</router-link
                  ></b-nav-item
                >
              </template>
            </b-tabs>
          </div>
          <div class="col-md-4 text-muted d-none d-sm-block">
            <div class="alert my-0" style="cursor:pointer" v-b-modal.modal-dev>
              {{ $t("dashboard.newsText")
              }}<span class="badge badge-warning ml-2">{{
                $t("dashboard.newsBadge")
              }}</span>
            </div>
            <b-modal
              id="modal-dev"
              :title="`${$t('dashboard.devsupport')}`"
              centered
              hide-footer
            >
              <div>
                <p v-html="$t('keychain.devSupport1')"></p>
              </div>
              <b-form @submit.prevent="witnessVoteKeychain(user)">
                <b-form-group
                  id="user_group"
                  :label="`${$t('keychain.inputLabel')}`"
                  label-for="user"
                >
                  <b-form-input
                    id="user"
                    v-model="user"
                    type="text"
                    required
                    :placeholder="`${$t('keychain.placeholder')}`"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group>
                  <div class="mb-2">{{ $t("keychain.voteLabel4") }}</div>
                  <button
                    class="btn-block btn btn-light"
                    type="submmit"
                    variant="light"
                  >
                    {{ $t("keychain.voteWithLabel") }}
                    <img
                      class="icon-small ml-1"
                      src="@/assets/img/random/keychain2.png"
                    />
                  </button>
                  <button
                    class="btn-block btn btn-light"
                    @click="witnessVoteSteemconnect()"
                    type="button"
                    variant="light"
                  >
                    {{ $t("keychain.voteWithLabel") }}
                    <img
                      class="icon-small ml-1"
                      src="@/assets/img/random/steemconnect.png"
                    />
                  </button>
                </b-form-group>
              </b-form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  methods: {
    keychainVote(user, id, approve) {
      if (window.steem_keychain && user != "") {
        steem_keychain.requestBroadcast(
          user,
          [
            [
              "update_proposal_votes",
              { voter: user, proposal_ids: [`${id}`], approve: `${approve}` }
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
    steemconnectVote(id, approve) {
      window.open(
        `https://beta.steemconnect.com/sign/update-proposal-votes?proposal_ids=[${id}]&approve=${approve}`
      );
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
    witnessVoteSteemconnect() {
      window.open(
        `https://steemconnect.com/sign/account-witness-vote?witness=dmitrydao&approve=1`
      );
    }
  },
  data() {
    return {
      voteStatus: true,
      user: ""
    };
  }
};
</script>
