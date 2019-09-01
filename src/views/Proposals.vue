<template>
  <div>
    <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">Steem Proposals</h2>
            <h5 class="mb-4 text-white">A list of latest proposals submitted to a Steem network</h5>
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
                  :fields="fieldsProposals"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="proposalsSortBy"
                  :sort-desc.sync="proposalsSortDesc"
                  :sort-direction="proposalsSortDirection">
                  <template slot="empty">
                    <div class="d-flex justify-content-center">
                      <span class="text-center mt-1">Empty is also a beautiful state</span>
                    </div>
                  </template>
                  <!-- Votes -->
                  <template
                    slot="total_votes"
                    slot-scope="data">
                    <span style = "cursor:pointer" @click="loadVoters(`voters-${data.item.id}`, data.item.id)">{{ data.item.total_votes*steemPerMVest/1000000000 | numeric3}} SP</span>
                    <!-- Voters model -->
                    <b-modal size="md" scrollable :id='`voters-${data.item.id}`' :title="`${data.item.subject}`" centered hide-footer>
                      <div class="row">
                        <div class="col-12 d-flex justify-content-center" v-if="!accounts.length">
                          <b-spinner label="Spinning"></b-spinner>
                          <span class="ml-3">Loading votes. Be patient!</span>
                        </div>
                      </div>
                       <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                           <b-list-group v-if="accounts.length">
                              <h5>This proposal is supported by the following community members:</h5>
                              <b-list-group-item v-for="(voter, index) in votersByProposalId(data.item.id)" :key="index" class="d-flex justify-content-between align-items-center">
                              <div class="avatar rounded-circle">
                                <a :href="`https://steemit.com/@${voter.voter}`" target="_blank">
                                  <img :src="`https://steemitimages.com/u/${voter.voter}/avatar`" />
                                </a>
                              </div>
                              <a class="text-dark" :href="`https://steemit.com/@${voter.voter}`" target="_blank">@{{voter.voter}}</a> 
                              <b-badge variant="primary" pill>{{voter.sp | numeric3}} SP</b-badge>
                            </b-list-group-item>
                          </b-list-group>
                        </div>
                       </div>
                    </b-modal>
                  </template>
                  <!-- Status -->
                  <template
                    slot="status"
                    slot-scope="data">
                    <span class="badge badge-dot">
                      <i :class="`bg-${data.item.status}`"></i>
                    </span>
                    <span>{{data.item.status}}</span>
                  </template>
                  <!-- Description -->
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
                              target="_blank">{{ (data.item.subject.length > 30) ? (data.item.subject.slice(0, 30) + '..') : data.item.subject }}
                            </a>
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
                  <!-- Duration -->
                  <template slot="duration" slot-scope="data">
                    {{duration(data.item) | numeric}} days
                    <br />
                    <span class="smaller text-muted">{{data.item.start_date | moment("MMM D, YYYY")}} - {{data.item.end_date | moment("MMM D, YYYY")}}</span>
                  </template>
                  <!-- Receiver -->
                  <template slot="receiver" slot-scope="data">
                      <div class="align-middle">
                        <div v-if="data.item.receiver != 'steem.dao' && data.item.receiver != 'null'">
                          <a class="text-muted"
                            :href="`https://steemitwallet.com/@${data.item.receiver}`"
                            target="_blank">@{{ data.item.receiver }}</a>
                        </div>
                        <div v-if="data.item.receiver == 'steem.dao'" v-b-tooltip.hover title="This is a refunding proposal. Your proposal should be above this one to receive funding.">
                        <a class="text-muted link link-underline-active"
                          :href="`https://steemitwallet.com/@${data.item.receiver}`"
                          target="_blank"
                        >@{{ data.item.receiver }}*</a>
                        </div>
                        <div v-if="data.item.receiver == 'null'" v-b-tooltip.hover title="This is a burning proposal. It decreases Steem inflation rate.">
                        <a :class="`text-muted link link-underline-${data.item.status}`"
                          :href="`https://steemitwallet.com/@${data.item.receiver}`"
                          target="_blank"
                        >@{{ data.item.receiver }}*</a>
                        <span class="badge">
                          <img src="../assets/img/random/flame.png"/>
                        </span>
                        </div>
                      </div>
                  </template>
                  <!-- Requested -->
                  <template slot="requested" slot-scope="data">
                    <div>
                      {{data.item.daily_pay.amount/1000*duration(data.item) | numeric3}} SBD
                    </div>
                    <div>
                      {{data.item.daily_pay.amount/1000 | numeric3}} SBD
                    </div>
                  </template>
                  <!-- Voting modal -->
                  <template
                    slot="vote"
                    slot-scope="data">
                    <button :class="`btn btn-sm btn-${data.item.status} text-white`" @click="$bvModal.show(`modal-${data.item.id}`)"><i class="far fa-thumbs-up"></i></button>
                     <b-modal :id='`modal-${data.item.id}`' :title="`${data.item.subject}`" centered hide-footer>
                      <b-form>
                        <b-form-group
                          id="user_group"
                          label="1. Enter your Steem account name:"
                          label-for="user">
                          <b-form-input
                            id="user"
                            v-model="user"
                            type="text"
                            required
                            placeholder="name">
                          </b-form-input>
                        </b-form-group>
                        <b-form-group>
                          <div class="mb-2">2. Do you want to vote or remove your vote?</div>
                          <b-form-checkbox v-model="voteStatus" name="vote-button" switch>
                            <b>{{ voteStatus ? 'Vote' : 'Remove vote' }}</b>
                          </b-form-checkbox>
                        </b-form-group>
                        <b-form-group>
                          <div class="mb-2">3. Choose one of the options to vote for this proposal:</div>
                          <button class="btn-block btn btn-light" @click="keychainVote(user, data.item.id, voteStatus)" type="button" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/keychain2.png"/></button>
                          <button class="btn-block btn btn-light" @click="steemconnectVote(data.item.id, voteStatus)" type="button" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/steemconnect.png"/></button>
                        </b-form-group>
                      </b-form>
                     </b-modal>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
          <!-- MOBILE-->
          <div class="px-3 d-block d-md-none">
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
                        target="_blank">
                        <div class="text-wrap text-dark">{{p.subject}}</div>
                      </a>
                    </div>
                  </div>
                  <div class="st-foot">
                    <span class="label">Daily pay:</span>
                    <span class="value">{{p.daily_pay.amount | numeric}} SBD</span>
                    <span class="value float-right">{{duration(p)}} days</span>
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
import { mapState , mapGetters } from 'vuex'
export default {
  name: 'Proposals',
  components: {
    Stats
  },
  computed: {
    ...mapState(['voters', 'accounts', 'dailyBudget', 'globalProperties']),
    ...mapGetters({
      proposals: 'proposalsByStatus',
      duration: 'totalProposalDuration',
      votersByProposalId: 'votersByProposalId',
      steemPerMVest: 'steemPerMVest',
      accountSP: 'accountSP'
    })
  },
  methods: {
    keychainVote (user, id, approve) {
      if (window.steem_keychain && user!= '') {
        steem_keychain.requestBroadcast(user, [["update_proposal_votes", {"voter":user,"proposal_ids":[`${id}`],"approve":`${approve}`}]], 'Active', function (response) {
          if (response.success) {
            return response
          } else {
            return response.success
          }
        })
      } else {
        return []
      }
    },
    steemconnectVote (id, approve) {
      window.open(`https://beta.steemconnect.com/sign/update-proposal-votes?proposal_ids=[${id}]&approve=${approve}`)
    },
    loadVoters (modalId, id) {
      this.$bvModal.show(modalId)
      this.$store.dispatch('fetchProposalVoters', id)
    }
  },
  data () {
    return {
      fieldsProposals: [
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
      perPage: 20,
      pageOptions: [20, 50, 100],
      proposalsSortBy: 'total_votes',
      proposalsSortDesc: true,
      proposalsSortDirection: 'asc',
      filter: null,
      status: 'all',
      voteStatus: true,
      user: ''
    }
  }
}
</script>