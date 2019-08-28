<template>
 <header class="header header-transparent" id="header-main">
  <b-navbar toggleable="md">
    <b-navbar-brand class="d-none d-md-block d-xxl-none">
    <router-link class="text-white" to="/">
      <img src="../assets/img/logo.png" id="navbar-logo" style="height: 30px;" alt="logo">
    </router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-nav class="ml-auto">
        <b-nav-item><router-link class="text-white" to="/">Home</router-link></b-nav-item>
        <b-nav-item><router-link class="text-white" to="/proposals">Proposals</router-link></b-nav-item>
        <b-nav-item><router-link class="text-white" to="/createproposal">Create proposal</router-link></b-nav-item>
        <b-nav-item><router-link class="text-white" to="/workers">Workers</router-link></b-nav-item>
        <b-nav-item><router-link class="text-white" to="/about">About</router-link></b-nav-item>
      </b-nav>
    </b-collapse>
  </b-navbar>
 </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
</style>
