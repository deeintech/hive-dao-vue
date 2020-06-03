<template>
  <div class="col-lg-3">
    <div class="card card-profile border-0 mt-lg-7">
      <a
        :href="`https://peakd.com/@${account.name}`"
        class="mx-auto"
        target="_blank"
      >
        <img
          alt="user"
          :src="`https://images.hive.blog/u/${account.name}/avatar`"
          class="card-profile-image avatar rounded-circle shadow hover-shadow-lg"
        />
      </a>
      <div class="card-body p-3 pt-0 text-center">
        <h5 class="mb-0">{{ account.name }}</h5>
        <span class="d-block text-muted mb-3"
          >Last update: {{ account.last_account_update | dateFilter }}</span
        >
        <span
          ><i class="fas fa-award mr-1"></i
          ><strong class="mr-5">{{
            account.reputation
              ? ((Math.log10(account.reputation) - 9) * 9 + 25).toFixed(2)
              : 25
          }}</strong>
          <i class="fas fa-edit mr-1"></i>
          <strong class="mr-5">{{
            account.post_count ? account.post_count : 0 | numeric
          }}</strong></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["account", "steemPerMVest"])
  }
};
</script>

<style></style>
