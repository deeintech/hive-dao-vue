<template>
  <div>
    <section class="slice bg-section-secondary">
      <div class="container px-0">
        <!-- Stats -->
        <div class="mb-md-5 mb-sm-2">
          <Stats />
        </div>
         <div class="row">
            <div class="col-12 d-flex justify-content-center" v-if="totalProposals === 0">
              <b-spinner label="Spinning"></b-spinner>
            </div>
          </div>
        <div class="mb-5" v-if="totalProposals > 0">

          <!-- Voting modal -->
          <b-modal ref="modal-voting" :title="`${$t('vote.supportingProposal')}`" centered hide-footer>
            <div v-if="proposalId === 0" class="mb-5">
              <p>{{$t('proposals.returningProposalInfo1')}} {{$t('proposals.returningProposalInfo2')}}</p>
              <p>{{$t('proposals.returningProposalInfo5')}}</p>
            </div>
            <div class="timeline timeline-one-side" data-timeline-content="axis">
              <b-form @submit.prevent="keychainVote(user, voteStatus)">
              <div class="timeline-block">
                <span class="timeline-step timeline-step-sm border-dark"></span>
                <div class="timeline-content pt-1">
                  <h6>{{$t('keychain.inputLabel')}}</h6>
                  <b-form-group>
                    <b-form-input
                      id="user"
                      @input="updateModel('user', $event)"
                      type="text"
                      size="sm"
                      required
                      :placeholder="`${$t('keychain.placeholder')}`">
                    </b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="timeline-block">
                <span class="timeline-step timeline-step-sm border-dark"></span>
                <div class="timeline-content pt-2">
                  <h6>{{$t('keychain.voteLabel1')}}</h6>
                  <b-form-group>
                    <b-form-checkbox @change="updateModel('voteStatus', !voteStatus)" name="vote-button" switch checked="true">
                      <b>{{ voteStatus ? $t('keychain.voteApprove') : $t('keychain.voteRemove') }}</b>
                    </b-form-checkbox>
                  </b-form-group>
                </div>
              </div>
              <div class="timeline-block">
                <span class="timeline-step timeline-step-sm border-dark"></span>
                <div class="timeline-content pt-2">
                  <h6>{{$t('keychain.voteLabel3')}}</h6>
                  <b-form-group>
                    <button class="btn btn-light btn-sm" type="submit" variant="light">{{$t('keychain.voteWithLabel')}} <img class="icon-small ml-1" src="../assets/img/random/keychain.png"/></button>
                  </b-form-group>
                </div>
              </div>
              </b-form>
            </div>
            <hr class="mb-3"/>
            <div class="d-flex justify-content-between">
              <router-link class="text-dark" :to="`proposal/${proposalId}`" target="_blank">{{$t('common.shareOnSocial')}} <i class="far fa-share-square"></i></router-link>
              <div style="cursor:pointer" v-b-tooltip.hover :title="`${$t('keychain.devSupport')}`" class="text-dark" @click="witnessVoteKeychain(user)">{{$t('keychain.witnessVote2')}} <i class="fas fa-laptop-code"></i></div>
            </div>
          </b-modal>
          
          <!-- Voters modal -->
          <b-modal size="md" scrollable ref="modal-voters2" :title="`${$t('proposals.proposalVoters')}`" centered hide-footer>
            <div class="row">
              <div class="col-12 d-flex justify-content-center" v-if="!accounts.length">
                <b-spinner label="Spinning"></b-spinner>
                <span class="ml-3">{{$t('common.loadingVotes')}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-center">
                <b-list-group v-if="accounts.length">
                  <h5>{{$t('vote.supportedByCommunity')}}:</h5>
                  <b-list-group-item v-for="(voter, index) in proposalVoters" :key="index" class="d-flex justify-content-between align-items-center">
                    <div class="avatar rounded-circle">
                      <a :href="`https://steemit.com/@${voter.voter}`" target="_blank">
                        <img :src="`https://steemitimages.com/u/${voter.voter}/avatar`" />
                      </a>
                    </div>
                    <a v-if="voter.proxyAccount === ''" class="text-dark" :href="`https://steemit.com/@${voter.voter}`" target="_blank">@{{voter.voter}}</a> 
                    <a v-else class="text-dark" :href="`https://steemit.com/@${voter.voter}`" target="_blank" v-b-tooltip.hover :title="`${$t('common.proxied1')} @${voter.proxyAccount}${$t('common.proxied2')}`"><strike>@{{voter.voter}}</strike></a> 
                    <b-badge v-if="voter.proxyAccount === ''" variant="light" class="p-2">{{voter.sp | numeric3}} SP + <br/>{{voter.proxySP | numeric3}} SP {{$t('common.proxy')}}</b-badge>
                    <b-badge v-else variant="light" class="p-2" v-b-tooltip.hover :title="`${$t('common.proxied1')} @${voter.proxyAccount}${$t('common.proxied2')}`"><strike>{{voter.sp | numeric3}} SP + <br/>{{voter.proxySP | numeric3}} SP {{$t('common.proxy')}}</strike></b-badge>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </b-modal>

          <!-- WEB -->
          <div class="container p-md-0">
            <div class="row">
              <div class="col-md-5 my-1 mb-3 d-none d-md-block d-xxl-none">
                <input @input="proposalSearch" :placeholder="`${$t('common.search')}`" class="form-control" type="search"/>
              </div>
              <div class="col-md-2 mt-1 offset-md-5">
                <b-input-group>
                  <b-form-select v-model="status">
                    <option value="all" selected>{{$t('common.allProposalsLabel')}}</option>
                    <option value="active">{{$t('common.startedProposalsLabel')}}</option>
                    <option value="inactive">{{$t('common.upcomingProposalsLabel')}}</option>
                    <option value="expired">{{$t('common.completedProposalsLabel')}}</option>
                    <option value="dmitrydao">{{$t('common.dmitrydaoProposalsLabel')}}</option>
                  </b-form-select>
                </b-input-group>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12 d-none d-md-block d-xxl-none">
              <!-- PASSING -->
              <b-table
                class="table table-padded table-active align-items-center"
                :show-empty="true"
                :items="proposals('passing', `${status}`)"
                :fields="fieldsProposals"
                :filter="filter"
                :sort-by.sync="proposalsSortBy"
                :sort-desc.sync="proposalsSortDesc"
                :sort-direction="proposalsSortDirection">
                <template slot="empty">
                  <div class="d-flex justify-content-center">
                    <span class="text-center mt-1">{{$t('proposals.emptyState')}}</span>
                  </div>
                </template>
                <!-- Votes -->
                <template
                  slot="total_votes"
                  slot-scope="data">
                  <span style="cursor:pointer" @click="loadVoters(data.item.id)">{{data.item.total_votes | numeric3}} SP</span>
                </template>
                <!-- Status -->
                <template
                  slot="status"
                  slot-scope="data">
                  <span class="badge badge-dot">
                    <i class="bg-success"></i>
                  </span>
                  <span v-if="data.item.status === 'expired'">{{$t('common.completedProposalsLabel')}}:<br/> ({{data.item.end_date | dateFilter}})</span>
                  <span v-if="data.item.status !== 'expired'">{{data.item.status === 'active' ? $t('common.startedProposalsLabel') : $t('common.upcomingProposalsLabel')}}</span><br/>
                  <span v-if="data.item.status !== 'expired'">({{$t('common.ends')}} {{data.item.end_date | daysLeft}})</span>
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
                        <div class="text-wrap">
                          <a
                            class="text-dark h6"
                            :href="data.item.permlink"
                            target="_blank">{{(data.item.subject)}}
                          </a>
                          <span class="badge badge-success" v-if="data.item.refunding === true">REFUND PROPOSAL</span>
                          <span class="badge badge-warning" v-if="data.item.burning === true">BURNING PROPOSAL</span>
                        </div>
                        <div>
                          {{$t('common.by')}}
                          <router-link
                            class="text-uppercase text-muted"
                            :to="'/proposals/' + data.item.creator"
                          >@{{data.item.creator}}</router-link>
                          <span v-if="data.item.creator !== data.item.receiver">
                            {{$t('common.for')}}
                            <router-link
                              class="text-uppercase text-muted"
                              :to="'/proposals/' + data.item.receiver"
                            >@{{data.item.receiver}}</router-link>
                          </span>
                        </div>
                    </div>
                  </div>
                </template>
                <!-- Duration -->
                <template slot="duration" slot-scope="data">
                  {{data.item.duration | numeric3}} {{$t('common.days')}}
                </template>
                <!-- Requested -->
                <template slot="requested" slot-scope="data">
                  <div>{{data.item.total_requested | numeric}} SBD</div>
                  <div>{{data.item.daily_pay | numeric}} SBD / {{$t('common.day')}}</div>
                </template>
                <template slot="funding" slot-scope="data">
                  <div v-b-tooltip.hover :title="`${Number(data.item.funding.availableBudget).toLocaleString()} SBD ${$t('common.availableBudget')}`">{{data.item.funding.fundingStatus}}%</div>
                </template>
                <!-- Voting -->
                <template slot="vote" slot-scope="data">
                  <button class="btn btn-sm btn-light text-dark" @click="showVotingModal(data.item.id)"><i class="far fa-thumbs-up"></i></button>
                </template>
              </b-table>

              <!-- RETURNING PROPOSAL info -->
              <div class="text-center text-warning text-uppercase mb-2">
                {{$t('proposals.insufficientVotes')}}
              </div>

              <!-- INSUFFICIENT -->
              <b-table
                class="table table-padded table-inactive align-items-center"
                :show-empty="true"
                :items="proposals('insufficient', `${status}`)"
                :fields="fieldsProposals"
                :sort-by.sync="proposalsSortBy"
                :sort-desc.sync="proposalsSortDesc"
                :sort-direction="proposalsSortDirection"
                :filter="filter">
                <template slot="empty">
                  <div class="d-flex justify-content-center">
                    <span class="text-center mt-1">{{$t('proposals.emptyState')}}</span>
                  </div>
                </template>
                <!-- Votes -->
                <template
                  slot="total_votes"
                  slot-scope="data">
                  <span style="cursor:pointer" @click="loadVoters(data.item.id)">{{data.item.total_votes | numeric3}} SP</span>
                </template>
                <!-- Status -->
                <template
                  slot="status"
                  slot-scope="data">
                  <span class="badge badge-dot">
                    <i class="bg-warning"></i>
                  </span>
                  <span>{{data.item.status === 'active' ? $t('common.startedProposalsLabel') : $t('common.upcomingProposalsLabel')}}</span><br/>
                  <span v-if="data.item.status === 'active'">({{$t('common.ends')}} {{data.item.end_date | daysLeft}})</span>
                  <span v-if="data.item.status === 'inactive'">({{$t('common.starts')}} {{data.item.start_date | daysLeft}})</span>
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
                        <div class="text-wrap">
                          <a
                            class="text-dark h6"
                            :href="data.item.permlink"
                            target="_blank">{{(data.item.subject)}}
                          </a>
                          <span class="badge badge-success" v-if="data.item.refunding === true">REFUND PROPOSAL</span>
                          <span class="badge badge-warning" v-if="data.item.burning === true">BURNING PROPOSAL</span>
                        </div>
                        <div>
                          {{$t('common.by')}}
                          <router-link
                            class="text-uppercase text-muted"
                            :to="'/proposals/' + data.item.creator"
                          >@{{data.item.creator}}</router-link>
                          <span v-if="data.item.creator !== data.item.receiver">
                            {{$t('common.for')}}
                            <router-link
                              class="text-uppercase text-muted"
                              :to="'/proposals/' + data.item.receiver"
                            >@{{data.item.receiver}}</router-link>
                          </span>
                        </div>
                    </div>
                  </div>
                </template>
                <!-- Duration -->
                <template slot="duration" slot-scope="data">
                  {{data.item.duration}} {{$t('common.days')}}
                </template>
                <!-- Requested -->
                <template slot="requested" slot-scope="data">
                  <div>{{data.item.total_requested | numeric}} SBD</div>
                  <div>{{data.item.daily_pay | numeric}} SBD / {{$t('common.day')}}</div>
                </template>
                <template slot="funding" slot-scope="data">
                  <div v-b-tooltip.hover :title="`${Number(data.item.funding.availableBudget).toLocaleString()} SBD ${$t('common.availableBudget')}`">{{data.item.funding.fundingStatus}}%</div>
                </template>
                <!-- Voting -->
                <template slot="vote" slot-scope="data">
                  <button class="btn btn-sm btn-light text-dark" @click="showVotingModal(data.item.id)"><i class="far fa-thumbs-up"></i></button>
                </template>
              </b-table>
            </div>
          </div>
          
          <!-- MOBILE-->
          <div class="px-3 d-block d-md-none">
            <div class="support-index mb-3">
              <div class="support-tickets">
                <div class="support-ticket" v-for="p in proposals('passing', status)" :key="p.key">
                  <div class="st-meta">
                    <div class="badge badge-success-inverted" @click="loadVoters(p.id)">{{p.total_votes | numeric3}} SP</div>
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
                        :href="p.permlink"
                        target="_blank">
                        <div class="text-wrap text-dark">{{p.subject}}</div>
                      </a>
                    </div>
                  </div>
                  <div class="st-foot">
                    <span class="label">{{$t('common.dailyPay')}}:</span>
                    <span class="value">{{p.daily_pay | numeric}} SBD</span>
                    <span class="value float-right">{{p.duration | numeric3}} {{$t('common.days')}}</span>
                    <span class="label float-right mr-2">{{$t('common.duration')}}:</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-warning text-center text-uppercase mb-2">
              {{$t('proposals.insufficientVotes')}}
            </div>
             <div class="support-index mt-3">
              <div class="support-tickets">
                <div class="support-ticket" v-for="p in proposals('insufficient', status)" :key="p.key">
                  <div class="st-meta">
                    <div class="badge badge-success-inverted">{{p.total_votes | numeric3}} SP</div>
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
                        :href="p.permlink"
                        target="_blank">
                        <div class="text-wrap text-dark">{{p.subject}}</div>
                      </a>
                    </div>
                  </div>
                  <div class="st-foot">
                    <span class="label">{{$t('common.dailyPay')}}:</span>
                    <span class="value">{{p.daily_pay | numeric}} SBD</span>
                    <span class="value float-right">{{p.duration | numeric3}} {{$t('common.days')}}</span>
                    <span class="label float-right mr-2">{{$t('common.duration')}}:</span>
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
import { i18n } from '@/plugins/i18n.js'
export default {
  name: 'Proposals',
  components: {
    Stats
  },
  computed: {
    ...mapState(['voters', 'accounts', 'dailyBudget', 'globalProperties', 'language', 'proposalVoters', 'returningProposal']),
    ...mapGetters({
      proposals: 'proposalsByVotesStatus',
      totalProposalsByVotesStatus: 'totalProposalsByVotesStatus',
      totalProposals: 'totalProposals'
    })
  },
  methods: {
    keychainVote (user, voteStatus) {
      if (window.steem_keychain && user !== '') {
        steem_keychain.requestBroadcast(user, [["update_proposal_votes", {"voter":user,"proposal_ids":[`${this.proposalId}`],"approve":`${voteStatus}`}]], 'Active', function (response) {
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
    witnessVoteKeychain (user) {
      if (window.steem_keychain && user !== '') {
        steem_keychain.requestWitnessVote(user, 'dmitrydao', true, function (response) {
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
    loadVoters (id) {
      this.proposalId = id
      this.$refs['modal-voters2'].show()
      this.$store.dispatch('fetchProposalVoters', id)
    },
    showVotingModal (id) {
      this.proposalId = id
      this.$refs['modal-voting'].show()
    },
    updateModel (model, value) {
      if (model === 'user') {
        this.user = value
      }
      if (model === 'voteStatus') {
        this.voteStatus = value
      }
      if (model === 'filter') {
        this.filter = value
      }
    },
    proposalSearch(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.filter = event.target.value
      }, 300)
    }
  },
  data () {
    return {
      fieldsProposals: [
        {
          key: 'total_votes',
          label: i18n.t('common.totalVotes'),
          sortable: true
        },
        {
          key: 'description',
          label: i18n.t('common.description'),
        },
        {
          key: 'status',
          label: i18n.t('common.status'),
          sortable: true
        },
        {
          key: 'duration',
          label: i18n.t('common.duration'),
        },
        {
          key: 'requested',
          label: i18n.t('common.requested'),
        },
        {
          key: 'funding',
          label: i18n.t('common.funding'),
        },
        {
          key: 'vote',
          label: i18n.t('common.vote'),
        }
      ],
      proposalsSortBy: 'total_votes',
      proposalsSortDesc: true,
      proposalsSortDirection: 'asc',
      filter: null,
      votesStatus: 'passing',
      status: 'all',
      voteStatus: true,
      user: '',
      proposalId: 0
    }
  }
}
</script>
