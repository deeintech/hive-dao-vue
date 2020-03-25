<template>
  <div>
    <section class="slice slice-lg vh-100 bg-gradient-primary overflow-hidden">
      <div class="container text-white">
        <div class="row justify-content-center pt-6">
          <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="text-center mb-4">
              <h2 class="mb-5 text-white">{{ $t("common.loginTitle") }}</h2>
            </div>
            <b-form @submit.prevent="loginKeychain(user)">
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
                <button
                  class="btn-block btn btn-dark"
                  type="submit"
                  variant="light"
                >
                  {{ $t("common.loginLabel") }}
                  <img
                    class="icon-small ml-1"
                    src="@/assets/img/random/keychain.png"
                  />
                </button>
              </b-form-group>
            </b-form>
            <form>
              <hr />
              <div class="text-center text-small text-white">
                <span
                  >{{ $t("common.createHiveAccount1") }}
                  <a
                    href="https://signup.hive.io/"
                    target="_blank"
                    class="text-light"
                    >{{ $t("common.createHiveAccount2") }}</a
                  >
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { i18n } from "@/utils/plugins/i18n.js";
import items from "@/shared/constants/localStorage";

export default {
  name: "Login",
  data() {
    return {
      user: "",
      token: ""
    };
  },
  computed: {
    ...mapState(["voterProposals"])
  },
  methods: {
    loginKeychain(user) {
      if (window.hive_keychain && user !== "") {
        hive_keychain.requestSignBuffer(
          user,
          `{login: "${user}"}`,
          "Active",
          response => {
            if (response.success) {
              this.token = response.result;
              this.saveLoginInfo(response);
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
    saveLoginInfo(response) {
      if (user !== "") {
        this.$store.dispatch("setVoterProposals", this.user).then(() => {
          localStorage.setItem(items.USER, this.user);
          localStorage.setItem(items.TOKEN, this.token);
          localStorage.setItem(items.LOGGED_IN, true);
          localStorage.setItem(items.PROPOSALS, this.voterProposals);

          this.$store
            .dispatch("setUser", {
              name: this.user,
              loggedIn: true,
              token: this.token
            })
            .then(() => {
              this.$router.push("/proposals");
            });
        });
      }
    }
  }
};
</script>

<style scoped></style>
