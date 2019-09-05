<template>
  <div>
    <div class="container mt-5">
       <div class="row justify-content-center" v-if="!workers.length">
        <div class="col-lg-7 text-center">
            <h3 class="mb-5 font-weight-400 mt-5">Oops. It seems there are no workers available yet.</h3>
            <router-link class="btn btn-white btn-icon rounded-pill hover-translate-y-n3" to="/">
              <span class="btn-inner--icon">
                    <i class="fas fa-home"></i>
                </span>
                <span class="btn-inner--text">Return home?</span>
            </router-link>
        </div>
      </div>
      <div class="row" v-if="workers.length">
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
import { mapGetters } from 'vuex'
export default {
  name: 'Workers',
  computed: {
    ...mapGetters({
      workers: 'workers',
      totalWorkerProposalsByStatus: 'totalWorkerProposalsByStatus'
    })
  }
}
</script>