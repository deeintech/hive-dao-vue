<template>
  <div>
     <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">Create Proposal</h2>
            <h5 class="mb-4 text-white">A place to chill and type in some characters!</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="container mt-5">
      <h3>Submit the form for your proposal to go live</h3>
      <div class="card">
        <div class="card-body">
          <b-form @submit.prevent="createProposalKeychain">
            <b-form-group
              id="subject_group"
              label="A short title for your proposal"
              label-for="subject">
              <b-form-input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                placeholder="Enter subject">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="dailypay_group"
              label="Daily requested amount in SBD"
              label-for="dailypay"
              description="SBD is Steen-backed dollars (1 SBD ~ 1 USD)">
              <b-form-input
                id="dailypay"
                v-model="form.dailypay"
                type="number"
                required
                placeholder="Enter requested daily pay in SBD">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="permlink_group"
              label="Proposal permlink"
              label-for="permlink"
              description="Permlink is a URL for proposal description (Steem post), i.e. create-cool-app">
              <b-form-input
                id="permlink"
                v-model="form.permlink"
                type="text"
                required
                placeholder="Enter proposal permlink">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="creator_group"
              label="Proposal creator"
              label-for="creator"
              description="Creator is a Steem account that publishes a proposal">
              <b-form-input
                id="creator"
                v-model="form.creator"
                type="text"
                required
                placeholder="Enter proposal creator">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="receiver_group"
              label="Proposal receiver"
              label-for="receiver"
              description="Receiver is a Steem account that receives funding for proposal">
              <b-form-input
                id="receiver"
                v-model="form.receiver"
                type="text"
                required
                placeholder="Enter proposal receiver">
              </b-form-input>
            </b-form-group>
            <label for="start_date">Start date</label>
            <date-picker class="mb-3" name="start_date" id="start_date" v-model="form.start_date" :config="options" required></date-picker>
            <label for="end_date">End date</label>
            <date-picker class="mb-3" name="end_date" v-model="form.end_date" :config="options" required></date-picker>
            <p class="text-danger"><small>*Notice, there's 10 SBD submission fee, so make sure to have it in your creator account.</small></p>
            <button type="sumbit" class="btn btn-primary">Submit with <img class="icon-small ml-1" src="../assets/img/random/keychain.png"/></button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProposal',
  data () {
      return {
        form: {
          dailypay: 0,
          subject: '',
          permlink: '',
          creator: '',
          receiver: '',
          start_date: '',
          end_date: ''
        },
        options: {
          format: 'YYYY-MM-DDTHH:mm:ss',
          useCurrent: true
        }
      }
  },
  methods: {
    createProposalSteemconnect () {
      event.target.reset()
      this.$router.push('/proposals')
      window.open(`https://beta.steemconnect.com/sign/create-proposal?start_date=${this.form.start_date}&end_date=${this.form.end_date}&daily_pay=${this.form.dailypay}&subject=${this.form.subject}&permlink=${this.form.permlink}&creator=${this.form.creator}&receiver=${this.form.receiver}`)
    },
    createProposalKeychain (event) {
      if (window.steem_keychain) {
        steem_keychain.requestBroadcast(this.form.creator, [["create_proposal",{"creator":this.form.creator,"receiver":this.form.receiver,"start_date":this.form.start_date,"end_date":this.form.end_date,"daily_pay":Number(this.form.dailypay).toFixed(3)+' SBD',"subject":this.form.subject,"permlink":this.form.permlink}]], 'Active', function (response) {
          if (response.success) {
            event.target.reset()
          } else {
            event.target.reset()
          }
        })
      } else {
        return []
      }
    }
  }
}
</script>
