<template>
  <div>
    <!-- <section class="slice slice-lg vh-100 bg-gradient-primary overflow-hidden" data-offset-top="#header-main" v-if="totalWorkers==0">
        <div class="container h-100 d-flex align-items-center position-relative zindex-100">
            <div class="col">
                <div class="row justify-content-center">
                    <div class="col-lg-7 text-center">
                        <h6 class="h1 mb-5 font-weight-400 text-white">Oops. It seems there are no workers available yet.</h6>
                        <router-link class="btn btn-white btn-icon rounded-pill hover-translate-y-n3" to="/">
                          <span class="btn-inner--icon">
                                <i class="fas fa-home"></i>
                            </span>
                            <span class="btn-inner--text">Return home?</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">Steem Workers</h2>
            <h5
              class="mb-4 text-white"
            >A list of every community member that submitted a proposal to a Steemit testnet network</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-4" v-for="worker in workers" :key="worker">
          <div class="card text-center py-3 hover-translate-y-n10">
            <div class="card-body">
              <div class>
                <div class="pb-5">
                  <router-link
                    class="avatar rounded-circle avatar-lg hover-translate-y-n3"
                    :to="'/proposals/' + worker"
                  >
                    <img :src="`https://steemitimages.com/u/${worker}/avatar`" />
                  </router-link>
                </div>
                <h5 class="font-weight-bold"><router-link :to="'/proposals/' + worker">{{ worker }}</router-link></h5>
                <p
                  class="mt-2 mb-0"
                >The worker has already completed {{totalWorkerProposalsByStatus(worker, 'expired')}} proposals and is currently working on {{totalWorkerProposalsByStatus(worker, 'active')}} more.
               <span>You can find the full history of proposals below.</span>
               </p>
                <router-link class="d-inline-block link link-underline-active text-success mt-4" :to="'/proposals/' + worker">Find out more</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Workers',
  computed: {
    workers () {
      return this.$store.getters.workers
    },
    totalWorkerProposalsByStatus () {
      return this.$store.getters.totalWorkerProposalsByStatus
    },
    totalWorkers () {
      return this.$store.getters.totalWorkers
    }
  }
}
</script>
