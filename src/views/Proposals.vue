<template>
  <div>
    <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">Steem Proposals</h2>
            <h5
              class="mb-4 text-white"
            >A list of latest proposals submitted to a Steem network</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="slice bg-section-secondary">
      <div class="container px-0">
        <!-- Stats -->
        <div class="mb-5">
          <Stats />
        </div>
        <div class="mb-5" id="active">
          <div class="actions-toolbar py-2 mb-4">
            <h5 class="mb-1">Steem Proposals</h5>
          </div>
          <!-- WEB -->
          <div class="row">
            <div class="col-12 d-none d-md-block d-xxl-none">
              <div>
                <b-row>
                  <b-col md="5" class="my-1">
                    <b-input-group>
                      <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                    </b-input-group>
                  </b-col>
                    <b-col md="2" class="my-1 offset-md-3">
                    <b-input-group>
                        <b-form-select v-model="status">
                        <option value="all" selected>All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                      </b-form-select>
                    </b-input-group>
                    </b-col>
                  <b-col md="2" class="my-1">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                  </b-col>
                </b-row>
                <b-table
                  :class="`table table-padded table-${status} align-items-center`"
                  :show-empty="true"
                  :items="proposals(`${status}`)"
                  :fields="fields"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection">
                  <template slot="empty">
                    <div class="d-flex justify-content-center">
                      <span class="text-center mt-1">Empty is also a beautiful state</span>
                    </div>
                  </template>
                  <template
                    slot="total_votes"
                    slot-scope="data">
                    <span>{{data.item.total_votes | numeric2}}</span><br/>
                  </template>
                  <template
                    slot="status"
                    slot-scope="data">
                    <span class="badge badge-dot">
                      <i :class="`bg-${data.item.status}`"></i>
                    </span>
                    <span>{{data.item.status}}</span>
                  </template>
                  <template slot="description" slot-scope="data">
                    <div class="row">
                      <div class="media align-items-center col-2 d-sm-none d-md-block mr-3">
                        <div class="avatar rounded-circle">
                          <router-link :to="'/proposals/' + data.item.creator">
                            <img :src="`https://steemitimages.com/u/${data.item.creator}/avatar`" />
                          </router-link>
                        </div>
                      </div>
                      <div class="col-9">
                          <h6 class="text-wrap">
                            <a
                              class="text-dark"
                              :href="`https://steemit.com/@${data.item.creator}/${data.item.permlink}`"
                              target="_blank"
                            >{{ (data.item.subject.length > 30) ? (data.item.subject.slice(0, 30) + '..') : data.item.subject }}</a>
                          </h6>
                          <div>
                            by
                            <router-link
                              class="text-uppercase text-muted"
                              :to="'/proposals/' + data.item.creator"
                            >{{ data.item.creator }}</router-link>
                          </div>
                      </div>
                    </div>
                  </template>
                  <template slot="duration" slot-scope="data">
                    {{totalProposalDuration(data.item) | numeric}} days
                    <br />
                    <span
                      class="smaller text-muted"
                    >{{data.item.start_date | moment("MMM D, YYYY")}} - {{data.item.end_date | moment("MMM D, YYYY")}}</span>
                  </template>
                  <template slot="receiver" class="nowrap" slot-scope="data">
                      <div class="align-middle">
                          <div v-if="data.item.receiver != 'steem.dao'">
                          <a class="text-muted"
                            :href="`https://steemitwallet.com/@${data.item.receiver}`"
                            target="_blank"
                          >@{{ data.item.receiver }}</a>
                        </div>
                        <div v-if="data.item.receiver == 'steem.dao'" v-b-tooltip.hover title="This is a refunding proposal. Your proposal should be above this one to receive funding.">
                        <a class="text-muted link link-underline-active"
                          :href="`https://steemitwallet.com/@${data.item.receiver}`"
                          target="_blank"
                        >@{{ data.item.receiver }}*</a>
                        <!-- <span class="badge">
                          <img src="../assets/img/random/flame.png"/>
                        </span> -->
                        </div>
                      </div>
                  </template>
                  <template slot="requested" slot-scope="data">
                    <div>
                      {{data.item.daily_pay.amount*totalProposalDuration(data.item) | numeric}} SBD
                    </div>
                    <div>
                      {{data.item.daily_pay.amount | numeric}} SBD
                    </div>
                  </template>
                  <template
                    slot="vote"
                    slot-scope="data">
                    <a :href="`https://beta.steemconnect.com/sign/update-proposal-votes?proposal_ids=[${data.item.id}]`" target="_blank" :class="`btn btn-sm btn-${data.item.status}`">Vote</a>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
          <!-- MOBILE-->
          <div class="p-0 d-block d-md-none">
            <b-input-group>
                <b-form-select v-model="status">
                <option value="all" selected>All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="votable">Votable</option>
                <option value="expired">Expired</option>
              </b-form-select>
            </b-input-group>
            <div class="support-index mt-3">
              <div class="support-tickets">
                <span v-if="proposals(`${status}`)==0">Oops, can't find any {{status}} proposals</span>
                <div class="support-ticket" v-for="p in proposals(`${status}`)" :key="p.id">
                  <div class="st-meta">
                    <div class="badge badge-success-inverted">{{p.total_votes | numeric2}} votes</div>
                    <span class="badge badge-dot">
                      <i :class="`bg-${p.status}`"></i>
                    </span>
                  </div>
                  <div class="st-body">
                    <div class="avatar">
                      <router-link class="text-muted" :to="'/proposals/' + p.creator">
                        <img :src="`https://steemitimages.com/u/${p.creator}/avatar`" />
                      </router-link>
                    </div>
                    <div class="ticket-content">
                      <router-link class="text-muted" :to="'/proposals/' + p.creator">
                        <h6 class="ticket-title">{{p.creator}}</h6>
                      </router-link>
                      <a
                        :href="`https://steemit.com/@${p.creator}/${p.permlink}`"
                        target="_blank"
                      >
                        <div class="ticket-description">{{p.subject}}</div>
                      </a>
                    </div>
                  </div>
                  <div class="st-foot">
                    <span class="label">Daily pay:</span>
                    <span class="value">{{p.daily_pay.amount | numeric}} SBD</span>
                    <span class="value float-right">{{totalProposalDuration(p)}} days</span>
                    <span class="label float-right mr-2">Duration:</span>
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
import Stats from '@/views/Stats.vue'
export default {
  name: 'TestnetProposals',
  components: {
    Stats
  },
  computed: {
    proposals () {
      return this.$store.getters.proposalsByStatus
    },
    totalProposalDuration () {
      return this.$store.getters.totalProposalDuration
    },
    dailyBudget () {
      return this.$store.getters.dailyBudget
    }
  },
  data () {
    return {
      fields: [
        {
          key: 'total_votes',
          label: 'Total votes',
          sortable: true
        },
        {
          key: 'description',
          label: 'Description'
        },
        {
          key: 'receiver',
          label: 'Receiver'
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'duration',
          label: 'Duration'
        },
        {
          key: 'requested',
          label: 'Total/daily pay'
        },
        {
          key: 'vote',
          label: 'Vote'
        }
      ],
      perPage: 10,
      pageOptions: [10, 20, 50],
      sortBy: 'total_votes',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      status: 'all'
    }
  }
}
</script>
<style scoped>
</style>
