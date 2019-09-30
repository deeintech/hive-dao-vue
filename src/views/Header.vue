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
        <select v-model="$i18n.locale" class="form-control-sm selector-plain mt-1 pr-1 pl-2 mr-4">
          <option v-for="(lang, i) in languages" :key="i" :value="lang.locale">
            {{lang.name}}
          </option>
        </select>
      </b-nav>
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
        { name: 'EN', locale: 'en' },
        { name: 'KO', locale: 'ko' },
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
select.form-control-sm.selector-plain {
  border-radius: 0;
  background: transparent;
  border: 1pt solid #eeeeee;
  text-transform: uppercase;
  color: white;
  opacity: 0.7;
   /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
} 

select.form-control-sm.selector-plain option {
  color: black;
} 

select.form-control-sm.selector-plain:focus {
  border: 1pt solid #eeeeee;
}
</style>
