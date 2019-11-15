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
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    setBudget() {
      this.$store.dispatch("setBudget");
    },
    fetchSteemGlobalProperties() {
      this.$store.dispatch("fetchSteemGlobalProperties");
    }
  },
  created() {
    this.fetchSteemGlobalProperties();
    this.setBudget();
  }
};
</script>

<style>
#app {
  background-color: #f2f4f8;
}
</style>
