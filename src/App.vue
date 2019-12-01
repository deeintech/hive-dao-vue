<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter
      v-if="
        $route.name != 'NotFound' &&
          $route.name != 'ProposalVote' &&
          $route.name != 'Login'
      "
    />
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import { mapState } from "vuex";

const AppFooter = () => ({
  component: import("@/components/AppFooter.vue"),
  timeout: 5000
});

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState(["user", "voterProposals"])
  },
  methods: {
    setBudget() {
      this.$store.dispatch("setBudget");
    },
    fetchSteemGlobalProperties() {
      this.$store.dispatch("fetchSteemGlobalProperties");
    },
    setVoterProposals() {
      this.$store.dispatch("setVoterProposals", this.user.name);
    }
  },
  created() {
    this.fetchSteemGlobalProperties();
    this.setBudget();
    this.setVoterProposals();
  }
};
</script>

<style>
#app {
  background-color: #f2f4f8;
}
</style>
