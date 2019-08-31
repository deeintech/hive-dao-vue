<template>
  <div id='app'>
    <div class="news text-center p-1">
      <span>
        Keychain support is added. <router-link class="text-white" to="/createproposal">Create your proposal now! </router-link> 
        <span class="badge badge-danger border-dark">Hot</span>
      </span>
    </div>
    <Header />
      <router-view/>
    <Footer v-if='$route.name!="NotFound"'/>
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
      this.$store.dispatch('fetchProposals')
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
