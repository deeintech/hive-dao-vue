<template>
  <div>
    <div class="container mt-5">
      <div class="row justify-content-center" v-if="!workers.length">
        <div class="col-lg-7 text-center">
          <h3 class="mb-5 font-weight-400 mt-5">
            {{ $t("workers.cantFindWorkers") }}
          </h3>
          <router-link
            class="btn btn-white btn-icon rounded-pill hover-translate-y-n3"
            to="/"
          >
            <span class="btn-inner--icon">
              <i class="fas fa-home"></i>
            </span>
            <span class="btn-inner--text">{{ $t("common.returnHome") }}</span>
          </router-link>
        </div>
      </div>
      <div class="row" v-if="workers.length">
        <div class="col-lg-4" v-for="worker in workers" :key="worker">
          <div class="card py-3 hover-translate-y-n10">
            <div class="card-body">
              <div>
                <div class="pb-5 text-center">
                  <router-link
                    class="avatar rounded-circle avatar-lg hover-translate-y-n3"
                    :to="'/proposals/' + worker"
                  >
                    <img
                      :src="`https://steemitimages.com/u/${worker}/avatar`"
                    />
                  </router-link>
                </div>
                <h5 class="font-weight-bold text-center">
                  <router-link :to="'/proposals/' + worker">{{
                    worker
                  }}</router-link>
                </h5>
                <span class="ml-4">{{ $t("workers.workerStats") }}:</span>
                <ul>
                  <li>
                    {{ $t("workers.expiredProposals") }}:
                    {{ totalWorkerProposalsByStatus(worker, "expired") }}
                  </li>
                  <li>
                    {{ $t("workers.activeProposals") }}:
                    {{ totalWorkerProposalsByStatus(worker, "active") }}
                  </li>
                  <li>
                    {{ $t("workers.inactiveProposals") }}:
                    {{ totalWorkerProposalsByStatus(worker, "inactive") }}
                  </li>
                </ul>
                <p class="text-center mb-1">
                  <router-link
                    class="d-inline-block link link-underline-active text-success mt-4"
                    :to="'/proposals/' + worker"
                    >{{ $t("common.findOutMore") }}</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Workers",
  computed: {
    ...mapGetters({
      workers: "workers",
      totalWorkerProposalsByStatus: "totalWorkerProposalsByStatus"
    })
  }
};
</script>
