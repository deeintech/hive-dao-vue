<template>
  <header class="header header-transparent" id="header-main">
    <b-navbar>
      <b-navbar-brand>
        <router-link to="/">
          <img
            src="@/assets/img/logo.png"
            id="navbar-logo"
            style="height: 30px;"
            alt="logo"
          />
        </router-link>
      </b-navbar-brand>
      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
      <!-- <b-collapse id="nav-collapse" is-nav> -->
      <b-nav class="ml-auto">
        <b-nav-item
          ><router-link class="text-white" to="/proposals">{{
            $t("common.proposalsLabel2")
          }}</router-link>
        </b-nav-item>
        <b-nav-item-dropdown :text="`${$t('common.infoLabel')}`" right>
          <b-dropdown-item>
            <router-link class="text-dark" to="/faq">{{
              $t("faq.title")
            }}</router-link></b-dropdown-item
          >
          <b-dropdown-item>
            <router-link class="text-dark" to="/about">{{
              $t("common.aboutLabel")
            }}</router-link
            ><br />
          </b-dropdown-item>
          <b-dropdown-item href="https://discord.gg/eXxA5BN" target="_blank">
            Discord
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown
          :text="`${$t('common.profileLabel')}`"
          right
          v-if="user.name"
        >
          <b-dropdown-item>
            <router-link class="text-dark" to="/profile">{{
              user.name
            }}</router-link></b-dropdown-item
          >
          <b-dropdown-item>
            <router-link class="text-dark" to="/logout">{{
              $t("common.logoutLabel")
            }}</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          :text="`${$t('common.profileLabel')}`"
          right
          v-if="!user.name"
        >
          <b-dropdown-item>
            <router-link class="text-dark" to="/login">{{
              $t("common.loginLabel")
            }}</router-link></b-dropdown-item
          >
          <b-dropdown-item href="https://signup.steemit.com" target="_blank">
            {{ $t("common.signupLabel") }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
      <!-- </b-collapse> -->
      <select
        v-model="$i18n.locale"
        class="form-control-sm selector-plain mt-1 pr-1 pl-2 mr-1"
      >
        <option v-for="(lang, i) in languages" :key="i" :value="lang.locale">
          {{ lang.name }}
        </option>
      </select>
    </b-navbar>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapState(["global", "language", "user"])
  },
  data() {
    return {
      languages: [
        { name: "EN", locale: "en" },
        { name: "KO", locale: "ko" }
      ]
    };
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
    }
  }
};
</script>

<style scoped>
select.form-control-sm.selector-plain {
  border-radius: 0.375rem;
  background: transparent;
  border: 1pt solid #eeeeee;
  text-transform: uppercase;
  color: white;
  opacity: 0.8;
}

select.form-control-sm.selector-plain option {
  color: black;
}

select.form-control-sm.selector-plain:focus {
  border: 1pt solid #eeeeee;
}
.bordered {
  border: 1pt solid #eeeeee;
}
</style>
