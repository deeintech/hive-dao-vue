<template>
  <div>
    <section class="slice slice-lg bg-gradient-primary">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">Steem Proposals</h2>
            <h5 class="mb-4 text-white">A list of latest proposals submitted to a Steem network</h5>
          </div>
        </div>
      </div>
    </section>
    <!-- Pages -->
    <div class="alert-light text-center p-2 proptabs">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
               <b-tabs>
                 <template slot="tabs">
                    <b-nav-item><router-link to='/proposals' class="text-dark">Proposals</router-link></b-nav-item>
                    <b-nav-item><router-link to='/proposals/workers' class="text-dark">Workers</router-link></b-nav-item>
                    <b-nav-item><router-link to='/proposals/createproposal' class="text-dark">Create Proposal</router-link></b-nav-item>
                  </template>
                </b-tabs>
            </div>
            <div class="col-md-5 text-muted d-none d-sm-block">
              <div class="alert my-0" style="cursor:pointer" v-b-modal.modal-dev>
                Like what you see? Support the devs with your vote!<span class="badge badge-warning ml-2">Hot</span>
              </div>
              <b-modal id='modal-dev' title="Steem Proposals proposal" centered hide-footer>
                 <div>
                  <p>
                    Steem Proposal platform was created by <a href="https://steemit.com/@dmitrydao" target="_blank">@dmitrydao</a>. This proposal covers development 
                    efforts of existing system and ensures frequent releases of new features. You can read the 
                    full description <a href="https://steemit.com/steemdao/@dmitrydao/steem-proposals-proposal-reimbursement-and-upcoming-features" target="_blank">here</a>
                    and approve your vote below if you find this service useful.
                  </p>
                 </div>
                <b-form @submit.prevent="keychainVote(user, 27, voteStatus)">
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
                    <button class="btn-block btn btn-light" type="submmit" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/keychain2.png"/></button>
                    <button class="btn-block btn btn-light" @click="steemconnectVote(27, voteStatus)" type="button" variant="light">Vote with <img class="icon-small ml-1" src="../assets/img/random/steemconnect.png"/></button>
                  </b-form-group>
                </b-form>
              </b-modal>
            </div>
          </div>
        </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
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
    }
  },
  data () {
    return {
      voteStatus: true,
      user: ''
    }
  }
}
</script>