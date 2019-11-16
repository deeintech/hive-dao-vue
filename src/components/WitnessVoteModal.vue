<template>
  <div>
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
        <button class="btn-block btn btn-light" type="submmit" variant="light">
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
  </div>
</template>

<script>
export default {
  props: {
    userProp: String,
    voteStatusProp: Boolean
  },
  data() {
    return {
      user: this.userProp,
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
    witnessVoteSteemconnect() {
      window.open(
        `https://steemconnect.com/sign/account-witness-vote?witness=dmitrydao&approve=1`
      );
    }
  }
};
</script>

<style></style>
