<template>
  <div class="container p-md-0">
    <div class="row">
      <div class="col-md-5 my-1 mb-3 d-none d-md-block d-xxl-none">
        <input
          @input="$emit('onProposalSearch', $event.target.value)"
          :placeholder="`${$t('common.search')}`"
          :value="filter"
          class="form-control"
          type="search"
        />
      </div>
      <div class="col-md-2 mt-1 offset-md-5">
        <b-input-group>
          <b-form-select
            @change="$emit('onStatusChange', status)"
            v-model="status"
          >
            <option value="all" selected>{{
              $t("common.allProposalsLabel")
            }}</option>
            <option value="active">{{
              $t("common.activeProposalsLabel")
            }}</option>
            <option value="inactive">{{
              $t("common.inactiveProposalsLabel")
            }}</option>
            <option value="expired">{{
              $t("common.expiredProposalsLabel")
            }}</option>
            <option value="dmitrydao">{{
              $t("common.dmitrydaoProposalsLabel")
            }}</option>
          </b-form-select>
        </b-input-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterProp: String,
    statusProp: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      filter: this.filterProp,
      status: this.statusProp
    };
  }
};
</script>

<style></style>
