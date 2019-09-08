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

          <!-- Voters modal -->
          <b-modal size="md" scrollable ref="modal-voters2" title="Proposal voters" centered hide-footer>
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
                  <b-list-group-item v-for="(voter, index) in votersByProposalId(proposalId)" :key="index" class="d-flex justify-content-between align-items-center">
                    <div class="avatar rounded-circle">
                      <a :href="`https://steemit.com/@${voter.voter}`" target="_blank">
                        <img :src="`https://steemitimages.com/u/${voter.voter}/avatar`" />
                      </a>
                    </div>
                    <a class="text-dark" :href="`https://steemit.com/@${voter.voter}`" target="_blank">@{{voter.voter}}</a> 
                    <b-badge variant="light" class="p-2">{{voter.sp | numeric3}} SP + <br/>{{voter.proxySP | numeric3}} SP (proxy)</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </b-modal>

          <!-- WEB -->
          <div class="row">
            <div class="col-12 d-none d-md-block d-xxl-none">
              <div class="row">
                <div class="col-md-5 my-1 mb-3">
                  <input v-model="filter" placeholder="Type to Search" class="form-control"/>
                </div>
                <div class="col-md-2 mt-1 offset-md-5">
                  <b-input-group>
                    <b-form-select v-model="status">
                      <option value="all" selected>All</option>
                      <option value="active">Started</option>
                      <option value="inactive">Upcoming</option>
                      <option value="expired">Completed</option>
                      <option value="dmitrydao">By @dmitrydao</option>
                    </b-form-select>
                  </b-input-group>
                </div>
              </div>

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
                    <span class="text-center mt-1">Empty is also a beautiful state</span>
                  </div>
                </template>
                <!-- Votes -->
                <template
                  slot="total_votes"
                  slot-scope="data">
                  <span style="cursor:pointer" @click="loadVoters(data.item.id)">{{vestsToSP(data.item.total_votes) | numeric3}} SP</span>
                </template>
                <!-- Status -->
                <template
                  slot="status"
                  slot-scope="data">
                  <span class="badge badge-dot">
                    <i class="bg-success"></i>
                  </span>
                  <span>{{data.item.status === 'active' ? 'Started' : 'Upcoming'}}</span><br/>
                  <span>(ends {{data.item.end_date | daysLeft}})</span>
                </template>
                <!-- Description -->
                <template slot="description" slot-scope="data">
                  <div class="row">
                    <div class="media align-items-center col-2 d-sm-none d-md-block mr-3">
                      <div class="avatar rounded-circle">
                        <router-link target="_blank" :to="'/proposals/' + data.item.creator">
                          <img :src="`https://steemitimages.com/u/${data.item.creator}/avatar`" />
                        </router-link>
                      </div>
                    </div>
                    <div class="col-9">
                        <h6 class="text-wrap">
                          <a
                            class="text-dark"
                            :href="`https://steemit.com/@${data.item.creator}/${data.item.permlink}`"
                            target="_blank">{{data.item.subject}}
                          </a>
                        </h6>
                        <div>
                          by
                          <router-link
                            class="text-uppercase text-muted"
                            :to="'/proposals/' + data.item.creator"
                          >@{{data.item.creator}}</router-link>
                          <span v-if="data.item.creator !== data.item.receiver">
                            for
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
                  {{duration(data.item) | numeric3}} days
                </template>
                <!-- Requested -->
                <template slot="requested" slot-scope="data">
                  <div>
                    {{totalRequested(data.item) | numeric3}} SBD
                  </div>
                  <div>
                    {{data.item.daily_pay.amount/1000 | numeric3}} SBD
                  </div>
                </template>
                <!-- Voting -->
                <template slot="vote" slot-scope="data">
                  <router-link target="_blank" class="text-white" :to="`proposal/${data.item.id}`"><button class="btn btn-sm btn-light text-dark"><i class="far fa-thumbs-up"></i></button></router-link>
                </template>
              </b-table>

              <!-- RETURNING PROPOSAL -->
              <div class="text-center text-warning text-uppercase mb-2" @click="showReturningModal()" style="cursor:pointer" v-b-tooltip.hover :title="`You need to have ${vestsToSP(returningProposal.total_votes).toLocaleString()} SP votes to start receiving funding.`">
                INSUFFICIENT VOTES
                <b-modal ref="modal-returning" scrollable title="This is a returning proposal" centered hide-footer>
                  <div>
                    <p>
                      Returning proposal acts as a certain threshhold you need to pass to receive funding ({{vestsToSP(returningProposal.total_votes) | numeric3}} SP at the moment).
                      Essentially, it returns money back to Steem Proposal System's account <a href="https://steemitwallet.com/@steem.dao" target="_blank">(@steem.dao)</a>.
                    </p>
                    <p>
                      The current returning proposal was created by <a :href="`https://steemit.com/@${returningProposal.creator}`" target="_blank">@{{returningProposal.creator}}</a>. 
                      You can check the full description <a :href="`https://steemit.com/@${returningProposal.creator}/${returningProposal.permlink}`" target="_blank">here</a>.
                    </p>
                    <p>
                      It is advisable to upvote this proposal only if your goal is to increase the passing threshhold. You can approve/romove your vote using the form below.
                    </p>
                  </div>
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
                      <div class="mb-2">2. Do you want to approve or remove your vote?</div>
                      <b-form-checkbox v-model="voteStatus" name="vote-button" switch>
                        <b>{{ voteStatus ? 'Approve Vote' : 'Remove vote' }}</b>
                      </b-form-checkbox>
                    </b-form-group>
                    <b-form-group>
                      <div class="mb-2">3. Choose one of the options to vote for this proposal:</div>
                      <button class="btn-block btn btn-light" @click="keychainVote(user, returningProposal.id, voteStatus)" type="button" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/keychain2.png"/></button>
                      <button class="btn-block btn btn-light" @click="steemconnectVote(returningProposal.id, voteStatus)" type="button" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/steemconnect.png"/></button>
                    </b-form-group>
                  </b-form>
                </b-modal>
              </div>

              <!-- INSUFFICIENT VOTES -->
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
                    <span class="text-center mt-1">Empty is also a beautiful state</span>
                  </div>
                </template>
                <!-- Votes -->
                <template
                  slot="total_votes"
                  slot-scope="data">
                  <span style="cursor:pointer" @click="loadVoters(data.item.id)">{{vestsToSP(data.item.total_votes) | numeric3}} SP</span>
                </template>
                <!-- Status -->
                <template
                  slot="status"
                  slot-scope="data">
                  <span class="badge badge-dot">
                    <i class="bg-warning"></i>
                  </span>
                  <span>{{data.item.status === 'active' ? 'Started' : 'Upcoming'}}</span><br/>
                  <span v-if="data.item.status === 'active'">(ends {{data.item.end_date | daysLeft}})</span>
                  <span v-if="data.item.status === 'inactive'">(starts {{data.item.start_date | daysLeft}})</span>
                </template>
                <!-- Description -->
                <template slot="description" slot-scope="data">
                  <div class="row">
                    <div class="media align-items-center col-2 d-sm-none d-md-block mr-3">
                      <div class="avatar rounded-circle">
                        <router-link target="_blank" :to="'/proposals/' + data.item.creator">
                          <img :src="`https://steemitimages.com/u/${data.item.creator}/avatar`" />
                        </router-link>
                      </div>
                    </div>
                    <div class="col-9">
                        <h6 class="text-wrap">
                          <a
                            class="text-dark"
                            :href="`https://steemit.com/@${data.item.creator}/${data.item.permlink}`"
                            target="_blank">{{data.item.subject}}
                          </a>
                        </h6>
                        <div>
                          by
                          <router-link
                            class="text-uppercase text-muted"
                            :to="'/proposals/' + data.item.creator"
                          >@{{data.item.creator}}</router-link>
                          <span v-if="data.item.creator !== data.item.receiver">
                            for
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
                  {{duration(data.item)}} days
                </template>
                <!-- Requested -->
                <template slot="requested" slot-scope="data">
                  <div>
                    {{totalRequested(data.item) | numeric3}} SBD
                  </div>
                  <div>
                    {{data.item.daily_pay.amount/1000 | numeric3}} SBD
                  </div>
                </template>
                <!-- Voting modal -->
                <template slot="vote" slot-scope="data">
                  <router-link target="_blank" class="text-white" :to="`proposal/${data.item.id}`"><button class="btn btn-sm btn-light text-dark"><i class="far fa-thumbs-up"></i></button></router-link>
                </template>
              </b-table>
            </div>
          </div>
          
          <!-- MOBILE-->
          <div class="px-3 d-block d-md-none">
            <div class="text-success text-center text-uppercase mb-2" v-b-modal.modal-returning>
              PASSING
            </div>
            <div class="support-index mb-3">
              <div class="support-tickets">
                <div class="support-ticket" v-for="p in proposals('passing')" :key="p.key">
                  <div class="st-meta">
                    <div class="badge badge-success-inverted">{{vestsToSP(p.total_votes) | numeric3}} SP</div>
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
                    <span class="value float-right">{{duration(p) | numeric3}} days</span>
                    <span class="label float-right mr-2">Duration:</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-warning text-center text-uppercase mb-2" v-b-modal.modal-returning>
              INSUFFICIENT VOTES
            </div>
             <div class="support-index mt-3">
              <div class="support-tickets">
                <div class="support-ticket" v-for="p in proposals('insufficient')" :key="p.key">
                  <div class="st-meta">
                    <div class="badge badge-success-inverted">{{vestsToSP(p.total_votes) | numeric3}} SP</div>
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
                    <span class="value float-right">{{duration(p) | numeric3}} days</span>
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
      proposals: 'proposalsByVotesStatus',
      totalProposalsByVotesStatus: 'totalProposalsByVotesStatus',
      totalProposals: 'totalProposals',
      duration: 'totalProposalDuration',
      totalRequested: 'totalRequested',
      votersByProposalId: 'votersByProposalId',
      returningProposal: 'returningProposal',
      totalProposalSP: 'totalProposalSP',
      vestsToSP: 'vestsToSP'
    })
  },
  methods: {
    keychainVote (user, id, approve) {
      if (window.steem_keychain && user !== '') {
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
    loadVoters (id) {
      this.proposalId = id
      this.$refs['modal-voters2'].show()
      this.$store.dispatch('fetchProposalVoters', id)
    },
    showReturningModal () {
      this.$refs['modal-returning'].show()
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
          label: 'Requested'
        },
        {
          key: 'vote',
          label: 'Vote'
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
