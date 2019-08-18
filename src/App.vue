<template>
  <div id='app'>
    <!-- <div id="vote" class="text-center p-1 d-none d-md-block d-xxl-none">
      <span dismissable>To support the project, please <a class="text-muted" href="https://steemitwallet.com/~witnesses" target="_blank">vote</a> for @dmitrydao witness.</span>
    </div> -->
    <Header />
      <router-view/>
    <Footer v-if='$route.name!="CreateProposal" && $route.name!="NotFound"'/>
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
    fetchTestnetProposals () {
      this.$store.dispatch('fetchTestnetProposals')
    },
    setBudget () {
      this.$store.dispatch('setBudget')
    }
  },
  created () {
    this.fetchTestnetProposals()
    this.setBudget()
  }
}
</script>

<style>
#app{
  background-color: #f2f4f8;
}
#vote{
  background: #6e00ff;
  border-bottom: 1pt solid #d4d3d3;
  color: #ffffff;
}
</style>
