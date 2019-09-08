<template>
<div>
   <section class="slice bg-gradient-primary vh-100 pt-5">
    <div class="container py-5 position-relative zindex-100">
      <div class="row row-grid justify-content-around align-items-center">
        <div class="col-lg-5">
          <div class="text-center text-lg-left">
            <span class="badge badge-soft-primary badge-pill">Steem on</span>
            <h1 class="text-white mt-4 mb-3">Steem Proposals is a new way to fund and grow blockchain communities</h1>
            <!-- Buttons -->
            <div class="mt-6">
              <a class="btn btn-app-store hover-translate-y-n3 mr-lg-4 mb-4 text-left" @click="$bvModal.show('vote')">
                <i><img class="icon-small ml-1" src="../assets/img/random/keychain.png"/></i>
                <span class="btn-inner--text">Support with</span>
                <span class="btn-inner--brand">Keychain</span>
              </a>
              <a class="btn btn-app-store hover-translate-y-n3 mb-4 text-left" @click="steemconnectVote(true)">
                <i><img class="icon-small ml-1" src="../assets/img/random/steemconnect.png"/></i>
                <span class="btn-inner--text">Support with</span>
                <span class="btn-inner--brand">Steemconnect</span>
              </a>
               <b-modal id="vote" title="Supporting proposal" centered hide-footer>
                 <b-form @submit.prevent="keychainVote(user, voteStatus)">
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
                    <div class="mb-2">3. Vote:</div>
                    <button class="btn-block btn btn-light" type="submit" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/keychain2.png"/></button>
                  </b-form-group>
                </b-form>
              </b-modal>
            </div>
            <div class="text-white">
              <small>*You need to have <a href="https://signup.steemit.com" target="_blank" class="text-light"><strong>Steem account</strong></a> to support this initiative.</small>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card bg-section-secondary mt-6 mb-0 py-3 px-4 shadow-lg">
            <div class="card-body">
              <h5 class="heading h5 mb-3">{{proposal.subject}}</h5>
              <b-progress id="tooltip1" height="2rem" variant="primary" :max="100">
                <b-progress-bar :class="totalValue() < 10 ? 'text-dark pl-2' : 'text-white pl-2'" :value="totalValue() || 0" :label="`${totalValue() || 0}%`"></b-progress-bar>
              </b-progress>
              <b-tooltip target="tooltip1" triggers="hover">
                <p v-if="returningProposal">Total votes value: {{vestsToSP(proposal.total_votes) | numeric3}} SP</p>
              </b-tooltip>
              <ul class="list-unstyled mt-4">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-shape icon-success icon-sm rounded-circle mr-3">
                        <i class="fas fa-book"></i>
                      </div>
                    </div>
                    <div>
                      <span class="h6 mb-0"><strong>Details: </strong> <a :href="`https://steemit.com/@${proposal.creator}/${proposal.permlink}`" target="_blank">Steemit post</a></span>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-shape icon-warning icon-sm rounded-circle mr-3">
                      <i class="fas fa-wallet"></i>
                    </div>
                    <span class="h6 mb-0"><strong>Requested funding:</strong> {{totalRequested(proposal) | numeric3}} SBD</span>
                  </div>
                </li>
                 <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div class="icon icon-shape icon-primary icon-sm rounded-circle mr-3">
                      <i class="fas fa-calendar"></i>
                    </div>
                    <span class="h6 mb-0"><strong>{{duration(proposal) | numeric3}} days</strong> ({{proposal.start_date | dateFilter}} - {{proposal.end_date | dateFilter}})</span>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <a :href="`https://steemit.com/@${proposal.creator}`" target="_blank" class="avatar avatar-sm rounded-circle mr-3">
                      <img alt="Image placeholder" :src="`https://steemitimages.com/u/${proposal.creator}/avatar`">
                    </a>
                    <span class="h6 mb-0"><strong>Created by</strong> @<a target="_blank" :href="`https://steemit.com/@${proposal.creator}`">{{proposal.creator}}</a></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import { mapState , mapGetters } from 'vuex'
export default {
  name: 'ProposalVote',
  props: ['id'],
  computed: {
    ...mapState(['proposals', 'proposal']),
    ...mapGetters({
      duration: 'totalProposalDuration',
      totalRequested: 'totalRequested2',
      returningProposal: 'returningProposal',
      totalProposalSP: 'totalProposalSP',
      vestsToSP: 'vestsToSP'
    })
  },
  data () {
    return {
      user: '',
      voteStatus: true
    }
  },
  methods: {
    keychainVote (user, approve) {
      if (window.steem_keychain && user !== '') {
        steem_keychain.requestBroadcast(user, [["update_proposal_votes", {"voter":user,"proposal_ids":[`${this.id}`],"approve":`${approve}`}]], 'Active', function (response) {
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
    steemconnectVote (approve) {
      window.open(`https://beta.steemconnect.com/sign/update-proposal-votes?proposal_ids=[${this.id}]&approve=${approve}`)
    },
    fetchProposalById () {
      this.$store.dispatch('fetchProposalById', this.id)
    },
    fetchProposalVoters () {
      this.$store.dispatch('fetchProposalVoters', this.id)
    },
    totalValue () {
      if (this.proposal !== undefined && this.returningProposal !== undefined) {
        let value = Number(this.proposal.total_votes / this.returningProposal.total_votes * 100).toFixed(2)
        return Number(value)
      }
    }
  },
  created () {
    this.fetchProposalById()
  }
}
</script>
