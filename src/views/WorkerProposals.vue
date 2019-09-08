<template>
  <div>
     <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">Worker Proposals</h2>
            <h5
              class="mb-4 text-white"
            >A list of all proposals submitted by particular worker</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-7 pt-lg-0 bg-section-secondary">
      <div class="container-fluid pl-lg-6 pr-lg-6">
        <div class="row">
          <!-- Worker info -->
          <div class="col-lg-3">
            <div class="card card-profile border-0 mt-lg-7">
              <a :href="`https://steemit.com/@${account.name}`" class="mx-auto" target="_blank">
                <img
                  alt="user"
                  :src="`https://steemitimages.com/u/${account.name}/avatar`"
                  class="card-profile-image avatar rounded-circle shadow hover-shadow-lg"
                >
              </a>
              <div class="card-body p-3 pt-0 text-center">
                <h5 class="mb-0">{{account.name}}</h5>
                <span class="d-block text-muted mb-3">{{account.about}}</span>
                <span><i class="fas fa-award mr-1"></i><strong class="mr-5">{{account.reputation ? account.reputation : 25}}</strong> <i class="fas fa-edit mr-1"></i> <strong class="mr-5">{{account.post_count ? account.post_count : 0 | numeric}}</strong><i class="fas fa-user-friends mr-1"></i><strong>{{account.followers ? account.followers : 0 | numeric}}</strong></span>
              </div>
            </div>
          </div>
          <div class="col-lg-9 mt-lg-5">
             <div class="pipelines-w">
              <div class="row">
                <!-- Started proposals -->
                <div class="col-lg-4">
                  <div class="pipeline white lined-success">
                    <div class="pipeline-header">
                      <h5 class="pipeline-name">Started</h5>
                      <div class="pipeline-header-numbers">
                        <div class="pipeline-value"></div>
                        <div
                          class="pipeline-count"
                        >{{totalProposals(`${this.worker}`,'active')}} proposals</div>
                      </div>
                      <div class="pipeline-settings">
                        <i class="fas fa-align-justify"></i>
                      </div>
                    </div>
                    <div class="pipeline-body">
                      <div
                        class="pipeline-item"
                        v-for="proposal in workerProposalsByStatus(`${this.worker}`,'active')"
                        :key="proposal.id"
                      >
                        <a class="text-dark text-dark" :href="`https://steemit.com/@${proposal.creator}/${proposal.permlink}`" target="_blank">
                          <div class="pi-controls">
                            <div
                              class="status status-green"
                              data-placement="top"
                              data-toggle="tooltip"
                              title="Started Status"
                            ></div>
                          </div>
                          <div class="pi-body">
                              <div class="media align-items-center">
                              <span class="avatar bg-success text-uppercase text-white mr-4">{{avatarName(proposal.subject)}}</span>
                            </div>
                            <div class="pi-info">
                              <div class="h6 pi-name text-wrap">{{proposal.creator}}</div>
                              <div class="small text-dark text-wrap">{{proposal.subject}}</div>
                            </div>
                          </div>
                          <div class="pi-foot pb-0">
                            <span class="extra-info text-wrap">
                              <ul>
                                <li>
                                  <strong>{{vestsToSP(proposal.total_votes) | numeric3}} SP</strong>
                                </li>
                                <li>
                                  <strong>{{proposal.daily_pay.amount | numeric}}</strong> SBD / day
                                </li>
                                <li>
                                  <strong>{{proposal.daily_pay.amount/1000*duration(proposal) | numeric3}}</strong> SBD total
                                </li>
                                <li>
                                  <strong>{{proposal.start_date | moment("MMM D, YY")}}</strong> - <strong>{{proposal.end_date | moment("MMM D, YY")}}</strong>
                                </li>
                              </ul>
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Inactive proposals -->
                <div class="col-lg-4">
                  <div class="pipeline white lined-danger">
                    <div class="pipeline-header">
                      <h5 class="pipeline-name">Upcoming</h5>
                      <div class="pipeline-header-numbers">
                        <div class="pipeline-value"></div>
                        <div class="pipeline-count">{{totalProposals(`${this.worker}`,'inactive')}} proposals</div>
                      </div>
                      <div class="pipeline-settings">
                        <i class="fas fa-align-justify"></i>
                      </div>
                    </div>
                    <div class="pipeline-body">
                      <div
                        class="pipeline-item"
                        v-for="proposal in workerProposalsByStatus(`${this.worker}`,'inactive')"
                        :key="proposal.id">
                        <a class="text-dark text-dark" :href="`https://steemit.com/@${proposal.creator}/${proposal.permlink}`" target="_blank">
                            <div class="pi-controls">
                              <div
                                class="status status-red"
                                data-placement="top"
                                data-toggle="tooltip"
                                title="Scheduled Status"
                              ></div>
                            </div>
                            <div class="pi-body">
                              <div class="media align-items-center">
                                <span class="avatar bg-danger text-uppercase text-white mr-4">{{avatarName(proposal.subject)}}</span>
                              </div>
                              <div class="pi-info">
                                <div class="h6 pi-name">{{proposal.creator}}</div>
                                <div class="small pi-sub">{{proposal.subject}}</div>
                              </div>
                            </div>
                            <div class="pi-foot pb-0">
                              <span class="extra-info text-wrap">
                                <ul>
                                  <li>
                                    <strong>{{vestsToSP(proposal.total_votes) | numeric3}} SP</strong>
                                  </li>
                                  <li>
                                    <strong>{{proposal.daily_pay.amount | numeric}}</strong> SBD / day
                                  </li>
                                  <li>
                                    <strong>{{proposal.daily_pay.amount/1000*duration(proposal) | numeric3}}</strong> SBD total
                                  </li>
                                  <li>
                                    <strong>{{proposal.start_date | moment("MMM D, YY")}}</strong> - <strong>{{proposal.end_date | moment("MMM D, YY")}}</strong>
                                  </li>
                                </ul>
                              </span>
                            </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Completed proposals -->
                <div class="col-lg-4">
                  <div class="pipeline white lined-warning">
                    <div class="pipeline-header">
                      <h5 class="pipeline-name">Completed</h5>
                      <div class="pipeline-header-numbers">
                        <div class="pipeline-value"></div>
                        <div class="pipeline-count">{{totalProposals(`${this.worker}`,'expired')}} proposals</div>
                      </div>
                      <div class="pipeline-settings">
                        <i class="fas fa-align-justify"></i>
                      </div>
                    </div>
                    <div class="pipeline-body">
                      <div
                        class="pipeline-item"
                        v-for="proposal in workerProposalsByStatus(`${this.worker}`,'expired')"
                        :key="proposal.id"
                      >
                        <a class="text-dark text-dark" :href="`https://steemit.com/@${proposal.creator}/${proposal.permlink}`" target="_blank">
                          <div>
                            <div class="pi-controls">
                              <div
                                class="status status-yellow"
                                data-placement="top"
                                data-toggle="tooltip"
                                title="Completed Status"
                              ></div>
                            </div>
                            <div class="pi-body">
                               <div class="media align-items-center">
                                <span class="avatar bg-warning text-uppercase text-white mr-4">{{avatarName(proposal.subject)}}</span>
                              </div>
                              <div class="pi-info">
                                <div class="h6 pi-name">{{proposal.creator}}</div>
                                <div class="small pi-sub">{{proposal.subject}}</div>
                              </div>
                            </div>
                            <div class="pi-foot pb-0">
                              <span class="extra-info text-wrap">
                                <ul>
                                  <li>
                                    <strong>{{vestsToSP(proposal.total_votes) | numeric3}} SP</strong>
                                  </li>
                                  <li>
                                    <strong>{{proposal.daily_pay.amount | numeric}}</strong> SBD / day
                                  </li>
                                  <li>
                                    <strong>{{proposal.daily_pay.amount/1000*duration(proposal) | numeric3}}</strong> SBD total
                                  </li>
                                  <li>
                                    <strong>{{proposal.start_date | moment("MMM D, YY")}}</strong> - <strong>{{proposal.end_date | moment("MMM D, YY")}}</strong>
                                  </li>
                                </ul>
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'WorkerProposals',
  props: ['worker'],
  computed: {
    ...mapState(['account']),
    ...mapGetters({
      workerProposalsByStatus: 'workerProposalsByStatus',
      totalProposals: 'totalWorkerProposalsByStatus',
      duration: 'totalProposalDuration',
      steemPerMVest: 'steemPerMVest'
    })
  },
  methods: {
    fetchAccountByName (name) {
      this.$store.dispatch('fetchAccountByName', name)
    },
    avatarName (value) {
      return value.substring(0, 2)
    },
    vestsToSP (votes) {
      return votes * this.steemPerMVest / 1000000000
    }
  },
  created () {
    this.fetchAccountByName(this.worker)
  }
}
</script>

<style>
</style>
