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
        <b-nav-item><router-link class="text-white" to="/">{{$t('common.homeLabel')}}</router-link></b-nav-item>
        <b-nav-item><router-link class="text-white" to="/proposals">{{$t('common.proposalsLabel2')}}</router-link></b-nav-item>
        <b-nav-item><router-link class="text-white" to="/about">{{$t('common.aboutLabel')}}</router-link></b-nav-item>
      </b-nav>
      <b-nav-item-dropdown text="Language">
          <b-dropdown-item v-for="lang in languages" right :key="lang.key" @click="changeLang(lang.locale)">
            {{lang.name}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
    </b-collapse>
  </b-navbar>
 </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['language'])
  },
  data () {
    return {
      languages: [
        { name: 'English', locale: 'en' },
        { name: 'Korean', locale: 'ko' }
      ]
    }
  },
  methods: {
    changeLang (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
    }
  }
}
</script>

<style scoped>
</style>
