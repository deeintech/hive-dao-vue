<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer
      v-if="
        $route.name != 'NotFound' &&
          $route.name != 'ProposalVote' &&
          $route.name != 'Login'
      "
    />
  </div>
</template>
<script>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
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
