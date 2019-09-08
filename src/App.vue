<template>
  <div id='app'>
    <Header />
      <router-view/>
    <Footer v-if='$route.name!="NotFound" && $route.name!="ProposalVote"'/>
  </div>
</template>
<script>
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  methods: {
    fetchProposals () {
      this.$store.dispatch('fetchProposals', 100)
    },
    setBudget () {
      this.$store.dispatch('setBudget')
    },
    fetchSteemGlobalPropoerties () {
      this.$store.dispatch('fetchSteemGlobalPropoerties')
    }
  },
  created () {
    this.fetchProposals()
    this.setBudget()
    this.fetchSteemGlobalPropoerties()
  }
}
</script>

<style>
#app{
  background-color: #f2f4f8;
}
</style>
