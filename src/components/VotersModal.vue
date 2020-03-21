<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-9 justify-content-center">
      <b-list-group v-if="accounts.length">
        <h5>
          {{ $t("vote.supportedByCommunity") }} ({{ proposalVoters.length }}):
        </h5>
        <b-list-group-item
          v-for="(voter, index) in proposalVoters"
          :key="index"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="avatar rounded-circle">
            <a :href="`https://peakd.com/@${voter.voter}`" target="_blank">
              <img :src="`https://steemitimages.com/u/${voter.voter}/avatar`" />
            </a>
          </div>
          <a
            v-if="voter.proxyAccount === ''"
            class="text-dark"
            :href="`https://peakd.com/@${voter.voter}`"
            target="_blank"
            >@{{ voter.voter }}</a
          >
          <a
            v-else
            class="text-dark"
            :href="`https://peakd.com/@${voter.voter}`"
            target="_blank"
            v-b-tooltip.hover
            :title="
              `${$t('common.proxied1')} @${voter.proxyAccount}${$t(
                'common.proxied2'
              )}`
            "
            ><strike>@{{ voter.voter }}</strike></a
          >
          <b-badge v-if="voter.proxyAccount === ''" variant="light" class="p-2"
            >{{ voter.sp | numeric3 }} HP + <br />{{
              voter.proxySP | numeric3
            }}
            HP {{ $t("common.proxy") }}</b-badge
          >
          <b-badge
            v-else
            variant="light"
            class="p-2"
            v-b-tooltip.hover
            :title="
              `${$t('common.proxied1')} @${voter.proxyAccount}${$t(
                'common.proxied2'
              )}`
            "
            ><strike
              >{{ voter.sp | numeric3 }} HP + <br />{{
                voter.proxySP | numeric3
              }}
              HP {{ $t("common.proxy") }}</strike
            ></b-badge
          >
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proposalVoters: Array,
    accounts: Array
  }
};
</script>

<style></style>
